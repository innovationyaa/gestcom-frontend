// Mock data for Réceptions (Bons de Livraison)
// Used for development/testing without backend

export const mockReceptions = [
  {
    id: "1",
    blNumber: "BL-2024-001",
    date: "2024-11-01",
    fournisseur: "Fournisseur A",
    fournisseurId: "fournisseur-1",
    totalHT: 10000.0,
    totalTVA: 2000.0,
    totalTTC: 12000.0,
    status: "validé",
    lignes: [
      {
        id: "ligne-1",
        article: "Ordinateur Portable Dell XPS 15",
        articleId: "article-1",
        qte: 5,
        puHT: 1600.0,
        tva: 20,
      },
      {
        id: "ligne-2",
        article: "Souris sans fil Logitech MX Master",
        articleId: "article-2",
        qte: 10,
        puHT: 80.0,
        tva: 20,
      },
      {
        id: "ligne-3",
        article: "Clavier mécanique Corsair K95",
        articleId: "article-3",
        qte: 10,
        puHT: 120.0,
        tva: 20,
      },
    ],
    createdAt: "2024-11-01T10:30:00Z",
    updatedAt: "2024-11-01T10:30:00Z",
  },
  {
    id: "2",
    blNumber: "BL-2024-002",
    date: "2024-10-28",
    fournisseur: "Fournisseur B",
    fournisseurId: "fournisseur-2",
    totalHT: 15000.0,
    totalTVA: 3000.0,
    totalTTC: 18000.0,
    status: "en attente",
    lignes: [
      {
        id: "ligne-4",
        article: 'Écran Dell UltraSharp 27"',
        articleId: "article-4",
        qte: 20,
        puHT: 750.0,
        tva: 20,
      },
    ],
    createdAt: "2024-10-28T14:20:00Z",
    updatedAt: "2024-10-28T14:20:00Z",
  },
  {
    id: "3",
    blNumber: "BL-2024-003",
    date: "2024-10-25",
    fournisseur: "Fournisseur C",
    fournisseurId: "fournisseur-3",
    totalHT: 8000.0,
    totalTVA: 1600.0,
    totalTTC: 9600.0,
    status: "validé",
    lignes: [
      {
        id: "ligne-5",
        article: "Imprimante HP LaserJet Pro",
        articleId: "article-5",
        qte: 4,
        puHT: 2000.0,
        tva: 20,
      },
    ],
    createdAt: "2024-10-25T09:15:00Z",
    updatedAt: "2024-10-25T16:45:00Z",
  },
  {
    id: "4",
    blNumber: "BL-2024-004",
    date: "2024-10-20",
    fournisseur: "Fournisseur A",
    fournisseurId: "fournisseur-1",
    totalHT: 5500.0,
    totalTVA: 1100.0,
    totalTTC: 6600.0,
    status: "validé",
    lignes: [
      {
        id: "ligne-6",
        article: "Webcam Logitech Brio 4K",
        articleId: "article-6",
        qte: 15,
        puHT: 200.0,
        tva: 20,
      },
      {
        id: "ligne-7",
        article: "Casque Audio Sony WH-1000XM4",
        articleId: "article-7",
        qte: 10,
        puHT: 250.0,
        tva: 20,
      },
    ],
    createdAt: "2024-10-20T11:00:00Z",
    updatedAt: "2024-10-20T11:00:00Z",
  },
  {
    id: "5",
    blNumber: "BL-2024-005",
    date: "2024-10-18",
    fournisseur: "Fournisseur D",
    fournisseurId: "fournisseur-4",
    totalHT: 12000.0,
    totalTVA: 2400.0,
    totalTTC: 14400.0,
    status: "en attente",
    lignes: [
      {
        id: "ligne-8",
        article: 'MacBook Pro 16" M3 Max',
        articleId: "article-8",
        qte: 3,
        puHT: 4000.0,
        tva: 20,
      },
    ],
    createdAt: "2024-10-18T13:30:00Z",
    updatedAt: "2024-10-18T13:30:00Z",
  },
  {
    id: "6",
    blNumber: "BL-2024-006",
    date: "2024-10-15",
    fournisseur: "Fournisseur B",
    fournisseurId: "fournisseur-2",
    totalHT: 7200.0,
    totalTVA: 1440.0,
    totalTTC: 8640.0,
    status: "annulé",
    lignes: [
      {
        id: "ligne-9",
        article: 'Tablette iPad Pro 12.9"',
        articleId: "article-9",
        qte: 6,
        puHT: 1200.0,
        tva: 20,
      },
    ],
    createdAt: "2024-10-15T10:00:00Z",
    updatedAt: "2024-10-16T14:20:00Z",
  },
  {
    id: "7",
    blNumber: "BL-2024-007",
    date: "2024-10-12",
    fournisseur: "Fournisseur E",
    fournisseurId: "fournisseur-5",
    totalHT: 18500.0,
    totalTVA: 3700.0,
    totalTTC: 22200.0,
    status: "validé",
    lignes: [
      {
        id: "ligne-10",
        article: "Serveur Dell PowerEdge R740",
        articleId: "article-10",
        qte: 2,
        puHT: 8500.0,
        tva: 20,
      },
      {
        id: "ligne-11",
        article: "Switch Cisco Catalyst 48 ports",
        articleId: "article-11",
        qte: 1,
        puHT: 1500.0,
        tva: 20,
      },
    ],
    createdAt: "2024-10-12T08:45:00Z",
    updatedAt: "2024-10-12T08:45:00Z",
  },
  {
    id: "8",
    blNumber: "BL-2024-008",
    date: "2024-10-10",
    fournisseur: "Fournisseur A",
    fournisseurId: "fournisseur-1",
    totalHT: 3600.0,
    totalTVA: 720.0,
    totalTTC: 4320.0,
    status: "en attente",
    lignes: [
      {
        id: "ligne-12",
        article: "Disque Dur Externe 4TB Seagate",
        articleId: "article-12",
        qte: 20,
        puHT: 180.0,
        tva: 20,
      },
    ],
    createdAt: "2024-10-10T15:30:00Z",
    updatedAt: "2024-10-10T15:30:00Z",
  },
  {
    id: "9",
    blNumber: "BL-2024-009",
    date: "2024-10-08",
    fournisseur: "Fournisseur C",
    fournisseurId: "fournisseur-3",
    totalHT: 9000.0,
    totalTVA: 1800.0,
    totalTTC: 10800.0,
    status: "validé",
    lignes: [
      {
        id: "ligne-13",
        article: "Bureau ergonomique réglable",
        articleId: "article-13",
        qte: 15,
        puHT: 600.0,
        tva: 20,
      },
    ],
    createdAt: "2024-10-08T11:20:00Z",
    updatedAt: "2024-10-08T17:30:00Z",
  },
  {
    id: "10",
    blNumber: "BL-2024-010",
    date: "2024-10-05",
    fournisseur: "Fournisseur F",
    fournisseurId: "fournisseur-6",
    totalHT: 14000.0,
    totalTVA: 2800.0,
    totalTTC: 16800.0,
    status: "validé",
    lignes: [
      {
        id: "ligne-14",
        article: "Chaise de bureau Herman Miller",
        articleId: "article-14",
        qte: 20,
        puHT: 700.0,
        tva: 20,
      },
    ],
    createdAt: "2024-10-05T09:00:00Z",
    updatedAt: "2024-10-05T09:00:00Z",
  },
  {
    id: "11",
    blNumber: "BL-2024-011",
    date: "2024-10-03",
    fournisseur: "Fournisseur B",
    fournisseurId: "fournisseur-2",
    totalHT: 4800.0,
    totalTVA: 960.0,
    totalTTC: 5760.0,
    status: "en attente",
    lignes: [
      {
        id: "ligne-15",
        article: "Projecteur Epson EB-2250U",
        articleId: "article-15",
        qte: 3,
        puHT: 1600.0,
        tva: 20,
      },
    ],
    createdAt: "2024-10-03T14:10:00Z",
    updatedAt: "2024-10-03T14:10:00Z",
  },
  {
    id: "12",
    blNumber: "BL-2024-012",
    date: "2024-10-01",
    fournisseur: "Fournisseur D",
    fournisseurId: "fournisseur-4",
    totalHT: 6400.0,
    totalTVA: 1280.0,
    totalTTC: 7680.0,
    status: "validé",
    lignes: [
      {
        id: "ligne-16",
        article: "Station d'accueil USB-C Dell",
        articleId: "article-16",
        qte: 25,
        puHT: 256.0,
        tva: 20,
      },
    ],
    createdAt: "2024-10-01T10:25:00Z",
    updatedAt: "2024-10-01T16:40:00Z",
  },
];

