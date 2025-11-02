// filepath: src/features/achats/components/InvoiceStats.jsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Clock, CheckCircle, DollarSign } from "lucide-react";
import { formatCurrency } from "../utils/helpers";

export const InvoiceStats = ({ stats, loading }) => {
  if (loading) {
    return (
      <div className="grid gap-4 sm:gap-6 grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card
            key={i}
            className="bg-[var(--color-surface)] border-[var(--color-border)] animate-pulse"
          >
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
    );
  }

  const statsCards = [
    {
      title: "Factures ce mois",
      value: stats.thisMonth || 0,
      icon: FileText,
      description: `${stats.total || 0} au total`,
      color: "var(--color-blue)",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      title: "En attente",
      value: stats.pending || 0,
      icon: Clock,
      description: "À régler",
      color: "var(--color-warning)",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
    },
    {
      title: "Payées",
      value: stats.paid || 0,
      icon: CheckCircle,
      description: "Réglées",
      color: "var(--color-success)",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
    },
    {
      title: "Total ce mois",
      value: formatCurrency(stats.totalAmount || 0),
      icon: DollarSign,
      description: "Montant total",
      color: "var(--color-blue)",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
  ];

  return (
    <div className="grid gap-4 sm:gap-6 grid-cols-2 lg:grid-cols-4">
      {statsCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card
            key={index}
            className={`bg-[var(--color-surface)] border-[var(--color-border)] shadow-sm hover:shadow-md transition-shadow duration-200 ${stat.borderColor} ${stat.bgColor}`}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-xs sm:text-sm font-medium text-[var(--color-foreground)]">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg bg-white shadow-xs`}>
                <Icon className="h-4 w-4" style={{ color: stat.color }} />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-xl sm:text-2xl font-bold text-[var(--color-foreground)] mb-1">
                {stat.value}
              </div>
              <p className="text-xs text-[var(--color-foreground-muted)]">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
