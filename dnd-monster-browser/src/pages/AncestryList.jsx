import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Container, Typography, Card, Box, Chip, Button, CardMedia } from '@mui/material';
import Grid from '@mui/material/Grid';
import BackgroundImg from '../assets/daggerheart_background.jpg'; 

// --- ANCESTRY ART ---
import ClankImg from '../assets/Clank.png';       // Updated to PNG
import DrakonaImg from '../assets/Guardian_drag.png' // Drakona art asset (should be Guardian image) (might replace later)
import MushImg from '../assets/Mush_Ancestry.png'; // Fungril art asset (should not be a placeholder)
import DwarfImg from '../assets/Dwarf.png';
import ElfImg from '../assets/Elf.png';
import FaerieImg from '../assets/Ancestry_LP_Fairie.png';
import FaunImg from '../assets/Faun.png';
import FirbolgImg from '../assets/Firbolg.png';
import GalapaImg from '../assets/Galapa.png';     
import GoblinImg from '../assets/Goblin.png';
import InfernisImg from '../assets/Infernis_Ancestry.png';
import KatariImg from '../assets/Katari.jpg';
import OrcImg from '../assets/orc.png';           // Note lowercase 'orc.png'
import RibbetImg from '../assets/Ribbet_Ancestry.png';
import SimiahImg from '../assets/Simiah_Ancestry.png'; // Updated New Image

// Placeholder for those still missing art
const PlaceholderImg = BackgroundImg; 

function AncestryList() {
  
  const ancestries = [
    { 
        name: "Clank", 
        image: ClankImg, 
        desc: "Sentient mechanical beings built from wood, metal, and stone. Though physically immortal, they seek purpose as their memories fade with time.", 
        tags: ["Construct", "Immortal"] 
    },
    { 
        name: "Drakona", 
        image: DrakonaImg, 
        desc: "Wingless dragon-kin with armored scales and sharp teeth. They channel the elemental power of their ancestors through a potent breath weapon.", 
        tags: ["Scales", "Breath Weapon"] 
    },
    { 
        name: "Dwarf", 
        image: DwarfImg, 
        desc: "Stout and resilient humanoids with stone-tough skin. They are known for embedding gemstones into their bodies and enduring great hardship.", 
        tags: ["Resilient", "Gemstone"] 
    },
    { 
        name: "Elf", 
        image: ElfImg, 
        desc: "Graceful, long-lived beings with pointed ears who do not sleep. They enter a celestial trance to rest and adapt their physical forms to their environment.", 
        tags: ["Trance", "Adaptive"] 
    },
    { 
        name: "Faerie", 
        image: FaerieImg, 
        desc: "Diminutive, winged beings with insectile features. They undergo a unique metamorphosis to reveal their true, vibrant forms.", 
        tags: ["Flight", "Metamorphosis"] 
    },
    { 
        name: "Faun", 
        image: FaunImg, 
        desc: "Hooved humanoids with horns and powerful legs. They are natural leapers who navigate difficult terrain with ease.", 
        tags: ["Leap", "Kick"] 
    },
    { 
        name: "Firbolg", 
        image: FirbolgImg, 
        desc: "Towering, fur-covered bovine humanoids. Known for their immense strength and gentle or fierce natures, some resemble minotaurs.", 
        tags: ["Charge", "Unshakable"] 
    },
    { 
        name: "Fungril", 
        image: MushImg, 
        desc: "Mushroom-folk connected by a subterranean mycelial network. They can share thoughts silently and absorb memories from the dead.", 
        tags: ["Network", "Memories"] 
    },
    { 
        name: "Galapa", 
        image: GalapaImg, 
        desc: "Tortoise-like wanderers with natural shell armor. They move with purpose and can retract their limbs to weather any storm.", 
        tags: ["Shell", "Defense"] 
    },
    // commenting out until art and more information are available
    // { 
    //     name: "Giant", 
    //     image: PlaceholderImg, 
    //     desc: "Massive humanoids with long limbs and one to three eyes. Born sightless, they develop unique ocular traits as they mature.", 
    //     tags: ["Reach", "Endurance"] 
    // },
    { 
        name: "Goblin", 
        image: GoblinImg, 
        desc: "Small, nimble kin with massive ears and eyes. They possess keen senses and communicate silently through subtle ear movements.", 
        tags: ["Danger Sense", "Stealth"] 
    },
    // commenting out until art 
    // { 
    //     name: "Halfling", 
    //     image: PlaceholderImg, 
    //     desc: "Small-statured folk with an uncanny internal compass. They are unnaturally lucky and bring good fortune to those around them.", 
    //     tags: ["Luck", "Optimism"] 
    // },
    // commenting out until art 
    // { 
    //     name: "Human", 
    //     image: PlaceholderImg, 
    //     desc: "Adaptable and ambitious wanderers. Known for their diverse skills and unmatched stamina in the face of adversity.", 
    //     tags: ["Adaptable", "Stamina"] 
    // },
    { 
        name: "Infernis", 
        image: InfernisImg, 
        desc: "Descendants of demons with horns and tails. They can manifest a terrifying 'dread visage' to intimidate foes or protect allies.", 
        tags: ["Fearless", "Intimidate"] 
    },
    { 
        name: "Katari", 
        image: KatariImg, 
        desc: "Feline humanoids with retractable claws and heightened senses. They are agile hunters who always land on their feet.", 
        tags: ["Claws", "Agility"] 
    },
    { 
        name: "Orc", 
        image: OrcImg, 
        desc: "Sturdy humanoids with prominent tusks. They are culturally diverse and physically imposing, often decorating their tusks with pride.", 
        tags: ["Sturdy", "Tusks"] 
    },
    { 
        name: "Ribbet", 
        image: RibbetImg, 
        desc: "Amphibious frog-folk with powerful hopping legs. They are at home in the water and can use their long tongues as tools or weapons.", 
        tags: ["Amphibious", "Tongue"] 
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
                  height: 450, 
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
                  '&:hover .ancestry-img': {
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
                    image={ancestry.image}
                    alt={ancestry.name}
                    className="ancestry-img"
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
                        {ancestry.name}
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

