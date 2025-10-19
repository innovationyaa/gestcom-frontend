import { format } from "date-fns";
import { fr } from "date-fns/locale";

export const formatDate = (dateString) => {
  if (!dateString) return "";
  try {
    return format(new Date(dateString), "dd/MM/yyyy", { locale: fr });
  } catch (error) {
    console.error("Erreur de formatage de date:", error);
    return dateString;
  }
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const calculateTotalHT = (articles) => {
  return articles.reduce(
    (sum, article) => sum + article.prixUnitaireHT * article.quantite,
    0
  );
};

export const calculateTVA = (articles) => {
  return articles.reduce((sum, article) => {
    const montantHT = article.prixUnitaireHT * article.quantite;
    return sum + montantHT * (article.tauxTVA / 100);
  }, 0);
};

export const calculateTotalTTC = (articles) => {
  return calculateTotalHT(articles) + calculateTVA(articles);
};

export const filterCommandes = (commandes, filters) => {
  return commandes.filter((commande) => {
    // Filtre par recherche
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      const matchesSearch =
        commande.id.toLowerCase().includes(searchTerm) ||
        commande.fournisseur.toLowerCase().includes(searchTerm) ||
        commande.articles.some((article) =>
          article.nom.toLowerCase().includes(searchTerm)
        );
      if (!matchesSearch) return false;
    }

    // Filtre par statut
    if (filters.statut && filters.statut !== "all") {
      if (commande.statut !== filters.statut) return false;
    }

    // Filtre par fournisseur
    if (filters.fournisseur) {
      const fournisseurTerm = filters.fournisseur.toLowerCase();
      if (!commande.fournisseur.toLowerCase().includes(fournisseurTerm)) {
        return false;
      }
    }

    // Filtre par date de début
    if (filters.dateDebut) {
      const commandeDate = new Date(commande.date);
      const dateDebut = new Date(filters.dateDebut);
      if (commandeDate < dateDebut) return false;
    }

    // Filtre par date de fin
    if (filters.dateFin) {
      const commandeDate = new Date(commande.date);
      const dateFin = new Date(filters.dateFin);
      if (commandeDate > dateFin) return false;
    }

    return true;
  });
};

export const sortCommandes = (commandes, sortConfig) => {
  if (!sortConfig.key) return commandes;

  return [...commandes].sort((a, b) => {
    let aValue = a[sortConfig.key];
    let bValue = b[sortConfig.key];

    // Gestion spéciale pour les dates
    if (sortConfig.key === "date") {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }

    // Gestion spéciale pour les montants
    if (sortConfig.key.includes("total") || sortConfig.key === "tva") {
      aValue = parseFloat(aValue) || 0;
      bValue = parseFloat(bValue) || 0;
    }

    // Gestion spéciale pour les strings
    if (typeof aValue === "string" && typeof bValue === "string") {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    if (aValue < bValue) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });
};

export const getCommandeStatusColor = (statut) => {
  switch (statut) {
    case "payé":
      return "text-green-600 bg-green-100";
    case "en attente":
      return "text-orange-600 bg-orange-100";
    case "annulé":
      return "text-red-600 bg-red-100";
    default:
      return "text-gray-600 bg-gray-100";
  }
};

export const validateCommandeData = (commandeData) => {
  const errors = {};

  if (!commandeData.fournisseur || commandeData.fournisseur.trim() === "") {
    errors.fournisseur = "Le fournisseur est requis";
  }

  if (!commandeData.date) {
    errors.date = "La date est requise";
  }

  if (!commandeData.articles || commandeData.articles.length === 0) {
    errors.articles = "Au moins un article est requis";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
