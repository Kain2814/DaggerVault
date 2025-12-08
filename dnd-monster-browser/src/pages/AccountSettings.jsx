import React, { useState } from 'react';
import { 
  Container, Typography, Box, Card, CardContent, TextField, Button, 
  Avatar, Grid, Stack, Alert, Divider, Paper
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useAuth } from '../context/AuthContext';

// Daggerheart/Fantasy Emojis
const AVATAR_OPTIONS = [
    '👤', '🧙‍♂️', '🧝‍♀️', '🧛‍♂️', '🧟', '🧚', 
    '🐉', '⚔️', '🛡️', '🎲', '👑', '💀',
    '🏹', '🔮', '📜', '🍺', '🦊', '🦄'
];

function AccountSettings() {
  const { user, updateProfile } = useAuth();
  
  // Form State
  const [formData, setFormData] = useState({
      name: user?.name || '',
      email: user?.email || '',
      bio: user?.bio || '',
      avatar: user?.avatar || '👤',
      password: '' // Only if changing
  });

  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvatarClick = (emoji) => {
      setFormData({ ...formData, avatar: emoji });
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      setMessage(null);
      
      const result = await updateProfile(formData);
      
      if (result.success) {
          setMessage({ type: 'success', text: 'Profile updated successfully!' });
      } else {
          setMessage({ type: 'error', text: result.message });
      }
  };

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Typography variant="h3" sx={{ fontFamily: 'Cinzel', color: '#d4af37', mb: 1, textAlign: 'center' }}>
        Account Settings
      </Typography>
      <Typography variant="subtitle1" sx={{ color: '#b39ddb', mb: 6, textAlign: 'center' }}>
        Manage your identity in the realms.
      </Typography>

      {message && <Alert severity={message.type} sx={{ mb: 4 }}>{message.text}</Alert>}

      <form onSubmit={handleSubmit}>
        <Grid container spacing={4}>
            
            {/* LEFT: AVATAR PICKER */}
            <Grid item xs={12} md={4}>
                <Card sx={{ bgcolor: '#1a0924', border: '1px solid #5e35b1', textAlign: 'center', height: '100%' }}>
                    <CardContent>
                        <Typography variant="h6" sx={{ color: '#fff', mb: 2 }}>Profile Picture</Typography>
                        
                        <Avatar 
                            sx={{ 
                                width: 100, height: 100, 
                                bgcolor: '#d4af37', 
                                fontSize: '3rem', 
                                margin: '0 auto',
                                mb: 3,
                                border: '4px solid #1a1a1a'
                            }}
                        >
                            {formData.avatar}
                        </Avatar>

                        <Divider sx={{ bgcolor: '#333', mb: 2 }} />
                        
                        <Typography variant="caption" sx={{ color: '#aaa', mb: 2, display: 'block' }}>Select an Avatar</Typography>
                        
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1 }}>
                            {AVATAR_OPTIONS.map((emoji) => (
                                <Box
                                    key={emoji}
                                    onClick={() => handleAvatarClick(emoji)}
                                    sx={{
                                        cursor: 'pointer',
                                        fontSize: '1.5rem',
                                        width: 40, height: 40,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        borderRadius: '50%',
                                        bgcolor: formData.avatar === emoji ? 'rgba(212, 175, 55, 0.3)' : 'transparent',
                                        border: formData.avatar === emoji ? '2px solid #d4af37' : '1px solid transparent',
                                        '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
                                    }}
                                >
                                    {emoji}
                                </Box>
                            ))}
                        </Box>
                    </CardContent>
                </Card>
            </Grid>

            {/* RIGHT: DETAILS FORM */}
            <Grid item xs={12} md={8}>
                <Card sx={{ bgcolor: '#1e1e1e', border: '1px solid #333' }}>
                    <CardContent>
                        <Typography variant="h5" sx={{ fontFamily: 'Cinzel', color: '#fff', mb: 3 }}>
                            Adventurer Details
                        </Typography>

                        <Stack spacing={3}>
                            <TextField 
                                label="Display Name" 
                                name="name" 
                                value={formData.name} 
                                onChange={handleChange} 
                                fullWidth 
                                variant="filled" 
                                sx={{ bgcolor: 'rgba(255,255,255,0.05)', input: { color: 'white' }, label: { color: '#aaa' } }} 
                            />
                            
                            <TextField 
                                label="Bio / Tagline" 
                                name="bio" 
                                value={formData.bio} 
                                onChange={handleChange} 
                                fullWidth 
                                multiline 
                                rows={2}
                                variant="filled" 
                                placeholder="e.g. GM for the Chaos Crew"
                                sx={{ bgcolor: 'rgba(255,255,255,0.05)', textarea: { color: 'white' }, label: { color: '#aaa' } }} 
                            />

                            <TextField 
                                label="Email Address" 
                                name="email" 
                                type="email"
                                value={formData.email} 
                                onChange={handleChange} 
                                fullWidth 
                                variant="filled" 
                                sx={{ bgcolor: 'rgba(255,255,255,0.05)', input: { color: 'white' }, label: { color: '#aaa' } }} 
                            />

                            <Divider sx={{ bgcolor: '#444', my: 2 }} />
                            
                            <Typography variant="h6" sx={{ color: '#d4af37' }}>Security</Typography>
                            
                            <TextField 
                                label="New Password (Optional)" 
                                name="password" 
                                type="password"
                                value={formData.password} 
                                onChange={handleChange} 
                                fullWidth 
                                variant="filled" 
                                helperText="Leave blank to keep current password"
                                FormHelperTextProps={{ sx: { color: '#777' } }}
                                sx={{ bgcolor: 'rgba(255,255,255,0.05)', input: { color: 'white' }, label: { color: '#aaa' } }} 
                            />

                            <Button 
                                type="submit" 
                                variant="contained" 
                                size="large" 
                                startIcon={<SaveIcon />}
                                sx={{ 
                                    bgcolor: '#d4af37', 
                                    color: 'black', 
                                    fontWeight: 'bold', 
                                    mt: 2,
                                    '&:hover': { bgcolor: '#b3912b' }
                                }}
                            >
                                Save Changes
                            </Button>
                        </Stack>
                    </CardContent>
                </Card>
                
                {/* DANGER ZONE */}
                <Paper sx={{ mt: 4, p: 3, bgcolor: 'rgba(211, 47, 47, 0.1)', border: '1px solid #d32f2f' }}>
                    <Typography variant="h6" sx={{ color: '#ff5252', mb: 1 }}>Danger Zone</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2" sx={{ color: '#ccc' }}>
                            Once you delete your account, there is no going back. Please be certain.
                        </Typography>
                        <Button variant="outlined" color="error">
                            Delete Account
                        </Button>
                    </Box>
                </Paper>
            </Grid>

        </Grid>
      </form>
    </Container>
  );
}

export default AccountSettings;