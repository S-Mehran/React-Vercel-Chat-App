import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuthContext } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import { publicRoutes, protectedRoutes, errorRoutes } from './routeConfig';

/**
 * Route Renderer Component
 * Renders the application routes with authentication logic
 * Must be inside AuthProvider
 */
const RouteRenderer = () => {
  const { isAuthenticated, loading } = useAuthContext();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="auth-loading">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public Routes */}
      {publicRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={
            <PublicRoute
              isAuthenticated={isAuthenticated}
              redirectPath="/dashboard"
            >
              {route.element}
            </PublicRoute>
          }
        />
      ))}

      {/* Protected Routes */}
      {protectedRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              redirectPath="/login"
            >
              {route.element}
            </ProtectedRoute>
          }
        />
      ))}

      {/* Error Routes */}
      {errorRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={route.element}
        />
      ))}
    </Routes>
  );
};

/**
 * Main Router Component
 * Sets up the BrowserRouter and AuthProvider for the entire application
 * 
 * @returns {React.ReactElement} Router with authentication provider
 */
const AppRouter = () => {
  return (
    <Router>
      <AuthProvider>
        <RouteRenderer />
      </AuthProvider>
    </Router>
  );
};

export default AppRouter;
