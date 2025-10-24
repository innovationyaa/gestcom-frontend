import { useState, useEffect } from "react";
import articlesService from "@/services/articlesService";

/**
 * Hook for managing articles with real backend integration
 */
export function useArticles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all articles
  const fetchArticles = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await articlesService.getAll();
      setArticles(data);
      return { success: true, data };
    } catch (err) {
      setError(err.message || "Failed to fetch articles");
      console.error("Error fetching articles:", err);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Fetch on mount
  useEffect(() => {
    fetchArticles();
  }, []);

  // Add new article
  const addArticle = async (payload) => {
    try {
      const newArticle = await articlesService.create(payload);
      setArticles([newArticle, ...articles]); // Add to top of list
      return { success: true, data: newArticle };
    } catch (err) {
      const errorMessage = err.message || "Failed to add article";
      setError(errorMessage);
      console.error("Error adding article:", err);
      return { success: false, error: errorMessage };
    }
  };

  // Update existing article
  const updateArticle = async (id, payload) => {
    try {
      const updated = await articlesService.update(id, payload);
      setArticles(articles.map((a) => (a.id === id ? updated : a)));
      return { success: true, data: updated };
    } catch (err) {
      const errorMessage = err.message || "Failed to update article";
      setError(errorMessage);
      console.error("Error updating article:", err);
      return { success: false, error: errorMessage };
    }
  };

  // Partial update (PATCH)
  const partialUpdateArticle = async (id, payload) => {
    try {
      const updated = await articlesService.partialUpdate(id, payload);
      setArticles(articles.map((a) => (a.id === id ? updated : a)));
      return { success: true, data: updated };
    } catch (err) {
      const errorMessage = err.message || "Failed to update article";
      setError(errorMessage);
      console.error("Error updating article:", err);
      return { success: false, error: errorMessage };
    }
  };

  // Delete article
  const deleteArticle = async (id) => {
    try {
      await articlesService.delete(id);
      setArticles(articles.filter((a) => a.id !== id));
      return { success: true };
    } catch (err) {
      const errorMessage = err.message || "Failed to delete article";
      setError(errorMessage);
      console.error("Error deleting article:", err);
      return { success: false, error: errorMessage };
    }
  };

  // Upload image
  const uploadImage = async (id, imageFile) => {
    try {
      const updated = await articlesService.uploadImage(id, imageFile);
      setArticles(articles.map((a) => (a.id === id ? updated : a)));
      return { success: true, data: updated };
    } catch (err) {
      const errorMessage = err.message || "Failed to upload image";
      setError(errorMessage);
      console.error("Error uploading image:", err);
      return { success: false, error: errorMessage };
    }
  };

  // Get single article
  const getArticleById = async (id) => {
    try {
      const article = await articlesService.getById(id);
      return { success: true, data: article };
    } catch (err) {
      const errorMessage = err.message || "Failed to fetch article";
      setError(errorMessage);
      console.error("Error fetching article:", err);
      return { success: false, error: errorMessage };
    }
  };

  return {
    articles,
    loading,
    error,
    fetchArticles,
    addArticle,
    updateArticle,
    partialUpdateArticle,
    deleteArticle,
    uploadImage,
    getArticleById,
  };
}
