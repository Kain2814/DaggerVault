import React from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { 
  Container, Typography, Box, Card, CardContent, 
  Chip, Button, Divider, Paper, Stack 
} from '@mui/material';
import Grid from '@mui/material/Grid';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BackgroundImg from '../assets/daggerheart_background.jpg'; 

// --- STATIC DATA (Extracted from Core Rulebook) ---
const classData = {
    guardian: {
        name: "Guardian",
        icon: "🛡️",
        domains: ["Valor", "Blade"],
        tagline: "Unstoppable defenders with unshakeable fortitude.",
        lore: [
            "The title of guardian represents an array of martial professions, speaking more to their moral compass and unshakeable fortitude than the means by which they fight. While many guardians join groups of militants for either a country or cause, they're more likely to follow those few they truly care for, majority be damned.",
            "Guardians are known for fighting with remarkable ferocity even against overwhelming odds, defending their cohort above all else. Woe betide those who harm the ally of a guardian, as the guardian will answer this injury in kind."
        ],
        stats: {
            evasion: 9,
            hp: 7,
            items: "A totem from your mentor or a secret key"
        },
        features: [
            {
                title: "Hope Feature: Frontline Tank",
                desc: "Spend 3 Hope to clear 2 Armor Slots."
            },
            {
                title: "Unstoppable",
                desc: "Once per long rest, you can become Unstoppable. You gain an Unstoppable Die (d4) that increases as you deal damage. While Unstoppable, you reduce incoming physical damage and cannot be Restrained or Vulnerable."
            }
        ],
        subclasses: "Stalwart (Resilient Tank) or Vengeance (Retaliation Striker)",
        ideas: [
            "A retired royal guard seeking redemption for a past failure.",
            "A gentle giant who only fights to protect their friends.",
            "A heavily armored mercenary who never retreats.",
            "A tribal warrior wielding a massive shield made of stone."
        ]
    },
    ranger: {
        name: "Ranger",
        icon: "🏹",
        domains: ["Bone", "Sage"],
        tagline: "Skilled hunters and masters of the wild.",
        lore: [
            "Rangers are highly skilled hunters who, despite their martial abilities, rarely lend their skills to an army. Through mastery of the body and a deep understanding of the wilderness, rangers become sly tacticians, pursuing their quarry with cunning and patience.",
            "Many rangers track and fight alongside an animal companion with whom they've forged a powerful spiritual bond. By honing their skills in the wild, rangers become expert trackers, as likely to ensnare their foes in a trap as they are to assail them head-on."
        ],
        stats: {
            evasion: 12,
            hp: 6,
            items: "A trophy from your first kill or a seemingly broken compass"
        },
        features: [
            {
                title: "Hope Feature: Hold Them Off",
                desc: "Spend 3 Hope when you succeed on an attack with a weapon to use that same roll against two additional adversaries within range."
            },
            {
                title: "Ranger's Focus",
                desc: "Spend a Hope to mark a target as your Focus. You know their direction, deal extra Stress to them, and can reroll failures against them by ending the focus."
            }
        ],
        subclasses: "Beastbound (Animal Companion) or Wayfinder (Expert Hunter)",
        ideas: [
            "A bounty hunter who never loses a target.",
            "A wilderness guide protecting travelers from monsters.",
            "A beast tamer who fights alongside a loyal wolf.",
            "A guerrilla fighter who strikes from the shadows."
        ]
    },
    wizard: {
        name: "Wizard",
        icon: "🔮",
        domains: ["Codex", "Splendor"],
        tagline: "Scholars of the arcane who wield immense power.",
        lore: [
            "Whether through an institution or individual study, those known as wizards acquire and hone immense magical power over years of learning. Some wizards dedicate their lives to mastering a particular school of magic, while others learn from a wide variety of disciplines.",
            "Many wizards become wise and powerful figures in their communities, advising rulers or leading war councils. However, the acquisition and keeping of powerful secrets is a topic of intense debate among their ranks."
        ],
        stats: {
            evasion: 11,
            hp: 5,
            items: "A book you're trying to translate or a tiny, harmless elemental pet"
        },
        features: [
            {
                title: "Hope Feature: Not This Time",
                desc: "Spend 3 Hope to force an adversary within Far range to reroll an attack or damage roll."
            },
            {
                title: "Prestidigitation",
                desc: "You can perform harmless, subtle magical effects at will (lighting candles, cleaning objects, etc)."
            },
            {
                title: "Strange Patterns",
                desc: "Choose a number between 1 and 12. When you roll that number on a Duality Die, gain a Hope or clear a Stress."
            }
        ],
        subclasses: "School of Knowledge (Utility & Lore) or School of War (Battle Magic)",
        ideas: [
            "An eccentric researcher obsessed with ancient ruins.",
            "A war mage who served in a legendary legion.",
            "A hedge wizard who learned magic from folklore and spirits.",
            "A prodigy struggling to control their overwhelming power."
        ]
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
            <Button startIcon={<ArrowBackIcon />} component={RouterLink} to="/classes" sx={{ color: '#b39ddb', mb: 2 }}>
                Back to Selection
            </Button>
            <Typography variant="h1" sx={{ fontFamily: 'Cinzel', color: '#d4af37', textShadow: '0 0 20px black' }}>
                {data.name}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                {data.domains.map(domain => (
                    <Chip key={domain} label={domain} sx={{ bgcolor: '#5e35b1', color: 'white', fontWeight: 'bold' }} />
                ))}
            </Box>
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
                        Class Overview
                    </Typography>
                    <Divider sx={{ bgcolor: '#d4af37', mb: 3 }} />
                    
                    {data.lore.map((paragraph, i) => (
                        <Typography key={i} paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#d1c4e9' }}>
                            {paragraph}
                        </Typography>
                    ))}

                    <Box sx={{ mt: 4, p: 3, bgcolor: 'rgba(0,0,0,0.3)', borderRadius: 2, borderLeft: '4px solid #d4af37' }}>
                        <Typography variant="h6" sx={{ color: '#d4af37', fontFamily: 'Cinzel' }}>Starting Stats</Typography>
                        <Typography variant="body1" sx={{ color: '#ccc' }}><strong>Evasion:</strong> {data.stats.evasion}</Typography>
                        <Typography variant="body1" sx={{ color: '#ccc' }}><strong>Hit Points:</strong> {data.stats.hp}</Typography>
                        <Typography variant="body1" sx={{ color: '#ccc' }}><strong>Class Items:</strong> {data.stats.items}</Typography>
                    </Box>
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
                                <Typography variant="h6" sx={{ color: '#b39ddb' }}>Subclasses</Typography>
                                <Typography variant="body2" sx={{ color: '#aaa' }}>
                                    {data.subclasses}
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Grid>

            {/* RIGHT COL: FEATURES CARD */}
            <Grid size={{ xs: 12, md: 4 }}>
                <Card sx={{ bgcolor: '#1a0924', border: '2px solid #d4af37', position: 'sticky', top: 100 }}>
                    <CardContent>
                        <Box sx={{ textAlign: 'center', mb: 3 }}>
                            <Typography variant="h2">{data.icon}</Typography>
                            <Typography variant="h5" sx={{ fontFamily: 'Cinzel', color: '#d4af37' }}>Class Features</Typography>
                        </Box>

                        <Stack spacing={3}>
                            {data.features.map((feature, i) => (
                                <Box key={i}>
                                    <Typography variant="h6" sx={{ color: '#fff', fontWeight: 'bold', fontSize: '1rem' }}>
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
                            Start Character
                        </Button>
                    </CardContent>
                </Card>
            </Grid>

        </Grid>
      </Container>
    </Box>
  );
}

export default ClassDetail;