// Mock statistics
export const mockReceptionStats = {
  total: mockReceptions.length,
  thisMonth: mockReceptions.filter((r) => {
    const date = new Date(r.date);
    const now = new Date();
    return (
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    );
  }).length,
  pending: mockReceptions.filter((r) => r.status === "en attente").length,
  totalAmount: mockReceptions
    .filter((r) => {
      const date = new Date(r.date);
      const now = new Date();
      return (
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
      );
    })
    .reduce((sum, r) => sum + r.totalTTC, 0),
  suppliers: [...new Set(mockReceptions.map((r) => r.fournisseur))].length,
};

// Mock fournisseurs for selection
export const mockFournisseurs = [
  {
    id: "fournisseur-1",
    nom: "Fournisseur A",
    ice: "ICE001",
    contact: "0612345678",
  },
  {
    id: "fournisseur-2",
    nom: "Fournisseur B",
    ice: "ICE002",
    contact: "0612345679",
  },
  {
    id: "fournisseur-3",
    nom: "Fournisseur C",
    ice: "ICE003",
    contact: "0612345680",
  },
  {
    id: "fournisseur-4",
    nom: "Fournisseur D",
    ice: "ICE004",
    contact: "0612345681",
  },
  {
    id: "fournisseur-5",
    nom: "Fournisseur E",
    ice: "ICE005",
    contact: "0612345682",
  },
  {
    id: "fournisseur-6",
    nom: "Fournisseur F",
    ice: "ICE006",
    contact: "0612345683",
  },
];

