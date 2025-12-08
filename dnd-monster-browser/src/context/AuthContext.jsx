import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const API_URL = 'http://localhost:5000/api/users';

    // Register Function
    const register = async (userData) => {
        try {
            const response = await axios.post(`${API_URL}/register`, userData);
            setUser(response.data);
            localStorage.setItem('user', JSON.stringify(response.data));
            navigate('/'); // Go to home after register (might change this later)
        } catch (error) {
            console.error("Registration Error", error);
            alert(error.response?.data?.message || 'Error registering');
        }
    };

    // Login Function
    const login = async (userData) => {
        try {
            const response = await axios.post(`${API_URL}/login`, userData);
            setUser(response.data);
            localStorage.setItem('user', JSON.stringify(response.data));
            navigate('/'); // Go to home after login (might change to "go to account after login")
        } catch (error) {
            console.error("Login Error", error);
            alert(error.response?.data?.message || 'Error logging in');
        }
    };

    // Logout Function
    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        navigate('/login');
    };

    // Check if user is logged in on page load
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

        // Update Profile Function
    const updateProfile = async (userData) => {
    try {
        const config = {
            headers: { Authorization: `Bearer ${user.token}` }
        };
        const response = await axios.put('http://localhost:5000/api/users/profile', userData, config);
        
        // Update local state and local storage
        setUser(response.data);
        localStorage.setItem('user', JSON.stringify(response.data));
        return { success: true };
    } catch (error) {
        return { success: false, message: error.response?.data?.message || 'Update failed' };
    }
  };

    return (
        <AuthContext.Provider value={{ user, register, login, logout, updateProfile  }}>
            {children}
        </AuthContext.Provider>
    );

}

export const useAuth = () => useContext(AuthContext);



