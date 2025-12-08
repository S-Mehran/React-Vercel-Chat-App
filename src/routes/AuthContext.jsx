import React, { createContext, useContext } from 'react';
import useAuth from './useAuth';

/**
 * Authentication Context
 * Provides authentication state and methods to the entire application
 */
const AuthContext = createContext();

/**
 * Auth Context Provider Component
 * Wraps the application with authentication context
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @returns {React.ReactElement} Context provider wrapping children
 */
export const AuthProvider = ({ children }) => {
  const auth = useAuth();

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook to use Auth Context
 * Must be used within AuthProvider
 * 
 * @returns {Object} Authentication context value
 * @throws {Error} If used outside of AuthProvider
 */
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider');
  }
  return context;
};

export default AuthContext;
