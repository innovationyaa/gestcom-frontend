import { VALIDATION_RULES } from "./constants";

/**
 * Format currency amount to French locale
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(amount);
};

/**
 * Format phone number for display
 */
export const formatPhoneNumber = (phone) => {
  if (!phone) return "";

  // Remove all non-digit characters except +
  const cleaned = phone.replace(/[^\d+]/g, "");

  // French mobile format: +33 6 XX XX XX XX
  if (cleaned.startsWith("+33")) {
    const number = cleaned.slice(3);
    if (number.length === 9) {
      return `+33 ${number.slice(0, 1)} ${number.slice(1, 3)} ${number.slice(3, 5)} ${number.slice(5, 7)} ${number.slice(7, 9)}`;
    }
  }

  // French landline format: +33 1 XX XX XX XX
  if (cleaned.startsWith("+33")) {
    const number = cleaned.slice(3);
    if (number.length === 9) {
      return `+33 ${number.slice(0, 1)} ${number.slice(1, 3)} ${number.slice(3, 5)} ${number.slice(5, 7)} ${number.slice(7, 9)}`;
    }
  }

  return phone;
};

/**
 * Validate email format
 */
export const isValidEmail = (email) => {
  return VALIDATION_RULES.EMAIL_REGEX.test(email);
};

/**
 * Validate SIRET format
 */
export const isValidSiret = (siret) => {
  if (!siret) return true; // SIRET is optional for some types
  return VALIDATION_RULES.SIRET_REGEX.test(siret.replace(/\s/g, ""));
};

/**
 * Validate URL format
 */
export const isValidUrl = (url) => {
  if (!url) return true; // URL is optional
  return VALIDATION_RULES.URL_REGEX.test(url);
};

/**
 * Search fournisseurs by query
 */
export const searchFournisseurs = (fournisseurs, query) => {
  if (!query.trim()) return fournisseurs;

  const lowerQuery = query.toLowerCase();

  return fournisseurs.filter(
    (fournisseur) =>
      fournisseur.nom.toLowerCase().includes(lowerQuery) ||
      fournisseur.email?.toLowerCase().includes(lowerQuery) ||
      fournisseur.telephone?.includes(lowerQuery) ||
      fournisseur.ville?.toLowerCase().includes(lowerQuery) ||
      fournisseur.adresse?.toLowerCase().includes(lowerQuery)
  );
};

/**
 * Filter fournisseurs by status
 */
export const filterByStatus = (fournisseurs, status) => {
  if (status === "all") return fournisseurs;
  return fournisseurs.filter((fournisseur) => fournisseur.statut === status);
};

/**
 * Filter fournisseurs by type
 */
export const filterByType = (fournisseurs, type) => {
  if (type === "all") return fournisseurs;
  return fournisseurs.filter((fournisseur) => fournisseur.type === type);
};

/**
 * Sort fournisseurs by field
 */
export const sortFournisseurs = (fournisseurs, field, direction = "asc") => {
  return [...fournisseurs].sort((a, b) => {
    let aValue = a[field];
    let bValue = b[field];

    // Handle null/undefined values
    if (aValue == null) aValue = "";
    if (bValue == null) bValue = "";

    // Convert to strings for comparison
    aValue = aValue.toString().toLowerCase();
    bValue = bValue.toString().toLowerCase();

    if (direction === "asc") {
      return aValue.localeCompare(bValue, "fr");
    } else {
      return bValue.localeCompare(aValue, "fr");
    }
  });
};

/**
 * Get fournisseur display name
 */
export const getFournisseurDisplayName = (fournisseur) => {
  return fournisseur.nom || "Fournisseur sans nom";
};

/**
 * Get fournisseur full address
 */
export const getFournisseurFullAddress = (fournisseur) => {
  const parts = [
    fournisseur.adresse,
    fournisseur.codePostal,
    fournisseur.ville,
    fournisseur.pays,
  ].filter(Boolean);

  return parts.join(", ");
};

/**
 * Calculate days since last order
 */
export const getDaysSinceLastOrder = (derniereCommande) => {
  if (!derniereCommande) return null;

  const lastOrder = new Date(derniereCommande);
  const today = new Date();
  const diffTime = Math.abs(today - lastOrder);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
};

/**
 * Get fournisseur status color
 */
export const getStatusColor = (statut) => {
  switch (statut) {
    case "actif":
      return "text-green-600 bg-green-50 border-green-200";
    case "inactif":
      return "text-orange-600 bg-orange-50 border-orange-200";
    case "suspendu":
      return "text-red-600 bg-red-50 border-red-200";
    default:
      return "text-gray-600 bg-gray-50 border-gray-200";
  }
};

/**
 * Get type color
 */
export const getTypeColor = (type) => {
  switch (type) {
    case "entreprise":
      return "text-blue-600 bg-blue-50 border-blue-200";
    case "particulier":
      return "text-green-600 bg-green-50 border-green-200";
    case "association":
      return "text-purple-600 bg-purple-50 border-purple-200";
    default:
      return "text-gray-600 bg-gray-50 border-gray-200";
  }
};
