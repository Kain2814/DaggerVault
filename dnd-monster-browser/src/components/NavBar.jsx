import React from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Stack,
  Container,
  IconButton,
  Tooltip
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings'; // <--- NEW ICON
import { useAuth } from '../context/AuthContext'; 

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { user, logout } = useAuth(); 

  // Helper style for nav buttons
  const navButtonStyle = (path) => ({
    color: location.pathname === path ? '#d4af37' : 'rgba(255,255,255,0.8)', 
    fontFamily: '"Cinzel", serif',
    fontWeight: 600,
    letterSpacing: '1px',
    textTransform: 'none',
    fontSize: '1rem',
    '&:hover': {
      color: '#d4af37',
      background: 'rgba(212, 175, 55, 0.08)'
    }
  });

  const handleLogout = () => {
    logout();
    navigate('/'); 
  };

  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{
        background: 'linear-gradient(90deg, #1a0524 0%, #240a35 50%, #311b92 100%)',
        borderBottom: '2px solid rgba(212, 175, 55, 0.5)',
        boxShadow: '0 4px 20px -5px rgba(0,0,0,0.8), 0 2px 10px -2px rgba(212, 175, 55, 0.3)',
        backdropFilter: 'blur(10px)', 
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between', py: 1 }}>
          
          {/* LEFT SIDE: LOGO / TITLE */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
                variant="h6"
                component={RouterLink}
                to="/"
                sx={{
                    textDecoration: 'none',
                    color: '#d4af37', 
                    fontFamily: '"Cinzel", serif',
                    fontWeight: 800,
                    letterSpacing: '1.5px',
                    fontSize: '1.3rem',
                    textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                }}
            >
                DAGGERHEART VAULT
            </Typography>
          </Box>

          {/* RIGHT SIDE: NAVIGATION LINKS */}
          <Stack direction="row" spacing={1} alignItems="center">
            
            {/* Always Visible Links */}
            <Button component={RouterLink} to="/campaigns" sx={navButtonStyle('/campaigns')}>
                Campaigns
            </Button>

            <Button component={RouterLink} to="/ancestries" sx={navButtonStyle('/ancestries')}>
                Ancestries
            </Button>

            <Button component={RouterLink} to="/classes" sx={navButtonStyle('/classes')}>
                Classes
            </Button>

            <Button component={RouterLink} to="/monsters" sx={navButtonStyle('/monsters')}>
                Bestiary
            </Button>
            
            {/* Divider */}
            <Box sx={{ height: 24, width: '1px', bgcolor: 'rgba(255,255,255,0.2)', mx: 1 }} />

            {/* CONDITIONAL LOGIC: LOGGED IN VS LOGGED OUT */}
            {user ? (
                // --- SHOW IF LOGGED IN ---
                <>
                    {/* User Name (Static) */}
                    <Typography sx={{ color: '#b39ddb', fontFamily: 'Cinzel', mr: 1, display: { xs: 'none', md: 'block' } }}>
                        {user.name}
                    </Typography>

                    {/* Settings Cog Button */}
                    <Tooltip title="Account Settings">
                        <IconButton 
                            component={RouterLink} 
                            to="/settings"
                            sx={{ 
                                color: location.pathname === '/settings' ? '#d4af37' : 'rgba(255,255,255,0.7)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                mr: 1,
                                '&:hover': { 
                                    color: '#d4af37', 
                                    borderColor: '#d4af37',
                                    bgcolor: 'rgba(212, 175, 55, 0.1)' 
                                }
                            }}
                        >
                            <SettingsIcon />
                        </IconButton>
                    </Tooltip>

                    {/* Logout Button */}
                    <Button 
                        onClick={handleLogout}
                        variant="outlined"
                        sx={{
                            color: '#ff5252',
                            borderColor: '#ff5252',
                            fontFamily: 'Cinzel',
                            fontWeight: 'bold',
                            '&:hover': { borderColor: '#ff0000', color: '#ff0000', bgcolor: 'rgba(255, 0, 0, 0.1)' }
                        }}
                    >
                        LOGOUT
                    </Button>
                </>
            ) : (
                // --- SHOW IF LOGGED OUT ---
                <>
                    <Button component={RouterLink} to="/login" sx={navButtonStyle('/login')}>
                        Login
                    </Button>
                    <Button 
                        component={RouterLink} 
                        to="/register" 
                        variant="outlined"
                        sx={{
                            ...navButtonStyle('/register'),
                            color: '#d4af37',
                            borderColor: '#d4af37',
                            '&:hover': {
                                borderColor: '#fff',
                                color: '#fff',
                                background: 'rgba(212, 175, 55, 0.1)'
                            }
                        }}
                    >
                        Register
                    </Button>
                </>
            )}

          </Stack>

        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;