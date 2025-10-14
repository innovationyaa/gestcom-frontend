import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Search, Filter, RotateCcw } from 'lucide-react'
import { STOCK_CATEGORIES, SORT_OPTIONS } from '../utils/constants'
import { getFilterOptions } from '../utils/stockHelpers'

export function StockFilters({ filters, stockItems, onFilterChange, onReset }) {
  const fournisseurs = getFilterOptions(stockItems, 'fournisseur')

  return (
    <Card className="bg-[var(--color-surface)] border-[var(--color-border)] shadow-sm">
      <CardHeader className="pb-4 pt-4">
        <h3 className="text-base font-medium text-[var(--color-foreground)]">
          Filtres et Recherche
        </h3>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Recherche */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-[var(--color-foreground)]">
              Rechercher
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <Search className="h-4 w-4 text-[var(--color-foreground-muted)]" />
              </div>
              <Input
                placeholder="Référence, nom, catégorie..."
                value={filters.search}
                onChange={(e) => onFilterChange('search', e.target.value)}
                className="pl-10 bg-[var(--color-surface)] border-[var(--color-border)] focus:border-[var(--color-blue)] focus:ring-2 focus:ring-[var(--color-blue)]/20"
              />
            </div>
          </div>

          {/* Catégorie */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-[var(--color-foreground)]">
              Catégorie
            </label>
            <Select value={filters.categorie} onValueChange={(value) => onFilterChange('categorie', value)}>
              <SelectTrigger className="bg-[var(--color-surface)] border-[var(--color-border)] focus:border-[var(--color-blue)] focus:ring-2 focus:ring-[var(--color-blue)]/20">
                <SelectValue placeholder="Toutes les catégories" />
              </SelectTrigger>
              <SelectContent className="bg-[var(--color-surface)] border-[var(--color-border)]">
                <SelectItem value="all" className="text-[var(--color-foreground-muted)] focus:bg-[var(--color-blue)] focus:bg-opacity-10 focus:text-[var(--color-blue)]">
                  Toutes les catégories
                </SelectItem>
                {STOCK_CATEGORIES.map(categorie => (
                  <SelectItem key={categorie} value={categorie} className="text-[var(--color-foreground)] focus:bg-[var(--color-blue)] focus:bg-opacity-10 focus:text-[var(--color-blue)]">
                    {categorie}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Fournisseur */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-[var(--color-foreground)]">
              Fournisseur
            </label>
            <Select value={filters.fournisseur} onValueChange={(value) => onFilterChange('fournisseur', value)}>
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

          {/* Tri */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-[var(--color-foreground)]">
              Trier par
            </label>
            <Select value={filters.sortBy} onValueChange={(value) => onFilterChange('sortBy', value)}>
              <SelectTrigger className="bg-[var(--color-surface)] border-[var(--color-border)] focus:border-[var(--color-blue)] focus:ring-2 focus:ring-[var(--color-blue)]/20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[var(--color-surface)] border-[var(--color-border)]">
                {SORT_OPTIONS.map(option => (
                  <SelectItem key={option.value} value={option.value} className="text-[var(--color-foreground)] focus:bg-[var(--color-blue)] focus:bg-opacity-10 focus:text-[var(--color-blue)]">
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Boutons d'action */}
        <div className="flex justify-between items-center mt-6 pt-6 border-t border-[var(--color-border)]">
          <div className="text-sm text-[var(--color-foreground-muted)]">
            {stockItems.length} article(s) trouvé(s)
          </div>
          <Button
            variant="outline"
            onClick={onReset}
            className="flex items-center gap-2 border-[var(--color-border)] hover:bg-[var(--color-background)] hover:border-[var(--color-border-strong)] transition-colors duration-200"
          >
            <RotateCcw className="h-4 w-4" />
            Réinitialiser
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
