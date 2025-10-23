import api from "./api";

/**
 * Authentication service with mock mode support.
 * - When REACT_APP_USE_MOCK_API=true or VITE_USE_MOCK_API=true: uses local fake login
 * - When false: calls real Django backend
 */

const USE_MOCK =
  import.meta.env.VITE_USE_MOCK_API === "true" ||
  (typeof process !== "undefined" &&
    process.env?.REACT_APP_USE_MOCK_API === "true");

// Simulate network delay for realism
const mockDelay = (ms = 700) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Mock login function
const mockLogin = async (username, password) => {
  await mockDelay(700);

  // Accept either username or email for the demo account
  const isAdminUsername =
    username === "admin" || username === "admin@gestcom.local";

  // Simple check: admin/admin works
  if (isAdminUsername && password === "admin") {
    // normalize username and email
    const normalizedUsername = username.includes("@")
      ? username.split("@")[0]
      : username;
    const email = username.includes("@")
      ? username
      : `${normalizedUsername}@gestcom.local`;

    const fakeResponse = {
      access: "fake-jwt-access-token-12345",
      refresh: "fake-jwt-refresh-token-67890",
      user: {
        id: 1,
        username: normalizedUsername,
        email: email,
        first_name: "Admin",
        last_name: "User",
        role: "admin",
      },
    };

    // Store in localStorage (same as real backend would)
    localStorage.setItem("access_token", fakeResponse.access);
    localStorage.setItem("refresh_token", fakeResponse.refresh);
    localStorage.setItem("user", JSON.stringify(fakeResponse.user));

    return fakeResponse;
  }

  // Wrong credentials
  const error = new Error("Invalid credentials");
  error.response = {
    data: { detail: "Nom d'utilisateur ou mot de passe incorrect" },
    status: 401,
  };
  throw error;
};

const authService = {
  /**
   * Login user with username and password
   * @param {string} username
   * @param {string} password
   * @returns {Promise} { access, refresh, user }
   */
  login: async (username, password) => {
    if (USE_MOCK) {
      return mockLogin(username, password);
    }

    // Real backend call
    try {
      const response = await api.post("/auth/login/", {
        username,
        password,
      });

      // Store tokens and user info
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.detail || "Erreur de connexion";
      throw new Error(errorMessage);
    }
  },

  /**
   * Logout user
   */
  logout: async () => {
    if (!USE_MOCK) {
      try {
        await api.post("/auth/logout/");
      } catch (_) {
        // Ignore logout errors
      }
    }

    // Clear local storage
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
  },

  /**
   * Get currently logged-in user
   * @returns {object|null} User object or null
   */
  getCurrentUser: () => {
    const userJson = localStorage.getItem("user");
    return userJson ? JSON.parse(userJson) : null;
  },

  /**
   * Check if user is authenticated
   * @returns {boolean}
   */
  isAuthenticated: () => {
    return !!localStorage.getItem("access_token");
  },
};

export default authService;