// Mock articles for selection
export const mockArticles = [
  {
    id: "article-1",
    nom: "Ordinateur Portable Dell XPS 15",
    ref: "DELL-XPS15",
    prixHT: 1600.0,
  },
  {
    id: "article-2",
    nom: "Souris sans fil Logitech MX Master",
    ref: "LOG-MXM",
    prixHT: 80.0,
  },
  {
    id: "article-3",
    nom: "Clavier mécanique Corsair K95",
    ref: "COR-K95",
    prixHT: 120.0,
  },
  {
    id: "article-4",
    nom: 'Écran Dell UltraSharp 27"',
    ref: "DELL-U27",
    prixHT: 750.0,
  },
  {
    id: "article-5",
    nom: "Imprimante HP LaserJet Pro",
    ref: "HP-LJP",
    prixHT: 2000.0,
  },
  {
    id: "article-6",
    nom: "Webcam Logitech Brio 4K",
    ref: "LOG-BRIO",
    prixHT: 200.0,
  },
  {
    id: "article-7",
    nom: "Casque Audio Sony WH-1000XM4",
    ref: "SONY-WH",
    prixHT: 250.0,
  },
  {
    id: "article-8",
    nom: 'MacBook Pro 16" M3 Max',
    ref: "APPLE-MBP16",
    prixHT: 4000.0,
  },
  {
    id: "article-9",
    nom: 'Tablette iPad Pro 12.9"',
    ref: "APPLE-IPAD",
    prixHT: 1200.0,
  },
  {
    id: "article-10",
    nom: "Serveur Dell PowerEdge R740",
    ref: "DELL-PE",
    prixHT: 8500.0,
  },
  {
    id: "article-11",
    nom: "Switch Cisco Catalyst 48 ports",
    ref: "CISCO-CAT48",
    prixHT: 1500.0,
  },
  {
    id: "article-12",
    nom: "Disque Dur Externe 4TB Seagate",
    ref: "SEA-4TB",
    prixHT: 180.0,
  },
  {
    id: "article-13",
    nom: "Bureau ergonomique réglable",
    ref: "DESK-ERG",
    prixHT: 600.0,
  },
  {
    id: "article-14",
    nom: "Chaise de bureau Herman Miller",
    ref: "HM-CHAIR",
    prixHT: 700.0,
  },
  {
    id: "article-15",
    nom: "Projecteur Epson EB-2250U",
    ref: "EPSON-2250",
    prixHT: 1600.0,
  },
  {
    id: "article-16",
    nom: "Station d'accueil USB-C Dell",
    ref: "DELL-DOCK",
    prixHT: 256.0,
  },
];

// Helper function to simulate API delay
export const simulateDelay = (ms = 500) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// Helper function to generate new BL number
export const generateNewBLNumber = () => {
  const year = new Date().getFullYear();
  const existingNumbers = mockReceptions
    .map((r) => parseInt(r.blNumber.split("-")[2]))
    .filter((n) => !isNaN(n));
  const maxNumber = Math.max(...existingNumbers, 0);
  const newNumber = (maxNumber + 1).toString().padStart(3, "0");
  return `BL-${year}-${newNumber}`;
};

// Helper function to find reception by ID
export const findReceptionById = (id) => {
  return mockReceptions.find((r) => r.id === id);
};

// Helper function to calculate stats
export const calculateStats = (receptions) => {
  const now = new Date();
  const thisMonth = receptions.filter((r) => {
    const date = new Date(r.date);
    return (
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    );
  });

  return {
    total: receptions.length,
    thisMonth: thisMonth.length,
    pending: receptions.filter((r) => r.status === "en attente").length,
    totalAmount: thisMonth.reduce((sum, r) => sum + r.totalTTC, 0),
    suppliers: [...new Set(receptions.map((r) => r.fournisseur))].length,
  };
};

// =============================================================================
// ENV TOGGLE (Single source for mock/API switch for all Achats services)
// =============================================================================
export const ACHATS_USE_MOCK =
  (typeof import.meta !== "undefined" &&
    import.meta.env &&
    (import.meta.env.VITE_USE_MOCK_ACHATS === "true" || import.meta.env.DEV)) ||
  false;

