import React from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { 
  Container, Typography, Box, Card, CardContent, 
  Chip, Button, Divider, Paper, Stack 
} from '@mui/material';
import Grid from '@mui/material/Grid';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// --- ART ASSETS ---
import ClankImg from '../assets/Clank.png';
import GalapaImg from '../assets/Galapa.png';
import SimiahImg from '../assets/Simiah.png';

// --- STATIC DATA ---
const ancestryData = {
    clank: {
        name: "Clank",
        image: ClankImg, // <--- New Image Field
        tagline: "Sentient mechanical beings built from wood, metal, and stone.",
        lore: [
            "Clanks are sentient mechanical beings built from a variety of materials, including metal, wood, and stone. They can resemble humanoids, animals, or even inanimate objects. Like organic beings, their bodies come in a wide array of sizes.",
            "Because of their bespoke construction, many clanks have highly specialized physical configurations. Examples include clawed hands for grasping, wheels for movement, or built-in weaponry. Many clanks embrace body modifications for style as well as function.",
            "A clank's lifespan extends as long as they're able to acquire or craft new parts, making their physical form effectively immortal. That said, their minds are subject to the effects of time, and deteriorate as the magic that powers them loses potency."
        ],
        features: [
            {
                title: "Purposeful Design",
                desc: "Decide who made you and for what purpose. At character creation, choose one of your Experiences that best aligns with this purpose and gain a permanent +1 bonus to it."
            },
            {
                title: "Efficient",
                desc: "When you take a short rest, you can choose a long rest move instead of a short rest move."
            }
        ],
        ideas: [
            "A porcelain doll assassin with hidden blades.",
            "A walking furnace that serves as a mobile forge.",
            "A clockwork knight seeking the family that built them.",
            "A wooden golem overgrown with vines and moss."
        ],
        mixedAncestry: "Try a Clank-Drakona (Mechanical Dragon) or Clank-Giant (Towering Siege Engine)."
    },
    galapa: {
        name: "Galapa",
        image: GalapaImg,
        tagline: "Resilient wanderers who carry their protection with them.",
        lore: [
            "Galapa resemble anthropomorphic turtles with large, domed shells into which they can retract. On average, they range from 4 to 6 feet in height. Galapa come in a variety of earth tones—most often shades of green and brown—and possess unique patterns on their shells.",
            "Members of this ancestry can draw their head, arms, and legs into their shell for protection to use it as a natural shield when defensive measures are needed. Some supplement their shell's strength by attaching armor or carving unique designs.",
            "Most galapa move slowly no matter their age, and they can live approximately 150 years."
        ],
        features: [
            {
                title: "Shell",
                desc: "Gain a bonus to your damage thresholds equal to your Proficiency."
            },
            {
                title: "Retract",
                desc: "Mark a Stress to retract into your shell. While in your shell, you have resistance to physical damage, you have disadvantage on action rolls, and you can't move."
            }
        ],
        ideas: [
            "A heavily armored guardian who acts as a living shield wall.",
            "A wise druid whose shell is a garden of herbs and fungi.",
            "A merchant who carries their entire shop on their back.",
            "A warrior who spins into enemies like a wrecking ball."
        ],
        mixedAncestry: "Try a Galapa-Fungril (Mushroom-covered Shell) or Galapa-Simiah (Climbing Turtle)."
    },
    simiah: {
        name: "Simiah",
        image: SimiahImg,
        tagline: "Agile climbers with dexterous feet and unmatched mobility.",
        lore: [
            "Simiah resemble anthropomorphic monkeys and apes with long limbs and prehensile feet. While their appearance reflects all simian creatures, from the largest gorilla to the smallest marmoset, their size ranges anywhere from 2 to 6 feet tall.",
            "All simiah can use their dexterous feet for nonverbal communication, work, and combat. Additionally, some also have prehensile tails that can grasp objects or help with balance during difficult maneuvers.",
            "In particular, simiah are skilled climbers and can easily transition from bipedal movement to knuckle-walking and climbing, and back again."
        ],
        features: [
            {
                title: "Natural Climber",
                desc: "You have advantage on Agility Rolls that involve balancing and climbing."
            },
            {
                title: "Nimble",
                desc: "Gain a permanent +1 bonus to your Evasion at character creation."
            }
        ],
        ideas: [
            "A treetop ranger who never touches the ground.",
            "A monk who fights with all four limbs in fluid motion.",
            "A thief who hangs from their tail to pick locks upside down.",
            "A powerful gorilla-like warrior who fights with bare knuckles."
        ],
        mixedAncestry: "Try a Simiah-Faerie (Flying Monkey) or Simiah-Katari (Ultimate Agility)."
    }
};

function AncestryDetail() {
  const { id } = useParams();
  const data = ancestryData[id];

  if (!data) {
    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
            <Typography variant="h4">Ancestry Not Found</Typography>
            <Button component={RouterLink} to="/ancestries" sx={{ ml: 2, color: '#d4af37' }}>Return</Button>
        </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', pb: 12, bgcolor: '#0f0518', color: 'white' }}>
      
      {/* 1. HEADER IMAGE (Using the official art) */}
      <Box sx={{ 
          height: '50vh', 
          width: '100%',
          backgroundImage: `linear-gradient(to bottom, rgba(15, 5, 24, 0.2), rgba(15, 5, 24, 1)), url(${data.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 20%', // Centers the face usually
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
            <Button startIcon={<ArrowBackIcon />} component={RouterLink} to="/ancestries" sx={{ color: '#b39ddb', mt: 3 }}>
                Back to Selection
            </Button>
          </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Grid container spacing={6}>
            
            {/* LEFT COL: LORE */}
            <Grid size={{ xs: 12, md: 8 }}>
                <Paper sx={{ p: 4, bgcolor: 'rgba(30, 10, 40, 0.6)', border: '1px solid #5e35b1' }}>
                    <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Cinzel', color: '#fff' }}>
                        Biology & Lore
                    </Typography>
                    <Divider sx={{ bgcolor: '#d4af37', mb: 3 }} />
                    
                    {data.lore.map((paragraph, i) => (
                        <Typography key={i} paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#d1c4e9' }}>
                            {paragraph}
                        </Typography>
                    ))}
                </Paper>

                {/* IDEAS SECTION */}
                <Box sx={{ mt: 6 }}>
                    <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Cinzel', color: '#fff' }}>
                        Character Concepts
                    </Typography>
                    <Grid container spacing={4}>
                        {data.ideas.map((idea, i) => (
                             <Grid size={{ xs: 12, sm: 6 }} key={i}>
                                <Paper sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.05)', borderLeft: '4px solid #d4af37' }}>
                                    <Typography variant="body1" sx={{ color: '#e0e0e0' }}>{idea}</Typography>
                                </Paper>
                             </Grid>
                        ))}
                    </Grid>
                </Box>
            </Grid>

            {/* RIGHT COL: STATS & FEATURES */}
            <Grid size={{ xs: 12, md: 4 }}>
                <Card sx={{ bgcolor: '#1a0924', border: '2px solid #d4af37', position: 'sticky', top: 100 }}>
                    <CardContent>
                        <Typography variant="h5" align="center" sx={{ fontFamily: 'Cinzel', color: '#d4af37', mb: 3 }}>Ancestry Features</Typography>

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
                             <Typography variant="subtitle2" sx={{ color: '#b39ddb' }}>Mixed Ancestry Tip:</Typography>
                             <Typography variant="caption" sx={{ color: '#aaa' }}>{data.mixedAncestry}</Typography>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>

        </Grid>
      </Container>
    </Box>
  );
}

export default AncestryDetail;