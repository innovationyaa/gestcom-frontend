import React, { useState, useEffect } from 'react';
import { Plus, X, Trash2 } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '../../../components/ui/dialog';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { Textarea } from '../../../components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table';
import { formatCurrency } from '../utils/commandesHelpers';

// Données factices pour la démo
const FOURNISSEURS = [
  { id: 'fourn-1', name: 'Fournisseur A' },
  { id: 'fourn-2', name: 'Fournisseur B' },
  { id: 'fourn-3', name: 'Fournisseur C' },
];

const ARTICLES = [
  { id: 'art-1', name: 'Ordinateur Portable', prixAchat: 800, tva: 20 },
  { id: 'art-2', name: 'Souris sans fil', prixAchat: 50, tva: 20 },
  { id: 'art-3', name: 'Clavier mécanique', prixAchat: 120, tva: 20 },
  { id: 'art-4', name: 'Écran 24\"', prixAchat: 180, tva: 20 },
  { id: 'art-5', name: 'Casque audio', prixAchat: 90, tva: 20 },
];

export const AddCommandeForm = ({ open, onOpenChange, onSubmit }) => {
  const [formData, setFormData] = useState({
    fournisseur: '',
    date: new Date().toISOString().split('T')[0],
    statut: 'en attente',
    notes: '',
    articles: []
  });

  const [selectedArticle, setSelectedArticle] = useState('');
  const [quantite, setQuantite] = useState(1);
  const [prixUnitaire, setPrixUnitaire] = useState(0);
  const [tauxTVA, setTauxTVA] = useState(20);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredArticles, setFilteredArticles] = useState(ARTICLES);

  // Filtrer les articles en fonction de la recherche
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredArticles(ARTICLES);
    } else {
      const filtered = ARTICLES.filter(article =>
        article.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredArticles(filtered);
    }
  }, [searchTerm]);

  // Mettre à jour le prix unitaire lorsque l'article sélectionné change
  useEffect(() => {
    if (selectedArticle) {
      const article = ARTICLES.find(a => a.id === selectedArticle);
      if (article) {
        setPrixUnitaire(article.prixAchat);
        setTauxTVA(article.tva);
      }
    }
  }, [selectedArticle]);

  const handleAddArticle = (e) => {
    e.preventDefault();
    
    if (!selectedArticle || quantite <= 0) return;
    
    const article = ARTICLES.find(a => a.id === selectedArticle);
    if (!article) return;

    const montantHT = prixUnitaire * quantite;
    const tva = (montantHT * tauxTVA) / 100;
    const montantTTC = montantHT + tva;

    const newArticle = {
      id: `${article.id}-${Date.now()}`,
      articleId: article.id,
      nom: article.name,
      quantite: Number(quantite),
      prixUnitaireHT: Number(prixUnitaire),
      tauxTVA: Number(tauxTVA),
      montantHT,
      montantTTC,
      tva
    };

    setFormData(prev => ({
      ...prev,
      articles: [...prev.articles, newArticle]
    }));

    // Réinitialiser le formulaire d'ajout d'article
    setSelectedArticle('');
    setQuantite(1);
    setPrixUnitaire(0);
    setTauxTVA(20);
  };

  const removeArticle = (articleId) => {
    setFormData(prev => ({
      ...prev,
      articles: prev.articles.filter(a => a.id !== articleId)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.articles.length === 0) {
      alert('Veuillez ajouter au moins un article');
      return;
    }

    // Calculer les totaux
    const totalHT = formData.articles.reduce((sum, a) => sum + a.montantHT, 0);
    const totalTVA = formData.articles.reduce((sum, a) => sum + a.tva, 0);
    const totalTTC = formData.articles.reduce((sum, a) => sum + a.montantTTC, 0);

    const achatData = {
      ...formData,
      totalHT,
      tva: totalTVA,
      totalTTC,
      date: new Date(formData.date).toISOString()
    };

    const result = await onSubmit(achatData);
    
    if (result && result.success) {
      // Réinitialiser le formulaire si la soumission réussit
      setFormData({
        fournisseur: '',
        date: new Date().toISOString().split('T')[0],
        statut: 'en attente',
        notes: '',
        articles: []
      });
    }
  };

  const calculateTotal = () => {
    return formData.articles.reduce((sum, a) => sum + a.montantTTC, 0);
  };

  const handleSaveDraft = async () => {
    try {
      const draftData = {
        ...formData,
        statut: 'brouillon',
        date: formData.date || new Date().toISOString().split('T')[0],
        montantTotal: calculateTotal()
      };
      
      // Call the parent component's onSubmit with the draft data
      await onSubmit(draftData);
      
      // Reset the form
      setFormData({
        fournisseur: '',
        date: new Date().toISOString().split('T')[0],
        statut: 'en attente',
        notes: '',
        articles: []
      });
      
      // Close the dialog
      onOpenChange(false);
    } catch (error) {
      console.error('Error saving draft:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col bg-white rounded-xl shadow-xl overflow-hidden p-0 [&>button]:text-white [&>button]:hover:bg-white/10 [&>button]:right-4 [&>button]:top-4">
        <DialogHeader className="bg-gradient-to-r from-[#3b82f6] to-[#2563eb] px-6 py-4 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-white/20">
                <Plus className="h-5 w-5 text-white" />
              </div>
              <div>
                <DialogTitle className="text-lg font-semibold text-white m-0">
                  Nouvel Achat
                </DialogTitle>
                <DialogDescription className="text-sm text-white/90 mt-1">
                  Remplissez les détails du nouvel achat
                </DialogDescription>
              </div>
            </div>
          </div>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          {/* Header */}
          <div className="flex-shrink-0 p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fournisseur" className="text-sm font-medium text-gray-700">
                  Fournisseur <span className="text-red-500">*</span>
                </Label>
                <Select 
                  value={formData.fournisseur} 
                  onValueChange={(value) => setFormData({...formData, fournisseur: value})}
                  required
                >
                  <SelectTrigger className="w-full h-10 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                    <SelectValue placeholder="Sélectionner un fournisseur" className="text-sm" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-200 rounded-md shadow-lg">
                    {FOURNISSEURS.map(fournisseur => (
                      <SelectItem key={fournisseur.id} value={fournisseur.name} className="hover:bg-gray-50">
                        {fournisseur.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="date" className="text-sm font-medium text-gray-700">
                  Date <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="h-10 border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="statut" className="text-sm font-medium text-gray-700">
                  Statut <span className="text-red-500">*</span>
                </Label>
                <Select 
                  value={formData.statut} 
                  onValueChange={(value) => setFormData({...formData, statut: value})}
                  required
                >
                  <SelectTrigger className="w-full h-10 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                    <SelectValue placeholder="Sélectionner un statut" className="text-sm" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-200 rounded-md shadow-lg">
                    <SelectItem value="en attente" className="hover:bg-gray-50">En attente</SelectItem>
                    <SelectItem value="payé" className="hover:bg-gray-50">Payé</SelectItem>
                    <SelectItem value="annulé" className="hover:bg-gray-50">Annulé</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            <div className="space-y-6">
              {/* Articles List */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-base font-medium text-gray-900">Articles ajoutés</h3>
                </div>
                {formData.articles.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[300px]">Article</TableHead>
                          <TableHead className="text-right">Prix unitaire HT</TableHead>
                          <TableHead className="text-center">Quantité</TableHead>
                          <TableHead className="text-right">TVA</TableHead>
                          <TableHead className="text-right">Total TTC</TableHead>
                          <TableHead className="w-[50px]"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {formData.articles.map((article) => (
                          <TableRow key={article.id}>
                            <TableCell className="font-medium">{article.nom}</TableCell>
                            <TableCell className="text-right">{formatCurrency(article.prixUnitaireHT)} €</TableCell>
                            <TableCell className="text-center">{article.quantite}</TableCell>
                            <TableCell className="text-right">{article.tauxTVA}%</TableCell>
                            <TableCell className="text-right font-medium">{formatCurrency(article.montantTTC)} €</TableCell>
                            <TableCell className="text-right">
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-red-500 hover:bg-red-50"
                                onClick={() => removeArticle(article.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="p-6 text-center text-gray-500">
                    <p>Aucun article ajouté pour le moment</p>
                  </div>
                )}
              </div>

              {/* Add Article Form */}
              <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="search" className="text-sm font-medium text-gray-700">
                    Rechercher un article
                  </Label>
                  <Input 
                    placeholder="Rechercher..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="h-10 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="article" className="text-sm font-medium text-gray-700">
                    Article <span className="text-red-500">*</span>
                  </Label>
                  <Select 
                    value={selectedArticle}
                    onValueChange={setSelectedArticle}
                  >
                    <SelectTrigger className="h-10 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                      <SelectValue placeholder="Sélectionner un article" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-200 rounded-md shadow-lg">
                      {filteredArticles.map(article => (
                        <SelectItem key={article.id} value={article.id} className="hover:bg-gray-50">
                          {article.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantite" className="text-sm font-medium text-gray-700">
                    Quantité <span className="text-red-500">*</span>
                  </Label>
                  <Input 
                    type="number" 
                    min="1" 
                    value={quantite}
                    onChange={(e) => setQuantite(Number(e.target.value))}
                    required
                    className="h-10 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="prixUnitaire" className="text-sm font-medium text-gray-700">
                    Prix unitaire (HT) <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-500">€</span>
                    <Input 
                      type="number" 
                      min="0" 
                      step="0.01"
                      className="h-10 pl-8 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      value={prixUnitaire}
                      onChange={(e) => setPrixUnitaire(Number(e.target.value))}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tva" className="text-sm font-medium text-gray-700">
                    Taux de TVA (%) <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <span className="absolute right-3 top-2.5 text-gray-500">%</span>
                    <Input 
                      type="number" 
                      min="0" 
                      max="100"
                      value={tauxTVA}
                      onChange={(e) => setTauxTVA(Number(e.target.value))}
                      required
                      className="h-10 pr-8 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="flex items-end">
                  <Button 
                    type="button"
                    onClick={handleAddArticle}
                    disabled={!selectedArticle || quantite <= 0}
                    className="h-10 w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Ajouter l'article
                  </Button>
                </div>
              </div>
            </div>

            {/* Liste des articles ajoutés */}
            {formData.articles.length > 0 ? (
              <div className="border border-[#e2e8f0] rounded-md overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Article</TableHead>
                      <TableHead className="text-right">Prix unitaire</TableHead>
                      <TableHead className="text-right">Quantité</TableHead>
                      <TableHead className="text-right">TVA</TableHead>
                      <TableHead className="text-right">Total HT</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {formData.articles.map((article) => (
                      <TableRow key={article.id}>
                        <TableCell>{article.nom}</TableCell>
                        <TableCell className="text-right">{formatCurrency(article.prixUnitaireHT)}</TableCell>
                        <TableCell className="text-right">{article.quantite}</TableCell>
                        <TableCell className="text-right">{article.tauxTVA}%</TableCell>
                        <TableCell className="text-right">{formatCurrency(article.montantHT)}</TableCell>
                        <TableCell className="text-right">
                          <Button 
                            type="button" 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-destructive"
                            onClick={() => removeArticle(article.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Supprimer</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {/* Total */}
                <div className="border-t p-4">
                  <div className="flex justify-end">
                    <div className="w-64 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total HT :</span>
                        <span className="font-medium">
                          {formatCurrency(formData.articles.reduce((sum, a) => sum + a.montantHT, 0))}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">TVA :</span>
                        <span>
                          {formatCurrency(formData.articles.reduce((sum, a) => sum + a.tva, 0))}
                        </span>
                      </div>
                      <div className="flex justify-between pt-2 border-t font-semibold">
                        <span>Total TTC :</span>
                        <span className="text-lg">
                          {formatCurrency(calculateTotal())}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="border-2 border-dashed rounded-lg p-8 text-center">
                <p className="text-muted-foreground">Aucun article ajouté</p>
              </div>
            )}
          </div>

          <div className="space-y-2 mt-6">
            <Label htmlFor="notes" className="text-sm font-medium text-gray-700">
              Notes
            </Label>
            <Textarea 
              id="notes"
              placeholder="Notes supplémentaires..."
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              rows={3}
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 bg-white border-t border-gray-200 px-6 py-4">
          <div className="flex items-center justify-end w-full space-x-3">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="h-10 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Annuler
            </Button>
            <Button 
              type="submit" 
              className="h-10 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              disabled={formData.articles.length === 0}
            >
              Enregistrer l'achat
            </Button>
          </div>
        </div>
      </form>
    </DialogContent>
  </Dialog>
  );
};

export default AddCommandeForm;
