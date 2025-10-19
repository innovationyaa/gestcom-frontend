import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Search,
  Filter,
  Download,
  CheckCircle,
  Clock,
  XCircle,
  Eye,
  Edit,
  Printer,
  FileText,
} from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

// UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/DataTable";
import { SimpleDateRangePicker } from "@/components/ui/simple-date-range-picker";
import centralDataService from "@/services/centralDataService";
import { DetailModal, FactureDetailModal } from "@/components/modals";

export const STATUT_FACTURE = {
  PAYEE: "payee",
  EN_ATTENTE: "en_attente",
  EN_RETARD: "en_retard",
  ANNULEE: "annulee",
};

const getStatusBadge = (status, dateEcheance) => {
  const isLate =
    status === STATUT_FACTURE.EN_RETARD ||
    (status === STATUT_FACTURE.PAYEE && new Date(dateEcheance) < new Date());

  if (isLate) {
    return (
      <Badge
        variant="secondary"
        className="bg-[var(--color-error)] bg-opacity-10 text-[var(--color-error)] border border-[var(--color-error)] border-opacity-20"
      >
        <Clock className="h-3 w-3 mr-1" />
        En retard
      </Badge>
    );
  }

  switch (status) {
    case STATUT_FACTURE.PAYEE:
      return (
        <Badge
          variant="secondary"
          className="bg-[var(--color-success)] bg-opacity-10 text-[var(--color-success)] border border-[var(--color-success)] border-opacity-20"
        >
          <CheckCircle className="h-3 w-3 mr-1" />
          Payée
        </Badge>
      );
    case STATUT_FACTURE.BROUILLON:
      return (
        <Badge
          variant="secondary"
          className="bg-[var(--color-warning)] bg-opacity-10 text-[var(--color-warning)] border border-[var(--color-warning)] border-opacity-20"
        >
          <FileText className="h-3 w-3 mr-1" />
          Brouillon
        </Badge>
      );
    case STATUT_FACTURE.ANNULEE:
      return (
        <Badge
          variant="secondary"
          className="bg-[var(--color-error)] bg-opacity-10 text-[var(--color-error)] border border-[var(--color-error)] border-opacity-20"
        >
          <XCircle className="h-3 w-3 mr-1" />
          Annulée
        </Badge>
      );
    default:
      return <Badge variant="outline">Statut inconnu</Badge>;
  }
};