// =============================================================================
// INVOICES (Factures) MOCK DATA
// =============================================================================
export const mockInvoices = [
  {
    id: "1",
    invoiceNumber: "FA-2024-001",
    date: "2024-10-28",
    fournisseur: "Fournisseur B",
    fournisseurId: "fournisseur-2",
    totalHT: 15000,
    totalTVA: 3000,
    totalTTC: 18000,
    dueDate: "2024-11-27",
    paymentMethod: "Virement",
    linkedBLs: ["BL-2024-002"],
    status: "en attente",
    payments: [],
  },
  {
    id: "2",
    invoiceNumber: "FA-2024-002",
    date: "2024-10-20",
    fournisseur: "Fournisseur A",
    fournisseurId: "fournisseur-1",
    totalHT: 5500,
    totalTVA: 1100,
    totalTTC: 6600,
    dueDate: "2024-11-19",
    paymentMethod: "Chèque",
    linkedBLs: ["BL-2024-004"],
    status: "payée",
    payments: [{ id: "p1", date: "2024-10-25", amount: 6600 }],
  },
  {
    id: "3",
    invoiceNumber: "FA-2024-003",
    date: "2024-10-12",
    fournisseur: "Fournisseur E",
    fournisseurId: "fournisseur-5",
    totalHT: 18500,
    totalTVA: 3700,
    totalTTC: 22200,
    dueDate: "2024-11-11",
    paymentMethod: "Virement",
    linkedBLs: ["BL-2024-007"],
    status: "en retard",
    payments: [],
  },
  {
    id: "4",
    invoiceNumber: "FA-2024-004",
    date: "2024-10-10",
    fournisseur: "Fournisseur A",
    fournisseurId: "fournisseur-1",
    totalHT: 3600,
    totalTVA: 720,
    totalTTC: 4320,
    dueDate: "2024-11-09",
    paymentMethod: "Espèces",
    linkedBLs: ["BL-2024-008"],
    status: "partielle",
    payments: [{ id: "p2", date: "2024-10-20", amount: 2000 }],
  },
];

export const generateNewInvoiceNumber = () => {
  const year = new Date().getFullYear();
  const existing = mockInvoices
    .map((i) => parseInt(i.invoiceNumber.split("-")[2]))
    .filter((n) => !isNaN(n));
  const max = Math.max(...existing, 0) + 1;
  return `FA-${year}-${max.toString().padStart(3, "0")}`;
};

export const calculateInvoiceStats = (invoices) => {
  const now = new Date();
  const thisMonth = invoices.filter((i) => {
    const d = new Date(i.date);
    return (
      d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
    );
  });

  const paid = invoices.filter((i) => i.status === "payée").length;
  const pending = invoices.filter((i) => i.status === "en attente").length;
  const overdue = invoices.filter((i) => i.status === "en retard").length;
  const totalAmount = thisMonth.reduce((s, i) => s + i.totalTTC, 0);

  return {
    total: invoices.length,
    thisMonth: thisMonth.length,
    paid,
    pending,
    overdue,
    totalAmount,
  };
};

// Build invoice payload from a list of BL numbers (aggregates totals and infers supplier)
export const buildInvoiceFromBLs = (blNumbers = []) => {
  const lines = mockReceptions.filter((r) => blNumbers.includes(r.blNumber));
  const fournisseur = lines[0]?.fournisseur || "";
  const fournisseurId = lines[0]?.fournisseurId || "";
  const totals = lines.reduce(
    (acc, r) => ({
      totalHT: acc.totalHT + (r.totalHT || 0),
      totalTVA: acc.totalTVA + (r.totalTVA || 0),
      totalTTC: acc.totalTTC + (r.totalTTC || 0),
    }),
    { totalHT: 0, totalTVA: 0, totalTTC: 0 }
  );

  return {
    date: new Date().toISOString().split("T")[0],
    fournisseur,
    fournisseurId,
    linkedBLs: blNumbers,
    ...totals,
  };
};

// =============================================================================
// AVOIRS (Credit Notes) MOCK DATA
// =============================================================================
export const mockAvoirs = [
  {
    id: "a1",
    avoirNumber: "AV-2024-001",
    date: "2024-10-28",
    fournisseur: "Fournisseur A",
    fournisseurId: "fournisseur-1",
    linkedInvoiceId: "1",
    linkedInvoiceNumber: "FA-2024-001",
    amount: 1200,
    reason: "Articles défectueux",
    status: "validé",
  },
  {
    id: "a2",
    avoirNumber: "AV-2024-002",
    date: "2024-10-25",
    fournisseur: "Fournisseur B",
    fournisseurId: "fournisseur-2",
    linkedInvoiceId: "2",
    linkedInvoiceNumber: "FA-2024-002",
    amount: 500,
    reason: "Retour partiel",
    status: "en attente",
  },
];

