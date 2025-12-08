import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Container, Typography, Card, Box, Chip, Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import BackgroundImg from '../assets/daggerheart_background.jpg'; 

function ClassList() {
  
  // Updated list: Only Guardian, Ranger, and Wizard are active.
  const classes = [
    // { 
    //     name: "Bard", 
    //     icon: "🎻", 
    //     domain: "Codex & Splendor", 
    //     desc: "Masters of captivation who weave magic through performance. Whether telling tales or singing songs, they thrive in social situations and bolster their allies.",
    //     tags: ["Support", "Social"]
    // },
    // { 
    //     name: "Druid", 
    //     icon: "🦌", 
    //     domain: "Sage & Arcana", 
    //     desc: "Protectors of the wilderness who channel the untamed forces of nature. They can shape-shift into powerful beasts and command the elements.",
    //     tags: ["Shape-shift", "Nature"]
    // },
    { 
        name: "Guardian", 
        icon: "🛡️", 
        domain: "Valor & Blade", 
        desc: "Unstoppable defenders known for their unshakeable fortitude. They fight with ferocity to protect their charges, answering any injury to an ally in kind.",
        tags: ["Tank", "Defender"]
    },
    { 
        name: "Ranger", 
        icon: "🏹", 
        domain: "Bone & Sage", 
        desc: "Sly tacticians and expert trackers who master the wilds. They often fight alongside a bonded animal companion and strike from the shadows.",
        tags: ["Tracker", "Companion"]
    },
    // { 
    //     name: "Rogue", 
    //     icon: "🗡️", 
    //     domain: "Midnight & Grace", 
    //     desc: "Scoundrels who move through the world anonymously. Masters of stealth and trickery, they exploit weaknesses and strike when least expected.",
    //     tags: ["Stealth", "Trickery"]
    // },
    // { 
    //     name: "Seraph", 
    //     icon: "🪽", 
    //     domain: "Splendor & Valor", 
    //     desc: "Divine fighters imbued with sacred purpose. Empowered by their faith, they soar over the battlefield to smite enemies and heal the wounded.",
    //     tags: ["Flying", "Divine"]
    // },
    // { 
    //     name: "Sorcerer", 
    //     icon: "🔥", 
    //     domain: "Arcana & Midnight", 
    //     desc: "Conduits of volatile, innate magic passed down through bloodlines. They channel raw elemental power or primal forces to transform the battlefield.",
    //     tags: ["Magic", "Blaster"]
    // },
    // { 
    //     name: "Warrior", 
    //     icon: "⚔️", 
    //     domain: "Blade & Bone", 
    //     desc: "Masters of weapons and violence honed by a lifetime of training. They dominate close-quarters combat with unmatched skill and agility.",
    //     tags: ["Melee", "Tactics"]
    // },
    { 
        name: "Wizard", 
        icon: "🔮", 
        domain: "Codex & Arcana", 
        desc: "Scholars of the arcane who have mastered magic through intense study. They wield versatile spells to solve problems and crush their foes.",
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
          Define your role on the battlefield.
        </Typography>

        <Grid container spacing={3}>
          {classes.map((cls, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Card 
                component={RouterLink}
                to={`/classes/${cls.name.toLowerCase()}`}
                sx={{ 
                  height: 300, 
                  position: 'relative',
                  bgcolor: 'rgba(30, 10, 40, 0.6)', 
                  border: '1px solid #5e35b1',
                  borderRadius: 4,
                  overflow: 'hidden',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  pt: 4,
                  '&:hover': { 
                    borderColor: '#d4af37', 
                    boxShadow: '0 0 25px rgba(212, 175, 55, 0.3)',
                    transform: 'translateY(-5px)'
                  },
                  '&:hover .description-overlay': {
                    opacity: 1,
                    transform: 'translateY(0)',
                  },
                  '&:hover .class-icon': {
                    opacity: 0.2, 
                    transform: 'scale(1.2)'
                  }
                }}
              >
                {/* 1. TITLE (Stays visible) */}
                <Typography 
                    variant="h4" 
                    sx={{ 
                        fontFamily: 'Cinzel', 
                        color: '#fff', 
                        letterSpacing: '2px',
                        zIndex: 2, 
                        textShadow: '0 2px 5px rgba(0,0,0,0.8)'
                    }}
                >
                    {cls.name}
                </Typography>

                {/* 2. ICON (Background) */}
                <Box 
                    className="class-icon"
                    sx={{ 
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)', 
                        transition: 'all 0.4s ease',
                        zIndex: 1,
                    }}
                >
                    <Typography variant="h1" sx={{ fontSize: '8rem', opacity: 0.8 }}>
                        {cls.icon}
                    </Typography>
                </Box>

                {/* 3. DESCRIPTION OVERLAY (Slide up on hover) */}
                <Box 
                    className="description-overlay"
                    sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        background: 'linear-gradient(to top, rgba(15, 5, 24, 1) 10%, rgba(15, 5, 24, 0.8) 80%, transparent 100%)',
                        padding: '20px',
                        paddingTop: '40px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        opacity: 0, 
                        transform: 'translateY(20px)',
                        transition: 'all 0.3s ease-in-out',
                        zIndex: 3
                    }}
                >
                    <Chip 
                        label={cls.domain} 
                        size="small" 
                        sx={{ mb: 2, bgcolor: '#d4af37', color: 'black', fontWeight: 'bold' }} 
                    />
                    <Typography variant="body1" align="center" sx={{ color: '#e0e0e0', mb: 2, lineHeight: 1.4, fontSize: '0.95rem' }}>
                        {cls.desc}
                    </Typography>
                    
                    <Button 
                        variant="outlined" 
                        size="small"
                        sx={{ 
                            color: '#d4af37', 
                            borderColor: '#d4af37',
                            '&:hover': { bgcolor: 'rgba(212, 175, 55, 0.1)' }
                        }}
                    >
                        View More
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