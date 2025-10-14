import { STOCK_STATUS } from './constants'

/**
 * Calcule la valeur totale du stock pour un article
 */
export function calculateStockValue(quantite, prixAchat) {
  return quantite * prixAchat
}

/**
 * Détermine le statut du stock basé sur la quantité et le seuil minimum
 */
export function getStockStatus(quantite, seuilMinimum) {
  if (quantite === 0) return STOCK_STATUS.OUT_OF_STOCK
  if (quantite <= seuilMinimum) return STOCK_STATUS.LOW_STOCK
  return STOCK_STATUS.IN_STOCK
}

/**
 * Formate le prix en euros
 */
export function formatPrice(price) {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(price)
}

/**
 * Formate la date en français
 */
export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

/**
 * Génère les données pour le tableau avec les valeurs calculées
 */
export function prepareStockData(stockItems) {
  return stockItems.map(item => ({
    ...item,
    valeurStock: calculateStockValue(item.quantite, item.prixAchat),
    status: getStockStatus(item.quantite, item.seuilMinimum),
    prixAchatFormatted: formatPrice(item.prixAchat),
    prixVenteFormatted: formatPrice(item.prixVente),
    valeurStockFormatted: formatPrice(calculateStockValue(item.quantite, item.prixAchat)),
    dateCreationFormatted: formatDate(item.dateCreation),
    dateModificationFormatted: formatDate(item.dateModification)
  }))
}

/**
 * Filtre les articles par statut
 */
export function filterByStatus(stockItems, status) {
  switch (status) {
    case STOCK_STATUS.OUT_OF_STOCK:
      return stockItems.filter(item => item.quantite === 0)
    case STOCK_STATUS.LOW_STOCK:
      return stockItems.filter(item => item.quantite <= item.seuilMinimum && item.quantite > 0)
    case STOCK_STATUS.IN_STOCK:
      return stockItems.filter(item => item.quantite > item.seuilMinimum)
    default:
      return stockItems
  }
}

/**
 * Trie les articles
 */
export function sortStockItems(stockItems, sortBy, sortOrder = 'asc') {
  return [...stockItems].sort((a, b) => {
    let aValue = a[sortBy]
    let bValue = b[sortBy]

    // Gestion spéciale pour les valeurs numériques
    if (['quantite', 'prixAchat', 'prixVente', 'valeurStock'].includes(sortBy)) {
      aValue = Number(aValue)
      bValue = Number(bValue)
    }

    if (sortOrder === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
    }
  })
}

/**
 * Recherche dans les articles
 */
export function searchStockItems(stockItems, searchTerm) {
  if (!searchTerm) return stockItems

  const term = searchTerm.toLowerCase()
  return stockItems.filter(item =>
    item.reference.toLowerCase().includes(term) ||
    item.nom.toLowerCase().includes(term) ||
    item.categorie.toLowerCase().includes(term) ||
    item.fournisseur.toLowerCase().includes(term)
  )
}

/**
 * Obtient les options uniques pour les filtres
 */
export function getFilterOptions(stockItems, filterKey) {
  const uniqueValues = [...new Set(stockItems.map(item => item[filterKey]))]
  return uniqueValues.filter(Boolean).sort()
}
