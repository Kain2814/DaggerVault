import React, { useState } from 'react';
import { 
  Container, Typography, TextField, Button, Box, Paper, Alert 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // FIX IS HERE: We pass email and password as SEPARATE arguments
      const result = await login(formData.email, formData.password);
      
      if (result?.success) {
        navigate('/campaigns'); // Redirect to dashboard on success
      } else {
        // If login returns a specific failure object (optional depending on context)
        // or throws, we catch it below. 
      }
    } catch (err) {
      setError('Invalid email or password.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper sx={{ p: 4, bgcolor: '#1a0924', border: '1px solid #d4af37' }}>
        <Typography variant="h4" align="center" sx={{ fontFamily: 'Cinzel', color: '#d4af37', mb: 3 }}>
          Login
        </Typography>
        
        {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            variant="filled"
            value={formData.email}
            onChange={handleChange}
            sx={{ mb: 2, bgcolor: 'rgba(255,255,255,0.1)', input: { color: 'white' }, label: { color: '#aaa' } }}
            required
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            variant="filled"
            value={formData.password}
            onChange={handleChange}
            sx={{ mb: 4, bgcolor: 'rgba(255,255,255,0.1)', input: { color: 'white' }, label: { color: '#aaa' } }}
            required
          />
          <Button 
            type="submit" 
            fullWidth 
            variant="contained" 
            size="large"
            sx={{ bgcolor: '#d4af37', color: 'black', fontWeight: 'bold' }}
          >
            Enter Vault
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default Login;