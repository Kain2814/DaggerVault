import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container, Typography, Button, Box, Card, CardContent, CardMedia, Paper, TextField, Stack
} from '@mui/material';
import Grid from '@mui/material/Grid';

// --- ASSETS ---
import DaggerheartLogo from '../assets/Daggerheart_Logo.jpeg'; 
import BackgroundImg from '../assets/daggerheart_background.jpg'; 

function LandingPage() {
  
  return (
    <Box 
        sx={{ 
            minHeight: '100vh', 
            pb: 12,
            backgroundImage: `
                linear-gradient(to bottom, rgba(15, 5, 24, 0.85), rgba(15, 5, 24, 0.95)),
                url(${BackgroundImg})
            `,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundAttachment: 'fixed',
            color: 'white'
        }}
    >
      
      {/* --- 1. HERO SECTION --- */}
      <Container maxWidth="xl" sx={{ pt: 15, pb: 10 }}>
        <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              textAlign: 'center',
              maxWidth: '900px', 
              mx: 'auto' 
            }}
        >
            <Typography variant="h6" sx={{ color: '#d4af37', letterSpacing: '2px', fontWeight: 'bold', textTransform: 'uppercase', mb: 1 }}>
              The Official Companion For
            </Typography>
            <Typography variant="h1" sx={{ fontSize: { xs: '3.5rem', md: '6rem' }, fontWeight: 900, mb: 2, color: '#fff' }}>
              DAGGERHEART
            </Typography>
            <Typography variant="h5" sx={{ mb: 6, color: '#b39ddb', lineHeight: 1.6, fontWeight: 300 }}>
              Build your legend, track your campaigns, and master the Duality of Hope and Fear in this collaborative fantasy RPG.
            </Typography>

            <Stack direction="row" spacing={3}>
                <Button component={RouterLink} to="/register" variant="contained" size="large" sx={{ bgcolor: '#d4af37', color: 'black', fontWeight: 'bold', px: 5, fontSize: '1.1rem' }}>
                    Start Your Journey
                </Button>
                <Button component={RouterLink} to="/monsters" variant="outlined" size="large" sx={{ color: '#fff', borderColor: '#fff', px: 5, fontSize: '1.1rem' }}>
                    Browse Bestiary
                </Button>
            </Stack>
        </Box>
      </Container>

      {/* --- 2. STATS BAR --- */}
      <Box sx={{ borderTop: '1px solid #333', borderBottom: '1px solid #333', bgcolor: 'rgba(0,0,0,0.6)', py: 4 }}>
        <Container maxWidth="lg">
            <Grid container spacing={4} textAlign="center" justifyContent="center">
                <Grid item xs={12} sm={4}>
                    <Typography variant="h3" sx={{ color: '#d4af37', fontWeight: 'bold' }}>300+</Typography>
                    <Typography variant="subtitle1" sx={{ color: '#b39ddb', letterSpacing: '1px' }}>ADVERSARIES</Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Typography variant="h3" sx={{ color: '#d4af37', fontWeight: 'bold' }}>15</Typography>
                    <Typography variant="subtitle1" sx={{ color: '#b39ddb', letterSpacing: '1px' }}>ANCESTRIES</Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Typography variant="h3" sx={{ color: '#d4af37', fontWeight: 'bold' }}>9</Typography>
                    <Typography variant="subtitle1" sx={{ color: '#b39ddb', letterSpacing: '1px' }}>CLASSES</Typography>
                </Grid>
            </Grid>
        </Container>
      </Box>

      {/* --- 3. WHAT IS DAGGERHEART --- */}
      <Container maxWidth="lg" sx={{ py: 12 }}>
        <Paper 
            elevation={0} 
            sx={{ 
                p: { xs: 4, md: 8 }, 
                borderRadius: 4, 
                bgcolor: 'rgba(30, 10, 40, 0.6)', 
                backdropFilter: 'blur(10px)',
                border: '1px solid #5e35b1',
                textAlign: 'center' 
            }}
        >
           <Typography variant="h3" gutterBottom sx={{ fontFamily: 'Cinzel', color: '#fff' }}>
             What is Daggerheart?
           </Typography>
           <Typography variant="body1" paragraph sx={{ fontSize: '1.2rem', lineHeight: 1.8, color: '#e0e0e0', maxWidth: '800px', mx: 'auto' }}>
             Daggerheart is a collaborative fantasy roleplaying game of incredible magic and heroic adventure. 
             The core mechanic is the <strong style={{ color: '#d4af37' }}>Duality Dice</strong> system (2d12) which represents the conflict between Hope and Fear.
           </Typography>
           <Typography variant="body1" sx={{ fontSize: '1.2rem', lineHeight: 1.8, color: '#b39ddb', maxWidth: '800px', mx: 'auto' }}>
             Whether you are investigating an assassination plot or delving into ancient dungeons, 
             the story you tell is built on the choices you make.
           </Typography>
        </Paper>
      </Container>

      {/* --- 4. GAME FEATURES (Ancestries, Classes, Adversaries) --- */}
      <Container maxWidth="lg" sx={{ pb: 12 }}>
        
        {/* A. ANCESTRIES */}
        <Box sx={{ mb: 12, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Container maxWidth="md"> 
                <Typography variant="h3" gutterBottom sx={{ fontFamily: 'Cinzel', color: '#fff' }}>Choose Your Ancestry</Typography>
                <Typography paragraph sx={{ fontSize: '1.1rem', color: '#b0bec5', lineHeight: 1.8, mb: 4, maxWidth: '700px', mx: 'auto' }}>
                    From the noble <strong>Ribbet</strong> to the fungus-folk <strong>Fungril</strong>, Daggerheart offers a diverse array of ancestries. 
                </Typography>
                <Paper sx={{ 
                    height: 350, 
                    width: '100%', maxWidth: '600px', 
                    bgcolor: 'rgba(36, 10, 48, 0.6)', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center', 
                    border: '1px dashed #5e35b1', borderRadius: 4, mx: 'auto', mb: 4
                }}>
                    <Typography variant="h6" color="secondary" sx={{ opacity: 0.7 }}>[Ancestry Art Placeholder]</Typography>
                </Paper>
                <Button component={RouterLink} to="/ancestries" variant="outlined" size="large" sx={{ color: '#d4af37', borderColor: '#d4af37', px: 5 }}>
                    Explore Ancestries
                </Button>
            </Container>
        </Box>

        {/* B. CLASSES */}
        <Box sx={{ mb: 12, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Container maxWidth="md">
                <Typography variant="h3" gutterBottom sx={{ fontFamily: 'Cinzel', color: '#fff' }}>Define Your Class</Typography>
                <Typography paragraph sx={{ fontSize: '1.1rem', color: '#b0bec5', lineHeight: 1.8, mb: 4, maxWidth: '700px', mx: 'auto' }}>
                    Will you protect your allies as a <strong>Guardian</strong>, or weave magic as a <strong>Seraph</strong>?
                    Select your class and build your loadout from hundreds of ability cards.
                </Typography>
                <Paper sx={{ 
                    height: 350, 
                    width: '100%', maxWidth: '600px', 
                    bgcolor: 'rgba(36, 10, 48, 0.6)', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center', 
                    border: '1px dashed #5e35b1', borderRadius: 4, mx: 'auto', mb: 4
                }}>
                    <Typography variant="h6" color="secondary" sx={{ opacity: 0.7 }}>[Class Art Placeholder]</Typography>
                </Paper>
                <Button component={RouterLink} to="/classes" variant="outlined" size="large" sx={{ color: '#d4af37', borderColor: '#d4af37', px: 5 }}>
                    View Classes
                </Button>
            </Container>
        </Box>

        {/* C. ADVERSARIES (The Bestiary Section) */}
        <Box sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Container maxWidth="md">
                <Typography variant="h3" gutterBottom sx={{ fontFamily: 'Cinzel', color: '#fff' }}>Master the Bestiary</Typography>
                <Typography paragraph sx={{ fontSize: '1.1rem', color: '#b0bec5', lineHeight: 1.8, mb: 4, maxWidth: '700px', mx: 'auto' }}>
                    From the depths of the Witherwild to the peaks of the high mountains, this vault houses detailed stats for every adversary in the <strong>Daggerheart Core Set</strong>. 
                </Typography>
                <Paper sx={{ 
                    height: 350, 
                    width: '100%', maxWidth: '600px', 
                    bgcolor: 'rgba(36, 10, 48, 0.6)', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center', 
                    border: '1px dashed #5e35b1', borderRadius: 4, mx: 'auto', mb: 4
                }}>
                    <Typography variant="h6" color="secondary" sx={{ opacity: 0.7 }}>[Adversary Art Placeholder]</Typography>
                </Paper>
                <Button component={RouterLink} to="/monsters" variant="outlined" size="large" sx={{ color: '#d4af37', borderColor: '#d4af37', px: 5 }}>
                    Browse Adversaries
                </Button>
            </Container>
        </Box>

      </Container>

      {/* --- 5. THE CAMPAIGN VAULT (Moved Here!) --- */}
      <Container maxWidth="lg" sx={{ py: 12, borderTop: '1px solid #333' }}>
        <Paper 
            elevation={0} 
            sx={{ 
                p: { xs: 4, md: 8 }, 
                borderRadius: 4, 
                bgcolor: 'rgba(20, 10, 30, 0.8)', 
                border: '1px solid #d4af37',
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: 'center',
                gap: 6
            }}
        >
           {/* Left: Text Description */}
           <Box sx={{ flex: 1 }}>
               <Typography variant="overline" sx={{ color: '#9c27b0', letterSpacing: '2px', fontWeight: 'bold' }}>
                   Manage Your Game
               </Typography>
               <Typography variant="h3" gutterBottom sx={{ fontFamily: 'Cinzel', color: '#fff', mt: 1 }}>
                 The Campaign Vault
               </Typography>
               <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#e0e0e0', mb: 3 }}>
                 Keep your adventures organized with a dedicated digital workspace built for both sides of the screen.
               </Typography>
               
               <Grid container spacing={4}>
                   <Grid item xs={12} sm={6}>
                       <Typography variant="h6" sx={{ color: '#d4af37', mb: 1 }}>For Game Masters</Typography>
                       <Typography variant="body2" sx={{ color: '#b39ddb' }}>
                           Track Fear, manage private session notes, organize NPCs, and curate a custom list of saved adversaries for your next encounter.
                       </Typography>
                   </Grid>
                   <Grid item xs={12} sm={6}>
                       <Typography variant="h6" sx={{ color: '#d4af37', mb: 1 }}>For Players</Typography>
                       <Typography variant="body2" sx={{ color: '#b39ddb' }}>
                           Track Hope, log campaign lore in the shared calendar, and keep a history of your party's legendary deeds.
                       </Typography>
                   </Grid>
               </Grid>

               <Button 
                   component={RouterLink} 
                   to="/campaigns" 
                   variant="contained" 
                   size="large" 
                   sx={{ mt: 4, bgcolor: '#9c27b0', color: 'white', fontWeight: 'bold' }}
               >
                   Open Your Vault
               </Button>
           </Box>

           {/* Right: Visual Abstract */}
           <Box sx={{ flex: 1, textAlign: 'center', display: { xs: 'none', md: 'block' } }}>
                <Typography variant="h1" sx={{ fontSize: '10rem' }}>🗓️</Typography>
           </Box>
        </Paper>
      </Container>

      {/* --- 6. BOTTOM CARDS (Community & Learn) --- */}
      <Box sx={{ bgcolor: 'rgba(18, 4, 28, 0.8)', py: 12, borderTop: '1px solid #333' }}>
        <Container maxWidth="lg">
            <Typography variant="h3" align="center" gutterBottom sx={{ mb: 6, fontFamily: 'Cinzel', color: '#d4af37' }}>
                Join the Community
            </Typography>
            <Grid container spacing={4} justifyContent="center">
                <Grid item xs={12} md={6}>
                    <Card sx={{ height: '100%', bgcolor: '#1f0a29', border: '1px solid #333' }}>
                        <CardContent sx={{ textAlign: 'center', py: 5 }}>
                            <Typography variant="h5" sx={{ color: '#fff', mb: 2, fontFamily: 'Cinzel' }}>Community Hub</Typography>
                            <Typography sx={{ color: '#b0bec5', mb: 3 }}>
                                Share homebrew monsters, discuss rules with other GMs, and find a group to start your adventure.
                            </Typography>
                            <Button variant="text" disabled sx={{ color: '#5e35b1' }}>Coming Soon</Button>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card sx={{ height: '100%', bgcolor: '#1f0a29', border: '1px solid #333' }}>
                        <CardContent sx={{ textAlign: 'center', py: 5 }}>
                            <Typography variant="h5" sx={{ color: '#fff', mb: 2, fontFamily: 'Cinzel' }}>Learn to Play</Typography>
                            <Typography sx={{ color: '#b0bec5', mb: 3 }}>
                                Watch official tutorials and learn the 2d12 Duality system from the creators.
                            </Typography>
                            <Button 
                                component="a" 
                                href="https://www.youtube.com/playlist?list=PL1tiwbzkOjQyM3X879m4z0x6gqJgB6yB2" 
                                target="_blank" 
                                variant="outlined" 
                                sx={{ color: '#d4af37', borderColor: '#d4af37' }}
                            >
                                Watch Videos
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
      </Box>

    </Box>
  );
}

export default LandingPage;