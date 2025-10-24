import axios from "axios";

/**
 * Fournisseurs service - Direct Django backend connection
 * Backend URL: http://127.0.0.1:8000/api/fournisseurs/
 *
 * Field Mapping (Backend ↔ Frontend):
 * - if_fiscal ↔ ifNumber
 * - date_creation ↔ dateCreation
 */

const BACKEND_URL = "http://127.0.0.1:8000/api";

/**
 * Normalize backend response (snake_case → camelCase)
 */
const normalizeFournisseur = (fournisseur) => {
  if (!fournisseur) return null;

  return {
    id: fournisseur.id,
    nom: fournisseur.nom,
    ice: fournisseur.ice,
    ifNumber: fournisseur.if_fiscal, // Backend → Frontend
    contact: fournisseur.contact,
    adresse: fournisseur.adresse,
    dateCreation: fournisseur.date_creation, // Backend → Frontend
  };
};

/**
 * Denormalize frontend data (camelCase → snake_case)
 */
const denormalizeFournisseur = (fournisseur) => {
  const payload = {
    nom: fournisseur.nom,
    ice: fournisseur.ice,
    contact: fournisseur.contact,
    adresse: fournisseur.adresse,
  };

  // Map ifNumber to if_fiscal
  if (fournisseur.ifNumber !== undefined) {
    payload.if_fiscal = fournisseur.ifNumber;
  }

  return payload;
};

const fournisseursService = {
  /**
   * Get all fournisseurs
   * @param {object} params - Query parameters (filters, pagination)
   * @returns {Promise} Array of fournisseurs
   */
  getAll: async (params = {}) => {
    try {
      const response = await axios.get(`${BACKEND_URL}/fournisseurs/`, {
        params,
      });

      // Normalize each fournisseur
      return Array.isArray(response.data)
        ? response.data.map(normalizeFournisseur)
        : [];
    } catch (error) {
      console.error("Failed to fetch fournisseurs:", error);
      throw error;
    }
  },

  /**
   * Get single fournisseur by ID
   * @param {number} id - Fournisseur ID
   * @returns {Promise} Fournisseur object
   */
  getById: async (id) => {
    try {
      const response = await axios.get(`${BACKEND_URL}/fournisseurs/${id}/`);
      return normalizeFournisseur(response.data);
    } catch (error) {
      console.error("Failed to fetch fournisseur:", error);
      throw error;
    }
  },

  /**
   * Create new fournisseur
   * @param {object} payload - Fournisseur data { nom, ice, ifNumber, contact, adresse }
   * @returns {Promise} Created fournisseur
   */
  create: async (payload) => {
    try {
      const denormalized = denormalizeFournisseur(payload);
      const response = await axios.post(
        `${BACKEND_URL}/fournisseurs/`,
        denormalized
      );
      return normalizeFournisseur(response.data);
    } catch (error) {
      console.error("Failed to create fournisseur:", error);
      throw error;
    }
  },

  /**
   * Update fournisseur (PUT - full update)
   * @param {number} id - Fournisseur ID
   * @param {object} payload - Updated data
   * @returns {Promise} Updated fournisseur
   */
  update: async (id, payload) => {
    try {
      const denormalized = denormalizeFournisseur(payload);
      const response = await axios.put(
        `${BACKEND_URL}/fournisseurs/${id}/`,
        denormalized
      );
      return normalizeFournisseur(response.data);
    } catch (error) {
      console.error("Failed to update fournisseur:", error);
      throw error;
    }
  },

  /**
   * Partial update fournisseur (PATCH)
   * @param {number} id - Fournisseur ID
   * @param {object} payload - Partial update data
   * @returns {Promise} Updated fournisseur
   */
  partialUpdate: async (id, payload) => {
    try {
      const denormalized = denormalizeFournisseur(payload);
      const response = await axios.patch(
        `${BACKEND_URL}/fournisseurs/${id}/`,
        denormalized
      );
      return normalizeFournisseur(response.data);
    } catch (error) {
      console.error("Failed to partially update fournisseur:", error);
      throw error;
    }
  },

  /**
   * Delete fournisseur
   * @param {number} id - Fournisseur ID
   * @returns {Promise} true on success
   */
  delete: async (id) => {
    try {
      await axios.delete(`${BACKEND_URL}/fournisseurs/${id}/`);
      return true;
    } catch (error) {
      console.error("Failed to delete fournisseur:", error);
      throw error;
    }
  },
};

export default fournisseursService;
