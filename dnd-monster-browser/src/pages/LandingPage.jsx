import React from 'react';
import { Container, Typography, Button, Box, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import BackgroundImg from '../assets/daggerheart_background.jpg'; 

// --- LANDING PAGE ART ---
import AncestryArt from '../assets/Ancestry_LP_Fairie.png';
import ClassArt from '../assets/Classes_LP_Katia.png';
import AdversaryArt from '../assets/Adversary_LP_Mush.png';

function LandingPage() {
  return (
    <Box
      sx={{
        // GLOBAL BACKGROUND: Fixed so it scrolls "behind" everything
        minHeight: '100vh',
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)), url(${BackgroundImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed', 
        color: 'white'
      }}
    >
      {/* 1. HERO SECTION */}
      <Box
        sx={{
          height: '80vh', 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          px: 2
        }}
      >
        <Container maxWidth="md">
            {/* Logo Removed as requested */}
            
            <Typography variant="h2" component="h1" gutterBottom sx={{ fontFamily: 'Cinzel', fontWeight: 'bold', textShadow: '0px 0px 10px black', mb: 2 }}>
                Welcome to the Vault
            </Typography>
            
            <Typography variant="h5" sx={{ mb: 6, color: '#e0e0e0', fontWeight: 300, textShadow: '0 2px 5px black' }}>
                The ultimate companion for Daggerheart game masters and players. Manage campaigns, track sessions, and browse the archives.
            </Typography>
            
            <Button 
                component={RouterLink} 
                to="/campaigns" 
                variant="contained" 
                size="large" 
                sx={{ 
                    bgcolor: '#d4af37', 
                    color: 'black', 
                    fontWeight: 'bold', 
                    fontSize: '1.2rem', 
                    py: 1.5, px: 5, 
                    boxShadow: '0 0 20px rgba(212, 175, 55, 0.5)',
                    '&:hover': { bgcolor: '#b3912b' } 
                }}
            >
                Enter the Vault
            </Button>
        </Container>
      </Box>

      {/* 2. CAMPAIGN VAULT SECTION */}
      {/* Using rgba for background allows the fixed image to show through slightly */}
      <Box sx={{ py: 10, bgcolor: 'rgba(26, 9, 36, 0.9)', borderTop: '2px solid #d4af37', borderBottom: '2px solid #d4af37' }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
            <Typography variant="h3" sx={{ fontFamily: 'Cinzel', color: '#d4af37', mb: 3 }}>
                Campaign Management
            </Typography>
            <Typography variant="h6" sx={{ color: '#ccc', mb: 5, lineHeight: 1.6 }}>
                Keep your adventures organized. Track session notes, manage Fear & Hope tokens, and maintain a calendar of your party's journey.
            </Typography>
            <Grid container spacing={4} justifyContent="center">
                <Grid item xs={12} md={4}>
                    <Box sx={{ p: 3, border: '1px solid #5e35b1', borderRadius: 2, bgcolor: 'rgba(0,0,0,0.5)' }}>
                        <Typography variant="h5" sx={{ color: '#fff', mb: 1 }}>Session Notes</Typography>
                        <Typography variant="body2" sx={{ color: '#aaa' }}>Private and public logs for every session.</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Box sx={{ p: 3, border: '1px solid #5e35b1', borderRadius: 2, bgcolor: 'rgba(0,0,0,0.5)' }}>
                        <Typography variant="h5" sx={{ color: '#fff', mb: 1 }}>Token Tracker</Typography>
                        <Typography variant="body2" sx={{ color: '#aaa' }}>Visual trackers for GM Fear and Party Hope.</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Box sx={{ p: 3, border: '1px solid #5e35b1', borderRadius: 2, bgcolor: 'rgba(0,0,0,0.5)' }}>
                        <Typography variant="h5" sx={{ color: '#fff', mb: 1 }}>Calendar</Typography>
                        <Typography variant="body2" sx={{ color: '#aaa' }}>Interactive timeline of your campaign events.</Typography>
                    </Box>
                </Grid>
            </Grid>
        </Container>
      </Box>

      {/* 3. EXPLORE ARCHIVES */}
      <Box sx={{ py: 10, bgcolor: 'rgba(15, 5, 24, 0.9)' }}>
        <Container maxWidth="lg">
            <Typography variant="h3" align="center" sx={{ fontFamily: 'Cinzel', color: '#d4af37', mb: 8 }}>
                Explore the Archives
            </Typography>
            
            <Grid container spacing={6} justifyContent="center">
                
                {/* CARD 1: ANCESTRIES */}
                <Grid item xs={12} md={4}>
                    <Card sx={{ height: '100%', bgcolor: '#1a0924', border: '1px solid #5e35b1', display: 'flex', flexDirection: 'column', transition: 'transform 0.3s', '&:hover': { transform: 'translateY(-10px)', boxShadow: '0 0 20px #9c27b0' } }}>
                        <CardMedia
                            component="img"
                            height="250"
                            image={AncestryArt}
                            alt="Ancestries"
                            sx={{ objectFit: 'cover', objectPosition: 'top' }}
                        />
                        <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                            <Typography variant="h4" sx={{ fontFamily: 'Cinzel', color: '#fff', mb: 2 }}>Ancestries</Typography>
                            <Typography variant="body1" sx={{ color: '#ccc', mb: 3 }}>
                                Discover the diverse lineages of the world.
                            </Typography>
                            <Button component={RouterLink} to="/ancestries" variant="outlined" sx={{ color: '#d4af37', borderColor: '#d4af37' }}>
                                View Lineages
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>

                {/* CARD 2: CLASSES */}
                <Grid item xs={12} md={4}>
                    <Card sx={{ height: '100%', bgcolor: '#1a0924', border: '1px solid #5e35b1', display: 'flex', flexDirection: 'column', transition: 'transform 0.3s', '&:hover': { transform: 'translateY(-10px)', boxShadow: '0 0 20px #9c27b0' } }}>
                        <CardMedia
                            component="img"
                            height="250"
                            image={ClassArt}
                            alt="Classes"
                            sx={{ objectFit: 'cover', objectPosition: 'top' }}
                        />
                        <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                            <Typography variant="h4" sx={{ fontFamily: 'Cinzel', color: '#fff', mb: 2 }}>Classes</Typography>
                            <Typography variant="body1" sx={{ color: '#ccc', mb: 3 }}>
                                Master your destiny. Explore the paths.
                            </Typography>
                            <Button component={RouterLink} to="/classes" variant="outlined" sx={{ color: '#d4af37', borderColor: '#d4af37' }}>
                                View Classes
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>

                {/* CARD 3: BESTIARY */}
                <Grid item xs={12} md={4}>
                    <Card sx={{ height: '100%', bgcolor: '#1a0924', border: '1px solid #5e35b1', display: 'flex', flexDirection: 'column', transition: 'transform 0.3s', '&:hover': { transform: 'translateY(-10px)', boxShadow: '0 0 20px #9c27b0' } }}>
                        <CardMedia
                            component="img"
                            height="250"
                            image={AdversaryArt}
                            alt="Adversaries"
                            sx={{ objectFit: 'cover', objectPosition: 'top' }}
                        />
                        <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                            <Typography variant="h4" sx={{ fontFamily: 'Cinzel', color: '#fff', mb: 2 }}>Bestiary</Typography>
                            <Typography variant="body1" sx={{ color: '#ccc', mb: 3 }}>
                                Browse our compendium of adversaries.
                            </Typography>
                            <Button component={RouterLink} to="/monsters" variant="outlined" sx={{ color: '#d4af37', borderColor: '#d4af37' }}>
                                Open Bestiary
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>

            </Grid>
        </Container>
      </Box>

      {/* 4. COMING SOON SECTION */}
      <Box sx={{ py: 8, bgcolor: 'rgba(0,0,0,0.9)', textAlign: 'center' }}>
        <Container maxWidth="md">
            <Typography variant="h4" sx={{ fontFamily: 'Cinzel', color: '#777', mb: 4 }}>
                Coming Soon
            </Typography>
            <Grid container spacing={2} justifyContent="center">
                <Grid item>
                    <Typography variant="body1" sx={{ color: '#555', border: '1px solid #333', py: 1, px: 3, borderRadius: 5 }}>
                        Character Sheet Builder
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="body1" sx={{ color: '#555', border: '1px solid #333', py: 1, px: 3, borderRadius: 5 }}>
                        Homebrew Monster Creator
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="body1" sx={{ color: '#555', border: '1px solid #333', py: 1, px: 3, borderRadius: 5 }}>
                        Dice Roller
                    </Typography>
                </Grid>
            </Grid>
        </Container>
      </Box>

      {/* 5. FOOTER */}
      <Box sx={{ py: 4, bgcolor: '#0f0518', textAlign: 'center', borderTop: '1px solid #333' }}>
        <Typography variant="body2" sx={{ color: '#555' }}>
            Capstone Project by Rene Luna | Daggerheart Campaign Vault
        </Typography>
      </Box>
    </Box>
  );
}

export default LandingPage;