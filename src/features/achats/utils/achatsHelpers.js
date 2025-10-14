import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export const formatDate = (dateString) => {
  if (!dateString) return '';
  try {
    return format(new Date(dateString), 'dd/MM/yyyy', { locale: fr });
  } catch (error) {
    console.error('Erreur de formatage de date:', error);
    return dateString;
  }
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

export const calculateTotalHT = (articles) => {
  return articles.reduce((sum, article) => sum + (article.prixUnitaireHT * article.quantite), 0);
};

export const calculateTVA = (articles) => {
  return articles.reduce((sum, article) => {
    const montantHT = article.prixUnitaireHT * article.quantite;
    return sum + (montantHT * (article.tauxTVA / 100));
  }, 0);
};

export const calculateTotalTTC = (articles) => {
  const totalHT = calculateTotalHT(articles);
  const tva = calculateTVA(articles);
  return totalHT + tva;
};

export const getStatusBadgeVariant = (status) => {
  switch (status) {
    case 'payé':
      return 'success';
    case 'en attente':
      return 'warning';
    case 'annulé':
      return 'destructive';
    default:
      return 'default';
  }
};

export const filterAchats = (achats, filters) => {
  return achats.filter(achat => {
    // Filtre par recherche
    const matchesSearch = !filters.search || 
      achat.id.toLowerCase().includes(filters.search.toLowerCase()) ||
      achat.fournisseur.toLowerCase().includes(filters.search.toLowerCase()) ||
      achat.articles.some(a => 
        a.nom.toLowerCase().includes(filters.search.toLowerCase())
      );

    // Filtre par statut
    const matchesStatus = !filters.statut || 
      achat.statut.toLowerCase() === filters.statut.toLowerCase();

    // Filtre par date
    let matchesDate = true;
    if (filters.dateDebut) {
      const dateAchat = new Date(achat.date);
      const dateDebut = new Date(filters.dateDebut);
      matchesDate = matchesDate && dateAchat >= dateDebut;
    }
    if (filters.dateFin) {
      const dateAchat = new Date(achat.date);
      const dateFin = new Date(filters.dateFin);
      dateFin.setHours(23, 59, 59, 999);
      matchesDate = matchesDate && dateAchat <= dateFin;
    }

    // Filtre par fournisseur
    const matchesFournisseur = !filters.fournisseur || 
      achat.fournisseur.toLowerCase() === filters.fournisseur.toLowerCase();

    return matchesSearch && matchesStatus && matchesDate && matchesFournisseur;
  });
};

export const sortAchats = (achats, sortBy, sortDirection) => {
  if (!sortBy) return achats;

  return [...achats].sort((a, b) => {
    let valueA, valueB;

    switch (sortBy) {
      case 'id':
      case 'fournisseur':
      case 'statut':
        valueA = a[sortBy].toLowerCase();
        valueB = b[sortBy].toLowerCase();
        break;
      case 'date':
        valueA = new Date(a.date);
        valueB = new Date(b.date);
        break;
      case 'totalHT':
      case 'tva':
      case 'totalTTC':
        valueA = parseFloat(a[sortBy]);
        valueB = parseFloat(b[sortBy]);
        break;
      default:
        return 0;
    }

    if (valueA < valueB) {
      return sortDirection === 'asc' ? -1 : 1;
    }
    if (valueA > valueB) {
      return sortDirection === 'asc' ? 1 : -1;
    }
    return 0;
  });
};
