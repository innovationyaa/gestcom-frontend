import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Filter, RotateCcw } from 'lucide-react';
import { STATUT_ACHAT } from '../utils/constants';

export function AchatsFilters({ filters, achats, onFilterChange, onReset }) {
  // Get unique suppliers from achats
  const fournisseurs = React.useMemo(() => {
    const suppliers = new Set();
    achats.forEach(achat => {
      if (achat.fournisseur?.nom) {
        suppliers.add(achat.fournisseur.nom);
      }
    });
    return Array.from(suppliers).sort();
  }, [achats]);


  return (
    <Card className="bg-[var(--color-surface)] border-[var(--color-border)] shadow-sm">
      <CardHeader className="pb-4 pt-4">
        <h3 className="text-base font-medium text-[var(--color-foreground)]">
          Filtres et Recherche
        </h3>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Search */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-[var(--color-foreground)]">
              Rechercher
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <Search className="h-4 w-4 text-[var(--color-foreground-muted)]" />
              </div>
              <Input
                placeholder="Référence, fournisseur..."
                value={filters.search || ''}
                onChange={(e) => onFilterChange('search', e.target.value)}
                className="pl-10 bg-[var(--color-surface)] border-[var(--color-border)] focus:border-[var(--color-blue)] focus:ring-2 focus:ring-[var(--color-blue)]/20"
              />
            </div>
          </div>

          {/* Status */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-[var(--color-foreground)]">
              Statut
            </label>
            <Select 
              value={filters.statut || 'all'} 
              onValueChange={(value) => onFilterChange('statut', value === 'all' ? '' : value)}
            >
              <SelectTrigger className="bg-[var(--color-surface)] border-[var(--color-border)] focus:border-[var(--color-blue)] focus:ring-2 focus:ring-[var(--color-blue)]/20">
                <SelectValue placeholder="Tous les statuts" />
              </SelectTrigger>
              <SelectContent className="bg-[var(--color-surface)] border-[var(--color-border)]">
                <SelectItem value="all" className="text-[var(--color-foreground-muted)] focus:bg-[var(--color-blue)] focus:bg-opacity-10 focus:text-[var(--color-blue)]">
                  Tous les statuts
                </SelectItem>
                <SelectItem 
                  value={STATUT_ACHAT.PAYE}
                  className="text-[var(--color-foreground)] focus:bg-[var(--color-blue)] focus:bg-opacity-10 focus:text-[var(--color-blue)]"
                >
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full mr-2 bg-green-500" />
                    Payé
                  </div>
                </SelectItem>
                <SelectItem 
                  value={STATUT_ACHAT.EN_ATTENTE}
                  className="text-[var(--color-foreground)] focus:bg-[var(--color-blue)] focus:bg-opacity-10 focus:text-[var(--color-blue)]"
                >
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full mr-2 bg-yellow-500" />
                    En attente
                  </div>
                </SelectItem>
                <SelectItem 
                  value={STATUT_ACHAT.ANNULE}
                  className="text-[var(--color-foreground)] focus:bg-[var(--color-blue)] focus:bg-opacity-10 focus:text-[var(--color-blue)]"
                >
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full mr-2 bg-red-500" />
                    Annulé
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Supplier */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-[var(--color-foreground)]">
              Fournisseur
            </label>
            <Select 
              value={filters.fournisseur} 
              onValueChange={(value) => onFilterChange('fournisseur', value)}
            >
              <SelectTrigger className="bg-[var(--color-surface)] border-[var(--color-border)] focus:border-[var(--color-blue)] focus:ring-2 focus:ring-[var(--color-blue)]/20">
                <SelectValue placeholder="Tous les fournisseurs" />
              </SelectTrigger>
              <SelectContent className="bg-[var(--color-surface)] border-[var(--color-border)]">
                <SelectItem value="all" className="text-[var(--color-foreground-muted)] focus:bg-[var(--color-blue)] focus:bg-opacity-10 focus:text-[var(--color-blue)]">
                  Tous les fournisseurs
                </SelectItem>
                {fournisseurs.map(fournisseur => (
                  <SelectItem key={fournisseur} value={fournisseur} className="text-[var(--color-foreground)] focus:bg-[var(--color-blue)] focus:bg-opacity-10 focus:text-[var(--color-blue)]">
                    {fournisseur}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Trier */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-[var(--color-foreground)]">
              Trier par
            </label>
            <Select 
              value={filters.sortBy || 'date-desc'}
              onValueChange={(value) => onFilterChange('sortBy', value)}
            >
              <SelectTrigger className="bg-[var(--color-surface)] border-[var(--color-border)] focus:border-[var(--color-blue)] focus:ring-2 focus:ring-[var(--color-blue)]/20">
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent className="bg-[var(--color-surface)] border-[var(--color-border)]">
                <SelectItem value="date-desc" className="text-[var(--color-foreground)] focus:bg-[var(--color-blue)] focus:bg-opacity-10 focus:text-[var(--color-blue)]">
                  Date (récent au plus ancien)
                </SelectItem>
                <SelectItem value="date-asc" className="text-[var(--color-foreground)] focus:bg-[var(--color-blue)] focus:bg-opacity-10 focus:text-[var(--color-blue)]">
                  Date (ancien au plus récent)
                </SelectItem>
                <SelectItem value="montant-desc" className="text-[var(--color-foreground)] focus:bg-[var(--color-blue)] focus:bg-opacity-10 focus:text-[var(--color-blue)]">
                  Montant (décroissant)
                </SelectItem>
                <SelectItem value="montant-asc" className="text-[var(--color-foreground)] focus:bg-[var(--color-blue)] focus:bg-opacity-10 focus:text-[var(--color-blue)]">
                  Montant (croissant)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center mt-6 pt-6 border-t border-[var(--color-border)]">
          <div className="text-sm text-[var(--color-foreground-muted)]">
            {achats.length} {achats.length !== 1 ? 'achats trouvés' : 'achat trouvé'}
          </div>
          <Button
            variant="outline"
            onClick={onReset}
            className="w-full sm:w-auto bg-[var(--color-surface)] border-[var(--color-border)] hover:bg-[var(--color-background)] text-[var(--color-foreground)]"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Réinitialiser
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default AchatsFilters;
