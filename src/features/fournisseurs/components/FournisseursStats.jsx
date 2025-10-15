import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, Users, UserX, Shield, TrendingUp } from "lucide-react";

export function FournisseursStats({ stats, loading }) {
  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(amount);
  };

  const statsCards = [
    {
      title: "Total Fournisseurs",
      value: stats.total,
      icon: Building,
      description: "Fournisseurs enregistrés",
      color: "var(--color-blue)",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      title: "Fournisseurs Actifs",
      value: stats.actifs,
      icon: Users,
      description: `${stats.total ? Math.round((stats.actifs / stats.total) * 100) : 0}% du total`,
      color: "var(--color-success)",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
    },
    {
      title: "Inactifs/Suspendus",
      value: stats.inactifs + stats.suspendus,
      icon: UserX,
      description: `${stats.inactifs} inactifs, ${stats.suspendus} suspendus`,
      color: "var(--color-warning)",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
    },
    {
      title: "Chiffre d'Affaires",
      value: formatCurrency(stats.totalChiffreAffaires),
      icon: TrendingUp,
      description: "Total des transactions",
      color: "var(--color-purple)",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      isAmount: true,
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {statsCards.map((stat, index) => {
        const Icon = stat.icon;
        return (          <Card
            key={index}
            className={`bg-[var(--color-surface)] border-[var(--color-border)] shadow-sm hover:shadow-md transition-shadow duration-200 ${stat.bgColor} ${stat.borderColor}`}
          ><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-[var(--color-foreground)]">
                {stat.title}
              </CardTitle>
              <div className="p-2 rounded-lg bg-white shadow-xs">
                <Icon className="h-4 w-4" style={{ color: stat.color }} />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-2xl font-bold text-[var(--color-foreground)] mb-1">
                {stat.isAmount
                  ? stat.value
                  : stat.value.toLocaleString("fr-FR")}
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
}
