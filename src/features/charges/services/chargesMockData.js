// filepath: src/features/charges/services/chargesMockData.js
/**
 * Unified Mock Data Source for Charges Feature
 * - Provides mock data for all charge types (Fournisseurs, Salariales, Fixes)
 * - Environment-driven toggle via VITE_USE_MOCK_CHARGES
 * - Realistic datasets with diverse scenarios for testing
 * - API-ready structure matching backend data models
 */

// =============================================================================
// ENVIRONMENT TOGGLE
// =============================================================================

export const CHARGES_USE_MOCK =
  (typeof import.meta !== "undefined" &&
    import.meta.env &&
    (import.meta.env.VITE_USE_MOCK_CHARGES === "true" ||
      import.meta.env.DEV)) ||
  false;

// =============================================================================
// CHARGES FOURNISSEURS (Supplier Charges)
// =============================================================================

export const mockChargesFournisseurs = [
  {
    id: "CF-001",
    date: "2025-01-15",
    fournisseur: "Tech Solutions SARL",
    libelle: "Maintenance serveurs janvier",
    montantHT: 12000,
    tva: 20,
    montantTVA: 2400,
    montantTTC: 14400,
    status: "payee",
    datePayment: "2025-01-20",
    modePayment: "virement",
    reference: "MAINT-2025-001",
    notes: "Maintenance mensuelle des serveurs d'entreprise",
    categorie: "Services informatiques",
  },
  {
    id: "CF-002",
    date: "2025-01-10",
    fournisseur: "Electro Services",
    libelle: "Réparation équipement bureau",
    montantHT: 4500,
    tva: 20,
    montantTVA: 900,
    montantTTC: 5400,
    status: "en_attente",
    reference: "REP-2025-014",
    notes: "Réparation photocopieuse et imprimantes",
    categorie: "Entretien et réparations",
  },
  {
    id: "CF-003",
    date: "2025-01-08",
    fournisseur: "Office Supplies Co",
    libelle: "Fournitures de bureau T1",
    montantHT: 3200,
    tva: 20,
    montantTVA: 640,
    montantTTC: 3840,
    status: "payee",
    datePayment: "2025-01-12",
    modePayment: "cheque",
    reference: "FS-2025-001",
    notes: "Commande trimestrielle fournitures",
    categorie: "Fournitures",
  },
  {
    id: "CF-004",
    date: "2025-01-05",
    fournisseur: "Cloud Services Pro",
    libelle: "Hébergement cloud janvier",
    montantHT: 8000,
    tva: 20,
    montantTVA: 1600,
    montantTTC: 9600,
    status: "payee",
    datePayment: "2025-01-05",
    modePayment: "prelevement",
    reference: "CLOUD-2025-01",
    notes: "Abonnement mensuel cloud infrastructure",
    categorie: "Services informatiques",
  },
  {
    id: "CF-005",
    date: "2025-01-03",
    fournisseur: "Transport Express",
    libelle: "Transport marchandises",
    montantHT: 2500,
    tva: 14,
    montantTVA: 350,
    montantTTC: 2850,
    status: "en_attente",
    reference: "TRP-2025-023",
    notes: "Livraison matériel de Casablanca",
    categorie: "Transport et logistique",
  },
  {
    id: "CF-006",
    date: "2024-12-28",
    fournisseur: "Consulting Partners",
    libelle: "Audit comptable décembre",
    montantHT: 15000,
    tva: 20,
    montantTVA: 3000,
    montantTTC: 18000,
    status: "payee",
    datePayment: "2025-01-02",
    modePayment: "virement",
    reference: "AUD-2024-12",
    notes: "Audit annuel exercice 2024",
    categorie: "Services professionnels",
  },
  {
    id: "CF-007",
    date: "2024-12-20",
    fournisseur: "Marketing Agency",
    libelle: "Campagne publicitaire Q4",
    montantHT: 25000,
    tva: 20,
    montantTVA: 5000,
    montantTTC: 30000,
    status: "payee",
    datePayment: "2024-12-30",
    modePayment: "virement",
    reference: "PUB-2024-Q4",
    notes: "Campagne digitale + print",
    categorie: "Marketing et publicité",
  },
  {
    id: "CF-008",
    date: "2024-12-15",
    fournisseur: "Office Furniture Ltd",
    libelle: "Mobilier bureau étage 2",
    montantHT: 18000,
    tva: 20,
    montantTVA: 3600,
    montantTTC: 21600,
    status: "en_attente",
    reference: "MOB-2024-018",
    notes: "10 bureaux + chaises ergonomiques",
    categorie: "Équipement et mobilier",
  },
];

