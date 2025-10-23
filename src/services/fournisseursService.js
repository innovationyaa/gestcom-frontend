import api from "./api";

/**
 * Fournisseurs service with mock mode support.
 * - When VITE_USE_MOCK_API=true: uses local fake data
 * - When false: calls real Django backend
 */

const USE_MOCK =
  import.meta.env.VITE_USE_MOCK_API === "true" ||
  (typeof process !== "undefined" &&
    process.env?.REACT_APP_USE_MOCK_API === "true");

// Simulate network delay for realism
const mockDelay = (ms = 300) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Mock fournisseurs data
let mockFournisseursData = [
  {
    id: 1,
    nom: "Fournisseur A",
    ice: "12345678",
    ifNumber: "IF123456",
    contact: "contact@fournisseur-a.com",
    adresse: "123 Rue Principal, Casablanca",
    dateCreation: "2024-01-15",
  },
  {
    id: 2,
    nom: "Fournisseur B",
    ice: "87654321",
    ifNumber: "IF654321",
    contact: "info@fournisseur-b.com",
    adresse: "456 Avenue Centrale, Rabat",
    dateCreation: "2024-01-20",
  },
  {
    id: 3,
    nom: "Fournisseur C",
    ice: "11223344",
    ifNumber: "IF112233",
    contact: "hello@fournisseur-c.com",
    adresse: "789 Boulevard Nord, Fès",
    dateCreation: "2024-02-01",
  },
];

const fournisseursService = {
  /**
   * Get all fournisseurs
   * @param {object} params - Query parameters (filters, pagination)
   * @returns {Promise} Array of fournisseurs
   */
  getAll: async (params = {}) => {
    if (USE_MOCK) {
      await mockDelay(400);
      return mockFournisseursData;
    }

    try {
      const response = await api.get("/fournisseurs/", { params });
      return response.data;
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
    if (USE_MOCK) {
      await mockDelay(300);
      return mockFournisseursData.find((item) => item.id === id);
    }

    try {
      const response = await api.get(`/fournisseurs/${id}/`);
      return response.data;
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
    if (USE_MOCK) {
      await mockDelay(500);
      const newFournisseur = {
        id: Math.max(...mockFournisseursData.map((f) => f.id), 0) + 1,
        ...payload,
        dateCreation: new Date().toISOString().split("T")[0],
      };
      mockFournisseursData.push(newFournisseur);
      return newFournisseur;
    }

    try {
      const response = await api.post("/fournisseurs/", payload);
      return response.data;
    } catch (error) {
      console.error("Failed to create fournisseur:", error);
      throw error;
    }
  },

  /**
   * Update fournisseur
   * @param {number} id - Fournisseur ID
   * @param {object} payload - Updated data
   * @returns {Promise} Updated fournisseur
   */
  update: async (id, payload) => {
    if (USE_MOCK) {
      await mockDelay(400);
      const index = mockFournisseursData.findIndex((f) => f.id === id);
      if (index !== -1) {
        mockFournisseursData[index] = {
          ...mockFournisseursData[index],
          ...payload,
        };
        return mockFournisseursData[index];
      }
      throw new Error("Fournisseur not found");
    }

    try {
      const response = await api.put(`/fournisseurs/${id}/`, payload);
      return response.data;
    } catch (error) {
      console.error("Failed to update fournisseur:", error);
      throw error;
    }
  },

  /**
   * Delete fournisseur
   * @param {number} id - Fournisseur ID
   * @returns {Promise} true on success
   */
  delete: async (id) => {
    if (USE_MOCK) {
      await mockDelay(300);
      const index = mockFournisseursData.findIndex((f) => f.id === id);
      if (index !== -1) {
        mockFournisseursData.splice(index, 1);
        return true;
      }
      throw new Error("Fournisseur not found");
    }

    try {
      await api.delete(`/fournisseurs/${id}/`);
      return true;
    } catch (error) {
      console.error("Failed to delete fournisseur:", error);
      throw error;
    }
  },
};

export default fournisseursService;
