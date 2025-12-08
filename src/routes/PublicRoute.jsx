import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * Public Route Component
 * Wrapper component to prevent authenticated users from accessing public routes
 * Useful for login/register pages - redirects authenticated users to dashboard
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Route element to render if not authenticated
 * @param {boolean} props.isAuthenticated - Authentication status
 * @param {string} props.redirectPath - Path to redirect if already authenticated (default: '/dashboard')
 * @returns {React.ReactElement} Public route or redirect to dashboard
 */
const PublicRoute = ({
  children,
  isAuthenticated = false,
  redirectPath = '/dashboard',
}) => {
  if (isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default PublicRoute;
