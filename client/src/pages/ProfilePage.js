import { useState, useEffect, useContext, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../utils/AuthContext';
import { authAPI } from '../services/api';
import Header from '../layouts/Header';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Card,
  CardContent,
  Avatar,
  IconButton,
  Divider,
  Alert,
  CircularProgress,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tab,
  Tabs,
  Fade,
  Tooltip,
  Badge
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  PhotoCamera as PhotoCameraIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  CalendarToday as CalendarIcon,
  LocationOn as LocationIcon,
  Work as WorkIcon,
  Phone as PhoneIcon,
  Delete as DeleteIcon,
  Security as SecurityIcon,
  Notifications as NotificationsIcon,
  Palette as PaletteIcon,
  AccountCircle as AccountCircleIcon,
  Settings as SettingsIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';

const ProfilePage = () => {
  const { user, setUser } = useContext(AuthContext);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    bio: '',
    location: '',
    jobTitle: '',
    company: '',
    website: '',
    profilePicture: null
  });
  const [settings, setSettings] = useState({
    theme: 'light',
    notifications: true,
    emailUpdates: true,
    language: 'en'
  });
  const [activeTab, setActiveTab] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const fileInputRef = useRef(null);

  // TabPanel component
  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`profile-tabpanel-${index}`}
        aria-labelledby={`profile-tab-${index}`}
        {...other}
      >
        {value === index && <Box>{children}</Box>}
      </div>
    );
  }

  useEffect(() => {
    if (user) {
      setProfileData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        bio: user.bio || '',
        location: user.location || '',
        jobTitle: user.jobTitle || '',
        company: user.company || '',
        website: user.website || '',
        profilePicture: user.profilePicture || null
      });
      setSettings({
        theme: user.theme || 'light',
        notifications: user.notifications !== false,
        emailUpdates: user.emailUpdates !== false,
        language: user.language || 'en'
      });
    }
  }, [user]);

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSettingsChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData(prev => ({
          ...prev,
          profilePicture: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      // In a real app, you'd upload the image to a server first
      const response = await authAPI.updateProfile(profileData);
      setUser(prev => ({
        ...prev,
        ...profileData
      }));
      setEditing(false);
      setMessage('Profile updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('Failed to update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveSettings = async () => {
    setSaving(true);
    try {
      await authAPI.updateSettings(settings);
      setUser(prev => ({
        ...prev,
        ...settings
      }));
      setMessage('Settings updated successfully!');
      setShowSettings(false);
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error updating settings:', error);
      setMessage('Failed to update settings. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (user) {
      setProfileData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        bio: user.bio || '',
        location: user.location || '',
        jobTitle: user.jobTitle || '',
        company: user.company || '',
        website: user.website || '',
        profilePicture: user.profilePicture || null
      });
    }
    setEditing(false);
  };

  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
  };

  const getUserDisplayName = () => {
    if (profileData.firstName && profileData.lastName) {
      return `${profileData.firstName} ${profileData.lastName}`;
    }
    return profileData.email || 'User';
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      position: 'relative',
      overflow: 'hidden',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        animation: 'float 20s ease-in-out infinite'
      }
    }}>
      <Box sx={{
        position: 'relative',
        zIndex: 1,
        background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
        backdropFilter: 'blur(10px)',
        minHeight: '100vh'
      }}>
        <Header />

        <Box sx={{ maxWidth: 1400, mx: 'auto', p: { xs: 2, md: 4 } }}>
          <AnimatePresence>
            {message && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Alert
                  severity={message.includes('success') ? 'success' : 'error'}
                  sx={{
                    mb: 3,
                    borderRadius: 3,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                  }}
                >
                  {message}
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Enhanced Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Card sx={{
              borderRadius: 4,
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
              border: '1px solid rgba(255,255,255,0.2)',
              mb: 4,
              position: 'relative',
              overflow: 'hidden'
            }}>
              <Box sx={{
                height: 120,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'url("data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="50" cy="50" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                  animation: 'float 15s ease-in-out infinite'
                }
              }} />
              <CardContent sx={{ p: 4, position: 'relative' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, flexWrap: { xs: 'wrap', md: 'nowrap' } }}>
                  <Box sx={{ position: 'relative' }}>
                    <Avatar
                      src={profileData.profilePicture}
                      sx={{
                        width: { xs: 100, md: 140 },
                        height: { xs: 100, md: 140 },
                        bgcolor: profileData.profilePicture ? 'transparent' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        fontSize: { xs: '2.5rem', md: '3.5rem' },
                        fontWeight: 700,
                        border: '6px solid rgba(255,255,255,0.9)',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                        mt: { xs: -8, md: -10 }
                      }}
                    >
                      {getInitials(profileData.firstName, profileData.lastName)}
                    </Avatar>
                    <Tooltip title="Change Profile Picture">
                      <IconButton
                        onClick={() => fileInputRef.current?.click()}
                        sx={{
                          position: 'absolute',
                          bottom: 8,
                          right: 8,
                          bgcolor: 'rgba(255,255,255,0.9)',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                          '&:hover': {
                            bgcolor: 'white',
                            transform: 'scale(1.1)'
                          },
                          transition: 'all 0.3s ease'
                        }}
                        size="small"
                      >
                        <PhotoCameraIcon sx={{ color: '#667eea' }} />
                      </IconButton>
                    </Tooltip>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleProfilePictureChange}
                      accept="image/*"
                      style={{ display: 'none' }}
                    />
                  </Box>

                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="h4" sx={{
                      fontWeight: 800,
                      color: '#1a1a1a',
                      mb: 1,
                      fontSize: { xs: '1.75rem', md: '2.25rem' }
                    }}>
                      {getUserDisplayName()}
                    </Typography>
                    <Typography variant="h6" sx={{
                      color: '#666',
                      mb: 2,
                      fontWeight: 400,
                      fontSize: { xs: '1rem', md: '1.25rem' }
                    }}>
                      {profileData.jobTitle && profileData.company
                        ? `${profileData.jobTitle} at ${profileData.company}`
                        : profileData.bio || 'Welcome to your profile!'}
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                      <Chip
                        icon={<EmailIcon />}
                        label={profileData.email}
                        sx={{
                          bgcolor: 'rgba(102, 126, 234, 0.1)',
                          color: '#667eea',
                          fontWeight: 500
                        }}
                      />
                      {profileData.location && (
                        <Chip
                          icon={<LocationIcon />}
                          label={profileData.location}
                          sx={{
                            bgcolor: 'rgba(78, 205, 196, 0.1)',
                            color: '#4ecdc4',
                            fontWeight: 500
                          }}
                        />
                      )}
                      {profileData.phone && (
                        <Chip
                          icon={<PhoneIcon />}
                          label={profileData.phone}
                          sx={{
                            bgcolor: 'rgba(249, 202, 36, 0.1)',
                            color: '#f9ca24',
                            fontWeight: 500
                          }}
                        />
                      )}
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', gap: 2 }}>
                    {!editing ? (
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          variant="contained"
                          startIcon={<EditIcon />}
                          onClick={() => setEditing(true)}
                          sx={{
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
                            '&:hover': {
                              background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
                              boxShadow: '0 6px 20px rgba(102, 126, 234, 0.4)'
                            },
                            borderRadius: 3,
                            px: 3
                          }}
                        >
                          Edit Profile
                        </Button>
                      </motion.div>
                    ) : (
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            variant="contained"
                            startIcon={saving ? <CircularProgress size={16} color="inherit" /> : <SaveIcon />}
                            onClick={handleSaveProfile}
                            disabled={saving}
                            sx={{
                              background: 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)',
                              boxShadow: '0 4px 15px rgba(78, 205, 196, 0.3)',
                              '&:hover': {
                                background: 'linear-gradient(135deg, #44a08d 0%, #3d9b8b 100%)',
                                boxShadow: '0 6px 20px rgba(78, 205, 196, 0.4)'
                              },
                              borderRadius: 3
                            }}
                          >
                            {saving ? 'Saving...' : 'Save'}
                          </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            variant="outlined"
                            startIcon={<CancelIcon />}
                            onClick={handleCancel}
                            disabled={saving}
                            sx={{
                              borderColor: '#ff6b6b',
                              color: '#ff6b6b',
                              '&:hover': {
                                borderColor: '#ee5a24',
                                bgcolor: 'rgba(255, 107, 107, 0.1)'
                              },
                              borderRadius: 3
                            }}
                          >
                            Cancel
                          </Button>
                        </motion.div>
                      </Box>
                    )}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </motion.div>

          {/* Tab Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card sx={{
              borderRadius: 4,
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              mb: 4
            }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                  value={activeTab}
                  onChange={(event, newValue) => setActiveTab(newValue)}
                  sx={{
                    '& .MuiTab-root': {
                      fontWeight: 600,
                      fontSize: { xs: '0.9rem', md: '1rem' },
                      minHeight: 64,
                      textTransform: 'none'
                    },
                    '& .MuiTabs-indicator': {
                      height: 3,
                      borderRadius: 2,
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    }
                  }}
                >
                  <Tab
                    icon={<AccountCircleIcon />}
                    label="Profile Information"
                    iconPosition="start"
                    sx={{ minHeight: 64 }}
                  />
                  <Tab
                    icon={<SettingsIcon />}
                    label="Settings & Preferences"
                    iconPosition="start"
                    sx={{ minHeight: 64 }}
                  />
                </Tabs>
              </Box>

              {/* Profile Tab Content */}
              <TabPanel value={activeTab} index={0}>
                <Box sx={{ p: { xs: 2, md: 4 } }}>
                  <Typography variant="h6" sx={{
                    mb: 3,
                    fontWeight: 700,
                    color: '#1a1a1a',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}>
                    <PersonIcon />
                    Personal Information
                  </Typography>

                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                      >
                        <TextField
                          fullWidth
                          label="First Name"
                          value={profileData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          disabled={!editing}
                          variant="outlined"
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 3,
                              '&:hover fieldset': {
                                borderColor: '#667eea'
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: '#667eea'
                              }
                            }
                          }}
                        />
                      </motion.div>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        <TextField
                          fullWidth
                          label="Last Name"
                          value={profileData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          disabled={!editing}
                          variant="outlined"
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 3,
                              '&:hover fieldset': {
                                borderColor: '#667eea'
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: '#667eea'
                              }
                            }
                          }}
                        />
                      </motion.div>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                      >
                        <TextField
                          fullWidth
                          label="Email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          disabled={!editing}
                          variant="outlined"
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 3,
                              '&:hover fieldset': {
                                borderColor: '#667eea'
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: '#667eea'
                              }
                            }
                          }}
                        />
                      </motion.div>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                      >
                        <TextField
                          fullWidth
                          label="Phone"
                          value={profileData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          disabled={!editing}
                          variant="outlined"
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 3,
                              '&:hover fieldset': {
                                borderColor: '#667eea'
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: '#667eea'
                              }
                            }
                          }}
                        />
                      </motion.div>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                      >
                        <TextField
                          fullWidth
                          label="Job Title"
                          value={profileData.jobTitle}
                          onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                          disabled={!editing}
                          variant="outlined"
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 3,
                              '&:hover fieldset': {
                                borderColor: '#667eea'
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: '#667eea'
                              }
                            }
                          }}
                        />
                      </motion.div>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                      >
                        <TextField
                          fullWidth
                          label="Company"
                          value={profileData.company}
                          onChange={(e) => handleInputChange('company', e.target.value)}
                          disabled={!editing}
                          variant="outlined"
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 3,
                              '&:hover fieldset': {
                                borderColor: '#667eea'
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: '#667eea'
                              }
                            }
                          }}
                        />
                      </motion.div>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                      >
                        <TextField
                          fullWidth
                          label="Location"
                          value={profileData.location}
                          onChange={(e) => handleInputChange('location', e.target.value)}
                          disabled={!editing}
                          variant="outlined"
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 3,
                              '&:hover fieldset': {
                                borderColor: '#667eea'
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: '#667eea'
                              }
                            }
                          }}
                        />
                      </motion.div>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                      >
                        <TextField
                          fullWidth
                          label="Website"
                          value={profileData.website}
                          onChange={(e) => handleInputChange('website', e.target.value)}
                          disabled={!editing}
                          variant="outlined"
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 3,
                              '&:hover fieldset': {
                                borderColor: '#667eea'
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: '#667eea'
                              }
                            }
                          }}
                        />
                      </motion.div>
                    </Grid>

                    <Grid item xs={12}>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.9 }}
                      >
                        <TextField
                          fullWidth
                          label="Bio"
                          multiline
                          rows={3}
                          value={profileData.bio}
                          onChange={(e) => handleInputChange('bio', e.target.value)}
                          disabled={!editing}
                          variant="outlined"
                          placeholder="Tell us about yourself..."
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 3,
                              '&:hover fieldset': {
                                borderColor: '#667eea'
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: '#667eea'
                              }
                            }
                          }}
                        />
                      </motion.div>
                    </Grid>
                  </Grid>
                </Box>
              </TabPanel>

              {/* Settings Tab Content */}
              <TabPanel value={activeTab} index={1}>
                <Box sx={{ p: { xs: 2, md: 4 } }}>
                  <Typography variant="h6" sx={{
                    mb: 3,
                    fontWeight: 700,
                    color: '#1a1a1a',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}>
                    <SettingsIcon />
                    Preferences & Settings
                  </Typography>

                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                      >
                        <FormControl fullWidth variant="outlined">
                          <InputLabel>Theme</InputLabel>
                          <Select
                            value={settings.theme}
                            onChange={(e) => handleSettingsChange('theme', e.target.value)}
                            label="Theme"
                            sx={{
                              borderRadius: 3,
                              '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#e0e0e0'
                              },
                              '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#667eea'
                              },
                              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#667eea'
                              }
                            }}
                          >
                            <MenuItem value="light">Light</MenuItem>
                            <MenuItem value="dark">Dark</MenuItem>
                            <MenuItem value="auto">Auto</MenuItem>
                          </Select>
                        </FormControl>
                      </motion.div>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        <FormControl fullWidth variant="outlined">
                          <InputLabel>Language</InputLabel>
                          <Select
                            value={settings.language}
                            onChange={(e) => handleSettingsChange('language', e.target.value)}
                            label="Language"
                            sx={{
                              borderRadius: 3,
                              '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#e0e0e0'
                              },
                              '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#667eea'
                              },
                              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#667eea'
                              }
                            }}
                          >
                            <MenuItem value="en">English</MenuItem>
                            <MenuItem value="es">Español</MenuItem>
                            <MenuItem value="fr">Français</MenuItem>
                            <MenuItem value="de">Deutsch</MenuItem>
                          </Select>
                        </FormControl>
                      </motion.div>
                    </Grid>

                    <Grid item xs={12}>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                      >
                        <Box sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          p: 3,
                          borderRadius: 3,
                          border: '2px solid #f0f0f0',
                          bgcolor: 'rgba(102, 126, 234, 0.05)',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            borderColor: '#667eea',
                            bgcolor: 'rgba(102, 126, 234, 0.1)'
                          }
                        }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <NotificationsIcon sx={{ color: '#667eea', fontSize: 28 }} />
                            <Box>
                              <Typography variant="h6" sx={{ fontWeight: 600, color: '#1a1a1a' }}>
                                Email Notifications
                              </Typography>
                              <Typography variant="body2" sx={{ color: '#666' }}>
                                Receive email updates about your tasks and account
                              </Typography>
                            </Box>
                          </Box>
                          <motion.div whileTap={{ scale: 0.95 }}>
                            <Button
                              variant={settings.emailUpdates ? "contained" : "outlined"}
                              onClick={() => handleSettingsChange('emailUpdates', !settings.emailUpdates)}
                              sx={{
                                borderRadius: 3,
                                px: 3,
                                background: settings.emailUpdates ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'transparent',
                                borderColor: '#667eea',
                                color: settings.emailUpdates ? 'white' : '#667eea',
                                '&:hover': {
                                  background: settings.emailUpdates ? 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)' : 'rgba(102, 126, 234, 0.1)',
                                  borderColor: '#667eea'
                                }
                              }}
                            >
                              {settings.emailUpdates ? <CheckCircleIcon sx={{ mr: 1 }} /> : null}
                              {settings.emailUpdates ? 'Enabled' : 'Disabled'}
                            </Button>
                          </motion.div>
                        </Box>
                      </motion.div>
                    </Grid>

                    <Grid item xs={12}>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                      >
                        <Box sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          p: 3,
                          borderRadius: 3,
                          border: '2px solid #f0f0f0',
                          bgcolor: 'rgba(78, 205, 196, 0.05)',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            borderColor: '#4ecdc4',
                            bgcolor: 'rgba(78, 205, 196, 0.1)'
                          }
                        }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <NotificationsIcon sx={{ color: '#4ecdc4', fontSize: 28 }} />
                            <Box>
                              <Typography variant="h6" sx={{ fontWeight: 600, color: '#1a1a1a' }}>
                                Push Notifications
                              </Typography>
                              <Typography variant="body2" sx={{ color: '#666' }}>
                                Get notified about task updates and reminders
                              </Typography>
                            </Box>
                          </Box>
                          <motion.div whileTap={{ scale: 0.95 }}>
                            <Button
                              variant={settings.notifications ? "contained" : "outlined"}
                              onClick={() => handleSettingsChange('notifications', !settings.notifications)}
                              sx={{
                                borderRadius: 3,
                                px: 3,
                                background: settings.notifications ? 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)' : 'transparent',
                                borderColor: '#4ecdc4',
                                color: settings.notifications ? 'white' : '#4ecdc4',
                                '&:hover': {
                                  background: settings.notifications ? 'linear-gradient(135deg, #44a08d 0%, #3d9b8b 100%)' : 'rgba(78, 205, 196, 0.1)',
                                  borderColor: '#4ecdc4'
                                }
                              }}
                            >
                              {settings.notifications ? <CheckCircleIcon sx={{ mr: 1 }} /> : null}
                              {settings.notifications ? 'Enabled' : 'Disabled'}
                            </Button>
                          </motion.div>
                        </Box>
                      </motion.div>
                    </Grid>

                    <Grid item xs={12}>
                      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            variant="contained"
                            size="large"
                            startIcon={<SaveIcon />}
                            onClick={handleSaveSettings}
                            disabled={saving}
                            sx={{
                              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                              boxShadow: '0 8px 32px rgba(102, 126, 234, 0.4)',
                              '&:hover': {
                                background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
                                boxShadow: '0 12px 40px rgba(102, 126, 234, 0.6)'
                              },
                              borderRadius: 3,
                              px: 4,
                              py: 1.5,
                              fontSize: '1.1rem',
                              fontWeight: 600
                            }}
                          >
                            {saving ? <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} /> : null}
                            Save Settings
                          </Button>
                        </motion.div>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </TabPanel>
            </Card>
          </motion.div>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;