import axios from "axios";

/**
 * Stock Movements service - Direct backend integration
 * Connects to: http://127.0.0.1:8000/api/stock/mouvements/
 */

const BACKEND_URL = "http://127.0.0.1:8000/api";

const directApi = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Normalize backend response
 * Backend uses: type_mouvement, article_detail
 * Frontend uses: typeMouvement, article
 */
const normalizeMouvement = (mouvement) => ({
  id: mouvement.id,
  typeMouvement: mouvement.type_mouvement, // "entrée" or "sortie"
  quantite: mouvement.quantite,
  remarque: mouvement.remarque || "",
  article: mouvement.article_detail
    ? {
        id: mouvement.article_detail.id,
        reference: mouvement.article_detail.reference,
        nom: mouvement.article_detail.nom,
        description: mouvement.article_detail.description,
        quantiteActuelle: mouvement.article_detail.quantite_actuelle,
        prixAchat: mouvement.article_detail.prix_achat,
        prixVente: mouvement.article_detail.prix_vente,
        seuilMinimum: mouvement.article_detail.seuil_minimum,
        image: mouvement.article_detail.image,
        fournisseur: mouvement.article_detail.fournisseur,
      }
    : null,
  articleId: mouvement.article,
  date: mouvement.date,
});

/**
 * Convert frontend format to backend format
 */
const denormalizeMouvement = (mouvement) => ({
  type_mouvement: mouvement.typeMouvement,
  quantite: mouvement.quantite,
  remarque: mouvement.remarque || "",
  article: mouvement.articleId,
});

const mouvementsService = {
  /**
   * Get all stock movements
   * GET /api/stock/mouvements/
   */
  getAll: async () => {
    try {
      const response = await directApi.get("/stock/mouvements/");
      return response.data.map(normalizeMouvement);
    } catch (error) {
      console.error("Failed to fetch mouvements:", error);
      throw new Error(
        error.response?.data?.detail ||
          "Erreur lors du chargement des mouvements"
      );
    }
  },

  /**
   * Get single movement by ID
   * GET /api/stock/mouvements/{id}/
   */
  getById: async (id) => {
    try {
      const response = await directApi.get(`/stock/mouvements/${id}/`);
      return normalizeMouvement(response.data);
    } catch (error) {
      console.error("Failed to fetch mouvement:", error);
      if (error.response?.status === 404) {
        throw new Error("Mouvement non trouvé");
      }
      throw new Error(
        error.response?.data?.detail || "Erreur lors du chargement du mouvement"
      );
    }
  },

  /**
   * Create stock entry (entrée)
   * POST /api/stock/mouvements/
   */
  createEntry: async (articleId, quantite, remarque = "") => {
    try {
      const payload = {
        type_mouvement: "entrée",
        article: articleId,
        quantite: quantite,
        remarque: remarque,
      };
      const response = await directApi.post("/stock/mouvements/", payload);
      return normalizeMouvement(response.data);
    } catch (error) {
      console.error("Failed to create entry:", error);
      if (error.response?.status === 400) {
        const errors = error.response.data;
        const errorMessages = Object.entries(errors)
          .map(
            ([field, messages]) =>
              `${field}: ${Array.isArray(messages) ? messages.join(", ") : messages}`
          )
          .join("; ");
        throw new Error(errorMessages || "Données invalides");
      }
      throw new Error(
        error.response?.data?.detail || "Erreur lors de l'ajout du stock"
      );
    }
  },

  /**
   * Create stock exit (sortie)
   * POST /api/stock/mouvements/
   */
  createExit: async (articleId, quantite, remarque = "") => {
    try {
      const payload = {
        type_mouvement: "sortie",
        article: articleId,
        quantite: quantite,
        remarque: remarque,
      };
      const response = await directApi.post("/stock/mouvements/", payload);
      return normalizeMouvement(response.data);
    } catch (error) {
      console.error("Failed to create exit:", error);
      if (error.response?.status === 400) {
        const errors = error.response.data;
        const errorMessages = Object.entries(errors)
          .map(
            ([field, messages]) =>
              `${field}: ${Array.isArray(messages) ? messages.join(", ") : messages}`
          )
          .join("; ");
        throw new Error(errorMessages || "Données invalides");
      }
      throw new Error(
        error.response?.data?.detail || "Erreur lors de la sortie du stock"
      );
    }
  },

  /**
   * Create generic movement
   * POST /api/stock/mouvements/
   */
  create: async (payload) => {
    try {
      const response = await directApi.post(
        "/stock/mouvements/",
        denormalizeMouvement(payload)
      );
      return normalizeMouvement(response.data);
    } catch (error) {
      console.error("Failed to create mouvement:", error);
      if (error.response?.status === 400) {
        const errors = error.response.data;
        const errorMessages = Object.entries(errors)
          .map(
            ([field, messages]) =>
              `${field}: ${Array.isArray(messages) ? messages.join(", ") : messages}`
          )
          .join("; ");
        throw new Error(errorMessages || "Données invalides");
      }
      throw new Error(
        error.response?.data?.detail ||
          "Erreur lors de la création du mouvement"
      );
    }
  },

  /**
   * Delete movement
   * DELETE /api/stock/mouvements/{id}/
   * ⚠️ Warning: Doesn't reverse stock quantity changes
   */
  delete: async (id) => {
    try {
      await directApi.delete(`/stock/mouvements/${id}/`);
      return true;
    } catch (error) {
      console.error("Failed to delete mouvement:", error);
      if (error.response?.status === 404) {
        throw new Error("Mouvement non trouvé");
      }
      throw new Error(
        error.response?.data?.detail ||
          "Erreur lors de la suppression du mouvement"
      );
    }
  },

  /**
   * Get movements by article ID
   */
  getByArticle: async (articleId) => {
    try {
      const response = await directApi.get("/stock/mouvements/");
      const allMovements = response.data.map(normalizeMouvement);
      return allMovements.filter((m) => m.articleId === articleId);
    } catch (error) {
      console.error("Failed to fetch article movements:", error);
      throw new Error(
        error.response?.data?.detail ||
          "Erreur lors du chargement des mouvements"
      );
    }
  },
};

export default mouvementsService;
