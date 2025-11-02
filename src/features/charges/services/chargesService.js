// filepath: src/features/charges/services/chargesService.js
import {
  CHARGES_USE_MOCK,
  mockChargesFournisseurs,
  mockChargesSalariales,
  mockChargesFixes,
  calculateChargesFournisseursStats,
  calculateChargesSalarialesStats,
  calculateChargesFixesStats,
  calculateChargesApercuStats,
  generateNewChargeFournisseurId,
  generateNewChargeSalarialeId,
  generateNewChargeFixeId,
  filterCharges,
  sortCharges,
} from "./chargesMockData";

// =============================================================================
// CHARGES FOURNISSEURS SERVICE
// =============================================================================

export const chargesFournisseursService = {
  /**
   * Get all Charges Fournisseurs
   */
  getAll: async (filters = {}) => {
    try {
      if (CHARGES_USE_MOCK) {
        await new Promise((resolve) => setTimeout(resolve, 300));
        let charges = [...mockChargesFournisseurs];

        // Apply filters
        charges = filterCharges(charges, filters);

        // Apply sorting
        if (filters.sortBy) {
          charges = sortCharges(charges, filters.sortBy);
        }

        const stats = calculateChargesFournisseursStats(
          mockChargesFournisseurs
        );

        return {
          success: true,
          data: charges,
          stats,
          total: charges.length,
        };
      }

      // Real API call
      const response = await fetch("/api/charges/fournisseurs", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      return await response.json();
    } catch (error) {
      console.error("Error fetching charges fournisseurs:", error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Get single Charge Fournisseur by ID
   */
  getById: async (id) => {
    try {
      if (CHARGES_USE_MOCK) {
        await new Promise((resolve) => setTimeout(resolve, 200));
        const charge = mockChargesFournisseurs.find((c) => c.id === id);
        if (!charge) {
          return { success: false, error: "Charge non trouvée" };
        }
        return { success: true, data: charge };
      }

      const response = await fetch(`/api/charges/fournisseurs/${id}`);
      return await response.json();
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  /**
   * Create new Charge Fournisseur
   */
  create: async (data) => {
    try {
      if (CHARGES_USE_MOCK) {
        await new Promise((resolve) => setTimeout(resolve, 500));

        const newCharge = {
          id: generateNewChargeFournisseurId(),
          ...data,
          status: data.status || "en_attente",
        };

        mockChargesFournisseurs.unshift(newCharge);

        return { success: true, data: newCharge };
      }

      const response = await fetch("/api/charges/fournisseurs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  /**
   * Update existing Charge Fournisseur
   */
  update: async (id, data) => {
    try {
      if (CHARGES_USE_MOCK) {
        await new Promise((resolve) => setTimeout(resolve, 400));

        const index = mockChargesFournisseurs.findIndex((c) => c.id === id);
        if (index === -1) {
          return { success: false, error: "Charge non trouvée" };
        }

        mockChargesFournisseurs[index] = {
          ...mockChargesFournisseurs[index],
          ...data,
        };

        return { success: true, data: mockChargesFournisseurs[index] };
      }

      const response = await fetch(`/api/charges/fournisseurs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  /**
   * Delete Charge Fournisseur
   */
  delete: async (id) => {
    try {
      if (CHARGES_USE_MOCK) {
        await new Promise((resolve) => setTimeout(resolve, 300));

        const index = mockChargesFournisseurs.findIndex((c) => c.id === id);
        if (index === -1) {
          return { success: false, error: "Charge non trouvée" };
        }

        mockChargesFournisseurs.splice(index, 1);
        return { success: true };
      }

      const response = await fetch(`/api/charges/fournisseurs/${id}`, {
        method: "DELETE",
      });
      return await response.json();
    } catch (error) {
      return { success: false, error: error.message };
    }
  },
};

// =============================================================================
// CHARGES SALARIALES SERVICE
// =============================================================================

export const chargesSalarialesService = {
  getAll: async (filters = {}) => {
    try {
      if (CHARGES_USE_MOCK) {
        await new Promise((resolve) => setTimeout(resolve, 300));
        let charges = [...mockChargesSalariales];

        charges = filterCharges(charges, filters);
        if (filters.sortBy) {
          charges = sortCharges(charges, filters.sortBy);
        }

        const stats = calculateChargesSalarialesStats(mockChargesSalariales);

        return { success: true, data: charges, stats, total: charges.length };
      }

      const response = await fetch("/api/charges/salariales");
      return await response.json();
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  getById: async (id) => {
    try {
      if (CHARGES_USE_MOCK) {
        await new Promise((resolve) => setTimeout(resolve, 200));
        const charge = mockChargesSalariales.find((c) => c.id === id);
        if (!charge) {
          return { success: false, error: "Charge non trouvée" };
        }
        return { success: true, data: charge };
      }

      const response = await fetch(`/api/charges/salariales/${id}`);
      return await response.json();
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  create: async (data) => {
    try {
      if (CHARGES_USE_MOCK) {
        await new Promise((resolve) => setTimeout(resolve, 500));

        const newCharge = {
          id: generateNewChargeSalarialeId(),
          ...data,
          status: data.status || "en_attente",
        };

        mockChargesSalariales.unshift(newCharge);
        return { success: true, data: newCharge };
      }

      const response = await fetch("/api/charges/salariales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  update: async (id, data) => {
    try {
      if (CHARGES_USE_MOCK) {
        await new Promise((resolve) => setTimeout(resolve, 400));

        const index = mockChargesSalariales.findIndex((c) => c.id === id);
        if (index === -1) {
          return { success: false, error: "Charge non trouvée" };
        }

        mockChargesSalariales[index] = {
          ...mockChargesSalariales[index],
          ...data,
        };
        return { success: true, data: mockChargesSalariales[index] };
      }

      const response = await fetch(`/api/charges/salariales/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  delete: async (id) => {
    try {
      if (CHARGES_USE_MOCK) {
        await new Promise((resolve) => setTimeout(resolve, 300));

        const index = mockChargesSalariales.findIndex((c) => c.id === id);
        if (index === -1) {
          return { success: false, error: "Charge non trouvée" };
        }

        mockChargesSalariales.splice(index, 1);
        return { success: true };
      }

      const response = await fetch(`/api/charges/salariales/${id}`, {
        method: "DELETE",
      });
      return await response.json();
    } catch (error) {
      return { success: false, error: error.message };
    }
  },
};

// =============================================================================
// CHARGES FIXES SERVICE
// =============================================================================

export const chargesFixesService = {
  getAll: async (filters = {}) => {
    try {
      if (CHARGES_USE_MOCK) {
        await new Promise((resolve) => setTimeout(resolve, 300));
        let charges = [...mockChargesFixes];

        charges = filterCharges(charges, filters);
        if (filters.sortBy) {
          charges = sortCharges(charges, filters.sortBy);
        }

        const stats = calculateChargesFixesStats(mockChargesFixes);

        return { success: true, data: charges, stats, total: charges.length };
      }

      const response = await fetch("/api/charges/fixes");
      return await response.json();
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  getById: async (id) => {
    try {
      if (CHARGES_USE_MOCK) {
        await new Promise((resolve) => setTimeout(resolve, 200));
        const charge = mockChargesFixes.find((c) => c.id === id);
        if (!charge) {
          return { success: false, error: "Charge non trouvée" };
        }
        return { success: true, data: charge };
      }

      const response = await fetch(`/api/charges/fixes/${id}`);
      return await response.json();
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  create: async (data) => {
    try {
      if (CHARGES_USE_MOCK) {
        await new Promise((resolve) => setTimeout(resolve, 500));

        const newCharge = {
          id: generateNewChargeFixeId(),
          ...data,
          status: data.status || "en_attente",
        };

        mockChargesFixes.unshift(newCharge);
        return { success: true, data: newCharge };
      }

      const response = await fetch("/api/charges/fixes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  update: async (id, data) => {
    try {
      if (CHARGES_USE_MOCK) {
        await new Promise((resolve) => setTimeout(resolve, 400));

        const index = mockChargesFixes.findIndex((c) => c.id === id);
        if (index === -1) {
          return { success: false, error: "Charge non trouvée" };
        }

        mockChargesFixes[index] = { ...mockChargesFixes[index], ...data };
        return { success: true, data: mockChargesFixes[index] };
      }

      const response = await fetch(`/api/charges/fixes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  delete: async (id) => {
    try {
      if (CHARGES_USE_MOCK) {
        await new Promise((resolve) => setTimeout(resolve, 300));

        const index = mockChargesFixes.findIndex((c) => c.id === id);
        if (index === -1) {
          return { success: false, error: "Charge non trouvée" };
        }

        mockChargesFixes.splice(index, 1);
        return { success: true };
      }

      const response = await fetch(`/api/charges/fixes/${id}`, {
        method: "DELETE",
      });
      return await response.json();
    } catch (error) {
      return { success: false, error: error.message };
    }
  },
};

// =============================================================================
// CHARGES APERCU SERVICE
// =============================================================================

export const chargesApercuService = {
  getStats: async () => {
    try {
      if (CHARGES_USE_MOCK) {
        await new Promise((resolve) => setTimeout(resolve, 300));
        const stats = calculateChargesApercuStats();
        return { success: true, data: stats };
      }

      const response = await fetch("/api/charges/apercu/stats");
      return await response.json();
    } catch (error) {
      return { success: false, error: error.message };
    }
  },
};
