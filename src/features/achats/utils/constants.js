export const STATUT_COMMANDE = {
  PAYE: 'payé',
  EN_ATTENTE: 'en attente',
  ANNULE: 'annulé'
};

export const STATUT_COMMANDE_OPTIONS = [
  { value: 'all', label: 'Tous les statuts' },
  { value: STATUT_COMMANDE.PAYE, label: 'Payé' },
  { value: STATUT_COMMANDE.EN_ATTENTE, label: 'En attente' },
  { value: STATUT_COMMANDE.ANNULE, label: 'Annulé' }
];

export const COLUMNS = [
  { id: 'id', label: 'N° Commande', sortable: true },
  { id: 'date', label: 'Date', sortable: true },
  { id: 'fournisseur', label: 'Fournisseur', sortable: true },
  { id: 'articles', label: 'Articles', sortable: false },
  { id: 'totalHT', label: 'Total HT', sortable: true },
  { id: 'tva', label: 'TVA', sortable: true },
  { id: 'totalTTC', label: 'Total TTC', sortable: true },
  { id: 'statut', label: 'Statut', sortable: true },
  { id: 'actions', label: 'Actions', sortable: false }
];

export const DEFAULT_FILTERS = {
  search: '',
  statut: '',
  dateDebut: '',
  dateFin: '',
  fournisseur: ''
};
