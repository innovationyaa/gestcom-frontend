import axios from "axios";

/**
 * Articles service - Direct backend integration
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
 * Normalize backend response to match frontend expectations
 * Backend uses: quantite_actuelle, prix_achat, prix_vente, seuil_minimum, fournisseur_id
 * Frontend uses: quantiteActuelle, prixAchat, prixVente, seuilMinimum, fournisseurId
 */
const normalizeArticle = (article) => ({
  id: article.id,
  reference: article.reference,
  nom: article.nom,
  description: article.description || "",
  quantiteActuelle: article.quantite_actuelle,
  prixAchat: parseFloat(article.prix_achat),
  prixVente: parseFloat(article.prix_vente),
  seuilMinimum: article.seuil_minimum,
  image: article.image,
  fournisseur: article.fournisseur || null, // Full fournisseur object
  fournisseurId: article.fournisseur?.id || null,
  dateCreation: article.date_creation,
});

/**
 * Convert frontend format to backend format
 */
const denormalizeArticle = (article) => {
  const payload = {
    reference: article.reference,
    nom: article.nom,
    description: article.description || "",
    quantite_actuelle: article.quantiteActuelle || 0,
    prix_achat: article.prixAchat,
    prix_vente: article.prixVente,
    seuil_minimum: article.seuilMinimum || 0,
  };

  // Only add fournisseur_id if it exists
  if (article.fournisseurId) {
    payload.fournisseur_id = article.fournisseurId;
  }

  return payload;
};

