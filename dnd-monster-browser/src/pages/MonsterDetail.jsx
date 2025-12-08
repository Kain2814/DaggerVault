import React, { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import { 
  Container, Typography, Card, CardContent, CircularProgress, Alert, 
  Button, Box, Divider, Chip, Modal, MenuItem, Select, FormControl, InputLabel, Paper
} from '@mui/material';
import Grid from '@mui/material/Grid'; // MUI v6
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';

// Import Contexts
import { useAuth } from '../context/AuthContext';
import { useCampaigns } from '../context/CampaignContext'; // <--- USING NEW CONTEXT

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#1a0924',
  border: '2px solid #d4af37',
  boxShadow: 24,
  p: 4,
  color: 'white',
  borderRadius: 2
};

function MonsterDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const { campaigns, saveMonsterToCampaign } = useCampaigns(); // <--- GET CAMPAIGNS

  // State
  const [monster, setMonster] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Save Modal State
  const [openSave, setOpenSave] = useState(false);
  const [selectedCampaignId, setSelectedCampaignId] = useState('');

  // 1. Fetch Monster Data (From API)
  const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  const API_URL = `${BASE_URL}/api/reference/${id}`;

  useEffect(() => {
    setIsLoading(true);
    axios.get(API_URL)
      .then(response => {
        setMonster(response.data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Error:", err);
        setError("Failed to load monster details.");
        setIsLoading(false);
      });
  }, [id]);

  // 2. Filter Campaigns where User is GM
  // (You can only save monsters to campaigns you run!)
  const gmCampaigns = campaigns.filter(c => 
      c.gm === user?._id || (c.gm._id && c.gm._id === user?._id)
  );

  // 3. Handle Save
  const handleSave = async () => {
    if (!selectedCampaignId) return alert("Please select a campaign.");
    
    // Construct the data to save
    const monsterData = {
        index: monster.index,
        name: monster.name,
        tier: monster.tier,
        type: monster.type,
        difficulty: monster.difficulty,
        hit_points: monster.hit_points,
        stress: monster.stress,
        thresholds: monster.thresholds,
        attack: monster.attack,
        damage: monster.damage
    };

    const result = await saveMonsterToCampaign(selectedCampaignId, monsterData);
    
    if (result.success) {
        alert(`Saved ${monster.name} to your campaign!`);
        setOpenSave(false);
        setSelectedCampaignId('');
    } else {
        alert(result.message || "Error saving monster.");
    }
  };

  if (isLoading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 10, color: '#d4af37' }} />;
  if (error) return <Alert severity="error" sx={{ mt: 5 }}>{error}</Alert>;
  if (!monster) return null;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      
      {/* HEADER */}
      <Button startIcon={<ArrowBackIcon />} component={RouterLink} to="/monsters" sx={{ mb: 2, color: '#b39ddb' }}>
        Back to Bestiary
      </Button>

      <Card sx={{ bgcolor: '#1a1a1a', border: '1px solid #333', color: '#fff' }}>
        <CardContent>
          
          {/* TITLE SECTION */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box>
                <Typography variant="h3" sx={{ fontFamily: 'Cinzel', color: '#d4af37' }}>
                    {monster.name}
                </Typography>
                <Typography variant="subtitle1" sx={{ color: '#aaa', fontStyle: 'italic' }}>
                    {monster.flavor_text}
                </Typography>
            </Box>
            
            {/* SAVE BUTTON (Only visible if logged in) */}
            {user && (
                <Button 
                    variant="contained" 
                    startIcon={<SaveIcon />}
                    onClick={() => setOpenSave(true)}
                    sx={{ bgcolor: '#d4af37', color: 'black', fontWeight: 'bold', '&:hover': { bgcolor: '#b3912b' } }}
                >
                    Save to Campaign
                </Button>
            )}
          </Box>
          
          <Divider sx={{ my: 2, bgcolor: '#444' }} />

          {/* STATS GRID */}
          <Grid container spacing={2} sx={{ textAlign: 'center', mb: 3 }}>
            <Grid size={{ xs: 6, sm: 3 }}>
              <Paper sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.05)' }}>
                <Typography variant="subtitle2" color="primary">DIFFICULTY</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{monster.difficulty}</Typography>
              </Paper>
            </Grid>
            <Grid size={{ xs: 6, sm: 3 }}>
              <Paper sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.05)' }}>
                <Typography variant="subtitle2" color="error">HP</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{monster.hit_points}</Typography>
              </Paper>
            </Grid>
            <Grid size={{ xs: 6, sm: 3 }}>
              <Paper sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.05)' }}>
                <Typography variant="subtitle2" sx={{ color: '#9c27b0' }}>STRESS</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{monster.stress}</Typography>
              </Paper>
            </Grid>
            <Grid size={{ xs: 6, sm: 3 }}>
               <Paper sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.05)' }}>
                <Typography variant="subtitle2" sx={{ color: '#aaa' }}>TIER</Typography>
                <Typography variant="h5" sx={{ mt: 1 }}>{monster.tier}</Typography>
              </Paper>
            </Grid>
          </Grid>

          {/* DETAILS LIST */}
          <Box sx={{ bgcolor: 'rgba(0,0,0,0.3)', p: 2, borderRadius: 1 }}>
              <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 4 }}>
                      <Typography variant="h6" sx={{ color: '#d4af37' }}>Attack</Typography>
                      <Typography variant="body1">{monster.attack}</Typography>
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                      <Typography variant="h6" sx={{ color: '#d4af37' }}>Damage</Typography>
                      <Typography variant="body1">{monster.damage}</Typography>
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                      <Typography variant="h6" sx={{ color: '#d4af37' }}>Thresholds</Typography>
                      <Typography variant="body1">{monster.thresholds} (Min/Maj/Sev)</Typography>
                  </Grid>
              </Grid>
          </Box>

        </CardContent>
      </Card>

      {/* SAVE TO CAMPAIGN MODAL */}
      <Modal open={openSave} onClose={() => setOpenSave(false)}>
        <Box sx={modalStyle}>
            <Typography variant="h6" sx={{ color: '#d4af37', mb: 2, fontFamily: 'Cinzel' }}>
                Add to Campaign
            </Typography>
            
            {gmCampaigns.length > 0 ? (
                <>
                    <Typography variant="body2" sx={{ color: '#ccc', mb: 2 }}>
                        Select a campaign to add <strong>{monster.name}</strong> to:
                    </Typography>
                    <FormControl fullWidth variant="filled" sx={{ mb: 3, bgcolor: 'rgba(255,255,255,0.1)' }}>
                        <InputLabel sx={{ color: '#aaa' }}>Campaign</InputLabel>
                        <Select
                            value={selectedCampaignId}
                            onChange={(e) => setSelectedCampaignId(e.target.value)}
                            sx={{ color: 'white' }}
                        >
                            {gmCampaigns.map(c => (
                                <MenuItem key={c._id} value={c._id}>{c.title}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button 
                        fullWidth 
                        variant="contained" 
                        onClick={handleSave}
                        sx={{ bgcolor: '#d4af37', color: 'black', fontWeight: 'bold' }}
                    >
                        Confirm Save
                    </Button>
                </>
            ) : (
                <>
                    <Typography variant="body2" sx={{ color: '#ff5252', mb: 2 }}>
                        You are not the GM of any active campaigns.
                    </Typography>
                    <Button component={RouterLink} to="/campaigns" fullWidth variant="outlined" sx={{ color: '#d4af37', borderColor: '#d4af37' }}>
                        Create a Campaign
                    </Button>
                </>
            )}
        </Box>
      </Modal>

    </Container>
  );
}

export default MonsterDetail;