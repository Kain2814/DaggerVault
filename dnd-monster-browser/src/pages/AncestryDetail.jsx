import React from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { 
  Container, Typography, Box, Card, CardContent, 
  Button, Divider, Paper, Stack 
} from '@mui/material';
import Grid from '@mui/material/Grid';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// --- ART ASSETS ---
// careful with extensions (.png vs .jpg) and case sensitivity!
import ClankImg from '../assets/Clank.png';
import DwarfImg from '../assets/Dwarf.png';
import ElfImg from '../assets/Elf.png';
import FaunImg from '../assets/Faun.png';
import FirbolgImg from '../assets/Firbolg.png';
import FungrilImg from '../assets/Mush_Ancestry.png'; // The one we just added
import GalapaImg from '../assets/Galapa.png'; 
import GoblinImg from '../assets/Goblin.png';
import InfernisImg from '../assets/Infernis_Ancestry.png';
import KatariImg from '../assets/Katari.jpg';
import OrcImg from '../assets/orc.png'; // lowercase 'orc'
import RibbetImg from '../assets/Ribbet_Ancestry.png';
import SimiahImg from '../assets/Simiah_Ancestry.png';
import BackgroundImg from '../assets/daggerheart_background.jpg'; 

// --- ANCESTRY DATA ---
const ancestryData = {
    clank: {
        name: "Clank",
        image: ClankImg,
        tagline: "Sentient mechanical beings built from wood, metal, and stone.",
        lore: [
            "Clanks are sentient mechanical beings built from a variety of materials, including metal, wood, and stone. They can resemble humanoids, animals, or even inanimate objects.",
            "Because of their bespoke construction, many clanks have highly specialized physical configurations. Examples include clawed hands for grasping, wheels for movement, or built-in weaponry.",
            "A clank's lifespan extends as long as they're able to acquire or craft new parts, making their physical form effectively immortal."
        ],
        features: [
            { title: "Purposeful Design", desc: "Decide who made you and for what purpose. Choose an Experience that aligns with this." },
            { title: "Efficient", desc: "When you take a short rest, you can choose a long rest move instead of a short rest move." }
        ]
    },
    drakona: {
        name: "Drakona",
        image: BackgroundImg, // Placeholder until you have art
        tagline: "Prismatic scales and the roaring blood of dragons.",
        lore: [
            "Drakona are wingless dragon-kin who walk the world with the elemental power of their ancestors flowing through their veins. They are proud, powerful, and often deeply connected to the history of the world.",
            "Though they lack wings, their physical presence is intimidating. Their scales shimmer with colors reflecting their elemental heritage—fire, ice, lightning, or acid.",
            "Drakona communities often value strength of character and the keeping of oaths. To break a promise to a Drakona is to invite a storm."
        ],
        features: [
            { title: "Breath Weapon", desc: "Mark a Stress to exhale a blast of elemental energy dealing magic damage to nearby foes." },
            { title: "Elemental Resistance", desc: "You have resistance to damage of your chosen elemental type." }
        ]
    },
    dwarf: {
        name: "Dwarf",
        image: DwarfImg,
        tagline: "Stout and resilient, forged from the earth itself.",
        lore: [
            "Dwarves are known for their incredible endurance and connection to stone and metal. They are natural craftsmen, often feeling more at home in a forge or mine than in an open field.",
            "Many dwarves embed gemstones into their skin as a rite of passage or a display of status. These stones are not just decorative; they often resonate with the earth magic that runs through their bodies.",
            "While often stereotyped as gruff, dwarves possess a deep and complex culture centered around clan, history, and the masterful creation of enduring works."
        ],
        features: [
            { title: "Gemstone Skin", desc: "You have natural armor. You can mark Stress to reduce incoming physical damage." },
            { title: "Darkvision", desc: "You can see clearly in total darkness." }
        ]
    },
    elf: {
        name: "Elf",
        image: ElfImg,
        tagline: "Graceful and long-lived, adapting to the world around them.",
        lore: [
            "Elves do not sleep as others do. Instead, they enter a deep trance known as the Reverie, where they commune with their own memories and the ambient magic of the world.",
            "They are highly adaptive beings. An elf who lives in the forest will physically adapt to match the foliage, while one who lives in a city may take on the colors of stone and mortar.",
            "This adaptability makes them excellent diplomats, spies, and rangers, capable of blending into any environment they choose to call home."
        ],
        features: [
            { title: "Celestial Trance", desc: "You do not need to sleep, and magic cannot put you to sleep. A Long Rest takes only 4 hours." },
            { title: "Adaptive", desc: "Choose an environment (Urban, Wild, etc.). You have Advantage on rolls while in that environment." }
        ]
    },
    faun: {
        name: "Faun",
        image: FaunImg,
        tagline: "Hooved wanderers with a spring in their step.",
        lore: [
            "Fauns are recognized by their horns, furry legs, and cloven hooves. They are creatures of momentum, always moving, leaping, and dancing through life.",
            "Often found in the wildest places of the world, fauns have a natural connection to the rhythm of nature. They are notoriously hard to pin down, both physically and conversationally.",
            "In combat, a faun uses their powerful legs to leap over obstacles and enemies alike, striking from unexpected angles before bounding away."
        ],
        features: [
            { title: "Leap", desc: "You can jump incredible distances, horizontal or vertical, without a running start." },
            { title: "Ram", desc: "You can use your horns as a natural weapon to headbutt enemies." }
        ]
    },
    firbolg: {
        name: "Firbolg",
        image: FirbolgImg,
        tagline: "Gentle giants with the strength of nature.",
        lore: [
            "Firbolgs are towering figures, often covered in thick fur ranging from earthen browns to mossy greens. Despite their intimidating size, they are often gentle, thoughtful souls.",
            "They share a common ancestry with giants but have chosen a path of harmony with the natural world rather than dominance over it.",
            "A firbolg's strength is undeniable. They can lift boulders and uproot trees with ease, but they rarely use this power for violence unless their friends or their forest are threatened."
        ],
        features: [
            { title: "Powerful Build", desc: "You count as one size larger when determining carrying capacity and the weight you can push/drag." },
            { title: "Nature Speech", desc: "You can communicate simple ideas to plants and beasts." }
        ]
    },
    fungril: {
        name: "Fungril",
        image: FungrilImg,
        tagline: "Connected by the mycelium, sharing memory and thought.",
        lore: [
            "Fungril are humanoid mushroom-folk who dwell in the damp, dark places of the world. They are not individuals in the traditional sense, but part of a vast, subterranean consciousness.",
            "Through the mycelial network, they can share thoughts and memories with other Fungril over vast distances. To a Fungril, death is just a recycling of nutrients back into the colony.",
            "They are strange and alien to many, often speaking in plural terms ('We') and viewing the world through a lens of growth, decay, and rebirth."
        ],
        features: [
            { title: "Mycelial Network", desc: "You can telepathically communicate with other fungal creatures or those you have marked with spores." },
            { title: "Decompose", desc: "You can consume organic matter to heal yourself or gain Hope." }
        ]
    },
    galapa: {
        name: "Galapa",
        image: GalapaImg,
        tagline: "Resilient wanderers who carry their protection with them.",
        lore: [
            "Galapa resemble anthropomorphic turtles or tortoises. They are patient, methodical, and carry their homes on their backs in the form of massive, armored shells.",
            "Members of this ancestry can retract their heads and limbs into their shells for protection, becoming nearly impervious to physical harm for a short time.",
            "They are natural travelers, unburdened by the need for shelter. A Galapa is at home wherever they stop to rest."
        ],
        features: [
            { title: "Shell Defense", desc: "Gain a permanent bonus to your Armor Score equal to your Proficiency." },
            { title: "Retract", desc: "Mark a Stress to fully retract into your shell, gaining resistance to all damage until your next turn." }
        ]
    },
    goblin: {
        name: "Goblin",
        image: GoblinImg,
        tagline: "Nimble and quick, with senses sharp as a blade.",
        lore: [
            "Goblins are small, wiry, and incredibly perceptive. Their large ears and eyes catch details that taller folk often miss, giving them an uncanny ability to sense danger.",
            "They often live in bustling, chaotic communities where quick wit and quicker reflexes are necessary for survival. Goblins value cleverness over brute strength.",
            "In the wider world, goblins are survivors. They can squeeze into impossible spaces, hide in plain sight, and escape situations that would doom a larger creature."
        ],
        features: [
            { title: "Danger Sense", desc: "You cannot be surprised, and you have Advantage on Initiative rolls." },
            { title: "Scurry", desc: "You can move through the spaces of creatures larger than you without penalty." }
        ]
    },
    infernis: {
        name: "Infernis",
        image: InfernisImg,
        tagline: "Born of fire and shadow, bearing a dread visage.",
        lore: [
            "Infernis carry the blood of demons or devils in their lineage. This heritage manifests in horns, tails, and skin in shades of red, purple, or ash.",
            "While many fear them for their appearance, Infernis are not inherently evil. They struggle against the prejudice of the world, carving out their own destinies with fierce determination.",
            "When threatened, an Infernis can channel their abyssal heritage to manifest a 'Dread Visage'—a terrifying aura of shadow and flame that can send enemies fleeing in panic."
        ],
        features: [
            { title: "Dread Visage", desc: "Mark Stress to force enemies within close range to make a Fear roll or be terrified." },
            { title: "Hellish Resistance", desc: "You take reduced damage from fire." }
        ]
    },
    katari: {
        name: "Katari",
        image: KatariImg,
        tagline: "Agile feline hunters who always land on their feet.",
        lore: [
            "Katari are cat-like humanoids known for their elegance, independence, and deadly grace. They possess retractable claws and eyes that gleam in the dark.",
            "They are natural hunters, moving silently through both urban jungles and wild forests. A Katari values their freedom above all else and rarely bows to authority.",
            "With their enhanced balance and agility, they can scale walls, leap across rooftops, and always, without fail, land on their feet."
        ],
        features: [
            { title: "Feline Agility", desc: "You take no damage from falling up to 30 feet." },
            { title: "Claws", desc: "Your unarmed strikes deal d8 physical damage." }
        ]
    },
    orc: {
        name: "Orc",
        image: OrcImg,
        tagline: "Strong and proud, with an unshakeable spirit.",
        lore: [
            "Orcs are physically imposing, with broad shoulders, tusks, and a stature that commands respect. They are a people of intense passion and unyielding will.",
            "Culturally, orcs value strength—not just physical might, but strength of conviction. To an orc, giving up is the only true defeat.",
            "Their physiology is built for survival. An orc can fight on long after their body should have given out, fueled by pure adrenaline and determination."
        ],
        features: [
            { title: "Relentless Endurance", desc: "Once per long rest, when you are reduced to 0 HP, you can drop to 1 HP instead." },
            { title: "Tusks", desc: "You can make a bite attack as a bonus action in close quarters." }
        ]
    },
    ribbet: {
        name: "Ribbet",
        image: RibbetImg,
        tagline: "Amphibious folk with a long reach and a high hop.",
        lore: [
            "Ribbets are frog-folk who are equally at home in the water and on land. Their skin is moist and permeable, and they often carry the scent of the swamp with them.",
            "They are famous for their incredibly long, sticky tongues, which they use as a third hand to grab objects, snag food, or even grapple enemies.",
            "Ribbets are often seen as eccentric or quirky by dry-landers, but their knowledge of waterways and poisons makes them invaluable allies."
        ],
        features: [
            { title: "Amphibious", desc: "You can breathe both air and water, and you have a swim speed equal to your run speed." },
            { title: "Tongue Lash", desc: "You can use your tongue to grab small objects or grapple foes up to 'Very Close' range." }
        ]
    },
    simiah: {
        name: "Simiah",
        image: SimiahImg,
        tagline: "Agile climbers with dexterous feet and unmatched mobility.",
        lore: [
            "Simiah resemble anthropomorphic monkeys or apes. They are covered in fur and possess long, agile tails that act as a counterbalance for their acrobatics.",
            "Uniquely, Simiah have prehensile feet that are just as dexterous as their hands. They can hang from a branch while firing a bow or pick a lock with their toes.",
            "They are curiosity incarnate, always wanting to know what is on the other side of the hill or inside the locked chest."
        ],
        features: [
            { title: "Natural Climber", desc: "You have a climb speed equal to your run speed and can hang from surfaces with ease." },
            { title: "Prehensile Feet", desc: "You can hold and manipulate objects with your feet as if they were hands." }
        ]
    }
};

