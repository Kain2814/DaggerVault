import React, { useState } from 'react';
import { 
  Modal, Box, Typography, Button, TextField, 
  IconButton, Stack, Alert 
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'; // Make sure to install @mui/icons-material if missing
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

// Styling for the modal box (Daggerheart Theme)
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#1a0924', // Deep purple dark
  border: '2px solid #d4af37', // Gold border
  boxShadow: 24,
  p: 4,
  color: 'white',
  borderRadius: 2,
};

export default function AuthModal({ open, handleClose }) {
  const [isRegistering, setIsRegistering] = useState(true); // Default to Register as requested
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  
  const { register, login } = useAuth();
  const navigate = useNavigate(); // To redirect after success if needed

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      if (isRegistering) {
        await register(formData.name, formData.email, formData.password);
      } else {
        await login(formData.email, formData.password);
      }
      handleClose(); // Close modal on success
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed');
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="auth-modal-title"
    >
      <Box sx={style}>
        {/* "X" Close Button */}
        <IconButton
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: '#d4af37',
          }}
        >
          <CloseIcon />
        </IconButton>

        <Typography id="auth-modal-title" variant="h5" component="h2" align="center" sx={{ fontFamily: 'Cinzel', mb: 2, color: '#d4af37' }}>
          {isRegistering ? 'Join the Adventure' : 'Welcome Back'}
        </Typography>

        <Typography variant="body2" align="center" sx={{ mb: 3, color: '#b39ddb' }}>
          You must be logged in to create a campaign.
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            {isRegistering && (
              <TextField
                label="Name"
                name="name"
                variant="filled"
                fullWidth
                value={formData.name}
                onChange={handleChange}
                sx={{ bgcolor: 'rgba(255,255,255,0.1)', input: { color: 'white' }, label: { color: '#b39ddb' } }}
                required
              />
            )}
            <TextField
              label="Email"
              name="email"
              type="email"
              variant="filled"
              fullWidth
              value={formData.email}
              onChange={handleChange}
              sx={{ bgcolor: 'rgba(255,255,255,0.1)', input: { color: 'white' }, label: { color: '#b39ddb' } }}
              required
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              variant="filled"
              fullWidth
              value={formData.password}
              onChange={handleChange}
              sx={{ bgcolor: 'rgba(255,255,255,0.1)', input: { color: 'white' }, label: { color: '#b39ddb' } }}
              required
            />

            <Button 
              type="submit" 
              variant="contained" 
              fullWidth
              sx={{ bgcolor: '#d4af37', color: 'black', fontWeight: 'bold', '&:hover': { bgcolor: '#b3912b' } }}
            >
              {isRegistering ? 'Sign Up & Create' : 'Login & Create'}
            </Button>
          </Stack>
        </form>

        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Button 
            onClick={() => setIsRegistering(!isRegistering)} 
            sx={{ color: '#b39ddb', textTransform: 'none' }}
          >
            {isRegistering ? "Already have an account? Login" : "Need an account? Register"}
          </Button>
        </Box>

      </Box>
    </Modal>
  );
}