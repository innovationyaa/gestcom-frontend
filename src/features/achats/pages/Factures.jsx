import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  CheckCircle,
  Clock,
  XCircle,
  Eye,
  Printer,
  FileText,
} from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

// UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/ui/DataTable";

// Mock data - replace with real data from your API
const MOCK_FACTURES = [
  {
    id: 1,
    numero: "FAC-2023-001",
    fournisseur: { id: 1, nom: "Fournisseur A" },
    date: "2023-11-15",
    dateEcheance: "2023-12-15",
    montantHT: 1200,
    tva: 240,
    montantTTC: 1440,
    statut: "payee",
    notes: "",
  },
  {
    id: 2,
    numero: "FAC-2023-002",
    fournisseur: { id: 2, nom: "Fournisseur B" },
    date: "2023-11-20",
    dateEcheance: "2023-12-20",
    montantHT: 850,
    tva: 170,
    montantTTC: 1020,
    statut: "en_retard",
    notes: "À payer rapidement",
  },
  {
    id: 3,
    numero: "FAC-2023-003",
    fournisseur: { id: 3, nom: "Fournisseur C" },
    date: "2023-11-25",
    dateEcheance: "2024-01-10",
    montantHT: 2300,
    tva: 460,
    montantTTC: 2760,
    statut: "brouillon",
    notes: "Brouillon en attente de validation",
  },
  {
    id: 4,
    numero: "FAC-2023-004",
    fournisseur: { id: 1, nom: "Fournisseur A" },
    date: "2023-11-28",
    dateEcheance: "2023-12-28",
    montantHT: 650,
    tva: 130,
    montantTTC: 780,
    statut: "annulee",
    notes: "Commande annulée",
  },
];

export const STATUT_FACTURE = {
  PAYEE: "payee",
  EN_RETARD: "en_retard",
  ANNULEE: "annulee",
  BROUILLON: "brouillon",
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
  const [activeTab, setActiveTab] = useState("toutes");
  const [factures, setFactures] = useState([]);
  const [filteredFactures, setFilteredFactures] = useState([]);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setFactures(MOCK_FACTURES);
      setFilteredFactures(MOCK_FACTURES);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    // Filter factures based on search term
    const filtered = factures.filter(
      (facture) =>
        facture.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
        facture.fournisseur.nom.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFactures(filtered);
  }, [factures, searchTerm]);

  const handleViewFacture = (facture) => {
    console.log("View facture:", facture.id);
    // Implement view logic
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
    navigate("/achats/factures/nouvelle");
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
      cell: (row) => row.fournisseur?.nom || "N/A",
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
          </Button>
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

  const handleRowClick = (facture) => {
    handleViewFacture(facture);
  };

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
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="h-10">
            <Download className="mr-2 h-4 w-4" />
            Exporter
          </Button>
          <Button variant="outline" size="sm" className="h-10">
            <Upload className="mr-2 h-4 w-4" />
            Importer
          </Button>
          <Button onClick={handleNewFacture} className="h-10">
            <Plus className="mr-2 h-4 w-4" />
            Nouvelle facture
          </Button>
        </div>
      </div>

      {/* Liste des Factures */}
      <div className="bg-white rounded-lg border border-[var(--color-border)] shadow-sm p-6 w-full">
        <h2 className="text-base font-medium text-[var(--color-foreground)] mb-4">
          Liste des Factures
        </h2>
        <div className="space-y-4">
          {/* Filtres et recherche */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative w-full md:w-1/3">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Rechercher une facture..."
                className="pl-9 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="h-9">
                <Filter className="mr-2 h-4 w-4" />
                Filtres
              </Button>
            </div>
          </div>

          {/* Tableau avec onglets */}
          <div className="rounded-lg border border-[var(--color-border)] overflow-hidden">
            <Tabs defaultValue="toutes" className="space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-6 pt-4">
                <TabsList>
                  <TabsTrigger value="toutes">Toutes</TabsTrigger>
                  <TabsTrigger value="payee">Payées</TabsTrigger>
                  <TabsTrigger value="en_retard">En retard</TabsTrigger>
                  <TabsTrigger value="brouillon">Brouillons</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="toutes" className="p-0">
                <DataTable
                  columns={columns}
                  data={filteredFactures}
                  loading={loading}
                  onRowClick={handleRowClick}
                  emptyMessage="Aucune facture trouvée. Commencez par ajouter une nouvelle facture."
                  rowClassName="cursor-pointer hover:bg-[var(--color-background)]"
                />
              </TabsContent>
              <TabsContent value="payee" className="p-0">
                <DataTable
                  columns={columns}
                  data={filteredFactures.filter(
                    (f) => f.statut === STATUT_FACTURE.PAYEE
                  )}
                  loading={loading}
                  onRowClick={handleRowClick}
                  emptyMessage="Aucune facture payée trouvée."
                  rowClassName="cursor-pointer hover:bg-[var(--color-background)]"
                />
              </TabsContent>
              <TabsContent value="en_retard" className="p-0">
                <DataTable
                  columns={columns}
                  data={filteredFactures.filter(
                    (f) => f.statut === STATUT_FACTURE.EN_RETARD
                  )}
                  loading={loading}
                  onRowClick={handleRowClick}
                  emptyMessage="Aucune facture en retard trouvée."
                  rowClassName="cursor-pointer hover:bg-[var(--color-background)]"
                />
              </TabsContent>
              <TabsContent value="brouillon" className="p-0">
                <DataTable
                  columns={columns}
                  data={filteredFactures.filter(
                    (f) => f.statut === STATUT_FACTURE.BROUILLON
                  )}
                  loading={loading}
                  onRowClick={handleRowClick}
                  emptyMessage="Aucun brouillon trouvé."
                  rowClassName="cursor-pointer hover:bg-[var(--color-background)]"
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Factures;
