import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Package,
  ShoppingCart,
  Users,
  TrendingUp,
  AlertTriangle,
  ArrowUpRight,
  Download,
  FileText,
  CheckCircle,
  Clock,
  XCircle,
  CheckCircle2,
  AlertCircle,
  Plus,
  Search,
  BarChart3,
  FileBarChart2,
  Box,
  ListChecks,
  RefreshCw,
  ArrowRight,
} from "lucide-react";

export default function Dashboard() {
  // Sample data for recent orders
  const recentOrders = [
    {
      id: "#ORD-001",
      customer: "Jean Dupont",
      amount: "€245.50",
      status: "completed",
      date: "2023-10-10",
    },
    {
      id: "#ORD-002",
      customer: "Marie Martin",
      amount: "€189.00",
      status: "processing",
      date: "2023-10-09",
    },
    {
      id: "#ORD-003",
      customer: "Pierre Durand",
      amount: "€320.75",
      status: "pending",
      date: "2023-10-09",
    },
    {
      id: "#ORD-004",
      customer: "Sophie Lambert",
      amount: "€156.20",
      status: "completed",
      date: "2023-10-08",
    },
    {
      id: "#ORD-005",
      customer: "Thomas Leroy",
      amount: "€278.90",
      status: "failed",
      date: "2023-10-07",
    },
  ];

  // Sample data for alerts
  const alerts = [
    {
      type: "warning",
      title: "Stock faible",
      message: "3 articles en rupture de stock",
      icon: AlertTriangle,
      color: "text-[var(--color-orange)]",
      bgColor: "bg-[var(--color-orange)]/10",
      time: "Il y a 2h",
    },
  ];

  const stats = [
    {
      title: "Articles en Stock",
      value: "245",
      icon: Package,
      description: "Total des articles en stock",
      color: "var(--color-blue)",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      trend: "up",
      change: "+12% vs mois dernier",
    },
    {
      title: "Commandes du Jour",
      value: "23",
      icon: ShoppingCart,
      description: "Nouvelles commandes aujourd'hui",
      color: "var(--color-green)",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      trend: "up",
      change: "+8% vs hier",
    },
    {
      title: "Clients Actifs",
      value: "89",
      icon: Users,
      description: "Clients actifs ce mois-ci",
      color: "var(--color-purple)",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      trend: "down",
      change: "15% vs mois dernier",
    },
    {
      title: "Chiffre d'Affaires",
      value: "€12,450",
      icon: TrendingUp,
      description: "CA du mois en cours",
      color: "var(--color-orange)",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      trend: "up",
      change: "+23% vs mois dernier",
    },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[var(--color-green)]/10 text-[var(--color-green)]">
            <CheckCircle2 className="mr-1 h-3 w-3" /> Complétée
          </span>
        );
      case "processing":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[var(--color-blue)]/10 text-[var(--color-blue)]">
            <Clock className="mr-1 h-3 w-3" /> En cours
          </span>
        );
      case "pending":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[var(--color-yellow)]/10 text-[var(--color-yellow)]">
            <Clock className="mr-1 h-3 w-3" /> En attente
          </span>
        );
      case "failed":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[var(--color-red)]/10 text-[var(--color-red)]">
            <XCircle className="mr-1 h-3 w-3" /> Échouée
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8 p-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-[var(--color-foreground)] text-xl font-semibold">
            Tableau de bord
          </h1>
          <p className="text-[var(--color-foreground-muted)] text-xs">
            Aperçu de votre activité et statistiques
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const isPositive = stat.trend === "up";

          return (
            <Card
              key={index}
              className={`bg-[var(--color-surface)] border-[var(--color-border)] shadow-sm hover:shadow-md transition-shadow duration-200 ${stat.borderColor} ${stat.bgColor}`}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-[var(--color-foreground)]">
                  {stat.title}
                </CardTitle>
                <div className="p-2 rounded-lg bg-white shadow-xs">
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
                <p
                  className={`text-xs mt-1 flex items-center ${isPositive ? "text-green-600" : "text-red-600"}`}
                >
                  {isPositive ? (
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                  ) : (
                    <ArrowUpRight className="h-3 w-3 mr-1 transform rotate-180" />
                  )}
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-lg border border-[var(--color-border)] shadow-sm p-6 w-full">
        <h2 className="text-base font-medium text-[var(--color-foreground)] mb-4">
          Commandes Récentes
        </h2>
        <div className="rounded-lg border border-[var(--color-border)] overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Référence</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.amount}</TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell>{order.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Alerts Section */}
      <div className="bg-white rounded-lg border border-[var(--color-border)] shadow-sm p-6 w-full">
        <h2 className="text-base font-medium text-[var(--color-foreground)] mb-4">
          Alertes
        </h2>
        <div className="space-y-3">
          {alerts.map((alert, index) => {
            const Icon = alert.icon;
            return (
              <div
                key={index}
                className={`p-4 rounded-lg border ${alert.bgColor} border-opacity-20`}
              >
                <div className="flex items-start space-x-3">
                  <Icon className={`h-5 w-5 mt-0.5 ${alert.color}`} />
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-[var(--color-foreground)]">
                      {alert.title}
                    </h4>
                    <p className="mt-0.5 text-sm text-[var(--color-foreground-muted)]">
                      {alert.message}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
