import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { tasksAPI } from '../services/api';
import { AuthContext } from '../utils/AuthContext';
import Header from '../layouts/Header';
import {
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Card,
  CardContent,
  Chip,
  Avatar,
  LinearProgress,
  Divider,
  MenuItem,
  Fab,
  Tooltip,
  Badge
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  CheckCircle as CheckCircleIcon,
  RadioButtonUnchecked as UncheckedIcon,
  Task as TaskIcon,
  Schedule as ScheduleIcon,
  DoneAll as DoneAllIcon,
  CalendarToday as CalendarIcon,
  TrendingUp as TrendingUpIcon,
  EmojiEvents as TrophyIcon,
  Timeline as TimelineIcon
} from '@mui/icons-material';

const DashboardPage = () => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState('personal');
  const [editing, setEditing] = useState(null);
  const [editText, setEditText] = useState('');
  const [loading, setLoading] = useState(true);

  const getUserDisplayName = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    return user?.email || 'User';
  };

  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
  };
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await tasksAPI.getTasks();
      setTasks(res.data.tasks || []);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async () => {
    if (!newTask.trim()) return;
    try {
      await tasksAPI.addTask({ title: newTask, completed: false, category: newTaskCategory });
      addActivity('Added new task', `"${newTask}"`, 'add');
      setNewTask('');
      setNewTaskCategory('personal');
      fetchTasks();
    } catch (err) {
      console.error('Error adding task:', err);
    }
  };

  const updateTask = async (id) => {
    try {
      await tasksAPI.updateTask(id, { title: editText });
      addActivity('Updated task', `"${editText}"`, 'update');
      setEditing(null);
      setEditText('');
      fetchTasks();
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  const toggleTask = async (id, completed) => {
    try {
      await tasksAPI.updateTask(id, { completed: !completed });
      const task = tasks.find(t => t._id === id);
      if (task) {
        addActivity(completed ? 'Marked task as pending' : 'Completed task', `"${task.title}"`, completed ? 'pending' : 'complete');
      }
      fetchTasks();
    } catch (err) {
      console.error('Error toggling task:', err);
    }
  };

  const deleteTask = async (id) => {
    try {
      const task = tasks.find(t => t._id === id);
      await tasksAPI.deleteTask(id);
      if (task) {
        addActivity('Deleted task', `"${task.title}"`, 'delete');
      }
      fetchTasks();
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  const getTaskStats = () => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const pending = total - completed;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    return { total, completed, pending, completionRate };
  };

  const getCategoryStats = () => {
    const categories = [
      { key: 'work', name: 'Work', icon: '💼', color: '#667eea' },
      { key: 'personal', name: 'Personal', icon: '🏠', color: '#4ecdc4' },
      { key: 'health', name: 'Health', icon: '🏥', color: '#f9ca24' },
      { key: 'learning', name: 'Learning', icon: '📚', color: '#ff6b6b' },
      { key: 'finance', name: 'Finance', icon: '💰', color: '#a8e6cf' },
      { key: 'travel', name: 'Travel', icon: '✈️', color: '#ffd93d' }
    ];

    return categories.map(category => ({
      ...category,
      count: tasks.filter(task => task.category === category.key).length
    }));
  };

  const stats = getTaskStats();
  const categories = getCategoryStats();
  const recentTasks = tasks.slice(0, 5);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const addActivity = (action, item, type) => {
    const newActivity = {
      id: Date.now(),
      action,
      item,
      time: 'Just now',
      type,
      timestamp: new Date()
    };
    setActivities(prev => [newActivity, ...prev.slice(0, 9)]); // Keep only last 10 activities
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      position: 'relative',
      zIndex: 1
    }}>
      <Header />

      <Box sx={{
        position: 'relative',
        zIndex: 1,
        background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
        backdropFilter: 'blur(10px)',
        minHeight: 'calc(100vh - 64px)',
        p: { xs: 2, md: 4 }
      }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
          <Box sx={{ flex: 1 }}>
            {/* Enhanced Welcome Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Box sx={{
              mb: { xs: 4, md: 6 },
              p: { xs: 3, md: 4 },
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: 4,
              boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar
                  sx={{
                    width: { xs: 60, md: 80 },
                    height: { xs: 60, md: 80 },
                    mr: 3,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)'
                  }}
                >
                  {getInitials(user?.firstName, user?.lastName)}
                </Avatar>
                <Box>
                  <Typography variant="h3" sx={{
                    mb: 1,
                    fontWeight: 800,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontSize: { xs: '1.8rem', md: '2.5rem' }
                  }}>
                    {getGreeting()}, {user?.firstName || 'User'}! 🌟
                  </Typography>
                  <Typography variant="h6" sx={{
                    color: '#666',
                    fontWeight: 400,
                    fontSize: { xs: '1rem', md: '1.25rem' }
                  }}>
                    Ready to conquer your tasks today?
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                <Chip
                  icon={<TrendingUpIcon />}
                  label={`${stats.completionRate}% completion rate`}
                  sx={{
                    background: 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)',
                    color: 'white',
                    fontWeight: 600,
                    boxShadow: '0 4px 15px rgba(78, 205, 196, 0.3)'
                  }}
                />
                <Chip
                  icon={<TrophyIcon />}
                  label={`${stats.completed} tasks completed`}
                  sx={{
                    background: 'linear-gradient(135deg, #f9ca24 0%, #f093fb 100%)',
                    color: 'white',
                    fontWeight: 600,
                    boxShadow: '0 4px 15px rgba(249, 202, 36, 0.3)'
                  }}
                />
                <Chip
                  icon={<TimelineIcon />}
                  label={`${stats.pending} tasks pending`}
                  sx={{
                    background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
                    color: 'white',
                    fontWeight: 600,
                    boxShadow: '0 4px 15px rgba(255, 107, 107, 0.3)'
                  }}
                />
              </Box>
            </Box>
          </motion.div>

          {/* Enhanced Stats Cards */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: { xs: 2, md: 3 }, mb: { xs: 4, md: 6 } }}>
              <Box sx={{ flex: '1 1 200px', minWidth: 180 }}>
                <motion.div
                  transition={{ duration: 0.2 }}
                >
                  <Card sx={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    borderRadius: 4,
                    boxShadow: '0 15px 35px rgba(102, 126, 234, 0.4)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: -50,
                      right: -50,
                      width: 100,
                      height: 100,
                      background: 'rgba(255,255,255,0.1)',
                      borderRadius: '50%',
                      animation: 'pulse 3s ease-in-out infinite'
                    }
                  }}>
                    <CardContent sx={{ textAlign: 'center', py: { xs: 2, md: 3 }, px: { xs: 1.5, md: 2 }, position: 'relative', zIndex: 1 }}>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                      >
                        <TaskIcon sx={{ fontSize: { xs: 32, md: 40 }, mb: 1.5, opacity: 0.9 }} />
                      </motion.div>
                      <Typography variant="h3" sx={{
                        fontWeight: 800,
                        mb: 0.5,
                        fontSize: { xs: '1.5rem', md: '2rem' },
                        textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                      }}>
                        {stats.total}
                      </Typography>
                      <Typography variant="h6" sx={{
                        opacity: 0.9,
                        fontWeight: 500,
                        fontSize: { xs: '0.85rem', md: '1rem' }
                      }}>
                        Total Tasks
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Box>

              <Box sx={{ flex: '1 1 200px', minWidth: 180 }}>
                <motion.div
                  transition={{ duration: 0.2 }}
                >
                  <Card sx={{
                    background: 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)',
                    color: 'white',
                    borderRadius: 4,
                    boxShadow: '0 15px 35px rgba(78, 205, 196, 0.4)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    <CardContent sx={{ textAlign: 'center', py: { xs: 2, md: 3 }, px: { xs: 1.5, md: 2 }, position: 'relative', zIndex: 1 }}>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                      >
                        <DoneAllIcon sx={{ fontSize: { xs: 32, md: 40 }, mb: 1.5, opacity: 0.9 }} />
                      </motion.div>
                      <Typography variant="h3" sx={{
                        fontWeight: 800,
                        mb: 0.5,
                        fontSize: { xs: '1.5rem', md: '2rem' },
                        textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                      }}>
                        {stats.completed}
                      </Typography>
                      <Typography variant="h6" sx={{
                        opacity: 0.9,
                        fontWeight: 500,
                        fontSize: { xs: '0.85rem', md: '1rem' }
                      }}>
                        Completed
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Box>

              <Box sx={{ flex: '1 1 200px', minWidth: 180 }}>
                <motion.div
                  transition={{ duration: 0.2 }}
                >
                  <Card sx={{
                    background: 'linear-gradient(135deg, #f9ca24 0%, #f093fb 100%)',
                    color: 'white',
                    borderRadius: 4,
                    boxShadow: '0 15px 35px rgba(249, 202, 36, 0.4)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    <CardContent sx={{ textAlign: 'center', py: { xs: 2, md: 3 }, px: { xs: 1.5, md: 2 }, position: 'relative', zIndex: 1 }}>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
                      >
                        <ScheduleIcon sx={{ fontSize: { xs: 32, md: 40 }, mb: 1.5, opacity: 0.9 }} />
                      </motion.div>
                      <Typography variant="h3" sx={{
                        fontWeight: 800,
                        mb: 0.5,
                        fontSize: { xs: '1.5rem', md: '2rem' },
                        textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                      }}>
                        {stats.pending}
                      </Typography>
                      <Typography variant="h6" sx={{
                        opacity: 0.9,
                        fontWeight: 500,
                        fontSize: { xs: '0.85rem', md: '1rem' }
                      }}>
                        Pending
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Box>

              <Box sx={{ flex: '1 1 200px', minWidth: 180 }}>
                <motion.div
                  transition={{ duration: 0.2 }}
                >
                  <Card sx={{
                    background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
                    color: 'white',
                    borderRadius: 4,
                    boxShadow: '0 15px 35px rgba(255, 107, 107, 0.4)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    <CardContent sx={{ textAlign: 'center', py: { xs: 2, md: 3 }, px: { xs: 1.5, md: 2 }, position: 'relative', zIndex: 1 }}>
                      <Typography variant="h3" sx={{
                        fontWeight: 800,
                        mb: 1.5,
                        fontSize: { xs: '1.5rem', md: '2rem' },
                        textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                      }}>
                        {stats.completionRate}%
                      </Typography>
                      <Typography variant="h6" sx={{
                        opacity: 0.9,
                        fontWeight: 500,
                        mb: 1.5,
                        fontSize: { xs: '0.85rem', md: '1rem' }
                      }}>
                        Completion Rate
                      </Typography>
                      <Box sx={{ width: '100%', mt: 1 }}>
                        <LinearProgress
                          variant="determinate"
                          value={stats.completionRate}
                          sx={{
                            height: { xs: 6, md: 8 },
                            borderRadius: 4,
                            bgcolor: 'rgba(255,255,255,0.3)',
                            '& .MuiLinearProgress-bar': {
                              bgcolor: 'white',
                              borderRadius: 4,
                              boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
                            }
                          }}
                        />
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Box>
            </Box>
          </motion.div>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
          {/* Enhanced Add Task Section */}
          <Box sx={{ flex: 1 }}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Card
                id="add-task-section"
                sx={{
                  borderRadius: 4,
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 4,
                    background: 'linear-gradient(90deg, #667eea 0%, #764ba2 50%, #4ecdc4 100%)'
                  }
                }}
              >
                <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Box sx={{
                      p: 1.5,
                      borderRadius: 2,
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      mr: 2
                    }}>
                      <AddIcon sx={{ color: 'white', fontSize: 24 }} />
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{
                        fontWeight: 700,
                        color: '#1a1a1a',
                        fontSize: { xs: '1.1rem', md: '1.25rem' }
                      }}>
                        Add New Task
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#666' }}>
                        Create a new task to stay organized
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <TextField
                      select
                      fullWidth
                      value={newTaskCategory}
                      onChange={(e) => setNewTaskCategory(e.target.value)}
                      label="Category"
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                        }
                      }}
                    >
                      {categories.map((category) => (
                        <MenuItem key={category.key} value={category.key}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <span>{category.icon}</span>
                            <span>{category.name}</span>
                          </Box>
                        </MenuItem>
                      ))}
                    </TextField>
                  </Box>
                  <Box sx={{ display: 'flex', gap: { xs: 1, md: 2 }, flexDirection: { xs: 'column', sm: 'row' } }}>
                    <TextField
                      fullWidth
                      value={newTask}
                      onChange={(e) => setNewTask(e.target.value)}
                      placeholder="What needs to be done?"
                      variant="outlined"
                      onKeyPress={(e) => e.key === 'Enter' && addTask()}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                        }
                      }}
                    />
                    <Button
                      variant="contained"
                      onClick={addTask}
                      disabled={!newTask.trim()}
                      sx={{
                        px: { xs: 2, md: 3 },
                        py: { xs: 1, md: 'auto' },
                        backgroundColor: '#667eea',
                        '&:hover': { backgroundColor: '#5a67d8' },
                        borderRadius: 2,
                        boxShadow: '0 4px 14px rgba(102, 126, 234, 0.3)',
                        minWidth: { xs: '100%', sm: 'auto' }
                      }}
                    >
                      Add
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Box>

          {/* Recent Tasks Preview */}
          <Box sx={{ flex: 1 }}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#1a1a1a', fontSize: { xs: '1.1rem', md: '1.25rem' } }}>
                    <CalendarIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Recent Tasks
                  </Typography>
                  {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                      <Typography color="text.secondary">Loading tasks...</Typography>
                    </Box>
                  ) : recentTasks.length > 0 ? (
                    <List sx={{ py: 0 }}>
                      {recentTasks.map((task, index) => (
                        <motion.div
                          key={task._id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <ListItem
                            sx={{
                              px: 0,
                              py: 1.5,
                              borderRadius: 1,
                              '&:hover': { bgcolor: 'rgba(102, 126, 234, 0.04)' }
                            }}
                          >
                            <ListItemIcon sx={{ minWidth: 40 }}>
                              <IconButton
                                size="small"
                                onClick={() => toggleTask(task._id, task.completed)}
                                sx={{
                                  color: task.completed ? '#4ecdc4' : '#ccc',
                                  '&:hover': { color: task.completed ? '#44a08d' : '#999' }
                                }}
                              >
                                {task.completed ? <CheckCircleIcon /> : <UncheckedIcon />}
                              </IconButton>
                            </ListItemIcon>
                            <ListItemText
                              primary={
                                <Typography
                                  sx={{
                                    textDecoration: task.completed ? 'line-through' : 'none',
                                    color: task.completed ? '#666' : '#1a1a1a',
                                    fontWeight: 500
                                  }}
                                >
                                  {task.title}
                                </Typography>
                              }
                              secondary={
                                <Typography variant="caption" color="text.secondary">
                                  {new Date(task.createdAt || Date.now()).toLocaleDateString()}
                                </Typography>
                              }
                            />
                          </ListItem>
                          {index < recentTasks.length - 1 && <Divider variant="inset" />}
                        </motion.div>
                      ))}
                    </List>
                  ) : (
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                      <TaskIcon sx={{ fontSize: 48, color: '#ccc', mb: 2 }} />
                      <Typography color="text.secondary">
                        No tasks yet. Add your first task above!
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </Box>
        </Box>

        {/* Enhanced Task Categories */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Card sx={{
            mt: 6,
            borderRadius: 4,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <CardContent sx={{ p: { xs: 3, md: 4 } }}>
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography variant="h5" sx={{
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 1,
                  fontSize: { xs: '1.5rem', md: '2rem' }
                }}>
                  📊 Task Categories
                </Typography>
                <Typography variant="body1" sx={{ color: '#666', fontSize: { xs: '0.9rem', md: '1rem' } }}>
                  Organize your tasks by category for better productivity
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: { xs: 2, md: 3 } }}>
                {categories.map((category, index) => (
                  <Box sx={{ flex: '1 1 150px', minWidth: 120 }} key={category.key}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.1,
                        type: "spring",
                        stiffness: 200
                      }}
                      whileHover={{
                        scale: 1.05,
                        y: -8,
                        transition: { duration: 0.2 }
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Card
                        sx={{
                          cursor: 'pointer',
                          borderRadius: 3,
                          textAlign: 'center',
                          py: { xs: 2, md: 3 },
                          px: { xs: 1.5, md: 2 },
                          background: `linear-gradient(135deg, ${category.color}20 0%, ${category.color}10 100%)`,
                          border: `2px solid ${category.color}30`,
                          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                          position: 'relative',
                          overflow: 'hidden',
                          '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: `linear-gradient(135deg, ${category.color}10 0%, transparent 50%)`,
                            opacity: 0,
                            transition: 'opacity 0.3s ease'
                          },
                          '&:hover::before': {
                            opacity: 1
                          },
                          '&:hover': {
                            borderColor: category.color,
                            boxShadow: `0 15px 35px ${category.color}40`,
                            transform: 'translateY(-4px)'
                          }
                        }}
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2 + index * 0.1, type: "spring", stiffness: 300 }}
                        >
                          <Typography variant="h3" sx={{
                            mb: 1.5,
                            fontSize: { xs: '2rem', md: '2.5rem' },
                            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                          }}>
                            {category.icon}
                          </Typography>
                        </motion.div>
                        <Typography variant="h6" sx={{
                          fontWeight: 700,
                          color: '#1a1a1a',
                          mb: 1,
                          fontSize: { xs: '0.9rem', md: '1rem' }
                        }}>
                          {category.name}
                        </Typography>
                        <Badge
                          badgeContent={category.count}
                          color="primary"
                          sx={{
                            '& .MuiBadge-badge': {
                              background: `linear-gradient(135deg, ${category.color} 0%, ${category.color}dd 100%)`,
                              color: 'white',
                              fontWeight: 700,
                              fontSize: '0.7rem',
                              minWidth: 20,
                              height: 20
                            }
                          }}
                        >
                          <Typography variant="body2" sx={{
                            color: '#666',
                            fontWeight: 500,
                            fontSize: { xs: '0.75rem', md: '0.8rem' }
                          }}>
                            {category.count} {category.count === 1 ? 'task' : 'tasks'}
                          </Typography>
                        </Badge>
                      </Card>
                    </motion.div>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Card sx={{ mt: 4, borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <CardContent sx={{ p: { xs: 2, md: 3 } }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: '#1a1a1a', display: 'flex', alignItems: 'center', gap: 1, fontSize: { xs: '1.1rem', md: '1.25rem' } }}>
                <CalendarIcon />
                Recent Activity
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {activities.length > 0 ? activities.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Box sx={{
                      display: 'flex',
                      alignItems: 'center',
                      p: { xs: 1.5, md: 2 },
                      borderRadius: 2,
                      bgcolor: 'background.paper',
                      border: '1px solid #f0f0f0',
                      '&:hover': { bgcolor: '#fafafa' }
                    }}>
                      <Box sx={{
                        width: { xs: 6, md: 8 },
                        height: { xs: 6, md: 8 },
                        borderRadius: '50%',
                        bgcolor: activity.type === 'complete' ? '#4ecdc4' : activity.type === 'add' ? '#667eea' : activity.type === 'update' ? '#f9ca24' : activity.type === 'delete' ? '#ff6b6b' : '#ccc',
                        mr: 2,
                        flexShrink: 0
                      }} />
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 500, fontSize: { xs: '0.8rem', md: '0.875rem' } }}>
                          {activity.action} <span style={{ color: '#667eea' }}>{activity.item}</span>
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', md: '0.75rem' } }}>
                          {activity.time}
                        </Typography>
                      </Box>
                    </Box>
                  </motion.div>
                )) : (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <Typography color="text.secondary">
                      No recent activities yet. Start by adding or completing tasks!
                    </Typography>
                  </Box>
                )}
              </Box>
            </CardContent>
          </Card>
        </motion.div>

        {/* Full Task List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <Card sx={{ mt: 4, borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <CardContent sx={{ p: { xs: 2, md: 3 } }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexDirection: { xs: 'column', sm: 'row' }, gap: { xs: 2, sm: 0 } }}>
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#1a1a1a', fontSize: { xs: '1.1rem', md: '1.25rem' } }}>
                  <TaskIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                  All Tasks ({tasks.length})
                </Typography>
                <Chip
                  label={`${stats.completed} of ${stats.total} completed`}
                  sx={{
                    bgcolor: '#f0f4ff',
                    color: '#667eea',
                    fontWeight: 500,
                    fontSize: { xs: '0.75rem', md: '0.875rem' }
                  }}
                />
              </Box>

              {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                  <Typography color="text.secondary">Loading tasks...</Typography>
                </Box>
              ) : tasks.length > 0 ? (
                <List sx={{ py: 0 }}>
                  {tasks.map((task, index) => (
                    <motion.div
                      key={task._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <ListItem
                        sx={{
                          mb: 1,
                          borderRadius: 2,
                          bgcolor: 'background.paper',
                          border: '1px solid #f0f0f0',
                          '&:hover': {
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                            borderColor: '#e0e0e0'
                          }
                        }}
                      >
                        {editing === task._id ? (
                          <Box sx={{ display: 'flex', width: '100%', gap: 1, flexDirection: { xs: 'column', sm: 'row' } }}>
                            <TextField
                              fullWidth
                              value={editText}
                              onChange={(e) => setEditText(e.target.value)}
                              variant="outlined"
                              size="small"
                              onKeyPress={(e) => e.key === 'Enter' && updateTask(task._id)}
                            />
                            <Box sx={{ display: 'flex', gap: 1, width: { xs: '100%', sm: 'auto' } }}>
                              <Button
                                onClick={() => updateTask(task._id)}
                                variant="contained"
                                size="small"
                                sx={{ bgcolor: '#4ecdc4', '&:hover': { bgcolor: '#44a08d' }, flex: { xs: 1, sm: 'auto' } }}
                              >
                                Save
                              </Button>
                              <Button
                                onClick={() => setEditing(null)}
                                variant="outlined"
                                size="small"
                                sx={{ flex: { xs: 1, sm: 'auto' } }}
                              >
                                Cancel
                              </Button>
                            </Box>
                          </Box>
                        ) : (
                          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                            <ListItemIcon sx={{ minWidth: 40 }}>
                              <IconButton
                                size="small"
                                onClick={() => toggleTask(task._id, task.completed)}
                                sx={{
                                  color: task.completed ? '#4ecdc4' : '#ccc',
                                  '&:hover': { color: task.completed ? '#44a08d' : '#999' }
                                }}
                              >
                                {task.completed ? <CheckCircleIcon /> : <UncheckedIcon />}
                              </IconButton>
                            </ListItemIcon>
                            <ListItemText
                              primary={
                                <Typography
                                  sx={{
                                    textDecoration: task.completed ? 'line-through' : 'none',
                                    color: task.completed ? '#666' : '#1a1a1a',
                                    fontWeight: 500
                                  }}
                                >
                                  {task.title}
                                </Typography>
                              }
                              secondary={
                                <Typography variant="caption" color="text.secondary">
                                  Created {new Date(task.createdAt || Date.now()).toLocaleDateString()}
                                </Typography>
                              }
                            />
                            <Box sx={{ display: 'flex', gap: { xs: 0.5, md: 1 } }}>
                              <IconButton
                                onClick={() => { setEditing(task._id); setEditText(task.title); }}
                                size="small"
                                sx={{ color: '#667eea', p: { xs: 0.5, md: 1 } }}
                              >
                                <EditIcon sx={{ fontSize: { xs: 18, md: 20 } }} />
                              </IconButton>
                              <IconButton
                                onClick={() => deleteTask(task._id)}
                                size="small"
                                sx={{ color: '#ff6b6b', p: { xs: 0.5, md: 1 } }}
                              >
                                <DeleteIcon sx={{ fontSize: { xs: 18, md: 20 } }} />
                              </IconButton>
                            </Box>
                          </Box>
                        )}
                      </ListItem>
                    </motion.div>
                  ))}
                </List>
              ) : (
                <Box sx={{ textAlign: 'center', py: { xs: 4, md: 6 } }}>
                  <TaskIcon sx={{ fontSize: { xs: 48, md: 64 }, color: '#e0e0e0', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary" sx={{ mb: 1, fontSize: { xs: '1rem', md: '1.25rem' } }}>
                    No tasks yet
                  </Typography>
                  <Typography color="text.secondary" sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>
                    Start by adding your first task above!
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </motion.div>

        </Box>
        <Box sx={{ flex: { xs: 1, md: '0 0 300px' } }}>
            {/* Profile Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', position: 'sticky', top: 20 }}>
                <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: '#1a1a1a', textAlign: 'center' }}>
                    Profile
                  </Typography>
                  <Box sx={{ textAlign: 'center' }}>
                    <Avatar
                      sx={{
                        width: 80,
                        height: 80,
                        mx: 'auto',
                        mb: 2,
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)'
                      }}
                      src={user?.profilePicture}
                    >
                      {getInitials(user?.firstName, user?.lastName)}
                    </Avatar>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                      {getUserDisplayName()}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
                      {user?.email}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-around', mb: 3 }}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h4" sx={{ fontWeight: 700, color: '#667eea' }}>
                          {stats.total}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                          Total Tasks
                        </Typography>
                      </Box>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h4" sx={{ fontWeight: 700, color: '#4ecdc4' }}>
                          {stats.completed}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                          Completed
                        </Typography>
                      </Box>
                    </Box>
                    <Button
                      variant="outlined"
                      fullWidth
                      component={Link}
                      to="/profile"
                      sx={{ mt: 2 }}
                    >
                      View Full Profile
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Box>
        </Box>
      </Box>

      {/* Floating Action Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
      >
        <Tooltip title="Quick Add Task" placement="left">
          <Fab
            color="primary"
            sx={{
              position: 'fixed',
              bottom: { xs: 16, md: 24 },
              right: { xs: 16, md: 24 },
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              boxShadow: '0 8px 32px rgba(102, 126, 234, 0.4)',
              '&:hover': {
                background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
                boxShadow: '0 12px 40px rgba(102, 126, 234, 0.6)',
                transform: 'scale(1.1)'
              },
              zIndex: 1000
            }}
            onClick={() => {
              // Scroll to add task section
              document.getElementById('add-task-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <AddIcon />
          </Fab>
        </Tooltip>
      </motion.div>

    </Box>
  );
};

export default DashboardPage;