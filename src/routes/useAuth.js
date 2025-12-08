import { useState, useEffect } from 'react';

/**
 * Custom hook to manage authentication state
 * Checks localStorage for auth token on mount
 * 
 * @returns {Object} Authentication state and methods
 * @returns {boolean} returns.isAuthenticated - User authentication status
 * @returns {Object|null} returns.user - Current logged in user object
 * @returns {string|null} returns.token - JWT authentication token
 * @returns {boolean} returns.loading - Loading state during auth check
 * @returns {Function} returns.login - Function to set user and token on login
 * @returns {Function} returns.logout - Function to clear user and token
 */
const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  /**
   * Initialize auth state from localStorage
   */
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedToken = localStorage.getItem('authToken');
        const storedUser = localStorage.getItem('user');

        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        // Clear potentially corrupted data
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  /**
   * Set user as logged in
   * @param {Object} userData - User object from API
   * @param {string} authToken - JWT token from API
   */
  const login = (userData, authToken) => {
    try {
      setUser(userData);
      setToken(authToken);
      setIsAuthenticated(true);
      localStorage.setItem('authToken', authToken);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  /**
   * Log out user and clear auth state
   */
  const logout = () => {
    try {
      setUser(null);
      setToken(null);
      setIsAuthenticated(false);
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      localStorage.removeItem('rememberedEmail');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return {
    isAuthenticated,
    user,
    token,
    loading,
    login,
    logout,
  };
};

export default useAuth;
