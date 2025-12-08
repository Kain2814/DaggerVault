import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';

// 1. Import Context Providers
import { CampaignProvider } from './context/CampaignContext';

// 2. Import Themes
import { daggerheartAnvilTheme, appTheme } from './theme';

import NavBar from './components/NavBar';

// Import Pages
import LandingPage from './pages/LandingPage';
import MonsterList from './pages/MonsterList';
import MonsterDetail from './pages/MonsterDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import AncestryList from './pages/AncestryList';
import AncestryDetail from './pages/AncestryDetail';
import ClassList from './pages/ClassList';
import ClassDetail from './pages/ClassDetail';
import CampaignList from './pages/CampaignList';
import CampaignDetail from './pages/CampaignDetail';
import AccountSettings from './pages/AccountSettings'; // <--- Ensure this is imported

import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <div className="App">
        <CampaignProvider>
          
          <NavBar />
          
          {/* ALL ROUTES MUST BE INSIDE THIS WRAPPER */}
          <Routes>
            
            {/* LANDING PAGE */}
            <Route 
              path="/" 
              element={
                <ThemeProvider theme={daggerheartAnvilTheme}>
                  <CssBaseline />
                  <LandingPage />
                </ThemeProvider>
              } 
            />

            {/* ANCESTRIES */}
            <Route 
              path="/ancestries" 
              element={
                <ThemeProvider theme={daggerheartAnvilTheme}>
                  <CssBaseline />
                  <AncestryList />
                </ThemeProvider>
              } 
            />
             <Route 
              path="/ancestries/:id" 
              element={
                <ThemeProvider theme={daggerheartAnvilTheme}>
                  <CssBaseline />
                  <AncestryDetail />
                </ThemeProvider>
              } 
            />

            {/* CLASSES */}
            <Route 
              path="/classes" 
              element={
                <ThemeProvider theme={daggerheartAnvilTheme}>
                  <CssBaseline />
                  <ClassList />
                </ThemeProvider>
              } 
            />
            <Route 
              path="/classes/:id" 
              element={
                <ThemeProvider theme={daggerheartAnvilTheme}>
                  <CssBaseline />
                  <ClassDetail />
                </ThemeProvider>
              } 
            />

            {/* CAMPAIGNS */}
            <Route 
              path="/campaigns" 
              element={
                <ThemeProvider theme={daggerheartAnvilTheme}>
                  <CssBaseline />
                  <CampaignList />
                </ThemeProvider>
              } 
            />
            <Route 
              path="/campaigns/:id" 
              element={
                <ProtectedRoute>
                  <ThemeProvider theme={daggerheartAnvilTheme}>
                    <CssBaseline />
                    <CampaignDetail />
                  </ThemeProvider>
                </ProtectedRoute>
              } 
            />

            {/* ACCOUNT SETTINGS (Protected) */}
            <Route 
              path="/settings" 
              element={
                <ProtectedRoute>
                  <ThemeProvider theme={daggerheartAnvilTheme}>
                    <CssBaseline />
                    <AccountSettings />
                  </ThemeProvider>
                </ProtectedRoute>
              } 
            />

            {/* MONSTERS */}
            <Route 
              path="/monsters" 
              element={
                <ThemeProvider theme={appTheme}>
                   <CssBaseline />
                   <MonsterList />
                </ThemeProvider>
              } 
            />
            <Route 
              path="/monsters/:id" 
              element={
                <ThemeProvider theme={appTheme}>
                   <CssBaseline />
                   <MonsterDetail />
                </ThemeProvider>
              } 
            />
            
            {/* AUTH */}
            <Route 
              path="/login" 
              element={
                <ThemeProvider theme={appTheme}>
                   <CssBaseline />
                   <Login />
                </ThemeProvider>
              } 
            />
            <Route 
              path="/register" 
              element={
                <ThemeProvider theme={appTheme}>
                   <CssBaseline />
                   <Register />
                </ThemeProvider>
              } 
            />

          </Routes>
          {/* END OF ROUTES WRAPPER */}

        </CampaignProvider>
    </div>
  );
}

export default App;