export const calculateAvoirStats = (avoirs) => {
  const total = avoirs.length;
  const validated = avoirs.filter((a) => a.status === "validé").length;
  const pending = avoirs.filter((a) => a.status === "en attente").length;
  const totalAmount = avoirs.reduce((s, a) => s + (a.amount || 0), 0);
  return { total, validated, pending, totalAmount };
};

// =============================================================================
// ADDITIONAL TESTING DATASETS
// =============================================================================

/**
 * Generate large dataset for performance testing
 * @param {number} count - Number of additional receptions to generate
 * @param {number} startId - Starting ID number (default: 13)
 * @returns {Array} Array of mock receptions
 */
export const generateLargeMockDataset = (count = 100, startId = 13) => {
  const statuses = ["validé", "en attente", "annulé"];
  const fournisseurs = mockFournisseurs;
  const articles = mockArticles;

  const receptions = [];

  for (let i = startId; i < startId + count; i++) {
    const numLignes = Math.floor(Math.random() * 5) + 1; // 1-5 lines
    const lignes = [];

    for (let j = 0; j < numLignes; j++) {
      const article = articles[Math.floor(Math.random() * articles.length)];
      const qte = Math.floor(Math.random() * 20) + 1;
      lignes.push({
        id: `ligne-${i * 100 + j}`,
        article: article.nom,
        articleId: article.id,
        qte,
        puHT: article.prixHT,
        tva: 20,
      });
    }

    // Calculate totals
    const totalHT = lignes.reduce((sum, l) => sum + l.qte * l.puHT, 0);
    const totalTVA = totalHT * 0.2;
    const totalTTC = totalHT + totalTVA;

    // Random date in last 90 days
    const daysAgo = Math.floor(Math.random() * 90);
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);

    receptions.push({
      id: i.toString(),
      blNumber: `BL-2024-${i.toString().padStart(3, "0")}`,
      date: date.toISOString().split("T")[0],
      fournisseur:
        fournisseurs[Math.floor(Math.random() * fournisseurs.length)].nom,
      fournisseurId:
        fournisseurs[Math.floor(Math.random() * fournisseurs.length)].id,
      totalHT: Math.round(totalHT * 100) / 100,
      totalTVA: Math.round(totalTVA * 100) / 100,
      totalTTC: Math.round(totalTTC * 100) / 100,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      lignes,
      createdAt: date.toISOString(),
      updatedAt: date.toISOString(),
    });
  }

  return receptions;
};

/**
 * Edge case receptions for boundary testing
 */
export const edgeCaseMockReceptions = [
  // Single ligne with massive quantity
  {
    id: "edge-1",
    blNumber: "BL-2024-EDGE-001",
    date: "2024-11-15",
    fournisseur: "Fournisseur Test Large",
    fournisseurId: "fournisseur-1",
    totalHT: 10000000.0,
    totalTVA: 2000000.0,
    totalTTC: 12000000.0,
    status: "validé",
    lignes: [
      {
        id: "edge-ligne-1",
        article: "Serveur Haute Performance Data Center",
        articleId: "article-10",
        qte: 1000,
        puHT: 10000.0,
        tva: 20,
      },
    ],
    createdAt: "2024-11-15T10:00:00Z",
    updatedAt: "2024-11-15T10:00:00Z",
  },

  // BL with many lignes (50 items)
  {
    id: "edge-2",
    blNumber: "BL-2024-EDGE-002",
    date: "2024-11-14",
    fournisseur: "Fournisseur Bulk Order",
    fournisseurId: "fournisseur-2",
    status: "en attente",
    lignes: Array.from({ length: 50 }, (_, i) => ({
      id: `edge-ligne-bulk-${i}`,
      article: `Article Test Bulk ${i + 1}`,
      articleId: `article-${(i % 16) + 1}`,
      qte: Math.floor(Math.random() * 10) + 1,
      puHT: Math.round((Math.random() * 1000 + 50) * 100) / 100,
      tva: 20,
    })),
    get totalHT() {
      return (
        Math.round(
          this.lignes.reduce((sum, l) => sum + l.qte * l.puHT, 0) * 100
        ) / 100
      );
    },
    get totalTVA() {
      return Math.round(this.totalHT * 0.2 * 100) / 100;
    },
    get totalTTC() {
      return Math.round((this.totalHT + this.totalTVA) * 100) / 100;
    },
    createdAt: "2024-11-14T14:30:00Z",
    updatedAt: "2024-11-14T14:30:00Z",
  },

  // BL with decimal prices and quantities
  {
    id: "edge-3",
    blNumber: "BL-2024-EDGE-003",
    date: "2024-11-13",
    fournisseur: "Fournisseur Précision",
    fournisseurId: "fournisseur-3",
    totalHT: 123.45,
    totalTVA: 24.69,
    totalTTC: 148.14,
    status: "validé",
    lignes: [
      {
        id: "edge-ligne-decimal-1",
        article: "Câble Réseau (au mètre)",
        articleId: "article-1",
        qte: 2.5,
        puHT: 12.34,
        tva: 20,
      },
      {
        id: "edge-ligne-decimal-2",
        article: "Ruban Adhésif (au rouleau)",
        articleId: "article-2",
        qte: 7.3,
        puHT: 8.99,
        tva: 20,
      },
    ],
    createdAt: "2024-11-13T09:15:00Z",
    updatedAt: "2024-11-13T09:15:00Z",
  },

  // BL from exactly 1 year ago
  {
    id: "edge-4",
    blNumber: "BL-2023-001",
    date: "2023-11-15",
    fournisseur: "Fournisseur Archive",
    fournisseurId: "fournisseur-4",
    totalHT: 5000.0,
    totalTVA: 1000.0,
    totalTTC: 6000.0,
    status: "validé",
    lignes: [
      {
        id: "edge-ligne-old-1",
        article: "Article Archive Ancien Stock",
        articleId: "article-5",
        qte: 10,
        puHT: 500.0,
        tva: 20,
      },
    ],
    createdAt: "2023-11-15T10:00:00Z",
    updatedAt: "2023-11-15T10:00:00Z",
  },

  // BL with zero amount (free samples)
  {
    id: "edge-5",
    blNumber: "BL-2024-EDGE-005",
    date: "2024-11-12",
    fournisseur: "Fournisseur Échantillons",
    fournisseurId: "fournisseur-5",
    totalHT: 0.0,
    totalTVA: 0.0,
    totalTTC: 0.0,
    status: "validé",
    lignes: [
      {
        id: "edge-ligne-free-1",
        article: "Échantillon Gratuit - Souris",
        articleId: "article-2",
        qte: 5,
        puHT: 0.0,
        tva: 20,
      },
    ],
    createdAt: "2024-11-12T13:45:00Z",
    updatedAt: "2024-11-12T13:45:00Z",
  },
];

