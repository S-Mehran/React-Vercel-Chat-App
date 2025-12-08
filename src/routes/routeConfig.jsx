import React from 'react';
import { Navigate } from 'react-router-dom';
import Login from '../pages/login/login';
import Register from '../pages/register/register';

/**
 * Route configuration for public routes (authentication pages)
 * These routes are accessible to unauthenticated users
 */
export const publicRoutes = [
  {
    path: '/login',
    element: <Login />,
    name: 'Login',
  },
  {
    path: '/register',
    element: <Register />,
    name: 'Register',
  },
  {
    path: '/',
    element: <Navigate to="/login" />,
    name: 'Root',
  },
];

/**
 * Route configuration for protected routes (authenticated pages)
 * These routes require authentication to access
 */
export const protectedRoutes = [
  {
    path: '/dashboard',
    element: null, // TODO: Create Dashboard component
    name: 'Dashboard',
  },
  {
    path: '/chat/:id',
    element: null, // TODO: Create Chat component
    name: 'Chat',
  },
  {
    path: '/profile',
    element: null, // TODO: Create Profile component
    name: 'Profile',
  },
];

/**
 * Route configuration for error/fallback routes
 */
export const errorRoutes = [
  {
    path: '*',
    element: <Navigate to="/login" />,
    name: 'NotFound',
  },
];

/**
 * All routes combined
 */
export const allRoutes = [...publicRoutes, ...protectedRoutes, ...errorRoutes];
