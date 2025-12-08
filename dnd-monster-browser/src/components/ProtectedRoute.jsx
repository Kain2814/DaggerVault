import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// checks if a user exists. 
// If yes -> It renders the "children"
// If no -> It forces a redirect to /login.

function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    // "replace" means they can't click "Back" to return to the protected page
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