const Factures = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [factures, setFactures] = useState([]);
  const [filteredFactures, setFilteredFactures] = useState([]);
  const [dateRange, setDateRange] = useState({
    from: undefined,
    to: undefined,
  });
  const [selectedFacture, setSelectedFacture] = useState(null);
  const [showFactureModal, setShowFactureModal] = useState(false);
  useEffect(() => {
    // Load data from central service
    const loadFactures = async () => {
      try {
        setLoading(true);
        const facturesData = await centralDataService.getFactures();
        setFactures(facturesData);
        setFilteredFactures(facturesData);
      } catch (error) {
        console.error("Error loading factures:", error);
      } finally {
        setLoading(false);
      }
    };

    loadFactures();
  }, []);
  useEffect(() => {
    // Filter factures based on search term, date range, and status
    let filtered = factures.filter(
      (facture) =>
        facture.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
        facture.fournisseur.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Apply status filter
    if (statusFilter && statusFilter !== "all") {
      filtered = filtered.filter((facture) => facture.statut === statusFilter);
    }

    // Apply date range filter if both dates are selected
    if (dateRange.from && dateRange.to) {
      filtered = filtered.filter((facture) => {
        const factureDate = new Date(facture.date);
        return factureDate >= dateRange.from && factureDate <= dateRange.to;
      });
    }

    setFilteredFactures(filtered);
  }, [factures, searchTerm, dateRange, statusFilter]);
  const handleViewFacture = (facture) => {
    setSelectedFacture(facture);
    setShowFactureModal(true);
  };
  const handleCloseFactureModal = () => {
    setShowFactureModal(false);
    setSelectedFacture(null);
  };

  const handleSaveFacture = async (updatedFacture) => {
    try {
      // TODO: Implement update facture service call
      console.log("Saving updated facture:", updatedFacture);
      // Reload factures after update
      const facturesData = await centralDataService.getFactures();
      setFactures(facturesData);
      setFilteredFactures(facturesData);
      return { success: true };
    } catch (error) {
      console.error("Error updating facture:", error);
      return { success: false, error: error.message };
    }
  };

  const handleRowClick = (facture) => {
    handleViewFacture(facture);
  };

  const handleDownloadFacture = (facture) => {
    console.log("Download facture:", facture.id);
    // Implement download logic
  };

  const handlePrintFacture = (facture) => {
    console.log("Print facture:", facture.id);
    // Implement print logic
  };
  const handleNewFacture = () => {
    navigate("/commandes/factures/nouvelle");
  };

  const getTotalFactures = (status) => {
    if (status === "toutes") return factures.length;
    return factures.filter((f) => f.statut === status).length;
  };

  const columns = [
    {
      header: "Numéro",
      accessor: "numero",
    },
    {
      header: "Fournisseur",
      accessor: "fournisseur",
      cell: (row) => row.fournisseur || "N/A",
    },
    {
      header: "Date",
      accessor: "date",
      cell: (row) => format(new Date(row.date), "dd/MM/yyyy", { locale: fr }),
    },
    {
      header: "Échéance",
      accessor: "dateEcheance",
      cell: (row) =>
        format(new Date(row.dateEcheance), "dd/MM/yyyy", { locale: fr }),
    },
    {
      header: "Montant TTC",
      accessor: "montantTTC",
      align: "right",
      cell: (row) =>
        new Intl.NumberFormat("fr-FR", {
          style: "currency",
          currency: "EUR",
        }).format(row.montantTTC || 0),
    },
    {
      header: "Statut",
      accessor: "statut",
      cell: (row) => getStatusBadge(row.statut, row.dateEcheance),
    },
    {
      header: "Actions",
      accessor: "actions",
      align: "right",
      cell: (row) => (
        <div className="flex justify-end gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              handleViewFacture(row);
            }}
            className="h-8 w-8 p-0 hover:bg-[var(--color-blue)] hover:bg-opacity-10 hover:text-[var(--color-blue)]"
          >
            <Eye className="h-4 w-4" />
          </Button>{" "}
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              handleDownloadFacture(row);
            }}
            className="h-8 w-8 p-0 hover:bg-[var(--color-success)] hover:bg-opacity-10 hover:text-[var(--color-success)]"
          >
            <Download className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              handlePrintFacture(row);
            }}
            className="h-8 w-8 p-0 hover:bg-[var(--color-warning)] hover:bg-opacity-10 hover:text-[var(--color-warning)]"
          >
            <Printer className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-8 p-4">
      {/* En-tête de la page */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-[var(--color-foreground)] text-xl font-semibold">
            Factures Fournisseurs
          </h1>
          <p className="text-[var(--color-foreground-muted)] text-xs">
            Gérez et suivez vos factures fournisseurs en temps réel
          </p>
        </div>{" "}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="bg-white hover:bg-gray-50 text-gray-700 border-gray-300"
          >
            <Download className="h-4 w-4 mr-1" />
            Exporter
          </Button>
          <Button
            size="sm"
            onClick={handleNewFacture}
            className="bg-[var(--color-blue)] hover:bg-[var(--color-blue)]/90 text-white"
          >
            <Plus className="h-4 w-4 mr-1" />
            Nouvelle facture
          </Button>
        </div>
      </div>

      {/* Liste des Factures */}
      <div className="bg-white rounded-lg border border-[var(--color-border)] shadow-sm p-6 w-full">
        <h2 className="text-base font-medium text-[var(--color-foreground)] mb-4">
          Liste des Factures
        </h2>{" "}
        <div className="space-y-4">
          {/* Search and Filters Container */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-foreground-muted)]" />
              <Input
                placeholder="Rechercher une facture..."
                className="pl-9 bg-[var(--color-surface)] border-[var(--color-border)] focus:border-[var(--color-blue)] focus:ring-2 focus:ring-[var(--color-blue)]/20"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>{" "}
            {/* Filters */}
            <div className="flex items-center gap-3">
              {/* Date Range Picker */}
              <SimpleDateRangePicker
                date={dateRange}
                setDate={setDateRange}
                className="w-auto"
              />

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
                    value="payee"
                    className="text-[var(--color-foreground)] focus:bg-[var(--color-blue)] focus:bg-opacity-10 focus:text-[var(--color-blue)]"
                  >
                    Payées
                  </SelectItem>
                  <SelectItem
                    value="en_retard"
                    className="text-[var(--color-foreground)] focus:bg-[var(--color-blue)] focus:bg-opacity-10 focus:text-[var(--color-blue)]"
                  >
                    En retard
                  </SelectItem>{" "}
                  <SelectItem
                    value="en_attente"
                    className="text-[var(--color-foreground)] focus:bg-[var(--color-blue)] focus:bg-opacity-10 focus:text-[var(--color-blue)]"
                  >
                    En attente
                  </SelectItem>
                  <SelectItem
                    value="annulee"
                    className="text-[var(--color-foreground)] focus:bg-[var(--color-blue)] focus:bg-opacity-10 focus:text-[var(--color-blue)]"
                  >
                    Annulées
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Tableau des factures */}
          <div className="rounded-lg border border-[var(--color-border)] overflow-hidden">
            <DataTable
              columns={columns}
              data={filteredFactures}
              loading={loading}
              onRowClick={handleRowClick}
              emptyMessage="Aucune facture trouvée. Commencez par ajouter une nouvelle facture."
              rowClassName="cursor-pointer hover:bg-[var(--color-background)]"
            />{" "}
          </div>
        </div>
      </div>

      {/* Facture Detail Modal */}
      <DetailModal
        isOpen={showFactureModal}
        onClose={handleCloseFactureModal}
        title="Détail de la Facture"
        size="large"
      >
        {" "}
        <FactureDetailModal
          facture={selectedFacture}
          onClose={handleCloseFactureModal}
          onDownload={(facture) => {
            console.log("Download facture:", facture);
            handleDownloadFacture(facture);
          }}
          onPrint={(facture) => {
            console.log("Print facture:", facture);
            handlePrintFacture(facture);
          }}
          onSendEmail={(facture) => {
            console.log("Send email facture:", facture);
            // TODO: Implement email functionality
          }}
        />
      </DetailModal>
    </div>
  );
};

export default Factures;
