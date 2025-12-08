import React from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { 
  Container, Typography, Box, Card, CardContent, 
  Chip, Button, Divider, Paper, Stack 
} from '@mui/material';
import Grid from '@mui/material/Grid'; // MUI v6 standard import
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BackgroundImg from '../assets/daggerheart_background.jpg'; 

// --- STATIC DATA (Extracted from Core Rulebook) ---
const ancestryData = {
    clank: {
        name: "Clank",
        icon: "⚙️",
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
        icon: "🐢",
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
        icon: "🐒",
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
    },
    human: {
        name: "Human",
        icon: "🤝",
        tagline: "Adaptable wanderers defined by their endurance and ambition.",
        lore: [
            "Humans are most easily recognized by their dexterous hands, rounded ears, and bodies built for endurance. Their average height ranges from just under 5 feet to about 6 ½ feet.",
            "They have a wide variety of builds, with some being quite broad, others lithe, and many inhabiting the spectrum in between. Humans are physically adaptable and adjust to harsh climates with relative ease.",
            "In general, humans live to an age of about 100, with their bodies changing dramatically between their youngest and oldest years."
        ],
        features: [
            {
                title: "High Stamina",
                desc: "Gain an additional Stress slot at character creation."
            },
            {
                title: "Adaptability",
                desc: "When you fail a roll that utilized one of your Experiences, you can mark a Stress to reroll."
            }
        ],
        ideas: [
            "A diplomat navigating the complex politics of the realms.",
            "A stubborn survivor who refuses to stay down.",
            "A jack-of-all-trades adventurer seeking glory.",
            "A battle-hardened veteran of many wars."
        ],
        mixedAncestry: "Humans are the most common basis for mixed ancestries. Try a Human-Elf (Half-Elf) or Human-Orc."
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
    <Box 
      sx={{ 
        minHeight: '100vh', 
        pb: 12,
        backgroundImage: `linear-gradient(to bottom, rgba(15, 5, 24, 0.95), rgba(15, 5, 24, 0.9)), url(${BackgroundImg})`,
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        color: 'white'
      }}
    >
      {/* HEADER IMAGE PLACEHOLDER */}
      <Box sx={{ 
          height: '40vh', 
          bgcolor: 'rgba(0,0,0,0.5)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          borderBottom: '4px solid #d4af37',
          position: 'relative',
          overflow: 'hidden'
      }}>
          <Typography variant="h1" sx={{ fontSize: '15rem', opacity: 0.1, position: 'absolute' }}>
              {data.icon}
          </Typography>
          <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
            <Button startIcon={<ArrowBackIcon />} component={RouterLink} to="/ancestries" sx={{ color: '#b39ddb', mb: 2 }}>
                Back to Selection
            </Button>
            <Typography variant="h1" sx={{ fontFamily: 'Cinzel', color: '#d4af37', textShadow: '0 0 20px black' }}>
                {data.name}
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 300, color: '#e0e0e0', maxWidth: '800px' }}>
                {data.tagline}
            </Typography>
          </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mt: 8 }}>
        <Grid container spacing={6}>
            
            {/* LEFT COL: LORE & BIO */}
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

                {/* IDEAS SECTION (Bottom) */}
                <Box sx={{ mt: 6 }}>
                    <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Cinzel', color: '#fff' }}>
                        Ideas for your {data.name}
                    </Typography>
                    <Grid container spacing={4} alignItems="center">
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Paper sx={{ 
                                height: 300, 
                                bgcolor: 'rgba(0,0,0,0.3)', 
                                border: '1px dashed #777',
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}>
                                <Typography sx={{ color: '#777' }}>[Concept Art Placeholder]</Typography>
                            </Paper>
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Stack spacing={2}>
                                {data.ideas.map((idea, i) => (
                                    <Chip key={i} label={idea} sx={{ bgcolor: 'rgba(212, 175, 55, 0.1)', color: '#d4af37', justifyContent: 'flex-start', p: 1 }} />
                                ))}
                            </Stack>
                            <Box sx={{ mt: 4, p: 2, bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 2 }}>
                                <Typography variant="h6" sx={{ color: '#b39ddb' }}>Mixed Ancestry?</Typography>
                                <Typography variant="body2" sx={{ color: '#aaa' }}>
                                    {data.mixedAncestry}
                                    <br/>
                                    <em>(Rules: Choose one feature from each parent ancestry.)</em>
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Grid>

            {/* RIGHT COL: STATS & FEATURES CARD */}
            <Grid size={{ xs: 12, md: 4 }}>
                <Card sx={{ bgcolor: '#1a0924', border: '2px solid #d4af37', position: 'sticky', top: 100 }}>
                    <CardContent>
                        <Box sx={{ textAlign: 'center', mb: 3 }}>
                            <Typography variant="h2">{data.icon}</Typography>
                            <Typography variant="h5" sx={{ fontFamily: 'Cinzel', color: '#d4af37' }}>Ancestry Features</Typography>
                        </Box>

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

                        <Divider sx={{ my: 3, bgcolor: '#555' }} />
                        
                        <Button fullWidth variant="contained" sx={{ bgcolor: '#d4af37', color: 'black', fontWeight: 'bold' }}>
                            Add to Character
                        </Button>
                    </CardContent>
                </Card>
            </Grid>

        </Grid>
      </Container>
    </Box>
  );
}

export default AncestryDetail;