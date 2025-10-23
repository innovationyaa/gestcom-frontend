import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import AppLayout from "@/components/layout/AppLayout";

// Lazy load feature components
const Stock = lazy(() => import("@/features/stock/pages/Stock"));
const Login = lazy(() => import("@/pages/Login/Login"));
const StockEntrees = lazy(() => import("@/features/stock/pages/StockEntrees"));
const StockSorties = lazy(() => import("@/features/stock/pages/StockSorties"));
const Fournisseurs = lazy(
  () => import("@/features/fournisseurs/pages/Fournisseurs")
);

const AppRoutes = () => {
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

        <Route path="/" element={<AppLayout />}>
          <Route index element={<Navigate to="/stock" replace />} />
          {/* <Route path="dashboard" element={<Dashboard />} /> */}
          <Route path="stock" element={<Stock />} />
          <Route path="stock/entrees" element={<StockEntrees />} />
          <Route path="stock/sorties" element={<StockSorties />} />
          <Route path="fournisseurs" element={<Fournisseurs />} />
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
          <Route
            path="charges"
            element={
              <div className="p-8 text-center text-muted-foreground">
                Fonctionnalité Charges (à venir)
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
