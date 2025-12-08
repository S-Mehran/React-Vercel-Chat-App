/**
 * Route paths constant
 * Centralized location for all route paths in the application
 * This helps avoid hardcoded strings and makes refactoring easier
 */

export const ROUTES = {
  // Public Routes
  LOGIN: '/login',
  REGISTER: '/register',

  // Protected Routes
  DASHBOARD: '/dashboard',
  CHAT: '/chat',
  PROFILE: '/profile',

  // Root
  ROOT: '/',

  // Error
  NOT_FOUND: '*',
};

/**
 * Helper function to get chat route with ID
 * @param {string} id - Chat ID
 * @returns {string} Chat route path
 */
export const getChatRoute = (id) => `${ROUTES.CHAT}/${id}`;

/**
 * Helper function to get user profile route
 * @param {string} userId - User ID
 * @returns {string} User profile route path
 */
export const getUserProfileRoute = (userId) => `${ROUTES.PROFILE}/${userId}`;
