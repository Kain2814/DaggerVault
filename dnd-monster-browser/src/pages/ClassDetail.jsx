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

// --- DATA ---
const classData = {
    guardian: {
        name: "Guardian",
        image: GuardianImg,
        tagline: "The immovable object and the unstoppable force.",
        lore: [
            "Guardians are the heavy-hitters and protectors of Daggerheart. Whether clad in shining plate mail or toughened by strange magic, they place themselves directly in harm's way so their allies don't have to.",
            "A Guardian's strength comes not just from their physical might, but from their conviction. They are often leaders, soldiers, or bodyguards who have sworn an oath to defend others with their lives.",
            "On the battlefield, a Guardian is a wall of steel and muscle. They specialize in absorbing damage, controlling enemy positioning, and delivering crushing blows to those who dare threaten their charges."
        ],
        features: [
            {
                title: "Unstoppable",
                desc: "You can mark Stress to reduce incoming damage by an amount equal to your Armor Score."
            },
            {
                title: "Battle Hardened",
                desc: "Gain a permanent +1 bonus to your Strength or Constitution trait (your choice at creation)."
            }
        ],
        coreMechanic: "Armor & Stress Management"
    },
    ranger: {
        name: "Ranger",
        image: RangerImg,
        tagline: "One with the wild, striking from the shadows.",
        lore: [
            "Rangers are masters of the wilderness, surviving on the fringes of civilization where others would perish. They are trackers, hunters, and scouts who know every leaf and stone of their territory.",
            "Often accompanied by a trusty animal companion or utilizing strange nature magic, Rangers excel at identifying threats before they arrive. They prefer to strike from a distance with a bow or close the gap with dual blades.",
            "Their connection to the natural world grants them abilities to move unseen, speak with beasts, and navigate impossible terrain."
        ],
        features: [
            {
                title: "Natural Tracker",
                desc: "You have advantage on any roll related to tracking, navigating, or identifying beasts."
            },
            {
                title: "Called Shot",
                desc: "When attacking with a ranged weapon, you can take Stress to aim for a weak point, dealing extra damage."
            }
        ],
        coreMechanic: "Tracking & Ranged Precision"
    },
    wizard: {
        name: "Wizard",
        image: WizardImg,
        tagline: "A master of the arcane arts and forbidden knowledge.",
        lore: [
            "Wizards have dedicated their lives to the study of magic. Through dusty tomes, ancient scrolls, and rigorous practice, they have learned to pull at the threads of reality itself.",
            "Unlike those born with magic, a Wizard earns their power through intellect. They carry spellbooks filled with complex formulas that can summon fire, warp time, or shield their allies.",
            "While physically less imposing than a Guardian, a Wizard controls the flow of battle. They can clear entire rooms of enemies with a single word or solve ancient puzzles that stump the strongest warriors."
        ],
        features: [
            {
                title: "Spellcasting",
                desc: "You carry a Spellbook. You can cast spells by marking Stress or using Hope."
            },
            {
                title: "Arcane Knowledge",
                desc: "You have advantage on checks related to history, magic theory, or deciphering runes."
            }
        ],
        coreMechanic: "Spellcasting & Knowledge"
    }
};

function ClassDetail() {
  const { id } = useParams();
  const data = classData[id];

  if (!data) {
    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
            <Typography variant="h4">Class Not Found</Typography>
            <Button component={RouterLink} to="/classes" sx={{ ml: 2, color: '#d4af37' }}>Return</Button>
        </Box>
    );
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