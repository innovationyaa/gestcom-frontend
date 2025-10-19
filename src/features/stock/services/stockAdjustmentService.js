import centralDataService from "@/services/centralDataService";

export class StockAdjustmentService {
  /**
   * Add a new stock movement
   * @param {number} articleId - ID of the article
   * @param {Object} adjustmentData - Adjustment data
   * @returns {Promise<Object>} - Result of the operation
   */
  async addStockMovement(articleId, adjustmentData) {
    try {
      // Get current data
      const data = await centralDataService.getData();

      // Find the article
      const articleIndex = data.stock.findIndex(
        (item) => item.id === articleId
      );
      if (articleIndex === -1) {
        throw new Error("Article not found");
      }

      const article = data.stock[articleIndex];

      // Validate adjustment
      if (
        adjustmentData.type === "sortie" &&
        adjustmentData.quantity > article.quantite
      ) {
        throw new Error("Insufficient stock quantity");
      }

      // Calculate new stock quantity
      const newQuantity =
        adjustmentData.type === "sortie"
          ? article.quantite - adjustmentData.quantity
          : article.quantite + adjustmentData.quantity;

      // Create movement record
      const movement = {
        id: this.generateMovementId(data),
        date: new Date().toISOString(),
        type: adjustmentData.type,
        quantity: adjustmentData.quantity,
        reason: adjustmentData.reason,
        reference: adjustmentData.reference || "",
        user: adjustmentData.user || "Current User",
        stockBefore: article.quantite,
        stockAfter: newQuantity,
        notes: adjustmentData.notes || "",
      };

      // Update article stock
      data.stock[articleIndex].quantite = newQuantity;
      data.stock[articleIndex].dateModification = new Date().toISOString();

      // Add movement to article history
      if (!data.stock[articleIndex].mouvements) {
        data.stock[articleIndex].mouvements = [];
      }
      data.stock[articleIndex].mouvements.unshift(movement);

      // Add to global stock movements
      if (!data.stock_movements) {
        data.stock_movements = [];
      }

      const globalMovement = {
        ...movement,
        articleId: articleId,
        articleReference: article.reference,
        articleNom: article.nom,
      };
      data.stock_movements.unshift(globalMovement);

      // Save data
      await centralDataService.updateData(data);

      return {
        success: true,
        movement,
        newQuantity,
        article: data.stock[articleIndex],
      };
    } catch (error) {
      console.error("Error adding stock movement:", error);
      throw error;
    }
  }

  /**
   * Get stock movements for an article
   * @param {number} articleId - ID of the article
   * @returns {Promise<Array>} - Array of movements
   */
  async getStockMovements(articleId) {
    try {
      const data = await centralDataService.getData();
      const article = data.stock.find((item) => item.id === articleId);

      if (!article) {
        throw new Error("Article not found");
      }

      return article.mouvements || [];
    } catch (error) {
      console.error("Error getting stock movements:", error);
      throw error;
    }
  }

  /**
   * Get all stock movements
   * @returns {Promise<Array>} - Array of all movements
   */
  async getAllStockMovements() {
    try {
      const data = await centralDataService.getData();
      return data.stock_movements || [];
    } catch (error) {
      console.error("Error getting all stock movements:", error);
      throw error;
    }
  }

  /**
   * Generate a unique movement ID
   * @param {Object} data - Current data
   * @returns {number} - New movement ID
   */
  generateMovementId(data) {
    const allMovements = data.stock_movements || [];
    const maxId = allMovements.reduce(
      (max, movement) => Math.max(max, movement.id || 0),
      0
    );
    return maxId + 1;
  }

  /**
   * Validate stock adjustment data
   * @param {Object} adjustmentData - Adjustment data to validate
   * @returns {Object} - Validation result
   */
  validateAdjustment(adjustmentData) {
    const errors = [];

    if (
      !adjustmentData.type ||
      !["entree", "sortie"].includes(adjustmentData.type)
    ) {
      errors.push("Type d'opération invalide");
    }

    if (!adjustmentData.quantity || adjustmentData.quantity <= 0) {
      errors.push("Quantité invalide");
    }

    if (!adjustmentData.reason) {
      errors.push("Motif requis");
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Get stock adjustment statistics
   * @param {number} articleId - Optional article ID filter
   * @param {string} period - Period filter (today, week, month)
   * @returns {Promise<Object>} - Statistics
   */
  async getAdjustmentStats(articleId = null, period = "month") {
    try {
      const data = await centralDataService.getData();
      let movements = data.stock_movements || [];

      // Filter by article if specified
      if (articleId) {
        movements = movements.filter((m) => m.articleId === articleId);
      }

      // Filter by period
      const now = new Date();
      const filterDate = new Date();

      switch (period) {
        case "today":
          filterDate.setHours(0, 0, 0, 0);
          break;
        case "week":
          filterDate.setDate(now.getDate() - 7);
          break;
        case "month":
          filterDate.setMonth(now.getMonth() - 1);
          break;
      }

      movements = movements.filter((m) => new Date(m.date) >= filterDate);

      // Calculate statistics
      const stats = {
        totalMovements: movements.length,
        entrees: movements.filter((m) => m.type === "entree").length,
        sorties: movements.filter((m) => m.type === "sortie").length,
        quantiteEntree: movements
          .filter((m) => m.type === "entree")
          .reduce((sum, m) => sum + m.quantity, 0),
        quantiteSortie: movements
          .filter((m) => m.type === "sortie")
          .reduce((sum, m) => sum + m.quantity, 0),
        reasonStats: this.getReasonStats(movements),
        userStats: this.getUserStats(movements),
      };

      return stats;
    } catch (error) {
      console.error("Error getting adjustment stats:", error);
      throw error;
    }
  }

  /**
   * Get statistics by reason
   * @param {Array} movements - Array of movements
   * @returns {Object} - Reason statistics
   */
  getReasonStats(movements) {
    const stats = {};
    movements.forEach((movement) => {
      if (!stats[movement.reason]) {
        stats[movement.reason] = {
          count: 0,
          quantity: 0,
        };
      }
      stats[movement.reason].count++;
      stats[movement.reason].quantity += movement.quantity;
    });
    return stats;
  }

  /**
   * Get statistics by user
   * @param {Array} movements - Array of movements
   * @returns {Object} - User statistics
   */
  getUserStats(movements) {
    const stats = {};
    movements.forEach((movement) => {
      if (!stats[movement.user]) {
        stats[movement.user] = {
          count: 0,
          quantity: 0,
        };
      }
      stats[movement.user].count++;
      stats[movement.user].quantity += movement.quantity;
    });
    return stats;
  }
}

export default new StockAdjustmentService();
