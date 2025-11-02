import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import AppLayout from "@/components/layout/AppLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/services/authContext";

// Lazy load feature components
const Stock = lazy(() => import("@/features/stock/pages/Stock"));
const Login = lazy(() => import("@/pages/Login/Login"));
const StockEntrees = lazy(() => import("@/features/stock/pages/StockEntrees"));
const StockSorties = lazy(() => import("@/features/stock/pages/StockSorties"));
const Fournisseurs = lazy(
  () => import("@/features/fournisseurs/pages/Fournisseurs")
);
const Receptions = lazy(() => import("@/features/achats/pages/Receptions"));
const Factures = lazy(() => import("@/features/achats/pages/Factures"));
const Avoirs = lazy(() => import("@/features/achats/pages/Avoirs"));
const ChargesApercu = lazy(
  () => import("@/features/charges/pages/ChargesApercu")
);
const ChargesFournisseurs = lazy(
  () => import("@/features/charges/pages/ChargesFournisseurs")
);
const ChargesSalariales = lazy(
  () => import("@/features/charges/pages/ChargesSalariales")
);
const ChargesFixe = lazy(() => import("@/features/charges/pages/ChargesFixe"));

const AppRoutes = () => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[var(--color-background)]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-blue)]"></div>
      </div>
    );
  }

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      }
    >
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/stock" replace />} />
          {/*  */}
          <Route path="stock" element={<Stock />} />
          <Route path="stock/entrees" element={<StockEntrees />} />
          <Route path="stock/sorties" element={<StockSorties />} />
          {/*  */}
          <Route path="fournisseurs" element={<Fournisseurs />} />
          {/*  */}
          <Route path="achats/receptions" element={<Receptions />} />
          <Route path="achats/factures" element={<Factures />} />
          <Route path="achats/avoirs" element={<Avoirs />} />
          {/*  */}
          <Route path="charges" element={<ChargesApercu />} />
          <Route
            path="charges/fournisseurs"
            element={<ChargesFournisseurs />}
          />
          <Route path="charges/salariales" element={<ChargesSalariales />} />
          <Route path="charges/fixes" element={<ChargesFixe />} />
          {/*  */}
          {/* Placeholder routes for future features */}
          <Route
            path="clients"
            element={
              <div className="p-8 text-center text-muted-foreground">
                Fonctionnalité Clients (à venir)
              </div>
            }
          />
          <Route
            path="billing"
            element={
              <div className="p-8 text-center text-muted-foreground">
                Fonctionnalité Facturation (à venir)
              </div>
            }
          />
          <Route
            path="reports"
            element={
              <div className="p-8 text-center text-muted-foreground">
                Fonctionnalité Rapports (à venir)
              </div>
            }
          />
          <Route
            path="accounting"
            element={
              <div className="p-8 text-center text-muted-foreground">
                Fonctionnalité Comptabilité (à venir)
              </div>
            }
          />
          <Route
            path="settings"
            element={
              <div className="p-8 text-center text-muted-foreground">
                Paramètres (à venir)
              </div>
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/stock" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
