import { Navigate } from "react-router-dom";
import { useAuth } from "@/services/authContext";

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[var(--color-background)]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-blue)]"></div>
      </div>
    );
  }

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;
