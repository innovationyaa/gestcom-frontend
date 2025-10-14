export const STOCK_CATEGORIES = [
  'Informatique',
  'Accessoires',
  'Fournitures',
  'Alimentation',
  'Mobilier',
  'Consommables'
]

export const UNITS_OF_MEASURE = [
  'pièces',
  'kg',
  'litres',
  'mètres',
  'rames',
  'boîtes',
  'paquets',
  'cartons'
]

export const STOCK_STATUS = {
  IN_STOCK: 'en_stock',
  LOW_STOCK: 'stock_faible',
  OUT_OF_STOCK: 'rupture_stock'
}

export const STOCK_TABLE_COLUMNS = [
  { key: 'reference', label: 'Référence', sortable: true },
  { key: 'nom', label: 'Nom', sortable: true },
  { key: 'categorie', label: 'Catégorie', sortable: true },
  { key: 'quantite', label: 'Quantité', sortable: true },
  { key: 'uniteMesure', label: 'Unité', sortable: false },
  { key: 'prixAchat', label: 'Prix Achat', sortable: true },
  { key: 'prixVente', label: 'Prix Vente', sortable: true },
  { key: 'valeurStock', label: 'Valeur Stock', sortable: true },
  { key: 'status', label: 'Statut', sortable: false }
]

export const STOCK_FILTERS = [
  { key: 'categorie', label: 'Catégorie', options: STOCK_CATEGORIES },
  { key: 'status', label: 'Statut', options: Object.values(STOCK_STATUS) },
  { key: 'fournisseur', label: 'Fournisseur', options: [] }
]

export const SORT_OPTIONS = [
  { value: 'reference', label: 'Référence' },
  { value: 'nom', label: 'Nom' },
  { value: 'categorie', label: 'Catégorie' },
  { value: 'quantite', label: 'Quantité' },
  { value: 'prixAchat', label: 'Prix Achat' },
  { value: 'prixVente', label: 'Prix Vente' }
]
