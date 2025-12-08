import React, { useEffect, useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { 
  Container, Typography, Box, Card, CardContent, IconButton, 
  Grid, Chip, Button, Divider, TextField, Modal, Stack, Avatar, ButtonGroup, Paper, Tab, Tabs
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import CloseIcon from '@mui/icons-material/Close';
import SecurityIcon from '@mui/icons-material/Security'; 
import PersonIcon from '@mui/icons-material/Person'; 
import PersonAddIcon from '@mui/icons-material/PersonAdd'; 
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TodayIcon from '@mui/icons-material/Today'; 
import CircleIcon from '@mui/icons-material/Circle'; 
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied'; 
import TokenIcon from '@mui/icons-material/Token'; 
import PetsIcon from '@mui/icons-material/Pets'; // Icon for Monsters

import { useCampaigns } from '../context/CampaignContext';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

// --- CALENDAR IMPORTS ---
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import addMonths from 'date-fns/addMonths';
import subMonths from 'date-fns/subMonths';
import addWeeks from 'date-fns/addWeeks';
import subWeeks from 'date-fns/subWeeks';
import addDays from 'date-fns/addDays';
import subDays from 'date-fns/subDays';

import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = { 'en-US': enUS };
const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales });

// --- TRACKERS ---
const FearTracker = ({ value, onChange, isGM }) => {
    const maxSlots = 12;
    const getSkullStyle = (index) => {
        if (index === 12) return { color: '#d500f9', filter: 'drop-shadow(0 0 8px #d500f9)', transform: 'scale(1.3)' }; 
        if (index > 8) return { color: '#ff1744', filter: 'drop-shadow(0 0 5px #ff1744)' }; 
        if (index > 4) return { color: '#ff9100' }; 
        return { color: '#e0e0e0' }; 
    };
    return (
        <Card sx={{ bgcolor: 'rgba(20, 0, 10, 0.6)', border: '1px solid #5e35b1', p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="h6" sx={{ color: '#b39ddb', fontFamily: 'Cinzel' }}>FEAR TRACKER</Typography>
                <Typography variant="h4" sx={{ color: '#d500f9', fontFamily: 'Cinzel' }}>{value}</Typography>
            </Box>
            <Grid container spacing={1} justifyContent="center">
                {Array.from({ length: maxSlots }, (_, i) => i + 1).map((slotNum) => (
                    <Grid item key={slotNum}>
                        <IconButton 
                            onClick={() => isGM && onChange(slotNum === value ? slotNum - 1 : slotNum)} 
                            disabled={!isGM}
                            sx={{ p: 0.5, border: '2px solid #333', bgcolor: '#0f0518', width: 35, height: 35, '&:hover': { bgcolor: '#240a35', borderColor: '#d500f9' } }}
                        >
                            {value >= slotNum ? <SentimentVeryDissatisfiedIcon sx={{ fontSize: '1.2rem', ...getSkullStyle(slotNum) }} /> : <CircleIcon sx={{ fontSize: '0.6rem', color: '#333' }} />}
                        </IconButton>
                    </Grid>
                ))}
            </Grid>
        </Card>
    );
};

const HopeTracker = ({ value, onChange }) => {
    const maxSlots = 6;
    return (
        <Card sx={{ bgcolor: 'rgba(20, 15, 0, 0.6)', border: '1px solid #d4af37', p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="h6" sx={{ color: '#d4af37', fontFamily: 'Cinzel' }}>HOPE TRACKER</Typography>
                <Typography variant="h4" sx={{ color: '#ffd700', fontFamily: 'Cinzel' }}>{value}</Typography>
            </Box>
            <Grid container spacing={1} justifyContent="center">
                {Array.from({ length: maxSlots }, (_, i) => i + 1).map((slotNum) => (
                    <Grid item key={slotNum}>
                        <IconButton 
                            onClick={() => onChange(slotNum === value ? slotNum - 1 : slotNum)}
                            sx={{ p: 0.5, border: '2px solid #443300', bgcolor: '#1a1200', width: 40, height: 40, '&:hover': { bgcolor: '#332200', borderColor: '#ffca28' } }}
                        >
                            {value >= slotNum ? <TokenIcon sx={{ fontSize: '1.5rem', color: '#ffd700', filter: 'drop-shadow(0 0 5px #ffb300)' }} /> : <CircleIcon sx={{ fontSize: '0.6rem', color: '#443300' }} />}
                        </IconButton>
                    </Grid>
                ))}
            </Grid>
        </Card>
    );
};

const NoteDetail = ({ note, onClose, onUpdate, onDelete, canEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({ title: note.title, content: note.content, visibility: note.visibility });

    const handleSave = () => {
        onUpdate(note._id, editData);
        setIsEditing(false);
    };

    return (
        <Box>
            {isEditing ? (
                <>
                    <TextField fullWidth label="Title" variant="filled" sx={{ mb: 2, bgcolor: 'rgba(255,255,255,0.1)', input: {color: 'white'} }} value={editData.title} onChange={(e) => setEditData({...editData, title: e.target.value})} />
                    <TextField fullWidth label="Content" multiline rows={6} variant="filled" sx={{ mb: 2, bgcolor: 'rgba(255,255,255,0.1)', textarea: {color: 'white'} }} value={editData.content} onChange={(e) => setEditData({...editData, content: e.target.value})} />
                    <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
                        {['Public', 'Private'].map(type => (
                            <Chip key={type} label={type} clickable color={editData.visibility === type ? 'primary' : 'default'} onClick={() => setEditData({...editData, visibility: type})} />
                        ))}
                    </Box>
                    <Stack direction="row" spacing={2} justifyContent="flex-end">
                        <Button startIcon={<CancelIcon />} onClick={() => setIsEditing(false)} sx={{ color: '#fff' }}>Cancel</Button>
                        <Button startIcon={<SaveIcon />} variant="contained" onClick={handleSave} sx={{ bgcolor: '#d4af37', color: 'black' }}>Save</Button>
                    </Stack>
                </>
            ) : (
                <>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography variant="h5" sx={{ color: '#d4af37', fontFamily: 'Cinzel', width: '70%' }}>{note.title}</Typography>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <Chip label={note.visibility} size="small" color="primary" variant="outlined" />
                            {canEdit && (
                                <>
                                    <IconButton size="small" onClick={() => setIsEditing(true)} sx={{ color: '#aaa', '&:hover': { color: '#fff' } }}><EditIcon /></IconButton>
                                    <IconButton size="small" onClick={() => onDelete(note._id)} sx={{ color: '#d32f2f', '&:hover': { color: '#ff5252' } }}><DeleteIcon /></IconButton>
                                </>
                            )}
                        </Box>
                    </Box>
                    <Typography variant="caption" sx={{ color: '#aaa', display: 'block', mb: 2 }}>
                        {new Date(note.realDate).toDateString()} — Written by {note.author.name}
                    </Typography>
                    <Divider sx={{ bgcolor: '#444', mb: 2 }} />
                    <Typography variant="body1" sx={{ color: '#e0e0e0', whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
                        {note.content}
                    </Typography>
                    <Button onClick={onClose} fullWidth variant="outlined" sx={{ mt: 3, color: '#fff', borderColor: '#555' }}>Close</Button>
                </>
            )}
        </Box>
    );
};

// --- MONSTER CARD (Small version for List) ---
const MonsterCard = ({ monster, onDelete }) => (
    <Card sx={{ bgcolor: '#1a0924', border: '1px solid #d4af37', mb: 2 }}>
        <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 2 }}>
            <Box>
                <Typography variant="h6" sx={{ color: '#fff', fontFamily: 'Cinzel' }}>{monster.name}</Typography>
                <Typography variant="caption" sx={{ color: '#b39ddb' }}>
                    {monster.tier} - {monster.type} | Difficulty: {monster.difficulty}
                </Typography>
            </Box>
            <Box>
                 <Button component={RouterLink} to={`/monsters/${monster.index}`} size="small" sx={{ color: '#d4af37' }}>View</Button>
                 <IconButton size="small" onClick={() => onDelete(monster._id)} sx={{ color: '#d32f2f' }}><DeleteIcon /></IconButton>
            </Box>
        </CardContent>
    </Card>
);

// --- MAIN PAGE ---
function CampaignDetail() {
  const { id } = useParams();
  const { fetchCampaignDetails, currentCampaign, updateCampaignData, updateNote, deleteNote, fetchCampaignMonsters, deleteCampaignMonster } = useCampaigns();
  const { user } = useAuth();

  // State
  const [notes, setNotes] = useState([]);
  const [monsters, setMonsters] = useState([]); // New Monster State
  const [selectedNote, setSelectedNote] = useState(null); 
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [isAddingMember, setIsAddingMember] = useState(false); 
  
  // Tab State
  const [activeTab, setActiveTab] = useState('calendar'); // 'calendar' or 'monsters'

  // Edit Campaign State
  const [isEditingCampaign, setIsEditingCampaign] = useState(false);
  const [editCampaignData, setEditCampaignData] = useState({ title: '', description: '' });

  // Calendar State
  const [view, setView] = useState('month'); 
  const [date, setDate] = useState(new Date()); 

  const [newNote, setNewNote] = useState({ title: '', content: '', visibility: 'Public' });
  const [memberEmail, setMemberEmail] = useState(''); 

  useEffect(() => {
    fetchCampaignDetails(id);
    fetchNotes();
    loadMonsters();
  }, [id]);

  useEffect(() => {
    if (currentCampaign) {
        setEditCampaignData({
            title: currentCampaign.title,
            description: currentCampaign.description || ''
        });
    }
  }, [currentCampaign]);

  const fetchNotes = async () => {
    try {
        const res = await axios.get(`http://localhost:5000/api/campaigns/${id}/notes`, {
            headers: { Authorization: `Bearer ${user?.token}` }
        });
        setNotes(res.data);
    } catch (err) {
        console.error("Error loading notes", err);
    }
  };

  const loadMonsters = async () => {
      const data = await fetchCampaignMonsters(id);
      setMonsters(data);
  };

  if (!currentCampaign || !user) return <Typography>Loading Vault...</Typography>;

  const isGM = currentCampaign.gm._id === user._id;

  // --- HANDLERS ---
  const handleFearChange = (val) => updateCampaignData(id, { currentFear: val });
  const handleHopeChange = (val) => updateCampaignData(id, { currentHope: val });

  const handleUpdateNote = async (noteId, data) => {
      const success = await updateNote(noteId, data);
      if (success) { fetchNotes(); setSelectedNote(null); }
  };

  const handleDeleteNote = async (noteId) => {
      if (window.confirm("Are you sure you want to delete this note?")) {
          const success = await deleteNote(noteId);
          if (success) { fetchNotes(); setSelectedNote(null); }
      }
  };

  const handleRemoveMonster = async (monsterId) => {
      if (window.confirm("Remove this monster from campaign?")) {
          await deleteCampaignMonster(monsterId);
          loadMonsters();
      }
  };

  const handleSaveCampaign = async () => {
      await updateCampaignData(id, editCampaignData);
      setIsEditingCampaign(false);
  };

  // --- CALENDAR HANDLERS ---
  const events = notes.map(note => ({
      title: note.title,
      start: new Date(note.realDate),
      end: new Date(note.realDate),
      allDay: true,
      resource: note 
  }));

  const handleSelectEvent = (event) => setSelectedNote(event.resource);
  const handleSelectSlot = ({ start }) => { setDate(start); setIsAddingNote(true); };

  const handleNavigate = (action) => {
    if (action === 'TODAY') setDate(new Date());
    else if (action === 'PREV') {
        if (view === 'month') setDate(subMonths(date, 1));
        if (view === 'week') setDate(subWeeks(date, 1));
        if (view === 'day') setDate(subDays(date, 1));
    } else if (action === 'NEXT') {
        if (view === 'month') setDate(addMonths(date, 1));
        if (view === 'week') setDate(addWeeks(date, 1));
        if (view === 'day') setDate(addDays(date, 1));
    }
  };

  const getHeaderLabel = () => {
      if (view === 'month') return format(date, 'MMMM yyyy');
      if (view === 'week') return `Week of ${format(startOfWeek(date), 'MMM do')}`;
      if (view === 'day') return format(date, 'EEEE, MMM do');
      return '';
  };

  const handleCreateNote = async (e) => {
    e.preventDefault();
    try {
        await axios.post(`http://localhost:5000/api/campaigns/${id}/notes`, {
            ...newNote,
            realDate: date 
        }, {
            headers: { Authorization: `Bearer ${user?.token}` }
        });
        setIsAddingNote(false);
        setNewNote({ title: '', content: '', visibility: 'Public' });
        fetchNotes(); 
    } catch (err) {
        alert("Error saving note");
    }
  };

  const handleAddMember = (e) => {
      e.preventDefault();
      alert(`Invite sent to ${memberEmail}!`);
      setMemberEmail('');
      setIsAddingMember(false);
  };

  const calendarStyle = {
      height: '75vh',
      color: '#b39ddb',
      backgroundColor: 'rgba(0,0,0,0.2)',
      borderRadius: '4px',
      padding: '10px',
      border: '1px solid #5e35b1',
      fontFamily: 'Lato, sans-serif'
  };

  return (
    <Container maxWidth={false} sx={{ py: 4, px: { xs: 2, md: 4 } }}>
      
      {/* 2. MAIN CONTENT GRID */}
      <Grid container spacing={4}>
        
        {/* LEFT COL: SIDEBAR */}
        <Grid size={{ xs: 12, md: 3, lg: 2 }}>
            <Box sx={{ mb: 4 }}>
                <Stack spacing={2}>
                    <HopeTracker value={currentCampaign.currentHope} onChange={handleHopeChange} isGM={isGM} />
                    <FearTracker value={currentCampaign.currentFear} onChange={handleFearChange} isGM={isGM} />
                </Stack>
            </Box>

            <Card sx={{ bgcolor: '#1a1a1a', border: '1px solid #333', mb: 2 }}>
                <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        
                        {!isEditingCampaign ? (
                            <Box sx={{ width: '100%' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="h6" sx={{ fontFamily: 'Cinzel', color: '#d4af37', mb: 1, fontSize: '1rem' }}>
                                        {currentCampaign.title}
                                    </Typography>
                                    {isGM && (
                                        <IconButton size="small" onClick={() => setIsEditingCampaign(true)} sx={{ color: '#777' }}>
                                            <EditIcon fontSize="small" />
                                        </IconButton>
                                    )}
                                </Box>
                                <Chip 
                                    icon={isGM ? <SecurityIcon fontSize="small" /> : <PersonIcon fontSize="small" />} 
                                    label={isGM ? "GM" : "Player"} 
                                    color={isGM ? "error" : "primary"} 
                                    size="small" 
                                    sx={{ mb: 2 }}
                                />
                                <Typography variant="body2" sx={{ color: '#eee', lineHeight: 1.6, fontSize: '0.8rem' }}>
                                    {currentCampaign.description || "No description set."}
                                </Typography>
                            </Box>
                        ) : (
                            <Box sx={{ width: '100%' }}>
                                <TextField 
                                    fullWidth size="small" label="Title" 
                                    value={editCampaignData.title}
                                    onChange={(e) => setEditCampaignData({...editCampaignData, title: e.target.value})}
                                    sx={{ mb: 2, bgcolor: 'rgba(255,255,255,0.1)', input: { color: 'white' } }}
                                />
                                <TextField 
                                    fullWidth size="small" label="Description" multiline rows={3} 
                                    value={editCampaignData.description}
                                    onChange={(e) => setEditCampaignData({...editCampaignData, description: e.target.value})}
                                    sx={{ mb: 2, bgcolor: 'rgba(255,255,255,0.1)', textarea: { color: 'white' } }}
                                />
                                <Stack direction="row" spacing={1} justifyContent="flex-end">
                                    <IconButton size="small" onClick={() => setIsEditingCampaign(false)} sx={{ color: '#aaa' }}><CancelIcon /></IconButton>
                                    <IconButton size="small" onClick={handleSaveCampaign} sx={{ color: '#d4af37' }}><SaveIcon /></IconButton>
                                </Stack>
                            </Box>
                        )}
                    </Box>
                </CardContent>
            </Card>

            <Card sx={{ bgcolor: '#1a1a1a', border: '1px solid #333', mb: 2 }}>
                <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="subtitle2" sx={{ color: '#aaa' }}>PARTY</Typography>
                        {isGM && <IconButton onClick={() => setIsAddingMember(true)} sx={{ color: '#d4af37' }} size="small"><PersonAddIcon fontSize="small" /></IconButton>}
                    </Box>
                    <Stack spacing={1}>
                        {currentCampaign.players.map(p => (
                            <Button 
                                key={p._id}
                                component={RouterLink}
                                to={`/characters/${p._id}`} 
                                startIcon={<Avatar sx={{ width: 20, height: 20, bgcolor: '#5e35b1', fontSize: '10px' }}>{p.name[0]}</Avatar>}
                                sx={{ justifyContent: 'flex-start', color: '#b39ddb', textTransform: 'none', fontSize: '0.8rem', '&:hover': { bgcolor: 'rgba(94, 53, 177, 0.1)', color: '#fff' } }}
                            >
                                {p.name}
                            </Button>
                        ))}
                    </Stack>
                </CardContent>
            </Card>

            {/* TAB SWITCHER (NEW) */}
            <Stack spacing={1}>
                <Button 
                    variant={activeTab === 'calendar' ? 'contained' : 'outlined'} 
                    onClick={() => setActiveTab('calendar')}
                    sx={{ bgcolor: activeTab === 'calendar' ? '#d4af37' : 'transparent', color: activeTab === 'calendar' ? 'black' : '#d4af37', borderColor: '#d4af37' }}
                >
                    Calendar
                </Button>
                {isGM && (
                    <Button 
                        startIcon={<PetsIcon />}
                        variant={activeTab === 'monsters' ? 'contained' : 'outlined'} 
                        onClick={() => setActiveTab('monsters')}
                        sx={{ bgcolor: activeTab === 'monsters' ? '#9c27b0' : 'transparent', color: activeTab === 'monsters' ? 'white' : '#9c27b0', borderColor: '#9c27b0' }}
                    >
                        Saved Monsters
                    </Button>
                )}
            </Stack>

        </Grid>

        {/* RIGHT COL: CONTENT AREA */}
        <Grid size={{ xs: 12, md: 9, lg: 10 }}>
             
             {/* VIEW 1: CALENDAR */}
             {activeTab === 'calendar' && (
                <>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <IconButton onClick={() => handleNavigate('PREV')} sx={{ color: '#d4af37', border: '1px solid #333' }}><ChevronLeftIcon /></IconButton>
                            <IconButton onClick={() => handleNavigate('TODAY')} sx={{ color: '#aaa' }} title="Today"><TodayIcon /></IconButton>
                            <IconButton onClick={() => handleNavigate('NEXT')} sx={{ color: '#d4af37', border: '1px solid #333' }}><ChevronRightIcon /></IconButton>
                            <Typography variant="h4" sx={{ color: '#fff', fontFamily: 'Cinzel', ml: 2, width: 300, textAlign: 'center' }}>
                                {getHeaderLabel()}
                            </Typography>
                        </Box>
                    </Box>
                    
                    <div className="dark-calendar-wrapper">
                        <Calendar
                            localizer={localizer} events={events} startAccessor="start" endAccessor="end" style={calendarStyle}
                            selectable view={view} date={date} toolbar={false}
                            onView={(v) => setView(v)} onNavigate={(d) => setDate(d)}
                            onSelectEvent={handleSelectEvent} onSelectSlot={handleSelectSlot}   
                            eventPropGetter={(event) => ({
                                style: { backgroundColor: event.resource.visibility === 'GM' ? '#d32f2f' : '#c5a059', color: 'black', fontWeight: 'bold', borderRadius: '4px', border: 'none' }
                            })}
                        />
                    </div>

                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                        <ButtonGroup variant="outlined" sx={{ bgcolor: 'rgba(0,0,0,0.5)' }}>
                            {['month', 'week', 'day'].map((v) => (
                                <Button key={v} onClick={() => setView(v)} sx={{ color: view === v ? 'black' : '#b39ddb', bgcolor: view === v ? '#d4af37' : 'transparent', borderColor: '#5e35b1', fontFamily: 'Cinzel', textTransform: 'capitalize', '&:hover': { bgcolor: view === v ? '#b3912b' : 'rgba(94, 53, 177, 0.2)' } }}>{v}</Button>
                            ))}
                        </ButtonGroup>
                    </Box>
                </>
             )}

             {/* VIEW 2: SAVED MONSTERS */}
             {activeTab === 'monsters' && (
                 <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                        <Typography variant="h4" sx={{ color: '#fff', fontFamily: 'Cinzel' }}>Saved Adversaries</Typography>
                        <Button component={RouterLink} to="/monsters" variant="outlined" sx={{ color: '#d4af37', borderColor: '#d4af37' }}>Browse Bestiary</Button>
                    </Box>
                    
                    <Grid container spacing={3}>
                        {monsters.length > 0 ? monsters.map(m => (
                            <Grid item size={{ xs: 12, md: 6, lg: 4 }} key={m._id}>
                                <MonsterCard monster={m} onDelete={handleRemoveMonster} />
                            </Grid>
                        )) : (
                            <Typography sx={{ color: '#777', fontStyle: 'italic', width: '100%', textAlign: 'center', mt: 4 }}>
                                No monsters saved yet. Go to the Bestiary to add some!
                            </Typography>
                        )}
                    </Grid>
                 </Box>
             )}

        </Grid>
      </Grid>

      {/* --- MODALS --- */}
      <Modal open={isAddingMember} onClose={() => setIsAddingMember(false)}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: '#1a0924', border: '2px solid #d4af37', p: 4, borderRadius: 2 }}>
            <IconButton onClick={() => setIsAddingMember(false)} sx={{ position: 'absolute', right: 8, top: 8, color: '#d4af37' }}><CloseIcon /></IconButton>
            <Typography variant="h6" sx={{ color: '#d4af37', mb: 2 }}>Invite Adventurer</Typography>
            <form onSubmit={handleAddMember}>
                <TextField fullWidth label="Player Email" variant="filled" value={memberEmail} onChange={(e) => setMemberEmail(e.target.value)} sx={{ mb: 3, bgcolor: 'rgba(255,255,255,0.1)', input: {color: 'white'} }} required />
                <Button type="submit" fullWidth variant="contained" sx={{ bgcolor: '#d4af37', color: 'black' }}>Send Invite</Button>
            </form>
        </Box>
      </Modal>

      <Modal open={isAddingNote} onClose={() => setIsAddingNote(false)}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 500, bgcolor: '#1a0924', border: '2px solid #d4af37', p: 4, borderRadius: 2 }}>
            <IconButton onClick={() => setIsAddingNote(false)} sx={{ position: 'absolute', right: 8, top: 8, color: '#d4af37' }}><CloseIcon /></IconButton>
            <Typography variant="h5" sx={{ color: '#d4af37', mb: 1, fontFamily: 'Cinzel' }}>New Entry</Typography>
            <Typography variant="caption" sx={{ color: '#aaa', mb: 3, display:'block' }}>Date: {date.toDateString()}</Typography>
            <form onSubmit={handleCreateNote}>
                <TextField fullWidth label="Title" variant="filled" sx={{ mb: 2, bgcolor: 'rgba(255,255,255,0.1)', input: {color: 'white'} }} value={newNote.title} onChange={(e) => setNewNote({...newNote, title: e.target.value})} required />
                <TextField fullWidth label="Content" multiline rows={4} variant="filled" sx={{ mb: 2, bgcolor: 'rgba(255,255,255,0.1)', textarea: {color: 'white'} }} value={newNote.content} onChange={(e) => setNewNote({...newNote, content: e.target.value})} required />
                <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
                    {['Public', 'Private'].map(type => (
                        <Chip key={type} label={type} clickable color={newNote.visibility === type ? 'primary' : 'default'} onClick={() => setNewNote({...newNote, visibility: type})} />
                    ))}
                    {isGM && <Chip label="GM Only" clickable color={newNote.visibility === 'GM' ? 'error' : 'default'} onClick={() => setNewNote({...newNote, visibility: 'GM'})} />}
                </Box>
                <Stack direction="row" spacing={2}>
                    <Button fullWidth variant="outlined" onClick={() => setIsAddingNote(false)} sx={{ color: '#fff', borderColor: '#555' }}>Cancel</Button>
                    <Button type="submit" fullWidth variant="contained" sx={{ bgcolor: '#d4af37', color: 'black' }}>Save</Button>
                </Stack>
            </form>
        </Box>
      </Modal>

      <Modal open={!!selectedNote} onClose={() => setSelectedNote(null)}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 500, bgcolor: '#1a0924', border: '2px solid #9c27b0', p: 4, borderRadius: 2 }}>
            <IconButton onClick={() => setSelectedNote(null)} sx={{ position: 'absolute', right: 8, top: 8, color: '#d4af37' }}><CloseIcon /></IconButton>
            {selectedNote && (
                <NoteDetail 
                    note={selectedNote} 
                    onClose={() => setSelectedNote(null)} 
                    onUpdate={handleUpdateNote}
                    onDelete={handleDeleteNote}
                    canEdit={isGM || user._id === selectedNote.author._id}
                />
            )}
        </Box>
      </Modal>

      <style>{`
        .rbc-calendar { font-family: 'Lato', sans-serif; }
        .rbc-today { background-color: transparent !important; }
        .rbc-day-bg:hover { background-color: rgba(255, 255, 255, 0.1) !important; cursor: pointer; transition: background-color 0.2s; }
        .rbc-off-range-bg { background: rgba(255,255,255,0.05); }
        .rbc-header { color: #d4af37; padding: 10px; font-weight: bold; }
        .rbc-month-view, .rbc-time-view, .rbc-agenda-view { border: 1px solid #444; }
        .rbc-day-bg + .rbc-day-bg { border-left: 1px solid #444; }
        .rbc-month-row + .rbc-month-row { border-top: 1px solid #444; }
        .rbc-date-cell { color: #aaa; padding: 5px; font-weight: bold; }
        .rbc-day-slot .rbc-today { background-color: transparent !important; }
      `}</style>
    </Container>
  );
}

export default CampaignDetail;