// =============================================================================
// CHARGES SALARIALES (Payroll Charges)
// =============================================================================

export const mockChargesSalariales = [
  {
    id: "CS-001",
    date: "2025-01-25",
    libelle: "Salaires janvier 2025",
    type: "salaire",
    montant: 125000,
    nbrEmployes: 15,
    status: "payee",
    datePayment: "2025-01-25",
    modePayment: "virement",
    notes: "Salaires mensuels + primes performance",
    periode: "2025-01",
  },
  {
    id: "CS-002",
    date: "2025-01-25",
    libelle: "CNSS janvier 2025",
    type: "cnss",
    montant: 28750,
    taux: 23,
    assiette: 125000,
    status: "payee",
    datePayment: "2025-01-28",
    modePayment: "virement",
    reference: "CNSS-2025-01",
    notes: "Cotisations patronales 23% sur masse salariale",
    periode: "2025-01",
  },
  {
    id: "CS-003",
    date: "2025-01-15",
    libelle: "Prime Aïd janvier",
    type: "prime",
    montant: 15000,
    nbrBeneficiaires: 12,
    status: "payee",
    datePayment: "2025-01-15",
    modePayment: "especes",
    notes: "Prime exceptionnelle Aïd Al Mawlid",
    periode: "2025-01",
  },
  {
    id: "CS-004",
    date: "2025-01-10",
    libelle: "Mutuelle santé janvier",
    type: "mutuelle",
    montant: 4500,
    nbrEmployes: 15,
    status: "payee",
    datePayment: "2025-01-10",
    modePayment: "prelevement",
    reference: "MUT-2025-01",
    notes: "Cotisation mensuelle mutuelle collective",
    periode: "2025-01",
  },
  {
    id: "CS-005",
    date: "2024-12-28",
    libelle: "Salaires décembre 2024",
    type: "salaire",
    montant: 135000,
    nbrEmployes: 15,
    status: "payee",
    datePayment: "2024-12-28",
    modePayment: "virement",
    notes: "Salaires + prime fin année",
    periode: "2024-12",
  },
  {
    id: "CS-006",
    date: "2024-12-28",
    libelle: "CNSS décembre 2024",
    type: "cnss",
    montant: 31050,
    taux: 23,
    assiette: 135000,
    status: "payee",
    datePayment: "2025-01-05",
    modePayment: "virement",
    reference: "CNSS-2024-12",
    notes: "Cotisations patronales décembre",
    periode: "2024-12",
  },
  {
    id: "CS-007",
    date: "2024-12-20",
    libelle: "Prime rendement Q4",
    type: "prime",
    montant: 22000,
    nbrBeneficiaires: 10,
    status: "payee",
    datePayment: "2024-12-20",
    modePayment: "virement",
    notes: "Primes basées sur objectifs trimestriels",
    periode: "2024-Q4",
  },
  {
    id: "CS-008",
    date: "2024-12-15",
    libelle: "Formation employés",
    type: "formation",
    montant: 8000,
    nbrBeneficiaires: 8,
    status: "payee",
    datePayment: "2024-12-18",
    modePayment: "cheque",
    notes: "Formation Excel avancé et gestion de projet",
    periode: "2024-12",
  },
];

// =============================================================================
// CHARGES FIXES (Fixed Costs)
// =============================================================================

