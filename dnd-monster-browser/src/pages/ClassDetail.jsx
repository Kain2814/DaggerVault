import React from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { 
  Container, Typography, Box, Card, CardContent, 
  Chip, Button, Divider, Paper, Stack 
} from '@mui/material';
import Grid from '@mui/material/Grid';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// --- ART ASSETS ---
import GuardianImg from '../assets/Guardian_drag.png';
import RangerImg from '../assets/Ranger_frog.png';
import WizardImg from '../assets/Wizard_book.png';
import BackgroundImg from '../assets/daggerheart_background.jpg';

// --- DATA ---
const classData = {
    guardian: {
        name: "Guardian",
        image: GuardianImg,
        tagline: "The immovable object and the unstoppable force.",
        lore: [ "Guardians are the heavy-hitters...", "A Guardian's strength comes not just..." ],
        features: [
            { title: "Unstoppable", desc: "You can mark Stress to reduce incoming damage..." },
            { title: "Battle Hardened", desc: "Gain a permanent +1 bonus..." }
        ],
        coreMechanic: "Armor & Stress Management"
    },
    ranger: {
        name: "Ranger",
        image: RangerImg,
        tagline: "One with the wild, striking from the shadows.",
        lore: [ "Rangers are masters of the wilderness...", "Often accompanied by a trusty animal..." ],
        features: [
            { title: "Natural Tracker", desc: "You have advantage on any roll related to tracking..." },
            { title: "Called Shot", desc: "When attacking with a ranged weapon..." }
        ],
        coreMechanic: "Tracking & Ranged Precision"
    },
    wizard: {
        name: "Wizard",
        image: WizardImg,
        tagline: "A master of the arcane arts and forbidden knowledge.",
        lore: [ "Wizards have dedicated their lives...", "Unlike those born with magic..." ],
        features: [
            { title: "Spellcasting", desc: "You carry a Spellbook..." },
            { title: "Arcane Knowledge", desc: "You have advantage on checks related to history..." }
        ],
        coreMechanic: "Spellcasting & Knowledge"
    }
};

function ClassDetail() {
  const { id } = useParams();
  
  // Data or Fallback
  let data = classData[id];
  
  if (!data) {
      const name = id.charAt(0).toUpperCase() + id.slice(1);
      data = {
          name: name,
          image: BackgroundImg,
          tagline: "A powerful vocation in the world of Daggerheart.",
          lore: [
              `The ${name} is a class defined by its unique approach to combat and problem solving.`,
              "Full details on this class are currently being archived."
          ],
          features: [
              { title: "Class Feature 1", desc: "Details coming soon..." },
              { title: "Class Feature 2", desc: "Details coming soon..." }
          ],
          coreMechanic: "Unique Mechanics"
      };
  }

  return (
    <Box sx={{ minHeight: '100vh', pb: 12, bgcolor: '#0f0518', color: 'white' }}>
      
      {/* 1. HERO BANNER */}
      <Box sx={{ 
          height: '50vh', 
          width: '100%',
          backgroundImage: `linear-gradient(to bottom, rgba(15, 5, 24, 0.2), rgba(15, 5, 24, 1)), url(${data.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 20%', 
          display: 'flex', 
          alignItems: 'flex-end', 
          justifyContent: 'center',
          pb: 6
      }}>
          <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
            <Typography variant="h1" sx={{ fontFamily: 'Cinzel', color: '#d4af37', textShadow: '0 0 30px rgba(0,0,0,0.8), 0 0 10px black' }}>
                {data.name}
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 300, color: '#e0e0e0', maxWidth: '800px', mx: 'auto', textShadow: '0 2px 5px black' }}>
                {data.tagline}
            </Typography>
            <Button startIcon={<ArrowBackIcon />} component={RouterLink} to="/classes" sx={{ color: '#b39ddb', mt: 3 }}>
                Back to Selection
            </Button>
          </Container>
      </Box>

      {/* 2. CONTENT */}
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Grid container spacing={6}>
            
            {/* LEFT COL: LORE */}
            <Grid size={{ xs: 12, md: 8 }}>
                <Paper sx={{ p: 4, bgcolor: 'rgba(30, 10, 40, 0.6)', border: '1px solid #5e35b1' }}>
                    <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Cinzel', color: '#fff' }}>
                        Class Overview
                    </Typography>
                    <Divider sx={{ bgcolor: '#d4af37', mb: 3 }} />
                    
                    {data.lore.map((paragraph, i) => (
                        <Typography key={i} paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#d1c4e9' }}>
                            {paragraph}
                        </Typography>
                    ))}
                </Paper>
            </Grid>

            {/* RIGHT COL: FEATURES */}
            <Grid size={{ xs: 12, md: 4 }}>
                <Card sx={{ bgcolor: '#1a0924', border: '2px solid #d4af37', position: 'sticky', top: 100 }}>
                    <CardContent>
                        <Typography variant="h5" align="center" sx={{ fontFamily: 'Cinzel', color: '#d4af37', mb: 3 }}>Core Traits</Typography>

                        <Stack spacing={3}>
                            {data.features.map((feature, i) => (
                                <Box key={i}>
                                    <Typography variant="h6" sx={{ color: '#fff', fontWeight: 'bold' }}>
                                        {feature.title}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#b0bec5', lineHeight: 1.6 }}>
                                        {feature.desc}
                                    </Typography>
                                </Box>
                            ))}
                        </Stack>

                        <Box sx={{ mt: 4, p: 2, bgcolor: 'rgba(94, 53, 177, 0.1)', borderRadius: 2 }}>
                             <Typography variant="subtitle2" sx={{ color: '#b39ddb' }}>Primary Mechanic:</Typography>
                             <Typography variant="caption" sx={{ color: '#aaa', fontSize: '0.9rem' }}>{data.coreMechanic}</Typography>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>

        </Grid>
      </Container>
    </Box>
  );
}

export default ClassDetail;