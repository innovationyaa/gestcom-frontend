import { Routes, Route, Navigate } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import AppLayout from '@/components/layout/AppLayout'

// Lazy load feature components
const Dashboard = lazy(() => import('@/features/dashboard/pages/Dashboard'))
const Stock = lazy(() => import('@/features/stock/pages/Stock'))
const Achats = lazy(() => import('@/features/achats/pages/Achats'))
const Factures = lazy(() => import('@/features/achats/pages/Factures'))

const AppRoutes = () => {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    }>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="stock" element={<Stock />} />
          <Route path="achats">
            <Route index element={<Achats />} />
            <Route path="factures" element={<Factures />} />
          </Route>
          {/* Placeholder routes for future features */}
          <Route path="suppliers" element={<div className="p-8 text-center text-muted-foreground">Fonctionnalité Fournisseurs (à venir)</div>} />
          <Route path="clients" element={<div className="p-8 text-center text-muted-foreground">Fonctionnalité Clients (à venir)</div>} />
          <Route path="billing" element={<div className="p-8 text-center text-muted-foreground">Fonctionnalité Facturation (à venir)</div>} />
          <Route path="reports" element={<div className="p-8 text-center text-muted-foreground">Fonctionnalité Rapports (à venir)</div>} />
          <Route path="accounting" element={<div className="p-8 text-center text-muted-foreground">Fonctionnalité Comptabilité (à venir)</div>} />
          <Route path="settings" element={<div className="p-8 text-center text-muted-foreground">Paramètres (à venir)</div>} />
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Suspense>
  )
}

export default AppRoutes
