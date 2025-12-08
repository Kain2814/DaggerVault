import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Container, Typography, Card, Box, Chip, Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import BackgroundImg from '../assets/daggerheart_background.jpg'; 

function AncestryList() {
  
  // Updated list: Clank is now hidden. Only Galapa, Human, and Simiah remain.
  const ancestries = [
    // { 
    //     name: "Clank", 
    //     icon: "⚙️", 
    //     desc: "Sentient mechanical beings built from wood, metal, and stone. Though physically immortal, they seek purpose as their memories fade with time.", 
    //     tags: ["Construct", "Immortal"] 
    // },
    // { 
    //     name: "Drakona", 
    //     icon: "🐉", 
    //     desc: "Wingless dragon-kin with armored scales and sharp teeth. They channel the elemental power of their ancestors through a potent breath weapon.", 
    //     tags: ["Scales", "Breath Weapon"] 
    // },
    // { 
    //     name: "Dwarf", 
    //     icon: "⛏️", 
    //     desc: "Stout and resilient humanoids with stone-tough skin. They are known for embedding gemstones into their bodies and enduring great hardship.", 
    //     tags: ["Resilient", "Gemstone"] 
    // },
    // { 
    //     name: "Elf", 
    //     icon: "🌿", 
    //     desc: "Graceful, long-lived beings with pointed ears who do not sleep. They enter a celestial trance to rest and adapt their physical forms to their environment.", 
    //     tags: ["Trance", "Adaptive"] 
    // },
    // { 
    //     name: "Faerie", 
    //     icon: "🧚", 
    //     desc: "Diminutive, winged beings with insectile features. They undergo a unique metamorphosis to reveal their true, vibrant forms.", 
    //     tags: ["Flight", "Metamorphosis"] 
    // },
    // { 
    //     name: "Faun", 
    //     icon: "🐐", 
    //     desc: "Hooved humanoids with horns and powerful legs. They are natural leapers who navigate difficult terrain with ease.", 
    //     tags: ["Leap", "Kick"] 
    // },
    // { 
    //     name: "Firbolg", 
    //     icon: "🐮", 
    //     desc: "Towering, fur-covered bovine humanoids. Known for their immense strength and gentle or fierce natures, some resemble minotaurs.", 
    //     tags: ["Charge", "Unshakable"] 
    // },
    // { 
    //     name: "Fungril", 
    //     icon: "🍄", 
    //     desc: "Mushroom-folk connected by a subterranean mycelial network. They can share thoughts silently and absorb memories from the dead.", 
    //     tags: ["Network", "Memories"] 
    // },
    { 
        name: "Galapa", 
        icon: "🐢", 
        desc: "Tortoise-like wanderers with natural shell armor. They move with purpose and can retract their limbs to weather any storm.", 
        tags: ["Shell", "Defense"] 
    },
    // { 
    //     name: "Giant", 
    //     icon: "👁️", 
    //     desc: "Massive humanoids with long limbs and one to three eyes. Born sightless, they develop unique ocular traits as they mature.", 
    //     tags: ["Reach", "Endurance"] 
    // },
    // { 
    //     name: "Goblin", 
    //     icon: "👺", 
    //     desc: "Small, nimble kin with massive ears and eyes. They possess keen senses and communicate silently through subtle ear movements.", 
    //     tags: ["Danger Sense", "Stealth"] 
    // },
    // { 
    //     name: "Halfling", 
    //     icon: "🍀", 
    //     desc: "Small-statured folk with an uncanny internal compass. They are unnaturally lucky and bring good fortune to those around them.", 
    //     tags: ["Luck", "Optimism"] 
    // },
    { 
        name: "Human", 
        icon: "🤝", 
        desc: "Adaptable and ambitious wanderers. Known for their diverse skills and unmatched stamina in the face of adversity.", 
        tags: ["Adaptable", "Stamina"] 
    },
    // { 
    //     name: "Infernis", 
    //     icon: "🔥", 
    //     desc: "Descendants of demons with horns and tails. They can manifest a terrifying 'dread visage' to intimidate foes or protect allies.", 
    //     tags: ["Fearless", "Intimidate"] 
    // },
    // { 
    //     name: "Katari", 
    //     icon: "🐱", 
    //     desc: "Feline humanoids with retractable claws and heightened senses. They are agile hunters who always land on their feet.", 
    //     tags: ["Claws", "Agility"] 
    // },
    // { 
    //     name: "Orc", 
    //     icon: "🦷", 
    //     desc: "Sturdy humanoids with prominent tusks. They are culturally diverse and physically imposing, often decorating their tusks with pride.", 
    //     tags: ["Sturdy", "Tusks"] 
    // },
    // { 
    //     name: "Ribbet", 
    //     icon: "🐸", 
    //     desc: "Amphibious frog-folk with powerful hopping legs. They are at home in the water and can use their long tongues as tools or weapons.", 
    //     tags: ["Amphibious", "Tongue"] 
    // },
    { 
        name: "Simiah", 
        icon: "🐒", 
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

        <Grid container spacing={3}>
          {ancestries.map((ancestry, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Card 
                component={RouterLink} 
                to={`/ancestries/${ancestry.name.toLowerCase()}`}
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
                  '&:hover .ancestry-icon': {
                    opacity: 0.2, 
                    transform: 'scale(1.2)'
                  }
                }}
              >
                {/* 1. TITLE */}
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
                    {ancestry.name}
                </Typography>

                {/* 2. ICON */}
                <Box 
                    className="ancestry-icon"
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
                        {ancestry.icon}
                    </Typography>
                </Box>

                {/* 3. DESCRIPTION OVERLAY */}
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
                    <Box sx={{ mb: 2 }}>
                        {ancestry.tags.map(tag => (
                            <Chip 
                                key={tag} 
                                label={tag} 
                                size="small" 
                                sx={{ m: 0.5, bgcolor: '#6200ea', color: 'white', fontWeight: 'bold' }} 
                            />
                        ))}
                    </Box>
                    <Typography variant="body1" align="center" sx={{ color: '#e0e0e0', mb: 2, lineHeight: 1.4, fontSize: '0.95rem' }}>
                        {ancestry.desc}
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

export default AncestryList;