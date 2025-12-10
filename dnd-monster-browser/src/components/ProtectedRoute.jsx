import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Box, CircularProgress } from '@mui/material';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth(); // <--- Get loading state

  // 1. If we are still checking LocalStorage, show a spinner
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', bgcolor: '#0f0518' }}>
        <CircularProgress sx={{ color: '#d4af37' }} />
      </Box>
    );
  }

  // 2. If check is done and no user, kick them out
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 3. If user exists, let them in
  return children;
};

export default ProtectedRoute;
