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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Package,
  ShoppingCart,
  Users,
  TrendingUp,
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  XCircle,
  Search,
} from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import centralDataService from "@/services/centralDataService";
import { DetailModal } from "@/components/modals";

export default function Dashboard() {
  // State for filters and data
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [recentOrders, setRecentOrders] = useState([]);
  const [alerts, setAlertes] = useState([]);
  const [dashboardStats, setDashboardStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCommande, setSelectedCommande] = useState(null);
  const [showCommandeModal, setShowCommandeModal] = useState(false);

  // Load data from central service
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        const [ordersData, alertsData, statsData] = await Promise.all([
          centralDataService.getRecentOrders(5),
          centralDataService.getAlertes(),
          centralDataService.getDashboardStats(),
        ]);

        setRecentOrders(ordersData);
        setAlertes(alertsData);
        setDashboardStats(statsData);
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const stats = [
    {
      title: "Articles en Stock",
      value: dashboardStats?.articlesEnStock || "245",
      icon: Package,
      description: "Total des articles en stock",
      color: "var(--color-blue)",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      trend: dashboardStats?.tendances?.articlesEnStock?.trend || "up",
      change:
        dashboardStats?.tendances?.articlesEnStock?.change ||
        "+12% vs mois dernier",
    },
    {
      title: "Commandes du Jour",
      value: dashboardStats?.commandesDuJour || "23",
      icon: ShoppingCart,
      description: "Nouvelles commandes aujourd'hui",
      color: "var(--color-green)",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      trend: dashboardStats?.tendances?.commandesDuJour?.trend || "up",
      change:
        dashboardStats?.tendances?.commandesDuJour?.change || "+8% vs hier",
    },
    {
      title: "Clients Actifs",
      value: dashboardStats?.clientsActifs || "89",
      icon: Users,
      description: "Clients actifs ce mois-ci",
      color: "var(--color-purple)",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      trend: dashboardStats?.tendances?.clientsActifs?.trend || "down",
      change:
        dashboardStats?.tendances?.clientsActifs?.change ||
        "-15% vs mois dernier",
    },
    {
      title: "Chiffre d'Affaires",
      value: `€${dashboardStats?.chiffreAffaires?.toLocaleString("fr-FR") || "12,450"}`,
      icon: TrendingUp,
      description: "CA du mois en cours",
      color: "var(--color-orange)",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      trend: dashboardStats?.tendances?.chiffreAffaires?.trend || "up",
      change:
        dashboardStats?.tendances?.chiffreAffaires?.change ||
        "+23% vs mois dernier",
    },
  ]; // Filter orders based on search and status
  const filteredOrders = useMemo(() => {
    return recentOrders.filter((order) => {
      const matchesSearch =
        !searchTerm ||
        (order.reference || `CMD-${order.id.toString().padStart(4, "0")}`)
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        order.fournisseur.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        !statusFilter ||
        statusFilter === "all" ||
        order.statut === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [recentOrders, searchTerm, statusFilter]);

  const handleCommandeClick = (commande) => {
    setSelectedCommande(commande);
    setShowCommandeModal(true);
  };

  const handleCloseCommandeModal = () => {
    setShowCommandeModal(false);
    setSelectedCommande(null);
  };
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
      </div>{" "}
      {/* Recent Orders Table */}
      <div className="bg-white rounded-lg border border-[var(--color-border)] shadow-sm p-6 w-full">
        <h2 className="text-base font-medium text-[var(--color-foreground)] mb-4">
          Commandes Récentes
        </h2>

        {/* Search and Filters Container */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-foreground-muted)]" />
            <Input
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 bg-[var(--color-surface)] border-[var(--color-border)] focus:border-[var(--color-blue)] focus:ring-2 focus:ring-[var(--color-blue)]/20"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-3">
            {/* Status filter */}
            <Select
              value={statusFilter || "all"}
              onValueChange={setStatusFilter}
            >
              <SelectTrigger className="w-[140px] bg-[var(--color-surface)] border-[var(--color-border)] focus:border-[var(--color-blue)] focus:ring-2 focus:ring-[var(--color-blue)]/20">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent className="bg-[var(--color-surface)] border-[var(--color-border)]">
                <SelectItem
                  value="all"
                  className="text-[var(--color-foreground-muted)] focus:bg-[var(--color-blue)] focus:bg-opacity-10 focus:text-[var(--color-blue)]"
                >
                  Tous les statuts
                </SelectItem>
                <SelectItem
                  value="completed"
                  className="text-[var(--color-foreground)] focus:bg-[var(--color-blue)] focus:bg-opacity-10 focus:text-[var(--color-blue)]"
                >
                  Complétée
                </SelectItem>
                <SelectItem
                  value="processing"
                  className="text-[var(--color-foreground)] focus:bg-[var(--color-blue)] focus:bg-opacity-10 focus:text-[var(--color-blue)]"
                >
                  En cours
                </SelectItem>
                <SelectItem
                  value="pending"
                  className="text-[var(--color-foreground)] focus:bg-[var(--color-blue)] focus:bg-opacity-10 focus:text-[var(--color-blue)]"
                >
                  En attente
                </SelectItem>
                <SelectItem
                  value="failed"
                  className="text-[var(--color-foreground)] focus:bg-[var(--color-blue)] focus:bg-opacity-10 focus:text-[var(--color-blue)]"
                >
                  Échouée
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="rounded-lg border border-[var(--color-border)] overflow-hidden">
          <Table>
            {" "}
            <TableHeader>
              <TableRow>
                <TableHead>Référence</TableHead>
                <TableHead>Fournisseur</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>{" "}
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow
                  key={order.id}
                  className="cursor-pointer hover:bg-[var(--color-background)] transition-colors"
                  onClick={() => handleCommandeClick(order)}
                >
                  <TableCell className="font-medium">
                    {order.reference ||
                      `CMD-${order.id.toString().padStart(4, "0")}`}
                  </TableCell>
                  <TableCell>{order.fournisseur}</TableCell>
                  <TableCell>
                    €{(order.montantTTC || order.montantTotal || 0).toFixed(2)}
                  </TableCell>
                  <TableCell>{getStatusBadge(order.statut)}</TableCell>
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
            const getAlertIcon = (type) => {
              switch (type) {
                case "warning":
                  return AlertTriangle;
                case "error":
                  return XCircle;
                case "info":
                  return CheckCircle2;
                default:
                  return AlertTriangle;
              }
            };

            const getAlertColor = (type) => {
              switch (type) {
                case "warning":
                  return "text-[var(--color-orange)]";
                case "error":
                  return "text-[var(--color-red)]";
                case "info":
                  return "text-[var(--color-blue)]";
                default:
                  return "text-[var(--color-orange)]";
              }
            };
            const getAlertBgColor = (type) => {
              switch (type) {
                case "warning":
                  return "bg-[var(--color-orange)]/10";
                case "error":
                  return "bg-[var(--color-red)]/10";
                case "info":
                  return "bg-[var(--color-blue)]/10";
                default:
                  return "bg-[var(--color-orange)]/10";
              }
            };

            const getAlertBorderColor = (type) => {
              switch (type) {
                case "warning":
                  return "border-orange-200";
                case "error":
                  return "border-red-200";
                case "info":
                  return "border-blue-200";
                default:
                  return "border-orange-200";
              }
            };

            const Icon = getAlertIcon(alert.type);

            return (
              <div
                key={index}
                className={`p-4 rounded-lg ${getAlertBgColor(alert.type)} ${getAlertBorderColor(alert.type)} border`}
              >
                <div className="flex items-start space-x-3">
                  <Icon
                    className={`h-5 w-5 mt-0.5 ${getAlertColor(alert.type)}`}
                  />
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-[var(--color-foreground)]">
                      {alert.titre}
                    </h4>
                    <p className="mt-0.5 text-sm text-[var(--color-foreground-muted)]">
                      {alert.message}
                    </p>
                  </div>
                  <span className="text-xs text-[var(--color-foreground-muted)]">
                    {alert.heure}
                  </span>
                </div>
              </div>
            );
          })}{" "}
        </div>
      </div>{" "}
      {/* Order Detail Modal */}
      <DetailModal
        isOpen={showCommandeModal}
        onClose={handleCloseCommandeModal}
        title="Détail de la Commande"
        size="large"
      >
        {selectedCommande && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-[var(--color-foreground-muted)]">
                  Référence
                </label>
                <p className="text-[var(--color-foreground)]">
                  {selectedCommande.reference ||
                    `CMD-${selectedCommande.id?.toString().padStart(4, "0")}`}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-[var(--color-foreground-muted)]">
                  Fournisseur
                </label>
                <p className="text-[var(--color-foreground)]">
                  {selectedCommande.fournisseur}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-[var(--color-foreground-muted)]">
                  Montant
                </label>
                <p className="text-[var(--color-foreground)]">
                  €
                  {(
                    selectedCommande.montantTTC ||
                    selectedCommande.montantTotal ||
                    0
                  ).toFixed(2)}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-[var(--color-foreground-muted)]">
                  Statut
                </label>
                <p className="text-[var(--color-foreground)]">
                  {selectedCommande.statut}
                </p>
              </div>
              {selectedCommande.date && (
                <div>
                  <label className="text-sm font-medium text-[var(--color-foreground-muted)]">
                    Date
                  </label>
                  <p className="text-[var(--color-foreground)]">
                    {selectedCommande.date}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </DetailModal>
    </div>
  );
}
