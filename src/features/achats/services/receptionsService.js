import api from "@/services/api";
import {
  mockReceptions,
  mockReceptionStats,
  simulateDelay,
  generateNewBLNumber,
  findReceptionById,
  calculateStats,
  ACHATS_USE_MOCK,
} from "./mockData";

// Toggle for mock mode (set to false when backend is ready)
const USE_MOCK_DATA = ACHATS_USE_MOCK;

const receptionsService = {
  /**
   * Get all receptions (BL)
   */
  async getAllReceptions() {
    if (USE_MOCK_DATA) {
      await simulateDelay(800);
      return {
        success: true,
        data: [...mockReceptions],
      };
    }

    try {
      const response = await api.get("/receptions");
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error("Error fetching receptions:", error);
      return {
        success: false,
        error:
          error.response?.data?.message ||
          "Erreur lors du chargement des réceptions",
      };
    }
  },
  /**
   * Get reception by ID
   */
  async getReceptionById(id) {
    if (USE_MOCK_DATA) {
      await simulateDelay(400);
      const reception = findReceptionById(id);
      if (reception) {
        return {
          success: true,
          data: { ...reception },
        };
      }
      return {
        success: false,
        error: "Réception non trouvée",
      };
    }

    try {
      const response = await api.get(`/receptions/${id}`);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error("Error fetching reception:", error);
      return {
        success: false,
        error:
          error.response?.data?.message ||
          "Erreur lors du chargement de la réception",
      };
    }
  },
  /**
   * Create new reception (BL)
   * Also creates stock entry automatically
   */
  async createReception(receptionData) {
    if (USE_MOCK_DATA) {
      await simulateDelay(600);
      const newReception = {
        ...receptionData,
        id: `mock-${Date.now()}`,
        blNumber: receptionData.blNumber || generateNewBLNumber(),
        status: receptionData.status || "en attente",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      mockReceptions.unshift(newReception);
      return {
        success: true,
        data: newReception,
        message: "Réception créée avec succès",
      };
    }

    try {
      const response = await api.post("/receptions", receptionData);
      return {
        success: true,
        data: response.data,
        message: "Réception créée avec succès",
      };
    } catch (error) {
      console.error("Error creating reception:", error);
      return {
        success: false,
        error:
          error.response?.data?.message ||
          "Erreur lors de la création de la réception",
      };
    }
  },
  /**
   * Update reception
   */
  async updateReception(id, receptionData) {
    if (USE_MOCK_DATA) {
      await simulateDelay(500);
      const index = mockReceptions.findIndex((r) => r.id === id);
      if (index !== -1) {
        mockReceptions[index] = {
          ...mockReceptions[index],
          ...receptionData,
          updatedAt: new Date().toISOString(),
        };
        return {
          success: true,
          data: mockReceptions[index],
          message: "Réception mise à jour avec succès",
        };
      }
      return {
        success: false,
        error: "Réception non trouvée",
      };
    }

    try {
      const response = await api.put(`/receptions/${id}`, receptionData);
      return {
        success: true,
        data: response.data,
        message: "Réception mise à jour avec succès",
      };
    } catch (error) {
      console.error("Error updating reception:", error);
      return {
        success: false,
        error:
          error.response?.data?.message ||
          "Erreur lors de la mise à jour de la réception",
      };
    }
  },
  /**
   * Delete reception
   */
  async deleteReception(id) {
    if (USE_MOCK_DATA) {
      await simulateDelay(400);
      const index = mockReceptions.findIndex((r) => r.id === id);
      if (index !== -1) {
        mockReceptions.splice(index, 1);
        return {
          success: true,
          message: "Réception supprimée avec succès",
        };
      }
      return {
        success: false,
        error: "Réception non trouvée",
      };
    }

    try {
      await api.delete(`/receptions/${id}`);
      return {
        success: true,
        message: "Réception supprimée avec succès",
      };
    } catch (error) {
      console.error("Error deleting reception:", error);
      return {
        success: false,
        error:
          error.response?.data?.message ||
          "Erreur lors de la suppression de la réception",
      };
    }
  },
  /**
   * Get reception statistics
   */
  async getReceptionStats() {
    if (USE_MOCK_DATA) {
      await simulateDelay(300);
      return {
        success: true,
        data: calculateStats(mockReceptions),
      };
    }

    try {
      const response = await api.get("/receptions/stats");
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error("Error fetching reception stats:", error);
      return {
        success: false,
        error:
          error.response?.data?.message ||
          "Erreur lors du chargement des statistiques",
      };
    }
  },
  /**
   * Validate reception (changes status to validated and creates stock entry)
   */
  async validateReception(id) {
    if (USE_MOCK_DATA) {
      await simulateDelay(700);
      const index = mockReceptions.findIndex((r) => r.id === id);
      if (index !== -1) {
        mockReceptions[index] = {
          ...mockReceptions[index],
          status: "validé",
          updatedAt: new Date().toISOString(),
        };
        console.log("✅ Mock: Stock entry created for reception", id);
        return {
          success: true,
          data: mockReceptions[index],
          message: "Réception validée avec succès",
        };
      }
      return {
        success: false,
        error: "Réception non trouvée",
      };
    }

    try {
      const response = await api.post(`/receptions/${id}/validate`);
      return {
        success: true,
        data: response.data,
        message: "Réception validée avec succès",
      };
    } catch (error) {
      console.error("Error validating reception:", error);
      return {
        success: false,
        error:
          error.response?.data?.message ||
          "Erreur lors de la validation de la réception",
      };
    }
  },
  /**
   * Cancel reception
   */
  async cancelReception(id) {
    if (USE_MOCK_DATA) {
      await simulateDelay(500);
      const index = mockReceptions.findIndex((r) => r.id === id);
      if (index !== -1) {
        mockReceptions[index] = {
          ...mockReceptions[index],
          status: "annulé",
          updatedAt: new Date().toISOString(),
        };
        return {
          success: true,
          data: mockReceptions[index],
          message: "Réception annulée avec succès",
        };
      }
      return {
        success: false,
        error: "Réception non trouvée",
      };
    }

    try {
      const response = await api.post(`/receptions/${id}/cancel`);
      return {
        success: true,
        data: response.data,
        message: "Réception annulée avec succès",
      };
    } catch (error) {
      console.error("Error canceling reception:", error);
      return {
        success: false,
        error:
          error.response?.data?.message ||
          "Erreur lors de l'annulation de la réception",
      };
    }
  },
};

export default receptionsService;
