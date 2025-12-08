import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const CampaignContext = createContext();

export function CampaignProvider({ children }) {
  const [campaigns, setCampaigns] = useState([]);
  const [currentCampaign, setCurrentCampaign] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const { user } = useAuth();
  const API_URL = 'http://localhost:5000/api/campaigns';

  const getConfig = () => ({
    headers: { Authorization: `Bearer ${user?.token}` }
  });

  // 1. FETCH ALL CAMPAIGNS
  const fetchCampaigns = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const response = await axios.get(API_URL, getConfig());
      setCampaigns(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching campaigns:", err);
      setError("Could not load campaigns.");
    } finally {
      setLoading(false);
    }
  };

  // 2. CREATE CAMPAIGN
  const createCampaign = async (title, description) => {
    try {
      const response = await axios.post(API_URL, { title, description }, getConfig());
      setCampaigns(prev => [response.data, ...prev]); 
      return response.data;
    } catch (err) {
      console.error("Error creating campaign:", err);
      throw err;
    }
  };

  // 3. GET SINGLE CAMPAIGN DETAILS
  const fetchCampaignDetails = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/${id}`, getConfig());
      setCurrentCampaign(response.data);
    } catch (err) {
      console.error("Error loading campaign:", err);
    } finally {
      setLoading(false);
    }
  };

  // 4. UPDATE CAMPAIGN (Fixes the "not a function" error)
  const updateCampaignData = async (id, data) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, data, getConfig());
      setCurrentCampaign(response.data); // Update local state immediately
      return response.data;
    } catch (err) {
      console.error("Error updating campaign:", err);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, [user]);

  const deleteNote = async (noteId) => {
    try {
      await axios.delete(`http://localhost:5000/api/campaigns/notes/${noteId}`, getConfig());
      return true;
    } catch (err) {
      console.error("Error deleting note:", err);
      return false;
    }
  };

  const updateNote = async (noteId, data) => {
    try {
      await axios.put(`http://localhost:5000/api/campaigns/notes/${noteId}`, data, getConfig());
      return true;
    } catch (err) {
      console.error("Error updating note:", err);
      return false;
    }
  };

  // 5. SAVE MONSTER TO CAMPAIGN
  const saveMonsterToCampaign = async (campaignId, monsterData) => {
    try {
      await axios.post(`${API_URL}/${campaignId}/monsters`, monsterData, getConfig());
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message };
    }
  };

  // 6. GET CAMPAIGN MONSTERS
  const fetchCampaignMonsters = async (campaignId) => {
    try {
      const response = await axios.get(`${API_URL}/${campaignId}/monsters`, getConfig());
      return response.data;
    } catch (err) {
      console.error("Error fetching monsters:", err);
      return [];
    }
  };

  // 7. DELETE CAMPAIGN MONSTER
  const deleteCampaignMonster = async (monsterId) => {
      try {
          await axios.delete(`http://localhost:5000/api/campaigns/monsters/${monsterId}`, getConfig());
          return true;
      } catch (err) {
          console.error("Error deleting monster", err);
          return false;
      }
  };

  return (
    <CampaignContext.Provider value={{ 
      campaigns, currentCampaign, loading, error, 
      createCampaign, fetchCampaignDetails, updateCampaignData,
      deleteNote, updateNote,
      saveMonsterToCampaign, fetchCampaignMonsters, deleteCampaignMonster // <--- Export
    }}>
      {children}
    </CampaignContext.Provider>
  );
}
export const useCampaigns = () => useContext(CampaignContext);