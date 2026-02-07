import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthContext } from '../utils/AuthContext';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  IconButton,
  Badge,
  Chip
} from '@mui/material';
import {
  Logout,
  Settings,
  Notifications,
  Person,
  Star,
  TrendingUp
} from '@mui/icons-material';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [profileMenuAnchor, setProfileMenuAnchor] = useState(null);

  const handleLogout = () => {
    logout();
    navigate('/');
    setProfileMenuAnchor(null);
  };

  const handleProfileMenuOpen = (event) => {
    setProfileMenuAnchor(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuAnchor(null);
  };

  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
  };

  const getUserDisplayName = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    return user?.email || 'User';
  };

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <AppBar position="static" sx={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
        boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.03"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          animation: 'float 20s ease-in-out infinite'
        }
      }}>
        <Toolbar sx={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                flexGrow: 1,
                color: 'white',
                textDecoration: 'none',
                fontWeight: 800,
                fontSize: { xs: '1.4rem', md: '1.8rem' },
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                background: 'linear-gradient(45deg, #ffffff 0%, #f8f9ff 50%, #ffffff 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                mr: 100,
                '&:hover': {
                  transform: 'scale(1.05)',
                  transition: 'transform 0.3s ease'
                }
              }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Star sx={{ fontSize: { xs: '1.8rem', md: '2.2rem' }, color: '#ffd93d' }} />
              </motion.div>
              TaskFlow
              <TrendingUp sx={{ fontSize: { xs: '1.2rem', md: '1.4rem' }, color: '#4ecdc4' }} />
            </Typography>
          </motion.div>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, md: 2 } }}>
          {user ? (
            <>
              {/* Notifications */}
              <IconButton
                sx={{ color: 'white' }}
                onClick={() => {/* Handle notifications */}}
              >
                <Badge badgeContent={3} color="error">
                  <Notifications />
                </Badge>
              </IconButton>

              {/* Profile Section */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 'auto' }}>
                <Box sx={{ textAlign: 'right', display: { xs: 'none', md: 'block' } }}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'white',
                      fontWeight: 500,
                      lineHeight: 1.2
                    }}
                  >
                    {getUserDisplayName()}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'rgba(255,255,255,0.7)',
                      fontSize: '0.75rem'
                    }}
                  >
                    {user?.email}
                  </Typography>
                </Box>

                <IconButton
                  onClick={handleProfileMenuOpen}
                  sx={{
                    p: 0.5,
                    border: '2px solid rgba(255,255,255,0.3)',
                    ml: 'auto',
                    '&:hover': {
                      border: '2px solid white',
                    }
                  }}
                >
                  <Avatar
                    sx={{
                      width: { xs: 32, md: 40 },
                      height: { xs: 32, md: 40 },
                      bgcolor: user?.profilePicture ? 'transparent' : '#ffffff',
                      color: user?.profilePicture ? 'white' : '#667eea',
                      fontWeight: 600,
                      fontSize: { xs: '0.9rem', md: '1rem' }
                    }}
                    src={user?.profilePicture}
                  >
                    {!user?.profilePicture && getInitials(user?.firstName, user?.lastName)}
                  </Avatar>
                </IconButton>
              </Box>

              {/* Profile Menu */}
              <Menu
                anchorEl={profileMenuAnchor}
                open={Boolean(profileMenuAnchor)}
                onClose={handleProfileMenuClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                PaperProps={{
                  sx: {
                    mt: 1,
                    minWidth: 200,
                    borderRadius: 2,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                  }
                }}
              >
                <Box sx={{ px: 2, py: 1.5 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {getUserDisplayName()}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {user?.email}
                  </Typography>
                  <Chip
                    label="Pro User"
                    size="small"
                    sx={{
                      mt: 1,
                      bgcolor: '#667eea',
                      color: 'white',
                      fontSize: '0.7rem'
                    }}
                  />
                </Box>

                <Divider />

                <MenuItem onClick={() => { handleProfileMenuClose(); navigate('/profile'); }} sx={{ py: 1.5 }}>
                  <Person sx={{ mr: 2, color: 'action.active' }} />
                  <Typography>My Profile</Typography>
                </MenuItem>

                <MenuItem onClick={handleProfileMenuClose} sx={{ py: 1.5 }}>
                  <Settings sx={{ mr: 2, color: 'action.active' }} />
                  <Typography>Settings</Typography>
                </MenuItem>

                <Divider />

                <MenuItem onClick={handleLogout} sx={{ py: 1.5, color: 'error.main' }}>
                  <Logout sx={{ mr: 2 }} />
                  <Typography>Logout</Typography>
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                color="inherit"
                component={Link}
                to="/login"
                sx={{
                  display: { xs: 'none', sm: 'inline-flex' },
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                  }
                }}
              >
                Login
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: 'white',
                  color: '#667eea',
                  fontSize: { xs: '0.8rem', sm: '0.875rem' },
                  px: { xs: 2, sm: 3 },
                  '&:hover': {
                    backgroundColor: '#f8f9fa',
                  }
                }}
                component={Link}
                to="/register"
              >
                Get Started
              </Button>
            </Box>
          )}
        </Box>
        </Toolbar>
      </AppBar>
    </motion.div>
  );
};

export default Header;