export const mockChargesFixes = [
  {
    id: "CX-001",
    date: "2025-01-05",
    libelle: "Loyer bureaux janvier",
    type: "loyer",
    montant: 35000,
    status: "payee",
    datePayment: "2025-01-05",
    modePayment: "virement",
    beneficiaire: "Immobilière Al Massira",
    reference: "LOY-2025-01",
    notes: "Loyer mensuel locaux 500m²",
    periode: "2025-01",
    recurrence: "mensuelle",
  },
  {
    id: "CX-002",
    date: "2025-01-10",
    libelle: "Électricité janvier",
    type: "electricite",
    montant: 4200,
    status: "payee",
    datePayment: "2025-01-12",
    modePayment: "prelevement",
    beneficiaire: "LYDEC",
    reference: "ELEC-2025-01",
    notes: "Facture électricité + redevance",
    periode: "2025-01",
    recurrence: "mensuelle",
  },
  {
    id: "CX-003",
    date: "2025-01-08",
    libelle: "Eau janvier",
    type: "eau",
    montant: 850,
    status: "payee",
    datePayment: "2025-01-10",
    modePayment: "prelevement",
    beneficiaire: "LYDEC",
    reference: "EAU-2025-01",
    notes: "Consommation eau potable",
    periode: "2025-01",
    recurrence: "mensuelle",
  },
  {
    id: "CX-004",
    date: "2025-01-05",
    libelle: "Internet & Téléphonie janvier",
    type: "telecom",
    montant: 2500,
    status: "payee",
    datePayment: "2025-01-05",
    modePayment: "prelevement",
    beneficiaire: "Maroc Telecom",
    reference: "TEL-2025-01",
    notes: "Fibre pro 500Mb + 5 lignes fixes",
    periode: "2025-01",
    recurrence: "mensuelle",
  },
  {
    id: "CX-005",
    date: "2025-01-03",
    libelle: "Assurance locaux janvier",
    type: "assurance",
    montant: 1800,
    status: "payee",
    datePayment: "2025-01-03",
    modePayment: "prelevement",
    beneficiaire: "Wafa Assurance",
    reference: "ASS-2025-01",
    notes: "Multirisque professionnelle mensuelle",
    periode: "2025-01",
    recurrence: "mensuelle",
  },
  {
    id: "CX-006",
    date: "2024-12-05",
    libelle: "Loyer bureaux décembre",
    type: "loyer",
    montant: 35000,
    status: "payee",
    datePayment: "2024-12-05",
    modePayment: "virement",
    beneficiaire: "Immobilière Al Massira",
    reference: "LOY-2024-12",
    notes: "Loyer mensuel décembre",
    periode: "2024-12",
    recurrence: "mensuelle",
  },
  {
    id: "CX-007",
    date: "2024-12-10",
    libelle: "Électricité décembre",
    type: "electricite",
    montant: 5100,
    status: "payee",
    datePayment: "2024-12-15",
    modePayment: "prelevement",
    beneficiaire: "LYDEC",
    reference: "ELEC-2024-12",
    notes: "Facture électricité + chauffage hiver",
    periode: "2024-12",
    recurrence: "mensuelle",
  },
  {
    id: "CX-008",
    date: "2024-12-20",
    libelle: "Entretien et nettoyage décembre",
    type: "entretien",
    montant: 3000,
    status: "payee",
    datePayment: "2024-12-22",
    modePayment: "cheque",
    beneficiaire: "Clean Pro Services",
    reference: "ENT-2024-12",
    notes: "Nettoyage bureaux quotidien",
    periode: "2024-12",
    recurrence: "mensuelle",
  },
];

// =============================================================================
// CALCULATION HELPERS
// =============================================================================

/**
 * Calculate Charges Fournisseurs statistics
 */
export const calculateChargesFournisseursStats = (charges) => {
  const totalHT = charges.reduce((sum, c) => sum + (c.montantHT || 0), 0);
  const totalTVA = charges.reduce((sum, c) => sum + (c.montantTVA || 0), 0);
  const totalTTC = charges.reduce((sum, c) => sum + (c.montantTTC || 0), 0);
  const payees = charges.filter((c) => c.status === "payee").length;
  const enAttente = charges.filter((c) => c.status === "en_attente").length;

  return {
    totalHT,
    totalTVA,
    totalTTC,
    payees,
    enAttente,
    total: charges.length,
  };
};

/**
 * Calculate Charges Salariales statistics
 */
export const calculateChargesSalarialesStats = (charges) => {
  const total = charges.reduce((sum, c) => sum + (c.montant || 0), 0);
  const salaires = charges
    .filter((c) => c.type === "salaire")
    .reduce((sum, c) => sum + (c.montant || 0), 0);
  const cnss = charges
    .filter((c) => c.type === "cnss")
    .reduce((sum, c) => sum + (c.montant || 0), 0);
  const primes = charges
    .filter((c) => c.type === "prime")
    .reduce((sum, c) => sum + (c.montant || 0), 0);
  const payees = charges.filter((c) => c.status === "payee").length;

  return {
    total,
    salaires,
    cnss,
    primes,
    payees,
    count: charges.length,
  };
};

/**
 * Calculate Charges Fixes statistics
 */
export const calculateChargesFixesStats = (charges) => {
  const total = charges.reduce((sum, c) => sum + (c.montant || 0), 0);
  const loyer = charges
    .filter((c) => c.type === "loyer")
    .reduce((sum, c) => sum + (c.montant || 0), 0);
  const utilities = charges
    .filter((c) => ["electricite", "eau", "telecom"].includes(c.type))
    .reduce((sum, c) => sum + (c.montant || 0), 0);
  const autres = charges
    .filter((c) => !["loyer", "electricite", "eau", "telecom"].includes(c.type))
    .reduce((sum, c) => sum + (c.montant || 0), 0);
  const payees = charges.filter((c) => c.status === "payee").length;

  return {
    total,
    loyer,
    utilities,
    autres,
    payees,
    count: charges.length,
  };
};

