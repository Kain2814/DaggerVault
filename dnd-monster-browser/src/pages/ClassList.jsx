import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Container, Typography, Card, Box, Chip, Button, CardMedia } from '@mui/material';
import Grid from '@mui/material/Grid';
import BackgroundImg from '../assets/daggerheart_background.jpg'; 

// --- CLASS ART ---
import GuardianImg from '../assets/Guardian_drag.png';
import RangerImg from '../assets/Ranger_frog.png';
import WizardImg from '../assets/Wizard_book.png';

// Placeholder
const PlaceholderImg = BackgroundImg;

function ClassList() {
  
  const classes = [
    { 
        name: "Bard", 
        image: PlaceholderImg, 
        domain: "Codex & Splendor", 
        desc: "Weavers of magic and song who inspire allies and manipulate foes.",
        tags: ["Support", "Social"]
    },
    { 
        name: "Druid", 
        image: PlaceholderImg, 
        domain: "Sage & Arcana", 
        desc: "Guardians of nature who shape-shift and command the elements.",
        tags: ["Shape-shift", "Nature"]
    },
    { 
        name: "Guardian", 
        image: GuardianImg, 
        domain: "Valor & Blade", 
        desc: "Unstoppable defenders who protect their allies from harm.",
        tags: ["Tank", "Defender"]
    },
    { 
        name: "Ranger", 
        image: RangerImg, 
        domain: "Bone & Sage", 
        desc: "Trackers and hunters who strike from the shadows or distance.",
        tags: ["Tracker", "Companion"]
    },
    { 
        name: "Rogue", 
        image: PlaceholderImg, 
        domain: "Midnight & Grace", 
        desc: "Masters of stealth and precision who exploit every weakness.",
        tags: ["Stealth", "Trickery"]
    },
    { 
        name: "Seraph", 
        image: PlaceholderImg, 
        domain: "Splendor & Valor", 
        desc: "Winged warriors channeling divine power to smite and heal.",
        tags: ["Flying", "Divine"]
    },
    { 
        name: "Sorcerer", 
        image: PlaceholderImg, 
        domain: "Arcana & Midnight", 
        desc: "Conduits of raw, chaotic magic that transforms the battlefield.",
        tags: ["Magic", "Blaster"]
    },
    { 
        name: "Warrior", 
        image: PlaceholderImg, 
        domain: "Blade & Bone", 
        desc: "Masters of tactics and weapons, dominating close quarters combat.",
        tags: ["Melee", "Tactics"]
    },
    { 
        name: "Wizard", 
        image: WizardImg, 
        domain: "Codex & Arcana", 
        desc: "Scholars of the arcane who bend reality with learned spells.",
        tags: ["Utility", "Spells"]
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
          Choose Your Class
        </Typography>
        <Typography variant="h5" align="center" sx={{ color: '#b39ddb', mb: 8, fontWeight: 300 }}>
          Select the path that defines your power.
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {classes.map((cls, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Card 
                component={RouterLink} 
                to={`/classes/${cls.name.toLowerCase()}`}
                sx={{ 
                  height: 500,  
                  position: 'relative',
                  bgcolor: 'black', 
                  border: '1px solid #5e35b1',
                  borderRadius: 4,
                  overflow: 'hidden',
                  textDecoration: 'none',
                  display: 'flex',        
                  flexDirection: 'column', 
                  transition: 'all 0.3s ease',
                  '&:hover': { 
                    borderColor: '#d4af37', 
                    transform: 'translateY(-5px)',
                    boxShadow: '0 0 25px rgba(212, 175, 55, 0.3)'
                  },
                  '&:hover .class-img': {
                    height: '40%' 
                  },
                  '&:hover .title-overlay': {
                    opacity: 0
                  },
                  '&:hover .content-box': {
                    height: '60%',
                    opacity: 1,
                    padding: '24px'
                  }
                }}
              >
                {/* 1. ARTWORK */}
                <CardMedia 
                    component="img"
                    image={cls.image}
                    alt={cls.name}
                    className="class-img"
                    sx={{
                        height: '100%', 
                        width: '100%',
                        objectFit: 'cover',
                        objectPosition: 'top center', 
                        transition: 'height 0.4s ease' 
                    }}
                />

                {/* 2. TITLE OVERLAY */}
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
                        {cls.name}
                    </Typography>
                </Box>

                {/* 3. CONTENT BOX */}
                <Box 
                    className="content-box"
                    sx={{
                        height: 0,          
                        opacity: 0,         
                        bgcolor: '#1a0520', 
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',    
                        justifyContent: 'center',
                        textAlign: 'center',     
                        overflow: 'hidden',      
                        transition: 'all 0.4s ease' 
                    }}
                >
                    <Typography variant="h4" sx={{ fontFamily: 'Cinzel', color: '#d4af37', mb: 1 }}>
                        {cls.name}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', mb: 2 }}>
                        {cls.tags.map(tag => (
                            <Chip key={tag} label={tag} size="small" sx={{ bgcolor: '#6200ea', color: 'white' }} />
                        ))}
                    </Box>

                    <Typography variant="body1" sx={{ color: '#e0e0e0', lineHeight: 1.5, mb: 2, px: 2 }}>
                        {cls.desc}
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

export default ClassList;