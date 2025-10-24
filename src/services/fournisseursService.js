import axios from "axios";

/**
 * Fournisseurs service - Direct backend integration
 * Connects to: VITE_BACKEND_URL from .env
 */

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const directApi = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

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
      const response = await directApi.get(`/fournisseurs/`, {
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
      const response = await directApi.get(`/fournisseurs/${id}/`);
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
      const response = await directApi.post(`/fournisseurs/`, denormalized);
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
      const response = await directApi.put(
        `/fournisseurs/${id}/`,
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
      const response = await directApi.patch(
        `/fournisseurs/${id}/`,
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
      await directApi.delete(`/fournisseurs/${id}/`);
      return true;
    } catch (error) {
      console.error("Failed to delete fournisseur:", error);
      throw error;
    }
  },
};

export default fournisseursService;