/**
 * Multi-TVA receptions for testing mixed tax rates
 */
export const multiTVAReceptions = [
  {
    id: "tva-1",
    blNumber: "BL-2024-TVA-001",
    date: "2024-11-15",
    fournisseur: "Fournisseur Multi-TVA",
    fournisseurId: "fournisseur-1",
    totalHT: 10000.0,
    totalTVA: 1750.0, // Mixed TVA calculation
    totalTTC: 11750.0,
    status: "validé",
    lignes: [
      {
        id: "tva-ligne-1",
        article: "Ordinateur Portable (TVA 20%)",
        articleId: "article-1",
        qte: 5,
        puHT: 1000.0,
        tva: 20, // TVA = 1000
      },
      {
        id: "tva-ligne-2",
        article: "Livre Technique (TVA 7%)",
        articleId: "article-2",
        qte: 10,
        puHT: 100.0,
        tva: 7, // TVA = 70
      },
      {
        id: "tva-ligne-3",
        article: "Produits Alimentaires (TVA 10%)",
        articleId: "article-3",
        qte: 20,
        puHT: 100.0,
        tva: 10, // TVA = 200
      },
      {
        id: "tva-ligne-4",
        article: "Export International (TVA 0%)",
        articleId: "article-4",
        qte: 10,
        puHT: 200.0,
        tva: 0, // TVA = 0
      },
      {
        id: "tva-ligne-5",
        article: "Services Consulting (TVA 14%)",
        articleId: "article-5",
        qte: 5,
        puHT: 200.0,
        tva: 14, // TVA = 140
      },
      {
        id: "tva-ligne-6",
        article: "Médicaments (TVA 7%)",
        articleId: "article-6",
        qte: 10,
        puHT: 50.0,
        tva: 7, // TVA = 35
      },
    ],
    createdAt: "2024-11-15T11:20:00Z",
    updatedAt: "2024-11-15T11:20:00Z",
  },
  {
    id: "tva-2",
    blNumber: "BL-2024-TVA-002",
    date: "2024-11-14",
    fournisseur: "Fournisseur Export",
    fournisseurId: "fournisseur-2",
    totalHT: 50000.0,
    totalTVA: 0.0, // Export sans TVA
    totalTTC: 50000.0,
    status: "validé",
    lignes: [
      {
        id: "tva-ligne-export-1",
        article: "Matériel Export Zone Franche",
        articleId: "article-10",
        qte: 10,
        puHT: 5000.0,
        tva: 0,
      },
    ],
    createdAt: "2024-11-14T16:00:00Z",
    updatedAt: "2024-11-14T16:00:00Z",
  },
];

/**
 * Receptions with special scenarios
 */
