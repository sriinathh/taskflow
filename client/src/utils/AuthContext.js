import React, { createContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Validate the token by trying to fetch profile
      fetchUserProfile();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserProfile = async () => {
    try {
      const res = await authAPI.getProfile();
      setUser({
        ...res.data,
        token: localStorage.getItem('token')
      });
    } catch (err) {
      console.error('Failed to fetch user profile:', err);
      // If profile fetch fails due to invalid token, clear the token
      localStorage.removeItem('token');
      setUser(null);
    }
    setLoading(false);
  };

  const login = (token) => {
    localStorage.setItem('token', token);
    // Set basic user state and then fetch full profile
    setUser({ token });
    fetchUserProfile();
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const updateProfile = (userData) => {
    setUser(prev => ({ ...prev, ...userData }));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateProfile, loading }}>
      {children}
    </AuthContext.Provider>
  );
};