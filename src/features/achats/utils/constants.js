// Reception Status Constants
export const RECEPTION_STATUS = {
  VALIDATED: "validé",
  PENDING: "en attente",
  CANCELLED: "annulé",
};

// Sort Options
export const SORT_OPTIONS = [
  { value: "blNumber", label: "N° BL" },
  { value: "date", label: "Date" },
  { value: "fournisseur", label: "Fournisseur" },
  { value: "totalTTC", label: "Montant" },
];

// Invoice Payment Status
export const INVOICE_STATUS = {
  PAID: "payée",
  PENDING: "en attente",
  OVERDUE: "en retard",
  PARTIAL: "partielle",
};

// Invoice sort options
export const INVOICE_SORT_OPTIONS = [
  { value: "invoiceNumber", label: "N° Facture" },
  { value: "date", label: "Date" },
  { value: "fournisseur", label: "Fournisseur" },
  { value: "totalTTC", label: "Montant" },
  { value: "dueDate", label: "Échéance" },
  { value: "status", label: "Statut" },
];

// Payment Methods
export const PAYMENT_METHODS = {
  VIREMENT: "Virement",
  CHEQUE: "Chèque",
  ESPECES: "Espèces",
  CARTE: "Carte",
};

// Avoir (Credit Notes) Status
export const AVOIR_STATUS = {
  VALIDATED: "validé",
  PENDING: "en attente",
  CANCELLED: "annulé",
};

// Avoir sort options
export const AVOIR_SORT_OPTIONS = [
  { value: "avoirNumber", label: "N° Avoir" },
  { value: "date", label: "Date" },
  { value: "fournisseur", label: "Fournisseur" },
  { value: "amount", label: "Montant" },
  { value: "linkedInvoiceNumber", label: "Facture liée" },
  { value: "reason", label: "Motif" },
  { value: "status", label: "Statut" },
];

// Common Avoir Reasons
export const AVOIR_REASONS = [
  "Articles défectueux",
  "Erreur de facturation",
  "Retour partiel",
  "Retour total",
  "Remise commerciale",
];

// TVA Rates
export const TVA_RATES = [0, 7, 10, 14, 20];

// Default Pagination
export const DEFAULT_PAGE_SIZE = 25;
export const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];
