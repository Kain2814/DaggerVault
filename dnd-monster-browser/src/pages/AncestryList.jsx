import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Container, Typography, Card, Box, Chip, Button, CardMedia } from '@mui/material';
import Grid from '@mui/material/Grid';
import BackgroundImg from '../assets/daggerheart_background.jpg'; 

// --- ANCESTRY ART ---
import ClankImg from '../assets/Clank.png';
import GalapaImg from '../assets/Galapa.png';
import SimiahImg from '../assets/Simiah.png';

function AncestryList() {
  
  const ancestries = [
    { 
        name: "Clank", 
        image: ClankImg, 
        desc: "Sentient mechanical beings built from wood, metal, and stone. Though physically immortal, they seek purpose as their memories fade with time.", 
        tags: ["Construct", "Immortal"] 
    },
    { 
        name: "Galapa", 
        image: GalapaImg, 
        desc: "Tortoise-like wanderers with natural shell armor. They move with purpose and can retract their limbs to weather any storm.", 
        tags: ["Shell", "Defense"] 
    },
    { 
        name: "Simiah", 
        image: SimiahImg, 
        desc: "Agile, monkey-like climbers with prehensile feet. They transition seamlessly between walking and climbing, manipulating the world with dexterity.", 
        tags: ["Climb", "Dexterous"] 
    }
  ];

  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        pb: 8,
        backgroundImage: `linear-gradient(to bottom, rgba(15, 5, 24, 0.9), rgba(15, 5, 24, 0.95)), url(${BackgroundImg})`,
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        color: 'white'
      }}
    >
      <Container maxWidth="lg" sx={{ pt: 8 }}>
        <Typography variant="h2" align="center" sx={{ fontFamily: 'Cinzel', color: '#d4af37', mb: 2 }}>
          Select Your Ancestry
        </Typography>
        <Typography variant="h5" align="center" sx={{ color: '#b39ddb', mb: 8, fontWeight: 300 }}>
          Choose the lineage that defines your origin.
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {ancestries.map((ancestry, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Card 
                component={RouterLink} 
                to={`/ancestries/${ancestry.name.toLowerCase()}`}
                sx={{ 
                  height: 500,  // Taller card to fit text comfortably
                  position: 'relative',
                  bgcolor: 'black', 
                  border: '1px solid #5e35b1',
                  borderRadius: 4,
                  overflow: 'hidden',
                  textDecoration: 'none',
                  display: 'flex',        // FLEXBOX ENABLED
                  flexDirection: 'column', // Stack items vertically
                  transition: 'all 0.3s ease',
                  '&:hover': { 
                    borderColor: '#d4af37', 
                    transform: 'translateY(-5px)',
                    boxShadow: '0 0 25px rgba(212, 175, 55, 0.3)'
                  },
                  // ON HOVER: Shrink image height to make room for text
                  '&:hover .ancestry-img': {
                    height: '40%' 
                  },
                  // ON HOVER: Hide the "Main Title" overlay
                  '&:hover .title-overlay': {
                    opacity: 0
                  },
                  // ON HOVER: Show the content box
                  '&:hover .content-box': {
                    height: '60%',
                    opacity: 1,
                    padding: '24px'
                  }
                }}
              >
                {/* 1. ARTWORK (Starts full height, shrinks on hover) */}
                <CardMedia 
                    component="img"
                    image={ancestry.image}
                    alt={ancestry.name}
                    className="ancestry-img"
                    sx={{
                        height: '100%', // Full height by default
                        width: '100%',
                        objectFit: 'cover',
                        objectPosition: 'top center', // Keep face visible
                        transition: 'height 0.4s ease' // Smooth shrinking animation
                    }}
                />

                {/* 2. TITLE OVERLAY (Visible initially, fades out on hover) */}
                <Box 
                    className="title-overlay"
                    sx={{ 
                        position: 'absolute', 
                        bottom: 0, 
                        left: 0, 
                        width: '100%', 
                        background: 'linear-gradient(to top, rgba(0,0,0,1) 30%, transparent)',
                        pt: 8, pb: 3,
                        textAlign: 'center',
                        transition: 'opacity 0.2s ease'
                    }}
                >
                    <Typography variant="h3" sx={{ fontFamily: 'Cinzel', color: '#fff', textShadow: '0 2px 10px black' }}>
                        {ancestry.name}
                    </Typography>
                </Box>

                {/* 3. CONTENT BOX (Appears below image on hover) */}
                <Box 
                    className="content-box"
                    sx={{
                        height: 0,          // Hidden by default
                        opacity: 0,         // Invisible by default
                        bgcolor: '#1a0520', // Dark purple background
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',    
                        justifyContent: 'center',
                        textAlign: 'center',     
                        overflow: 'hidden',      
                        transition: 'all 0.4s ease' // Smooth slide up
                    }}
                >
                    <Typography variant="h4" sx={{ fontFamily: 'Cinzel', color: '#d4af37', mb: 1 }}>
                        {ancestry.name}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', mb: 2 }}>
                        {ancestry.tags.map(tag => (
                            <Chip key={tag} label={tag} size="small" sx={{ bgcolor: '#6200ea', color: 'white' }} />
                        ))}
                    </Box>

                    <Typography variant="body1" sx={{ color: '#e0e0e0', lineHeight: 1.5, mb: 2, px: 2 }}>
                        {ancestry.desc}
                    </Typography>
                    
                    <Button variant="outlined" size="small" sx={{ color: '#d4af37', borderColor: '#d4af37' }}>
                        View Details
                    </Button>
                </Box>

              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default AncestryList;