/**
 * Calculate overall Charges Aperçu statistics
 */
export const calculateChargesApercuStats = () => {
  const fournisseursStats = calculateChargesFournisseursStats(
    mockChargesFournisseurs
  );
  const salarialesStats = calculateChargesSalarialesStats(
    mockChargesSalariales
  );
  const fixesStats = calculateChargesFixesStats(mockChargesFixes);

  const totalCharges =
    fournisseursStats.totalTTC + salarialesStats.total + fixesStats.total;

  return {
    totalCharges,
    fournisseurs: fournisseursStats.totalTTC,
    salariales: salarialesStats.total,
    fixes: fixesStats.total,
    countFournisseurs: fournisseursStats.total,
    countSalariales: salarialesStats.count,
    countFixes: fixesStats.count,
  };
};

// =============================================================================
// ID GENERATORS
// =============================================================================

export const generateNewChargeFournisseurId = () => {
  const maxId = mockChargesFournisseurs.reduce((max, c) => {
    const num = parseInt(c.id.split("-")[1]);
    return num > max ? num : max;
  }, 0);
  return `CF-${String(maxId + 1).padStart(3, "0")}`;
};

export const generateNewChargeSalarialeId = () => {
  const maxId = mockChargesSalariales.reduce((max, c) => {
    const num = parseInt(c.id.split("-")[1]);
    return num > max ? num : max;
  }, 0);
  return `CS-${String(maxId + 1).padStart(3, "0")}`;
};

export const generateNewChargeFixeId = () => {
  const maxId = mockChargesFixes.reduce((max, c) => {
    const num = parseInt(c.id.split("-")[1]);
    return num > max ? num : max;
  }, 0);
  return `CX-${String(maxId + 1).padStart(3, "0")}`;
};

// =============================================================================
// FILTERING & SORTING
// =============================================================================

export const filterCharges = (charges, filters) => {
  let filtered = [...charges];

  // Search filter
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(
      (c) =>
        c.libelle?.toLowerCase().includes(searchLower) ||
        c.fournisseur?.toLowerCase().includes(searchLower) ||
        c.beneficiaire?.toLowerCase().includes(searchLower) ||
        c.reference?.toLowerCase().includes(searchLower) ||
        c.notes?.toLowerCase().includes(searchLower)
    );
  }

  // Status filter
  if (filters.status && filters.status !== "all") {
    filtered = filtered.filter((c) => c.status === filters.status);
  }

  // Type filter (for salariales and fixes)
  if (filters.type && filters.type !== "all") {
    filtered = filtered.filter((c) => c.type === filters.type);
  }

  // Date range filter
  if (filters.dateFrom) {
    filtered = filtered.filter((c) => c.date >= filters.dateFrom);
  }
  if (filters.dateTo) {
    filtered = filtered.filter((c) => c.date <= filters.dateTo);
  }

  return filtered;
};

export const sortCharges = (charges, sortBy) => {
  const sorted = [...charges];

  switch (sortBy) {
    case "date_desc":
      return sorted.sort((a, b) => b.date.localeCompare(a.date));
    case "date_asc":
      return sorted.sort((a, b) => a.date.localeCompare(b.date));
    case "amount_desc":
      return sorted.sort(
        (a, b) =>
          (b.montantTTC || b.montant || 0) - (a.montantTTC || a.montant || 0)
      );
    case "amount_asc":
      return sorted.sort(
        (a, b) =>
          (a.montantTTC || a.montant || 0) - (b.montantTTC || b.montant || 0)
      );
    default:
      return sorted;
  }
};

// =============================================================================
// TESTING HELPERS
// =============================================================================

export const testChargesData = {
  emptyFournisseur: {
    id: "CF-TEST-001",
    date: new Date().toISOString().split("T")[0],
    fournisseur: "",
    libelle: "Test charge without supplier",
    montantHT: 1000,
    tva: 20,
    montantTVA: 200,
    montantTTC: 1200,
    status: "en_attente",
  },
  largeSalariale: {
    id: "CS-TEST-001",
    date: new Date().toISOString().split("T")[0],
    libelle: "Test large payroll",
    type: "salaire",
    montant: 500000,
    nbrEmployes: 50,
    status: "en_attente",
  },
  futureFixe: {
    id: "CX-TEST-001",
    date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    libelle: "Test future fixed charge",
    type: "loyer",
    montant: 35000,
    status: "en_attente",
    recurrence: "mensuelle",
  },
};

export default {
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
  testChargesData,
};
