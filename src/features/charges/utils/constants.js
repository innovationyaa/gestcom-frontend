// filepath: src/features/charges/utils/constants.js

// Sort options
export const CHARGES_SORT_OPTIONS = [
  { value: "date_desc", label: "Date ↓" },
  { value: "date_asc", label: "Date ↑" },
  { value: "amount_desc", label: "Montant ↓" },
  { value: "amount_asc", label: "Montant ↑" },
];

// Status options
export const CHARGE_STATUS = {
  EN_ATTENTE: "en_attente",
  PAYEE: "payee",
  ANNULEE: "annulee",
};

export const CHARGE_STATUS_LABELS = {
  en_attente: "En attente",
  payee: "Payée",
  annulee: "Annulée",
};

export const CHARGE_STATUS_COLORS = {
  en_attente: "orange",
  payee: "green",
  annulee: "red",
};

// Types de charges salariales
export const CHARGE_SALARIALE_TYPES = [
  { value: "salaire", label: "Salaire" },
  { value: "cnss", label: "CNSS" },
  { value: "prime", label: "Prime" },
  { value: "mutuelle", label: "Mutuelle" },
  { value: "formation", label: "Formation" },
  { value: "autre", label: "Autre" },
];

// Types de charges fixes
export const CHARGE_FIXE_TYPES = [
  { value: "loyer", label: "Loyer" },
  { value: "electricite", label: "Électricité" },
  { value: "eau", label: "Eau" },
  { value: "telecom", label: "Internet & Téléphonie" },
  { value: "assurance", label: "Assurance" },
  { value: "entretien", label: "Entretien" },
  { value: "autre", label: "Autre" },
];

// Recurrence options
export const RECURRENCE_OPTIONS = [
  { value: "mensuelle", label: "Mensuelle" },
  { value: "trimestrielle", label: "Trimestrielle" },
  { value: "semestrielle", label: "Semestrielle" },
  { value: "annuelle", label: "Annuelle" },
  { value: "ponctuelle", label: "Ponctuelle" },
];

// TVA rates
export const TVA_RATES = [
  { value: "0", label: "0%" },
  { value: "7", label: "7%" },
  { value: "10", label: "10%" },
  { value: "14", label: "14%" },
  { value: "20", label: "20%" },
];

// Categories for charges fournisseurs
export const CHARGE_FOURNISSEUR_CATEGORIES = [
  "Services informatiques",
  "Entretien et réparations",
  "Fournitures",
  "Transport et logistique",
  "Services professionnels",
  "Marketing et publicité",
  "Équipement et mobilier",
  "Autre",
];

// Payment modes
export const PAYMENT_MODES = [
  { value: "especes", label: "Espèces" },
  { value: "cheque", label: "Chèque" },
  { value: "virement", label: "Virement" },
  { value: "prelevement", label: "Prélèvement" },
  { value: "carte", label: "Carte bancaire" },
  { value: "autre", label: "Autre" },
];
