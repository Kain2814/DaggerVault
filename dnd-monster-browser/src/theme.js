import { createTheme } from '@mui/material/styles';

// --- THEME: "DAGGERHEART ANVIL" ---
// Structure: World Anvil | Colors: Daggerheart
export const daggerheartAnvilTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { 
      main: '#d4af37', // Daggerheart Gold
      contrastText: '#000',
    },
    secondary: { 
      main: '#9d4edd', // Vivid Magic Purple
    },
    background: {
      default: '#0f0518', // Very dark purple/black (Daggerheart Bg)
      paper: '#1a0924',   // Slightly lighter purple for cards
    },
    text: {
      primary: '#ecf0f1', // Off-white for readability
      secondary: '#b39ddb', // Light purple for subtitles
    },
  },
  typography: {
    fontFamily: '"Lato", sans-serif',
    h1: {
      fontFamily: '"Cinzel", serif',
      fontWeight: 800,
      color: '#d4af37', // Gold Titles
      letterSpacing: '1px',
    },
    h2: { fontFamily: '"Cinzel", serif', fontWeight: 700, color: '#f3e5f5' },
    h3: { fontFamily: '"Cinzel", serif', fontWeight: 600, color: '#d4af37' },
    h4: { fontFamily: '"Lato", sans-serif', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' },
    button: {
      fontFamily: '"Cinzel", serif',
      fontWeight: 700,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          // Deep, rich Daggerheart gradient
          backgroundImage: 'linear-gradient(180deg, #0f0518 0%, #240a30 50%, #0f0518 100%)',
          backgroundAttachment: 'fixed',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 4, textTransform: 'uppercase', letterSpacing: '1px' },
        contained: {
          backgroundColor: '#d4af37',
          color: '#000',
          '&:hover': { backgroundColor: '#c5a059', boxShadow: '0 0 15px rgba(212, 175, 55, 0.4)' },
        },
        outlined: {
          borderColor: '#d4af37',
          color: '#d4af37',
          '&:hover': { borderColor: '#fff', color: '#fff' },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none', // Remove default material overlay
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'rgba(0,0,0,0.3)',
            '& fieldset': { borderColor: '#5e35b1' }, // Purple border
            '&:hover fieldset': { borderColor: '#9d4edd' },
            '&.Mui-focused fieldset': { borderColor: '#d4af37' }, // Gold when focused
          },
        },
      },
    },
  },
});

// --- DEFAULT APP THEME (Keep this!) ---
export const appTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#90caf9' }, 
  },
});