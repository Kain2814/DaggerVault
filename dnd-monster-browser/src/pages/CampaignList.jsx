import React, { useState } from 'react';
import { 
  Container, Typography, Button, Box, Card, CardContent, 
  CardActionArea, Modal, TextField, Chip, Divider, IconButton, Paper, Stack
} from '@mui/material';
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';
import { Link as RouterLink } from 'react-router-dom';
import { useCampaigns } from '../context/CampaignContext';
import { useAuth } from '../context/AuthContext';
import AuthModal from '../components/AuthModal';
import BackgroundImg from '../assets/daggerheart_background.jpg'; // Re-using your asset

// Modal Style
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

function CampaignList() {
  const { campaigns, createCampaign } = useCampaigns();
  const { user } = useAuth(); 
  
  // Modal States
  const [createOpen, setCreateOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  
  // Form States
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const handleCreate = async (e) => {
    e.preventDefault();
    await createCampaign(title, desc);
    setCreateOpen(false);
    setTitle('');
    setDesc('');
  };

  // --- VIEW 1: THE GUEST (MARKETING) VIEW ---
  if (!user) {
    return (
      <Box sx={{ minHeight: '100vh', pb: 12, color: 'white' }}>
        
        {/* HERO SECTION */}
        <Box 
          sx={{ 
            pt: 15, pb: 10, px: 2, textAlign: 'center',
            backgroundImage: `linear-gradient(to bottom, rgba(15, 5, 24, 0.85), rgba(15, 5, 24, 1)), url(${BackgroundImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <Container maxWidth="md">
            <Typography variant="h2" sx={{ fontFamily: 'Cinzel', color: '#d4af37', mb: 2 }}>
              Track Your Legend
            </Typography>
            <Typography variant="h5" sx={{ color: '#b39ddb', mb: 5, fontWeight: 300 }}>
              A dedicated campaign vault for GMs and Players. Organize your sessions, chronicle your lore, and map your destiny.
            </Typography>
            <Button 
                variant="contained" 
                size="large"
                onClick={() => setAuthOpen(true)}
                sx={{ bgcolor: '#d4af37', color: 'black', fontWeight: 'bold', px: 5, py: 1.5, fontSize: '1.1rem' }}
            >
                Create Your Campaign Vault
            </Button>
          </Container>
        </Box>

        {/* FEATURE SHOWCASE */}
        <Container maxWidth="lg" sx={{ mt: 8 }}>
          <Grid container spacing={6}>
            
            {/* Feature 1 */}
            <Grid size={{ xs: 12, md: 4 }}>
               <Paper sx={{ p: 4, height: '100%', bgcolor: 'rgba(255,255,255,0.05)', border: '1px solid #5e35b1', textAlign: 'center' }}>
                  <Typography variant="h1" sx={{ mb: 2 }}>📜</Typography>
                  <Typography variant="h5" sx={{ fontFamily: 'Cinzel', color: '#fff', mb: 2 }}>Session Notes</Typography>
                  <Typography sx={{ color: '#b0bec5' }}>
                    Keep private GM notes or share public recaps with your players. Never forget an NPC name again.
                  </Typography>
               </Paper>
            </Grid>

            {/* Feature 2 */}
            <Grid size={{ xs: 12, md: 4 }}>
               <Paper sx={{ p: 4, height: '100%', bgcolor: 'rgba(255,255,255,0.05)', border: '1px solid #5e35b1', textAlign: 'center' }}>
                  <Typography variant="h1" sx={{ mb: 2 }}>🗓️</Typography>
                  <Typography variant="h5" sx={{ fontFamily: 'Cinzel', color: '#fff', mb: 2 }}>Calendar System</Typography>
                  <Typography sx={{ color: '#b0bec5' }}>
                    Track when notes were created and organize your campaign timeline chronologically.
                  </Typography>
               </Paper>
            </Grid>

            {/* Feature 3 */}
            <Grid size={{ xs: 12, md: 4 }}>
               <Paper sx={{ p: 4, height: '100%', bgcolor: 'rgba(255,255,255,0.05)', border: '1px solid #5e35b1', textAlign: 'center' }}>
                  <Typography variant="h1" sx={{ mb: 2 }}>🏰</Typography>
                  <Typography variant="h5" sx={{ fontFamily: 'Cinzel', color: '#fff', mb: 2 }}>The Vault</Typography>
                  <Typography sx={{ color: '#b0bec5' }}>
                    A secure home for your homebrew monsters, custom items, and world lore.
                  </Typography>
               </Paper>
            </Grid>

          </Grid>

          {/* EXAMPLE SECTION */}
          <Box sx={{ mt: 12, textAlign: 'center', p: 6, border: '1px dashed #d4af37', borderRadius: 4, bgcolor: 'rgba(0,0,0,0.3)' }}>
            <Typography variant="h4" sx={{ fontFamily: 'Cinzel', color: '#d4af37', mb: 3 }}>
                Ready to Begin?
            </Typography>
            <Typography sx={{ color: '#e0e0e0', mb: 4 }}>
                Join thousands of other chroniclers building their worlds in Daggerheart.
            </Typography>
            <Button 
                variant="outlined" 
                size="large"
                onClick={() => setAuthOpen(true)}
                sx={{ color: '#fff', borderColor: '#fff', px: 5 }}
            >
                Login to Access
            </Button>
          </Box>

        </Container>

        {/* AUTH MODAL POPUP */}
        <AuthModal open={authOpen} handleClose={() => setAuthOpen(false)} />
      </Box>
    );
  }

  // --- VIEW 2: THE USER (DASHBOARD) VIEW ---
  // This renders if 'user' exists
  return (
    <Container maxWidth="lg" sx={{ py: 8, minHeight: '80vh' }}>
      
      {/* HEADER */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 6 }}>
        <Box>
            <Typography variant="h3" sx={{ fontFamily: 'Cinzel', color: '#d4af37' }}>
            Campaign Vault
            </Typography>
            <Typography variant="subtitle1" sx={{ color: '#b39ddb' }}>
            Welcome back, {user.name}. Your legends await.
            </Typography>
        </Box>
        <Button 
            variant="contained" 
            size="large"
            onClick={() => setCreateOpen(true)}
            sx={{ 
                bgcolor: '#d4af37', 
                color: 'black', 
                fontWeight: 'bold',
                '&:hover': { bgcolor: '#b3912b' }
            }}
        >
            + New Campaign
        </Button>
      </Box>

      <Divider sx={{ mb: 6, borderColor: 'rgba(255,255,255,0.1)' }} />

      {/* CAMPAIGN GRID */}
      <Grid container spacing={4}>
        {/* Show existing campaigns */}
        {campaigns.map((campaign) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={campaign._id}>
                <Card sx={{ 
                    height: '100%', 
                    bgcolor: 'rgba(30, 10, 40, 0.6)', 
                    border: '1px solid #5e35b1',
                    backdropFilter: 'blur(10px)',
                    transition: '0.3s',
                    '&:hover': { 
                        borderColor: '#d4af37', 
                        transform: 'translateY(-5px)',
                        boxShadow: '0 5px 15px rgba(0,0,0,0.5)' 
                    }
                }}>
                    <CardActionArea 
                        component={RouterLink} 
                        to={`/campaigns/${campaign._id}`} 
                        sx={{ height: '100%', p: 2 }}
                    >
                        <CardContent>
                            <Typography variant="h5" gutterBottom sx={{ fontFamily: 'Cinzel', color: '#fff' }}>
                                {campaign.title}
                            </Typography>
                            
                            <Typography variant="body2" sx={{ color: '#b0bec5', mb: 3, height: '40px', overflow: 'hidden' }}>
                                {campaign.description || "No description provided."}
                            </Typography>

                            <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                                <Chip label="GM" size="small" sx={{ bgcolor: '#6200ea', color: 'white' }} />
                                <Chip label={`${campaign.players.length} Players`} size="small" variant="outlined" sx={{ color: '#b39ddb', borderColor: '#b39ddb' }} />
                            </Box>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
        ))}

        {/* If no campaigns exist yet */}
        {campaigns.length === 0 && (
            <Grid size={{ xs: 12 }}>
                <Paper sx={{ p: 6, textAlign: 'center', bgcolor: 'rgba(255,255,255,0.05)', border: '1px dashed #555' }}>
                    <Typography variant="h6" sx={{ color: '#888', mb: 2 }}>
                        No campaigns found.
                    </Typography>
                    <Button variant="outlined" onClick={() => setCreateOpen(true)}>
                        Create Your First Campaign
                    </Button>
                </Paper>
            </Grid>
        )}
      </Grid>

      {/* CREATE CAMPAIGN MODAL */}
      <Modal open={createOpen} onClose={() => setCreateOpen(false)}>
        <Box sx={modalStyle}>
           <IconButton
            onClick={() => setCreateOpen(false)}
            sx={{ position: 'absolute', right: 8, top: 8, color: '#d4af37' }}
          >
            <CloseIcon />
          </IconButton>

          <Typography variant="h5" sx={{ fontFamily: 'Cinzel', mb: 3, color: '#d4af37' }}>
            Start New Adventure
          </Typography>
          <form onSubmit={handleCreate}>
            <TextField
              fullWidth
              label="Campaign Title"
              variant="filled"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              sx={{ mb: 3, bgcolor: 'rgba(255,255,255,0.1)', input: { color: 'white' }, label: { color: '#b39ddb' } }}
              required
            />
            <TextField
              fullWidth
              label="Description"
              variant="filled"
              multiline
              rows={4}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              sx={{ mb: 4, bgcolor: 'rgba(255,255,255,0.1)', textarea: { color: 'white' }, label: { color: '#b39ddb' } }}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ bgcolor: '#d4af37', color: 'black', fontWeight: 'bold' }}>
              Launch Campaign
            </Button>
          </form>
        </Box>
      </Modal>

    </Container>
  );
}

export default CampaignList;
