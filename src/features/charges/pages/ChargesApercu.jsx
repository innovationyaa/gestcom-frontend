// filepath: src/features/charges/pages/ChargesApercu.jsx
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { chargesApercuService } from "../services/chargesService";
import { useChargesFournisseurs } from "../hooks/useChargesFournisseurs";
import { useChargesSalariales } from "../hooks/useChargesSalariales";
import { useChargesFixe } from "../hooks/useChargesFixe";
import ChargesFournisseursTable from "../components/ChargesFournisseursTable";
import ChargesSalarialesTable from "../components/ChargesSalarialesTable";
import ChargesFixeTable from "../components/ChargesFixeTable";

export default function ChargesApercu() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalCharges: 0,
    fournisseurs: 0,
    salariales: 0,
    fixes: 0,
  });
  const [loading, setLoading] = useState(true);

  // Fetch latest 5 from each category
  const { charges: chargesFournisseurs, loading: loadingFournisseurs } =
    useChargesFournisseurs({
      sortBy: "date_desc",
    });
  const { charges: chargesSalariales, loading: loadingSalariales } =
    useChargesSalariales({
      sortBy: "date_desc",
    });
  const { charges: chargesFixe, loading: loadingFixe } = useChargesFixe({
    sortBy: "date_desc",
  });

  // Get only first 5
  const latestFournisseurs = chargesFournisseurs.slice(0, 5);
  const latestSalariales = chargesSalariales.slice(0, 5);
  const latestFixe = chargesFixe.slice(0, 5);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const response = await chargesApercuService.getStats();
        if (response.success) {
          setStats(response.data);
        }
      } catch (error) {
        console.error("Error fetching charges stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8 p-3 sm:p-4 lg:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-[var(--color-foreground)] text-lg sm:text-xl lg:text-2xl font-semibold">
            Charges - Aperçu
          </h1>
          <p className="text-[var(--color-foreground-muted)] text-xs sm:text-sm">
            Vue d'ensemble de toutes vos charges
          </p>
        </div>
      </div>{" "}
      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-sm hover:shadow-md transition-shadow duration-200 border-blue-200 bg-blue-50">
          <div className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-3">
              <p className="text-sm font-medium text-[var(--color-foreground)]">
                Total Charges
              </p>
              <div className="p-2 rounded-lg bg-white shadow-xs">
                <CreditCard className="h-4 w-4 text-[var(--color-blue)]" />
              </div>
            </div>
            <div className="pt-0">
              <div className="text-2xl font-bold text-[var(--color-foreground)] mb-1">
                {stats.totalCharges.toLocaleString()} DH
              </div>
              <p className="text-xs text-[var(--color-foreground-muted)] leading-relaxed">
                Toutes charges confondues
              </p>
            </div>
          </div>
        </Card>{" "}
        <Card className="shadow-sm hover:shadow-md transition-shadow duration-200 border-purple-200 bg-purple-50">
          <div className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-3">
              <p className="text-sm font-medium text-[var(--color-foreground)]">
                Fournisseurs
              </p>
              <div className="p-2 rounded-lg bg-white shadow-xs">
                <CreditCard className="h-4 w-4 text-purple-600" />
              </div>
            </div>{" "}
            <div className="pt-0">
              <div className="text-2xl font-bold text-[var(--color-foreground)] mb-1">
                {stats.fournisseurs.toLocaleString()} DH
              </div>
              <p className="text-xs text-[var(--color-foreground-muted)] leading-relaxed">
                Charges fournisseurs
              </p>
            </div>
          </div>
        </Card>{" "}
        <Card className="shadow-sm hover:shadow-md transition-shadow duration-200 border-green-200 bg-green-50">
          <div className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-3">
              <p className="text-sm font-medium text-[var(--color-foreground)]">
                Salariales
              </p>
              <div className="p-2 rounded-lg bg-white shadow-xs">
                <CreditCard className="h-4 w-4 text-green-600" />
              </div>
            </div>
            <div className="pt-0">
              <div className="text-2xl font-bold text-[var(--color-foreground)] mb-1">
                {stats.salariales.toLocaleString()} DH
              </div>
              <p className="text-xs text-[var(--color-foreground-muted)] leading-relaxed">
                Charges salariales
              </p>
            </div>
          </div>
        </Card>{" "}
        <Card className="shadow-sm hover:shadow-md transition-shadow duration-200 border-orange-200 bg-orange-50">
          <div className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-3">
              <p className="text-sm font-medium text-[var(--color-foreground)]">
                Fixes
              </p>
              <div className="p-2 rounded-lg bg-white shadow-xs">
                <CreditCard className="h-4 w-4 text-orange-600" />
              </div>
            </div>
            <div className="pt-0">
              <div className="text-2xl font-bold text-[var(--color-foreground)] mb-1">
                {stats.fixes.toLocaleString()} DH
              </div>
              <p className="text-xs text-[var(--color-foreground-muted)] leading-relaxed">
                Charges fixes
              </p>
            </div>
          </div>
        </Card>
      </div>{" "}
      {/* Latest Charges Fournisseurs */}
      <div className="bg-white rounded-lg border border-[var(--color-border)] shadow-sm p-3 sm:p-4 lg:p-6 w-full">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm sm:text-base font-medium text-[var(--color-foreground)]">
            Dernières Charges Fournisseurs
          </h2>
          <Button
            size="sm"
            variant="outline"
            onClick={() => navigate("/charges/fournisseurs")}
            className="text-[var(--color-blue)] border-[var(--color-blue)] hover:bg-blue-50"
          >
            Voir tout
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        <ChargesFournisseursTable
          charges={latestFournisseurs}
          loading={loadingFournisseurs}
        />
      </div>
      {/* Latest Charges Salariales */}
      <div className="bg-white rounded-lg border border-[var(--color-border)] shadow-sm p-3 sm:p-4 lg:p-6 w-full">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm sm:text-base font-medium text-[var(--color-foreground)]">
            Dernières Charges Salariales
          </h2>
          <Button
            size="sm"
            variant="outline"
            onClick={() => navigate("/charges/salariales")}
            className="text-[var(--color-blue)] border-[var(--color-blue)] hover:bg-blue-50"
          >
            Voir tout
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        <ChargesSalarialesTable
          charges={latestSalariales}
          loading={loadingSalariales}
        />
      </div>
      {/* Latest Charges Fixes */}
      <div className="bg-white rounded-lg border border-[var(--color-border)] shadow-sm p-3 sm:p-4 lg:p-6 w-full">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm sm:text-base font-medium text-[var(--color-foreground)]">
            Dernières Charges Fixes
          </h2>
          <Button
            size="sm"
            variant="outline"
            onClick={() => navigate("/charges/fixes")}
            className="text-[var(--color-blue)] border-[var(--color-blue)] hover:bg-blue-50"
          >
            Voir tout
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        <ChargesFixeTable charges={latestFixe} loading={loadingFixe} />
      </div>
    </div>
  );
}
