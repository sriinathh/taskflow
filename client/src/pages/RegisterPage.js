import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthContext } from '../utils/AuthContext';
import { authAPI } from '../services/api';
import { Box, TextField, Button, Typography, Alert } from '@mui/material';

const RegisterPage = () => {
  const [form, setForm] = useState({ email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const res = await authAPI.register({ email: form.email, password: form.password });
      login(res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError('Registration failed');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Box
          sx={{
            background: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            p: 4,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            width: '100%',
            maxWidth: 400,
          }}
        >
          <Typography variant="h4" component="h2" sx={{ color: 'white', textAlign: 'center', mb: 3 }}>
            Register
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              type="email"
              name="email"
              label="Email"
              value={form.email}
              onChange={handleChange}
              required
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'rgba(255, 255, 255, 0.5)',
                  color: '#333',
                },
                '& .MuiInputLabel-root': {
                  color: '#666',
                },
              }}
            />
            <TextField
              type="password"
              name="password"
              label="Password"
              value={form.password}
              onChange={handleChange}
              required
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'rgba(255, 255, 255, 0.5)',
                  color: '#333',
                },
                '& .MuiInputLabel-root': {
                  color: '#666',
                },
              }}
            />
            <TextField
              type="password"
              name="confirmPassword"
              label="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'rgba(255, 255, 255, 0.5)',
                  color: '#333',
                },
                '& .MuiInputLabel-root': {
                  color: '#666',
                },
              }}
            />
            {error && <Alert severity="error">{error}</Alert>}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: 'white',
                color: '#667eea',
                py: 1.5,
                '&:hover': { backgroundColor: '#f0f0f0' },
              }}
            >
              Register
            </Button>
          </Box>
        </Box>
      </motion.div>
    </Box>
  );
};

export default RegisterPage;