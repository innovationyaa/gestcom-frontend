# Authentication & API Integration Reference

This document describes the frontend authentication implementation, API flow, environment flags, and the minimal tasks required to switch from mock mode to a live Django backend. Keep this file as a quick checklist to update when the backend is ready.

---

## Overview

- We implemented a mock-capable auth flow so UI work can proceed before the backend is ready.
- Toggle mock vs real backend using Vite env variables (see **Env Variables**).
- Main files:
  - `src/services/api.js` — Axios instance, request/response interceptors
  - `src/services/authService.js` — login/logout API wrapper (mock-ready)
  - `src/services/authContext.jsx` — React context managing auth state (AuthProvider, useAuth)
  - `src/components/ProtectedRoute.jsx` — route guard that redirects unauthenticated users to `/login`
  - `src/pages/Login/Login.jsx` — login form wired to `useAuth().login`
  - `src/routes/index.jsx` — routes: `/login` is public, main app route is protected
  - `src/App.jsx` — wraps the app with `AuthProvider`

---

## Environment variables

Use Vite `.env` / `.env.local` files. Example (project root `gestcom/.env`):

```
VITE_USE_MOCK_API=true
VITE_API_URL=http://localhost:8000/api
```

- `VITE_USE_MOCK_API` (string): `true` to use the built-in mock; `false` to call real API.
- `VITE_API_URL` (string): base URL of your backend (used by `api.js`).

> Note: The code also contains safe fallbacks for legacy `REACT_APP_*` variables, but prefer `VITE_*`.

---

## How the flow works (frontend)

1. User submits the login form in `src/pages/Login/Login.jsx`.
2. `Login` calls `login(emailOrUsername, password)` from `useAuth()` (AuthContext).
3. `AuthContext.login` calls `authService.login(username, password)`.
   - If `VITE_USE_MOCK_API=true`, `authService` runs an internal `mockLogin` which returns a fake `{ access, refresh, user }`.
   - If `VITE_USE_MOCK_API=false`, `authService` POSTs to `api.post('/auth/login/', { username, password })` using `src/services/api.js`.
4. On success, `authService` stores `access_token`, `refresh_token`, and `user` in `localStorage`.
5. `AuthContext` updates `user` and `isAuthenticated` and the UI navigates to `/stock`.
6. `api.js` attaches `Authorization: Bearer <access_token>` to outgoing requests.
7. `ProtectedRoute` checks `useAuth()` and redirects to `/login` when not authenticated.

---

## Token storage & keys used

- `localStorage` keys used by the frontend:
  - `access_token` — short-lived JWT access token
  - `refresh_token` — refresh token (if backend provides)
  - `user` — serialized user object returned by backend

Keep these keys consistent if you change naming in backend responses.

---

## Expected backend endpoints & response shapes

This frontend expects a simple JWT-style API. Example endpoints:

- POST `/api/auth/login/`
  - Request body: `{ "username": "admin", "password": "pass" }`
  - Expected response (recommended):
    ```json
    {
      "access": "<access-token>",
      "refresh": "<refresh-token>",
      "user": { "id": 1, "username": "admin", "email": "admin@example.com", ... }
    }
    ```
  - If your backend returns different keys, update `authService.login()` to map them to the frontend keys above.

- POST `/api/auth/logout/` (optional)
  - Can be a noop; frontend calls it but will clear localStorage regardless of response.

- POST `/api/auth/refresh/` (optional)
  - Request body: `{ "refresh": "<refresh-token>" }`
  - Response: `{ "access": "<new-access-token>" }`

- GET `/api/auth/me/` (optional)
  - Returns current user info; useful for validating sessions on load.

---

## What to change when backend is ready

1. Update `.env`:
   - `VITE_USE_MOCK_API=false`
   - `VITE_API_URL=http://<your-backend-host>/api`
2. Restart Vite dev server (important so `import.meta.env` updates are loaded).
3. Verify the login endpoint response shape. If different, edit mapping in `src/services/authService.js`:
   - Map backend token fields to `access_token`, `refresh_token`, `user` before storing.
4. If the backend uses cookie-based sessions instead of JWT:
   - In `src/services/api.js`, set `api.defaults.withCredentials = true` (or add `withCredentials: true` to requests).
   - Remove or ignore token header logic in `api.js`.
   - Change `authService.login()` to not expect `access`/`refresh` tokens; instead rely on `/auth/me/` or backend session.
5. (Optional) Add token refresh logic in `api.js` response interceptor to call `/auth/refresh/` and retry failed requests on 401.

---

## CORS requirements (backend)

If backend runs on a different origin, enable CORS for frontend host(s):

- For Django + `django-cors-headers`:

```py
CORS_ALLOWED_ORIGINS = [
  'http://localhost:5173',
  'http://localhost:3000'
]
CORS_ALLOW_CREDENTIALS = True  # only if you use cookie-based auth
```

---

## Debugging tips

- If login fails:
  - Check browser console for network errors or thrown exceptions.
  - Inspect `localStorage` after clicking "Se connecter":
    - `localStorage.getItem('access_token')`
    - `localStorage.getItem('user')`
  - If tokens are present but UI didn't navigate, make sure `AuthContext` `login()` resolved and `navigate('/stock')` is executed.
- If `process is not defined` appears, ensure `api.js` and `authService.js` use `import.meta.env` (already implemented).
- Extension errors like `chrome-extension://... net::ERR_FILE_NOT_FOUND` are extension noise — they don't affect the app.

---

## Quick checklist before switching to real backend

- [ ] Set `VITE_USE_MOCK_API=false` and `VITE_API_URL` to backend URL
- [ ] Restart Vite dev server
- [ ] Verify `/auth/login/` response shape matches frontend expectations
- [ ] Update `authService.js` mapping if needed
- [ ] Ensure backend CORS allows frontend origin
- [ ] Optionally implement refresh token flow and cookie config

---

## Files reference (paths)

- `src/services/api.js`
- `src/services/authService.js`
- `src/services/authContext.jsx`
- `src/components/ProtectedRoute.jsx`
- `src/pages/Login/Login.jsx`
- `src/App.jsx`
- `src/routes/index.jsx`

---

If you want, I can also:

- Add a small `auth-readme` script or a one-shot migration script to map backend fields, or
- Implement token refresh retry logic in `src/services/api.js` now so it's ready when your backend provides refresh tokens.

Save this file and refer to it when you receive the Django backend. Happy to update the exact mappings once you paste the real login JSON response.
