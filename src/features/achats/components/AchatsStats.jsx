import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, Clock, CheckCircle, XCircle, DollarSign, Package } from 'lucide-react';
import { formatCurrency } from '../utils/achatsHelpers';

export const AchatsStats = ({ stats, loading }) => {
  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="bg-[var(--color-surface)] border-[var(--color-border)] animate-pulse">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <div className="h-4 bg-[var(--color-border)] rounded w-24"></div>
              <div className="h-4 w-4 bg-[var(--color-border)] rounded"></div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-8 bg-[var(--color-border)] rounded w-16 mb-3"></div>
              <div className="h-3 bg-[var(--color-border)] rounded w-20"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  const { total, payes, enAttente, annules, montantTotal, montantMoyen } = stats || {};

  const statsCards = [
    {
      title: 'Commandes Total',
      value: total || 0,
      icon: Package,
      description: 'Commandes cette période',
      color: 'var(--color-blue)',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      title: 'Montant Total',
      value: formatCurrency(montantTotal || 0),
      icon: DollarSign,
      description: 'Valeur totale des achats',
      color: 'var(--color-success)',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      title: 'En Attente',
      value: enAttente || 0,
      icon: Clock,
      description: 'En attente de paiement',
      color: 'var(--color-warning)',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    },
    {
      title: 'Payés',
      value: payes || 0,
      icon: CheckCircle,
      description: 'Commandes réglées',
      color: 'var(--color-success)',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      title: 'Annulés',
      value: annules || 0,
      icon: XCircle,
      description: 'Commandes annulées',
      color: 'var(--color-error)',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200'
    }
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
      {statsCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card 
            key={index} 
            className={`bg-[var(--color-surface)] border-[var(--color-border)] shadow-sm hover:shadow-md transition-shadow duration-200 ${stat.borderColor} ${stat.bgColor}`}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-[var(--color-foreground)]">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg bg-white shadow-xs`}>
                <Icon className="h-4 w-4" style={{ color: stat.color }} />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-2xl font-bold text-[var(--color-foreground)] mb-1">
                {stat.value}
              </div>
              <p className="text-xs text-[var(--color-foreground-muted)] leading-relaxed">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default AchatsStats;