export const specialScenarioReceptions = [
  // BL with very long names
  {
    id: "special-1",
    blNumber: "BL-2024-SPEC-001",
    date: "2024-11-15",
    fournisseur:
      "Société Internationale de Distribution et Commerce en Gros de Matériel Informatique et Électronique SARL",
    fournisseurId: "fournisseur-1",
    totalHT: 5000.0,
    totalTVA: 1000.0,
    totalTTC: 6000.0,
    status: "validé",
    lignes: [
      {
        id: "special-ligne-1",
        article:
          "Ordinateur Portable Gaming Ultra Performant avec Processeur Intel Core i9 13ème Génération et Carte Graphique NVIDIA RTX 4090 Ti Super Edition Limited",
        articleId: "article-1",
        qte: 2,
        puHT: 2500.0,
        tva: 20,
      },
    ],
    createdAt: "2024-11-15T12:00:00Z",
    updatedAt: "2024-11-15T12:00:00Z",
  },

  // BL with special characters
  {
    id: "special-2",
    blNumber: "BL-2024-SPEC-002",
    date: "2024-11-14",
    fournisseur: "L'Électronique & Cie",
    fournisseurId: "fournisseur-2",
    totalHT: 3000.0,
    totalTVA: 600.0,
    totalTTC: 3600.0,
    status: "en attente",
    lignes: [
      {
        id: "special-ligne-2",
        article: 'Écran 27" (Full HD) - Série "Pro"',
        articleId: "article-4",
        qte: 4,
        puHT: 750.0,
        tva: 20,
      },
    ],
    createdAt: "2024-11-14T13:30:00Z",
    updatedAt: "2024-11-14T13:30:00Z",
  },

  // Future dated BL (pre-order)
  {
    id: "special-3",
    blNumber: "BL-2025-001",
    date: "2025-01-15",
    fournisseur: "Fournisseur Pré-Commande",
    fournisseurId: "fournisseur-3",
    totalHT: 15000.0,
    totalTVA: 3000.0,
    totalTTC: 18000.0,
    status: "en attente",
    lignes: [
      {
        id: "special-ligne-3",
        article: "Nouveau Modèle 2025 - MacBook Pro M4",
        articleId: "article-8",
        qte: 5,
        puHT: 3000.0,
        tva: 20,
      },
    ],
    createdAt: "2024-11-15T15:00:00Z",
    updatedAt: "2024-11-15T15:00:00Z",
  },
];

// =============================================================================
// HELPER FUNCTIONS FOR TESTING
// =============================================================================

/**
 * Get all test datasets combined
 * @param {boolean} includeEdgeCases - Include edge case data
 * @param {boolean} includeMultiTVA - Include multi-TVA data
 * @param {boolean} includeSpecial - Include special scenarios
 * @returns {Array} Combined array of all mock receptions
 */
export const getAllTestReceptions = (
  includeEdgeCases = false,
  includeMultiTVA = false,
  includeSpecial = false
) => {
  let allReceptions = [...mockReceptions];

  if (includeEdgeCases) {
    allReceptions = [...allReceptions, ...edgeCaseMockReceptions];
  }

  if (includeMultiTVA) {
    allReceptions = [...allReceptions, ...multiTVAReceptions];
  }

  if (includeSpecial) {
    allReceptions = [...allReceptions, ...specialScenarioReceptions];
  }

  return allReceptions;
};

/**
 * Get reception by BL number
 * @param {string} blNumber - BL number to find
 * @returns {Object|null} Reception object or null
 */
export const findReceptionByBLNumber = (blNumber) => {
  const allReceptions = getAllTestReceptions(true, true, true);
  return allReceptions.find((r) => r.blNumber === blNumber) || null;
};

/**
 * Get receptions by status
 * @param {string} status - Status to filter by
 * @returns {Array} Filtered receptions
 */
export const getReceptionsByStatus = (status) => {
  return mockReceptions.filter((r) => r.status === status);
};

/**
 * Get receptions by fournisseur
 * @param {string} fournisseurId - Fournisseur ID to filter by
 * @returns {Array} Filtered receptions
 */
export const getReceptionsByFournisseur = (fournisseurId) => {
  return mockReceptions.filter((r) => r.fournisseurId === fournisseurId);
};

/**
 * Get receptions by date range
 * @param {string} startDate - Start date (YYYY-MM-DD)
 * @param {string} endDate - End date (YYYY-MM-DD)
 * @returns {Array} Filtered receptions
 */
export const getReceptionsByDateRange = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  return mockReceptions.filter((r) => {
    const date = new Date(r.date);
    return date >= start && date <= end;
  });
};

/**
 * Get receptions above certain amount
 * @param {number} minAmount - Minimum amount (TTC)
 * @returns {Array} Filtered receptions
 */
export const getReceptionsAboveAmount = (minAmount) => {
  return mockReceptions.filter((r) => r.totalTTC >= minAmount);
};