function AncestryDetail() {
  const { id } = useParams();
  
  // Try to find specific data, otherwise use Generic Placeholder
  let data = ancestryData[id];
  
  if (!data) {
      // GENERIC FALLBACK DATA
      const name = id.charAt(0).toUpperCase() + id.slice(1);
      data = {
          name: name,
          image: BackgroundImg, // Use general background
          tagline: "A unique lineage of the Daggerheart world.",
          lore: [
              `The ${name} are a distinct people with their own history and culture within the realms.`,
              "Full lore entries for this ancestry are currently being transcribed from the archives.",
              "Check back soon for detailed biological and cultural information."
          ],
          features: [
              { title: "Ancestry Feature 1", desc: "Details coming soon..." },
              { title: "Ancestry Feature 2", desc: "Details coming soon..." }
          ]
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
            <Button startIcon={<ArrowBackIcon />} component={RouterLink} to="/ancestries" sx={{ color: '#b39ddb', mt: 3 }}>
                Back to Selection
            </Button>
          </Container>
      </Box>

      {/* 2. CONTENT */}
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Grid container spacing={6}>
            <Grid size={{ xs: 12, md: 8 }}>
                <Paper sx={{ p: 4, bgcolor: 'rgba(30, 10, 40, 0.6)', border: '1px solid #5e35b1' }}>
                    <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Cinzel', color: '#fff' }}>Biology & Lore</Typography>
                    <Divider sx={{ bgcolor: '#d4af37', mb: 3 }} />
                    {data.lore.map((paragraph, i) => (
                        <Typography key={i} paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#d1c4e9' }}>{paragraph}</Typography>
                    ))}
                </Paper>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
                <Card sx={{ bgcolor: '#1a0924', border: '2px solid #d4af37', position: 'sticky', top: 100 }}>
                    <CardContent>
                        <Typography variant="h5" align="center" sx={{ fontFamily: 'Cinzel', color: '#d4af37', mb: 3 }}>Features</Typography>
                        <Stack spacing={3}>
                            {data.features.map((feature, i) => (
                                <Box key={i}>
                                    <Typography variant="h6" sx={{ color: '#fff', fontWeight: 'bold' }}>{feature.title}</Typography>
                                    <Typography variant="body2" sx={{ color: '#b0bec5', lineHeight: 1.6 }}>{feature.desc}</Typography>
                                </Box>
                            ))}
                        </Stack>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default AncestryDetail;