import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * Protected Route Component
 * Wrapper component to protect routes that require authentication
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Route element to render if authenticated
 * @param {boolean} props.isAuthenticated - Authentication status
 * @param {string} props.redirectPath - Path to redirect if not authenticated (default: '/login')
 * @returns {React.ReactElement} Protected route or redirect
 */
const ProtectedRoute = ({
  children,
  isAuthenticated = false,
  redirectPath = '/login',
}) => {
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default ProtectedRoute;
