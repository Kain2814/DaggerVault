import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container, Typography, CircularProgress, Alert, Card, CardContent, Link, TextField, MenuItem, Box, Button, Chip, Stack, CardActionArea
} from '@mui/material';
import Grid from '@mui/material/Grid';
import SearchIcon from '@mui/icons-material/Search';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { useAuth } from '../context/AuthContext';

function MonsterList() {
  const { user } = useAuth();

// API Base URL
  const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  // Data States
  const [monsters, setMonsters] = useState([]); 
  const [savedMonsters, setSavedMonsters] = useState([]); 
  
  // UI States
  const [viewMode, setViewMode] = useState('all'); 
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTier, setSelectedTier] = useState('All');

  // --- 1. FETCH PUBLIC MONSTERS ---
  const fetchPublicMonsters = (search = '', tier = '') => {
    setIsLoading(true);
    let url = `${BASE_URL}/api/reference?`;
    if (search) url += `search=${search}&`;
    if (tier && tier !== 'All') url += `tier=${tier}`;

    axios.get(url)
      .then(response => {
        setMonsters(response.data.results);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error:", error);
        setError("Failed to fetch public monsters.");
        setIsLoading(false);
      });
  };

  // --- 2. FETCH SAVED MONSTERS ---
  const fetchSavedMonsters = () => {
      setIsLoading(true);
      axios.get(`${BASE_URL}/api/campaigns/user/all-monsters`, {
          headers: { Authorization: `Bearer ${user?.token}` }
      })
      .then(response => {
          setSavedMonsters(response.data);
          setIsLoading(false);
      })
      .catch(error => {
          console.error("Error:", error);
          setError("Failed to load your saved monsters.");
          setIsLoading(false);
      });
  };

  // Effect to handle view switching
  useEffect(() => {
    if (viewMode === 'all') {
        fetchPublicMonsters(searchTerm, selectedTier);
    } else {
        fetchSavedMonsters();
    }
  }, [viewMode, searchTerm, selectedTier]);

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      
      {/* HEADER SECTION */}
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography variant="h2" sx={{ fontFamily: 'Cinzel', color: '#d4af37', mb: 2 }}>
          {viewMode === 'all' ? 'Adversary Compendium' : 'My Saved Vault'}
        </Typography>
        
        {/* VIEW TOGGLE */}
        {user && (
            <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 4 }}>
                <Button 
                    variant={viewMode === 'all' ? 'contained' : 'outlined'}
                    onClick={() => setViewMode('all')}
                    startIcon={<LibraryBooksIcon />}
                    sx={{ bgcolor: viewMode === 'all' ? '#d4af37' : 'transparent', color: viewMode === 'all' ? 'black' : '#d4af37', borderColor: '#d4af37', fontWeight: 'bold' }}
                >
                    Official Bestiary
                </Button>
                <Button 
                    variant={viewMode === 'saved' ? 'contained' : 'outlined'}
                    onClick={() => setViewMode('saved')}
                    startIcon={<BookmarkIcon />}
                    sx={{ bgcolor: viewMode === 'saved' ? '#9c27b0' : 'transparent', color: viewMode === 'saved' ? 'white' : '#9c27b0', borderColor: '#9c27b0', fontWeight: 'bold' }}
                >
                    My Saved Monsters
                </Button>
            </Stack>
        )}
      </Box>

      {/* SEARCH BAR (Only for Public View) */}
      {viewMode === 'all' && (
          <Box sx={{ display: 'flex', gap: 2, mb: 4, bgcolor: 'rgba(255,255,255,0.05)', p: 3, borderRadius: 2 }}>
            <TextField 
                fullWidth 
                variant="filled" 
                label="Search Monsters..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{ endAdornment: <SearchIcon sx={{ color: '#aaa' }} /> }}
                sx={{ bgcolor: 'rgba(0,0,0,0.2)', input: { color: 'white' }, label: { color: '#aaa' } }}
            />
            <TextField
                select
                label="Filter by Tier"
                value={selectedTier}
                onChange={(e) => setSelectedTier(e.target.value)}
                variant="filled"
                sx={{ width: 200, bgcolor: 'rgba(0,0,0,0.2)', color: 'white', svg: { color: 'white' }, label: { color: '#aaa' } }}
                SelectProps={{ sx: { color: 'white' } }}
            >
                <MenuItem value="All">All Tiers</MenuItem>
                <MenuItem value="Tier 0">Tier 0</MenuItem>
                <MenuItem value="Tier 1">Tier 1</MenuItem>
                <MenuItem value="Tier 2">Tier 2</MenuItem>
                <MenuItem value="Tier 3">Tier 3</MenuItem>
                <MenuItem value="Tier 4">Tier 4</MenuItem>
            </TextField>
          </Box>
      )}

      {/* MONSTER GRID */}
      {isLoading ? (
        <CircularProgress sx={{ display: 'block', margin: 'auto', color: '#d4af37' }} />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Grid container spacing={3}>
          {/* DISPLAY LIST */}
          {(viewMode === 'all' ? monsters : savedMonsters).map(monster => (
            // FIX: Removed 'item' and used 'size'
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={monster._id || monster.index}>
              <Card sx={{ 
                  height: '100%', 
                  bgcolor: '#1a0924', 
                  border: `1px solid ${viewMode === 'saved' ? '#9c27b0' : '#5e35b1'}`,
                  transition: '0.3s',
                  '&:hover': { 
                      transform: 'translateY(-5px)', 
                      boxShadow: '0 5px 15px rgba(94, 53, 177, 0.4)',
                      borderColor: '#d4af37'
                  }
              }}>
                <CardActionArea 
                    component={RouterLink} 
                    to={`/monsters/${monster.index}`} 
                    sx={{ height: '100%', p: 2, display: 'flex', flexDirection: 'column', alignItems: 'stretch', justifyContent: 'flex-start' }}
                >
                  <CardContent sx={{ p: 0 }}>
                    <Typography variant="h5" sx={{ fontFamily: 'Cinzel', mb: 1, color: '#c5a059' }}>
                      {monster.name}
                    </Typography>
                    
                    <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                        <Chip label={monster.tier} size="small" sx={{ bgcolor: 'rgba(255,255,255,0.1)', color: '#aaa' }} />
                        <Chip label={monster.type} size="small" sx={{ bgcolor: 'rgba(255,255,255,0.1)', color: '#aaa' }} />
                    </Stack>
                    
                    {/* IF SAVED: SHOW CAMPAIGN NAME */}
                    {viewMode === 'saved' && monster.campaign && (
                        <Chip 
                            label={`Campaign: ${monster.campaign.title}`} 
                            size="small" 
                            sx={{ mb: 2, bgcolor: '#9c27b0', color: 'white', width: '100%' }} 
                        />
                    )}

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, pt: 2, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="caption" sx={{ color: '#777' }}>DIFF</Typography>
                            <Typography variant="h6" sx={{ color: '#fff' }}>{monster.difficulty}</Typography>
                        </Box>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="caption" sx={{ color: '#777' }}>HP</Typography>
                            <Typography variant="h6" sx={{ color: '#ff5252' }}>{monster.hit_points}</Typography>
                        </Box>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="caption" sx={{ color: '#777' }}>STRESS</Typography>
                            <Typography variant="h6" sx={{ color: '#b39ddb' }}>{monster.stress}</Typography>
                        </Box>
                    </Box>

                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
          
          {/* EMPTY STATE */}
          {viewMode === 'saved' && savedMonsters.length === 0 && (
              <Grid size={{ xs: 12 }}>
                  <Typography align="center" sx={{ color: '#777', mt: 4 }}>
                      You haven't saved any monsters to your campaigns yet.
                  </Typography>
              </Grid>
          )}

        </Grid>
      )}
    </Container>
  );
}

export default MonsterList;