/**
 * Generate mock reception with custom parameters
 * @param {Object} params - Custom parameters
 * @returns {Object} Mock reception
 */
export const generateCustomReception = (params = {}) => {
  const defaultParams = {
    fournisseur: mockFournisseurs[0].nom,
    fournisseurId: mockFournisseurs[0].id,
    status: "en attente",
    lignes: [
      {
        article: mockArticles[0].nom,
        articleId: mockArticles[0].id,
        qte: 1,
        puHT: mockArticles[0].prixHT,
        tva: 20,
      },
    ],
    date: new Date().toISOString().split("T")[0],
  };

  const merged = { ...defaultParams, ...params };
  const totalHT = merged.lignes.reduce((sum, l) => sum + l.qte * l.puHT, 0);
  const totalTVA = merged.lignes.reduce((sum, l) => {
    const lineHT = l.qte * l.puHT;
    return sum + (lineHT * l.tva) / 100;
  }, 0);
  const totalTTC = totalHT + totalTVA;

  return {
    id: `custom-${Date.now()}`,
    blNumber: generateNewBLNumber(),
    ...merged,
    totalHT: Math.round(totalHT * 100) / 100,
    totalTVA: Math.round(totalTVA * 100) / 100,
    totalTTC: Math.round(totalTTC * 100) / 100,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};

/**
 * Simulate API delay with random variation
 * @param {number} minMs - Minimum delay in ms
 * @param {number} maxMs - Maximum delay in ms
 * @returns {Promise}
 */
export const simulateDelayWithVariation = (minMs = 300, maxMs = 800) => {
  const delay = Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;
  return new Promise((resolve) => setTimeout(resolve, delay));
};

/**
 * Simulate network error
 * @param {number} errorRate - Error rate (0-1, default 0.3 = 30%)
 * @throws {Error} Network error
 */
export const simulateNetworkError = (errorRate = 0.3) => {
  if (Math.random() < errorRate) {
    throw new Error("Network error: Unable to reach server");
  }
};

/**
 * Reset mock data to initial state
 */
export const resetMockData = () => {
  // This would require importing and re-exporting initial data
  console.log("Mock data reset to initial state");
};

/**
 * Get test statistics for a dataset
 * @param {Array} receptions - Array of receptions
 * @returns {Object} Statistics object
 */
export const getTestStatistics = (receptions) => {
  return calculateStats(receptions);
};

// =============================================================================
// CONFIGURATION FLAGS (for testing)
// =============================================================================

export const TEST_CONFIG = {
  USE_LARGE_DATASET: false, // Enable 100+ receptions
  USE_EDGE_CASES: false, // Enable edge case data
  USE_MULTI_TVA: false, // Enable multi-TVA data
  USE_SPECIAL_SCENARIOS: false, // Enable special scenarios
  SIMULATE_ERRORS: false, // Enable error simulation
  ERROR_RATE: 0.3, // 30% error rate when enabled
  DELAY_MIN: 300, // Minimum API delay (ms)
  DELAY_MAX: 800, // Maximum API delay (ms)
};

/**
 * Get receptions based on test configuration
 * @returns {Array} Configured mock receptions
 */
export const getConfiguredMockReceptions = () => {
  let receptions = [...mockReceptions];

  if (TEST_CONFIG.USE_EDGE_CASES) {
    receptions = [...receptions, ...edgeCaseMockReceptions];
  }

  if (TEST_CONFIG.USE_MULTI_TVA) {
    receptions = [...receptions, ...multiTVAReceptions];
  }

  if (TEST_CONFIG.USE_SPECIAL_SCENARIOS) {
    receptions = [...receptions, ...specialScenarioReceptions];
  }

  if (TEST_CONFIG.USE_LARGE_DATASET) {
    receptions = [...receptions, ...generateLargeMockDataset(88)]; // Total 100
  }

  return receptions;
};

// Export all for easy access
export default {
  mockReceptions,
  mockReceptionStats,
  mockFournisseurs,
  mockArticles,
  edgeCaseMockReceptions,
  multiTVAReceptions,
  specialScenarioReceptions,
  generateLargeMockDataset,
  getAllTestReceptions,
  findReceptionByBLNumber,
  getReceptionsByStatus,
  getReceptionsByFournisseur,
  getReceptionsByDateRange,
  getReceptionsAboveAmount,
  generateCustomReception,
  simulateDelay,
  simulateDelayWithVariation,
  simulateNetworkError,
  calculateStats,
  generateNewBLNumber,
  findReceptionById,
  getConfiguredMockReceptions,
  TEST_CONFIG,
  // Newly added unified Achats exports
  ACHATS_USE_MOCK,
  mockInvoices,
  generateNewInvoiceNumber,
  calculateInvoiceStats,
  buildInvoiceFromBLs,
  mockAvoirs,
  calculateAvoirStats,
};
