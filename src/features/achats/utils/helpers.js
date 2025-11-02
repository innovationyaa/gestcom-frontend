// Format currency in MAD
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("fr-MA", {
    style: "currency",
    currency: "MAD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount || 0);
};

// Format date
export const formatDate = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("fr-FR");
};

// Calculate totals for BL lines
export const calculateLineTotals = (ligne) => {
  const { qte, puHT, tva } = ligne;
  const totalHT = qte * puHT;
  const totalTVA = totalHT * (tva / 100);
  const totalTTC = totalHT + totalTVA;

  return {
    totalHT: parseFloat(totalHT.toFixed(2)),
    totalTVA: parseFloat(totalTVA.toFixed(2)),
    totalTTC: parseFloat(totalTTC.toFixed(2)),
  };
};

// Calculate BL totals from lines
export const calculateBLTotals = (lignes) => {
  if (!lignes || lignes.length === 0) {
    return { totalHT: 0, totalTVA: 0, totalTTC: 0 };
  }

  const totals = lignes.reduce(
    (acc, ligne) => {
      const lineTotals = calculateLineTotals(ligne);
      return {
        totalHT: acc.totalHT + lineTotals.totalHT,
        totalTVA: acc.totalTVA + lineTotals.totalTVA,
        totalTTC: acc.totalTTC + lineTotals.totalTTC,
      };
    },
    { totalHT: 0, totalTVA: 0, totalTTC: 0 }
  );

  return {
    totalHT: parseFloat(totals.totalHT.toFixed(2)),
    totalTVA: parseFloat(totals.totalTVA.toFixed(2)),
    totalTTC: parseFloat(totals.totalTTC.toFixed(2)),
  };
};

// Get filter options from receptions array
export const getFilterOptions = (receptions, field) => {
  const options = [...new Set(receptions.map((item) => item[field]))].filter(
    Boolean
  );
  return options.sort();
};

// Filter receptions based on search term
export const filterReceptions = (receptions, searchTerm) => {
  if (!searchTerm) return receptions;

  const searchLower = searchTerm.toLowerCase();
  return receptions.filter(
    (reception) =>
      reception.blNumber?.toLowerCase().includes(searchLower) ||
      reception.fournisseur?.toLowerCase().includes(searchLower) ||
      reception.status?.toLowerCase().includes(searchLower)
  );
};

// Sort receptions
export const sortReceptions = (receptions, sortBy, sortOrder) => {
  const sorted = [...receptions].sort((a, b) => {
    let aVal = a[sortBy];
    let bVal = b[sortBy];

    // Handle dates (support both 'date' and 'dueDate')
    if (sortBy === "date" || sortBy === "dueDate") {
      aVal = aVal ? new Date(aVal).getTime() : 0;
      bVal = bVal ? new Date(bVal).getTime() : 0;
    }

    // Handle numbers
    if (typeof aVal === "number" && typeof bVal === "number") {
      return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
    }

    // Handle strings
    if (typeof aVal === "string" && typeof bVal === "string") {
      return sortOrder === "asc"
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    }

    return 0;
  });

  return sorted;
};

// Generate BL Number
export const generateBLNumber = () => {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
  return `BL-${year}-${random}`;
};

// Validate BL data
export const validateBL = (blData) => {
  const errors = {};

  if (!blData.date) errors.date = "La date est requise";
  if (!blData.fournisseur) errors.fournisseur = "Le fournisseur est requis";
  if (!blData.lignes || blData.lignes.length === 0) {
    errors.lignes = "Au moins une ligne est requise";
  }

  // Validate each line
  if (blData.lignes) {
    blData.lignes.forEach((ligne, index) => {
      if (!ligne.article) {
        errors[`ligne_${index}_article`] = "L'article est requis";
      }
      if (!ligne.qte || ligne.qte <= 0) {
        errors[`ligne_${index}_qte`] = "La quantité doit être supérieure à 0";
      }
      if (!ligne.puHT || ligne.puHT <= 0) {
        errors[`ligne_${index}_puHT`] =
          "Le prix unitaire doit être supérieur à 0";
      }
      if (ligne.tva === undefined || ligne.tva < 0) {
        errors[`ligne_${index}_tva`] = "La TVA est requise";
      }
    });
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// Filter invoices based on search term
export const filterInvoices = (invoices, searchTerm) => {
  if (!searchTerm) return invoices;
  const q = searchTerm.toLowerCase();
  return invoices.filter((inv) => {
    const haystack = [
      inv.invoiceNumber,
      inv.fournisseur,
      inv.status,
      inv.paymentMethod,
      Array.isArray(inv.linkedBLs) ? inv.linkedBLs.join(", ") : "",
      inv.date,
      inv.dueDate,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
};

// AVOIRS: simple filter by number, supplier, linked invoice, reason, status
export const filterAvoirs = (avoirs, searchTerm) => {
  if (!searchTerm) return avoirs;
  const q = searchTerm.toLowerCase();
  return avoirs.filter((a) => {
    const haystack = [
      a.avoirNumber,
      a.fournisseur,
      a.linkedInvoiceNumber,
      a.reason,
      a.status,
      a.date,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
};

// Reuse sortReceptions for avoirs (handles dates and numbers generically)
export const sortAvoirs = (items, sortBy, sortOrder) =>
  sortReceptions(items, sortBy, sortOrder);

// Generate Avoir Number
export const generateAvoirNumber = () => {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
  return `AV-${year}-${random}`;
};
