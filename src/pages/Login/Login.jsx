import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LogIn, AlertCircle, Loader2 } from "lucide-react";
import { useAuth } from "@/services/authContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!email || !password) {
        setError("Veuillez remplir tous les champs");
        setLoading(false);
        return;
      }

      // Call auth context login (will use mock or real service depending on env)
      await login(email, password);

      // Redirect to stock after successful login
      navigate("/stock");
    } catch (err) {
      // err may be Error object or string
      const message =
        err?.message || err?.response?.data?.detail || "Erreur de connexion";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)] p-4">
      <Card className="w-full max-w-md bg-[var(--color-surface)] border-[var(--color-border)] shadow-lg">
        <CardHeader className="space-y-1 pb-6">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-[var(--color-blue)] rounded-lg">
              <LogIn className="h-6 w-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-semibold text-center text-[var(--color-foreground)]">
            GestCom
          </CardTitle>
          <p className="text-center text-sm text-[var(--color-foreground-muted)]">
            Connectez-vous à votre compte
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Error Message */}
            {error && (
              <div className="p-3 bg-[var(--color-error)]/10 border border-[var(--color-error)] rounded-lg flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-[var(--color-error)] flex-shrink-0 mt-0.5" />
                <p className="text-sm text-[var(--color-error)]">{error}</p>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--color-foreground)]">
                Adresse e-mail ou nom d'utilisateur
              </label>
              <Input
                type="text"
                placeholder="admin or admin@gestcom.local"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="bg-[var(--color-background)] border-[var(--color-border)] text-[var(--color-foreground)] placeholder-[var(--color-foreground-muted)] focus:border-[var(--color-blue)] focus:ring-2 focus:ring-[var(--color-blue)]/20 disabled:opacity-50"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--color-foreground)]">
                Mot de passe
              </label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="bg-[var(--color-background)] border-[var(--color-border)] text-[var(--color-foreground)] placeholder-[var(--color-foreground-muted)] focus:border-[var(--color-blue)] focus:ring-2 focus:ring-[var(--color-blue)]/20 disabled:opacity-50"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[var(--color-blue)] hover:bg-[var(--color-blue)]/90 text-white font-medium py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {loading ? "Connexion en cours..." : "Se connecter"}
            </Button>
          </form>

          {/* Footer Info */}
          <div className="mt-6 pt-6 border-t border-[var(--color-border)]">
            <p className="text-center text-xs text-[var(--color-foreground-muted)]">
              Démonstration - identifiants: admin / admin
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
