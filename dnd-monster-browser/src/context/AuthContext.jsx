import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // <--- NEW: Start as loading
  
  // Dynamic URL based on environment
  const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  // 1. Check for logged-in user on load
  useEffect(() => {
    const checkUser = async () => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          try {
            setUser(JSON.parse(storedUser));
          } catch (error) {
            console.error("Failed to parse user data", error);
            localStorage.removeItem('user'); 
          }
        }
        setLoading(false); // <--- NEW: Done checking!
    };
    
    checkUser();
  }, []);

  // 2. Register
  const register = async (name, email, password) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/users/register`, {
        name,
        email,
        password,
      });
      
      if (response.data && response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
        setUser(response.data);
        return { success: true };
      } else {
          return { success: false, message: "Registration successful but no token received." };
      }
    } catch (error) {
      console.error("Registration Error", error);
      throw error;
    }
  };

  // 3. Login
  const login = async (email, password) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/users/login`, {
        email,
        password,
      });

      if (response.data && response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
        setUser(response.data);
        return { success: true };
      }
    } catch (error) {
      console.error("Login Error", error);
      throw error;
    }
  };

  // 4. Logout
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  // 5. Update Profile
  const updateProfile = async (userData) => {
    try {
        const config = {
            headers: { Authorization: `Bearer ${user.token}` }
        };
        const response = await axios.put(`${BASE_URL}/api/users/profile`, userData, config);
        
        setUser(response.data);
        localStorage.setItem('user', JSON.stringify(response.data));
        return { success: true };
    } catch (error) {
        return { success: false, message: error.response?.data?.message || 'Update failed' };
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);