const articlesService = {
  /**
   * Get all articles
   * GET /api/stock/articles/
   */
  getAll: async () => {
    try {
      const response = await directApi.get("/stock/articles/");
      // Handle paginated and non-paginated responses
      const articles = Array.isArray(response.data)
        ? response.data
        : response.data.results || [];
      return articles.map(normalizeArticle);
    } catch (error) {
      console.error("Failed to fetch articles:", error);
      throw new Error(
        error.response?.data?.detail || "Erreur lors du chargement des articles"
      );
    }
  },

  /**
   * Get single article by ID
   * GET /api/stock/articles/{id}/
   */
  getById: async (id) => {
    try {
      const response = await directApi.get(`/stock/articles/${id}/`);
      return normalizeArticle(response.data);
    } catch (error) {
      console.error("Failed to fetch article:", error);
      if (error.response?.status === 404) {
        throw new Error("Article non trouvé");
      }
      throw new Error(
        error.response?.data?.detail || "Erreur lors du chargement de l'article"
      );
    }
  },
  /**
   * Create new article
   * POST /api/stock/articles/
   */
  create: async (payload) => {
    try {
      const response = await directApi.post(
        "/stock/articles/",
        denormalizeArticle(payload)
      );
      return normalizeArticle(response.data);
    } catch (error) {
      console.error("Failed to create article:", error);
      if (error.response?.status === 400) {
        const errors = error.response.data;

        // Field name translations
        const fieldTranslations = {
          reference: "Référence",
          nom: "Nom",
          description: "Description",
          quantite_actuelle: "Quantité actuelle",
          prix_achat: "Prix d'achat",
          prix_vente: "Prix de vente",
          seuil_minimum: "Seuil minimum",
          fournisseur_id: "Fournisseur",
        };

        const errorMessages = Object.entries(errors)
          .map(([field, messages]) => {
            const translatedField = fieldTranslations[field] || field;
            const messageText = Array.isArray(messages)
              ? messages.join(", ")
              : messages;
            // Translate common error messages
            const translatedMessage = messageText
              .replace(
                "article with this reference already exists.",
                "Un article avec cette référence existe déjà."
              )
              .replace("This field is required.", "Ce champ est requis.")
              .replace(
                "This field may not be blank.",
                "Ce champ ne peut pas être vide."
              );
            return `${translatedField}: ${translatedMessage}`;
          })
          .join("; ");
        throw new Error(errorMessages || "Données invalides");
      }
      throw new Error(
        error.response?.data?.detail ||
          "Erreur lors de la création de l'article"
      );
    }
  },
  /**
   * Update article (complete)
   * PUT /api/stock/articles/{id}/
   */
  update: async (id, payload) => {
    try {
      const response = await directApi.put(
        `/stock/articles/${id}/`,
        denormalizeArticle(payload)
      );
      return normalizeArticle(response.data);
    } catch (error) {
      console.error("Failed to update article:", error);
      if (error.response?.status === 404) {
        throw new Error("Article non trouvé");
      }
      if (error.response?.status === 400) {
        const errors = error.response.data;

        // Field name translations
        const fieldTranslations = {
          reference: "Référence",
          nom: "Nom",
          description: "Description",
          quantite_actuelle: "Quantité actuelle",
          prix_achat: "Prix d'achat",
          prix_vente: "Prix de vente",
          seuil_minimum: "Seuil minimum",
          fournisseur_id: "Fournisseur",
        };

        const errorMessages = Object.entries(errors)
          .map(([field, messages]) => {
            const translatedField = fieldTranslations[field] || field;
            const messageText = Array.isArray(messages)
              ? messages.join(", ")
              : messages;
            // Translate common error messages
            const translatedMessage = messageText
              .replace(
                "article with this reference already exists.",
                "Un article avec cette référence existe déjà."
              )
              .replace("This field is required.", "Ce champ est requis.")
              .replace(
                "This field may not be blank.",
                "Ce champ ne peut pas être vide."
              );
            return `${translatedField}: ${translatedMessage}`;
          })
          .join("; ");
        throw new Error(errorMessages || "Données invalides");
      }
      throw new Error(
        error.response?.data?.detail ||
          "Erreur lors de la mise à jour de l'article"
      );
    }
  },

  /**
   * Partial update article
   * PATCH /api/stock/articles/{id}/
   */
  partialUpdate: async (id, payload) => {
    try {
      const response = await directApi.patch(
        `/stock/articles/${id}/`,
        denormalizeArticle(payload)
      );
      return normalizeArticle(response.data);
    } catch (error) {
      console.error("Failed to update article:", error);
      if (error.response?.status === 404) {
        throw new Error("Article non trouvé");
      }
      if (error.response?.status === 400) {
        const errors = error.response.data;

        // Field name translations
        const fieldTranslations = {
          reference: "Référence",
          nom: "Nom",
          description: "Description",
          quantite_actuelle: "Quantité actuelle",
          prix_achat: "Prix d'achat",
          prix_vente: "Prix de vente",
          seuil_minimum: "Seuil minimum",
          fournisseur_id: "Fournisseur",
        };

        const errorMessages = Object.entries(errors)
          .map(([field, messages]) => {
            const translatedField = fieldTranslations[field] || field;
            const messageText = Array.isArray(messages)
              ? messages.join(", ")
              : messages;
            // Translate common error messages
            const translatedMessage = messageText
              .replace(
                "article with this reference already exists.",
                "Un article avec cette référence existe déjà."
              )
              .replace("This field is required.", "Ce champ est requis.")
              .replace(
                "This field may not be blank.",
                "Ce champ ne peut pas être vide."
              );
            return `${translatedField}: ${translatedMessage}`;
          })
          .join("; ");
        throw new Error(errorMessages || "Données invalides");
      }
      throw new Error(
        error.response?.data?.detail ||
          "Erreur lors de la mise à jour de l'article"
      );
    }
  },

  /**
   * Delete article
   * DELETE /api/stock/articles/{id}/
   */
  delete: async (id) => {
    try {
      await directApi.delete(`/stock/articles/${id}/`);
      return true;
    } catch (error) {
      console.error("Failed to delete article:", error);
      if (error.response?.status === 404) {
        throw new Error("Article non trouvé");
      }
      throw new Error(
        error.response?.data?.detail ||
          "Erreur lors de la suppression de l'article"
      );
    }
  },

  /**
   * Upload image for article
   * POST /api/stock/articles/{id}/upload-image/ (if endpoint exists)
   */
  uploadImage: async (id, imageFile) => {
    try {
      const formData = new FormData();
      formData.append("image", imageFile);

      const response = await directApi.patch(
        `/stock/articles/${id}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return normalizeArticle(response.data);
    } catch (error) {
      console.error("Failed to upload image:", error);
      throw new Error(
        error.response?.data?.detail ||
          "Erreur lors du téléchargement de l'image"
      );
    }
  },
};

export default articlesService;
