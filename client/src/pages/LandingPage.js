import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Box, Typography, Button, Grid, Card, CardContent, Chip, Avatar, Stack } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TaskIcon from '@mui/icons-material/Task';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import CloudIcon from '@mui/icons-material/Cloud';
import GroupIcon from '@mui/icons-material/Group';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import NotificationsIcon from '@mui/icons-material/Notifications';
import IntegrationIcon from '@mui/icons-material/Extension';
import SupportIcon from '@mui/icons-material/Support';
import StarIcon from '@mui/icons-material/Star';

const LandingPage = () => {
  const features = [
    {
      icon: <TaskIcon sx={{ fontSize: { xs: 40, md: 48 }, color: '#6366f1' }} />,
      title: 'Smart Task Management',
      description: 'AI-powered task organization with intelligent prioritization, deadline tracking, and automated categorization.',
      color: '#6366f1',
      bgColor: '#f8f9ff'
    },
    {
      icon: <SecurityIcon sx={{ fontSize: { xs: 40, md: 48 }, color: '#059669' }} />,
      title: 'Enterprise Security',
      description: 'Bank-level encryption, SSO integration, audit logs, and compliance with GDPR, HIPAA, and SOC 2 standards.',
      color: '#059669',
      bgColor: '#f0fdf4'
    },
    {
      icon: <SpeedIcon sx={{ fontSize: { xs: 40, md: 48 }, color: '#dc2626' }} />,
      title: 'Lightning Fast',
      description: 'Sub-second load times, offline capability, and optimized performance across all devices and networks.',
      color: '#dc2626',
      bgColor: '#fef2f2'
    },
    {
      icon: <CloudIcon sx={{ fontSize: { xs: 40, md: 48 }, color: '#7c3aed' }} />,
      title: 'Cloud Sync',
      description: 'Real-time synchronization across all devices with automatic backup and version control.',
      color: '#7c3aed',
      bgColor: '#faf5ff'
    },
    {
      icon: <GroupIcon sx={{ fontSize: { xs: 40, md: 48 }, color: '#ea580c' }} />,
      title: 'Team Collaboration',
      description: 'Seamless team workflows with shared projects, real-time comments, and advanced permission controls.',
      color: '#ea580c',
      bgColor: '#fff7ed'
    },
    {
      icon: <AnalyticsIcon sx={{ fontSize: { xs: 40, md: 48 }, color: '#0891b2' }} />,
      title: 'Advanced Analytics',
      description: 'Comprehensive productivity insights, time tracking, and detailed reports to optimize your workflow.',
      color: '#0891b2',
      bgColor: '#ecfeff'
    },
    {
      icon: <NotificationsIcon sx={{ fontSize: { xs: 40, md: 48 }, color: '#c2410c' }} />,
      title: 'Smart Notifications',
      description: 'Intelligent reminders, deadline alerts, and customizable notification preferences.',
      color: '#c2410c',
      bgColor: '#fff7ed'
    },
    {
      icon: <IntegrationIcon sx={{ fontSize: { xs: 40, md: 48 }, color: '#7c2d12' }} />,
      title: 'API & Integrations',
      description: 'Connect with 200+ tools including Slack, Jira, GitHub, Google Workspace, and Microsoft 365.',
      color: '#7c2d12',
      bgColor: '#fef7f7'
    },
    {
      icon: <CheckCircleIcon sx={{ fontSize: { xs: 40, md: 48 }, color: '#16a34a' }} />,
      title: 'Easy Onboarding',
      description: 'Get started in under 5 minutes with guided setup, templates, and comprehensive documentation.',
      color: '#16a34a',
      bgColor: '#f0fdf4'
    },
    {
      icon: <SupportIcon sx={{ fontSize: { xs: 40, md: 48 }, color: '#2563eb' }} />,
      title: '24/7 Support',
      description: 'Round-the-clock customer support with live chat, video calls, and dedicated account managers.',
      color: '#2563eb',
      bgColor: '#eff6ff'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Product Manager at TechCorp',
      avatar: 'SC',
      rating: 5,
      text: 'TaskFlow transformed how our entire team manages projects. The interface is clean, the features are powerful, and it just works seamlessly.',
      company: 'TechCorp'
    },
    {
      name: 'Marcus Johnson',
      role: 'Freelance Developer',
      avatar: 'MJ',
      rating: 5,
      text: 'As a freelancer juggling multiple clients, TaskFlow keeps me organized and productive. The mobile app is incredible for on-the-go updates.',
      company: 'Independent'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Operations Director',
      avatar: 'ER',
      rating: 5,
      text: 'We\'ve tried every task management tool out there. TaskFlow\'s analytics and team collaboration features are unmatched.',
      company: 'Global Solutions'
    }
  ];

  const stats = [
    { number: '500K+', label: 'Active Users' },
    { number: '99.9%', label: 'Uptime' },
    { number: '24/7', label: 'Support' },
    { number: '200+', label: 'Integrations' }
  ];

  return (
    <Box sx={{ backgroundColor: '#fafafa', minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box
        sx={{
          minHeight: { xs: '90vh', md: '100vh' },
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4ecdc4 100%)',
          backgroundSize: '400% 400%',
          animation: 'gradientShift 15s ease infinite',
          '@keyframes gradientShift': {
            '0%': { backgroundPosition: '0% 50%' },
            '50%': { backgroundPosition: '100% 50%' },
            '100%': { backgroundPosition: '0% 50%' },
          },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          px: { xs: 2, md: 3 },
        }}
      >
        {/* Animated Background Elements */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            overflow: 'hidden',
          }}
        >
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              style={{
                position: 'absolute',
                width: Math.random() * 80 + 40,
                height: Math.random() * 80 + 40,
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: Math.random() > 0.5 ? '50%' : '20%',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                backdropFilter: 'blur(10px)',
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, 20, 0],
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: Math.random() * 4 + 3,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: Math.random() * 2,
              }}
            />
          ))}
        </Box>

        <Box
          sx={{
            textAlign: 'center',
            zIndex: 1,
            maxWidth: 900,
            width: '100%',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Chip
              label="✨ Professional Task Management"
              sx={{
                mb: 3,
                backgroundColor: 'rgba(255,255,255,0.2)',
                color: 'white',
                fontWeight: 600,
                fontSize: '0.9rem',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.3)',
                px: 2,
                py: 1,
              }}
            />
            <Typography
              variant="h1"
              sx={{
                color: 'white',
                fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem', lg: '5rem' },
                fontWeight: 800,
                mb: 2,
                textShadow: '0 4px 8px rgba(0,0,0,0.4)',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
              }}
            >
              TaskFlow
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Typography
              variant="h5"
              sx={{
                color: 'rgba(255,255,255,0.95)',
                mb: 3,
                fontSize: { xs: '1.1rem', md: '1.4rem', lg: '1.6rem' },
                fontWeight: 500,
                textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                lineHeight: 1.4,
                maxWidth: 700,
                mx: 'auto',
              }}
            >
              The Most Advanced Task Management Platform for Modern Professionals
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: 'rgba(255,255,255,0.85)',
                mb: 4,
                fontSize: { xs: '1rem', md: '1.1rem' },
                maxWidth: 600,
                mx: 'auto',
                lineHeight: 1.6,
                textShadow: '0 1px 2px rgba(0,0,0,0.2)',
              }}
            >
              Boost productivity by 300% with AI-powered task management, real-time collaboration,
              and enterprise-grade security. Trusted by 500,000+ professionals worldwide.
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Box
              sx={{
                display: 'flex',
                gap: { xs: 2, md: 3 },
                justifyContent: 'center',
                flexWrap: 'wrap',
                mb: 4,
              }}
            >
              <Button
                component={Link}
                to="/register"
                variant="contained"
                sx={{
                  backgroundColor: 'white',
                  color: '#667eea',
                  px: { xs: 3, md: 4 },
                  py: { xs: 1.5, md: 2 },
                  borderRadius: 3,
                  fontSize: { xs: '0.9rem', md: '1rem' },
                  fontWeight: 700,
                  textTransform: 'none',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                  '&:hover': {
                    backgroundColor: '#f8f9fa',
                    transform: 'translateY(-3px)',
                    boxShadow: '0 12px 40px rgba(0,0,0,0.3)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Start Free Trial
              </Button>
              <Button
                component={Link}
                to="/login"
                variant="outlined"
                sx={{
                  borderColor: 'rgba(255,255,255,0.9)',
                  color: 'white',
                  px: { xs: 3, md: 4 },
                  py: { xs: 1.5, md: 2 },
                  borderRadius: 3,
                  fontSize: { xs: '0.9rem', md: '1rem' },
                  fontWeight: 700,
                  textTransform: 'none',
                  backdropFilter: 'blur(10px)',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    borderColor: 'white',
                    transform: 'translateY(-3px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Sign In
              </Button>
            </Box>

            {/* Trust Indicators */}
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 4, flexWrap: 'wrap' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <StarIcon sx={{ color: '#ffd700', fontSize: '1.2rem' }} />
                <Typography sx={{ color: 'white', fontSize: '0.9rem', fontWeight: 600 }}>
                  4.9/5 Rating
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CheckCircleIcon sx={{ color: '#4ade80', fontSize: '1.2rem' }} />
                <Typography sx={{ color: 'white', fontSize: '0.9rem', fontWeight: 600 }}>
                  SOC 2 Compliant
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <SecurityIcon sx={{ color: '#60a5fa', fontSize: '1.2rem' }} />
                <Typography sx={{ color: 'white', fontSize: '0.9rem', fontWeight: 600 }}>
                  Enterprise Security
                </Typography>
              </Box>
            </Box>
          </motion.div>
        </Box>

        {/* Scroll Indicator */}
        <motion.div
          style={{
            position: 'absolute',
            bottom: 40,
            left: '50%',
            transform: 'translateX(-50%)',
          }}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Box
            sx={{
              width: 28,
              height: 42,
              border: '2px solid rgba(255,255,255,0.8)',
              borderRadius: 14,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start',
              pt: 1.5,
              cursor: 'pointer',
              '&:hover': {
                borderColor: 'white',
              },
            }}
          >
            <Box
              sx={{
                width: 3,
                height: 10,
                backgroundColor: 'white',
                borderRadius: 1.5,
                animation: 'scrollBounce 2s infinite',
              }}
            />
          </Box>
        </motion.div>
      </Box>

      {/* Stats Section */}
      <Box sx={{ py: { xs: 6, md: 8 }, px: { xs: 2, md: 3 }, backgroundColor: 'white' }}>
        <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
          <Grid container spacing={{ xs: 3, md: 4 }}>
            {stats.map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography
                      variant="h3"
                      sx={{
                        fontSize: { xs: '2rem', md: '2.5rem', lg: '3rem' },
                        fontWeight: 800,
                        color: '#1a1a1a',
                        mb: 1,
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      {stat.number}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: '#666',
                        fontSize: { xs: '0.9rem', md: '1rem' },
                        fontWeight: 600,
                      }}
                    >
                      {stat.label}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: { xs: 8, md: 12 }, px: { xs: 2, md: 3 }, backgroundColor: '#f8f9fa' }}>
        <Box sx={{ maxWidth: 1400, mx: 'auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Typography
              variant="h2"
              sx={{
                textAlign: 'center',
                mb: 3,
                fontWeight: 800,
                color: '#1a1a1a',
                fontSize: { xs: '2rem', md: '2.5rem', lg: '3rem' },
                letterSpacing: '-0.02em',
              }}
            >
              Powerful Features for Modern Teams
            </Typography>
            <Typography
              variant="h6"
              sx={{
                textAlign: 'center',
                mb: { xs: 6, md: 8 },
                color: '#666',
                maxWidth: 800,
                mx: 'auto',
                lineHeight: 1.6,
                fontSize: { xs: '1rem', md: '1.1rem' },
                fontWeight: 400,
              }}
            >
              Everything you need to manage tasks efficiently, collaborate seamlessly,
              and boost productivity across your entire organization.
            </Typography>
          </motion.div>

          <Grid container spacing={{ xs: 3, md: 4 }}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} lg={4} xl={3} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      textAlign: 'center',
                      p: { xs: 3, md: 4 },
                      borderRadius: 4,
                      boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                      border: '1px solid #e0e0e0',
                      backgroundColor: 'white',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
                        borderColor: feature.color,
                      },
                    }}
                  >
                    <CardContent sx={{ p: 0, height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                        style={{ marginBottom: '24px' }}
                      >
                        <Box
                          sx={{
                            width: { xs: 70, md: 80 },
                            height: { xs: 70, md: 80 },
                            borderRadius: '50%',
                            backgroundColor: feature.bgColor,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mx: 'auto',
                            mb: 3,
                            boxShadow: `0 8px 24px rgba(${feature.color === '#6366f1' ? '99, 102, 241' : feature.color === '#059669' ? '5, 150, 105' : feature.color === '#dc2626' ? '220, 38, 38' : feature.color === '#7c3aed' ? '124, 58, 237' : feature.color === '#ea580c' ? '234, 88, 12' : feature.color === '#0891b2' ? '8, 145, 178' : feature.color === '#c2410c' ? '194, 65, 12' : feature.color === '#7c2d12' ? '124, 45, 18' : feature.color === '#16a34a' ? '22, 163, 74' : '37, 99, 235'}, 0.2)`,
                          }}
                        >
                          {feature.icon}
                        </Box>
                      </motion.div>
                      <Typography
                        variant="h6"
                        sx={{
                          mb: 2,
                          fontWeight: 700,
                          color: '#1a1a1a',
                          fontSize: { xs: '1.1rem', md: '1.25rem' },
                          lineHeight: 1.3,
                        }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: '#666',
                          lineHeight: 1.6,
                          fontSize: { xs: '0.9rem', md: '0.95rem' },
                          flexGrow: 1,
                        }}
                      >
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      {/* Testimonials Section */}
      <Box sx={{ py: { xs: 8, md: 12 }, px: { xs: 2, md: 3 }, backgroundColor: 'white' }}>
        <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Typography
              variant="h2"
              sx={{
                textAlign: 'center',
                mb: 3,
                fontWeight: 800,
                color: '#1a1a1a',
                fontSize: { xs: '2rem', md: '2.5rem', lg: '3rem' },
              }}
            >
              Loved by Professionals Worldwide
            </Typography>
            <Typography
              variant="h6"
              sx={{
                textAlign: 'center',
                mb: { xs: 6, md: 8 },
                color: '#666',
                maxWidth: 700,
                mx: 'auto',
                lineHeight: 1.6,
                fontSize: { xs: '1rem', md: '1.1rem' },
              }}
            >
              Join thousands of satisfied users who have transformed their productivity with TaskFlow.
            </Typography>
          </motion.div>

          <Grid container spacing={{ xs: 3, md: 4 }}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      p: { xs: 3, md: 4 },
                      borderRadius: 4,
                      boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                      border: '1px solid #e0e0e0',
                      backgroundColor: 'white',
                      position: 'relative',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 16px 48px rgba(0,0,0,0.12)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {/* Quote Icon */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 20,
                        right: 20,
                        width: 40,
                        height: 40,
                        backgroundColor: '#f8f9ff',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography sx={{ fontSize: '1.5rem', color: '#6366f1' }}>❝</Typography>
                    </Box>

                    <CardContent sx={{ p: 0 }}>
                      {/* Rating */}
                      <Box sx={{ mb: 3 }}>
                        <Stack direction="row" spacing={0.5}>
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <StarIcon key={i} sx={{ color: '#ffd700', fontSize: '1.2rem' }} />
                          ))}
                        </Stack>
                      </Box>

                      {/* Testimonial Text */}
                      <Typography
                        variant="body1"
                        sx={{
                          mb: 4,
                          color: '#333',
                          lineHeight: 1.7,
                          fontSize: { xs: '0.95rem', md: '1rem' },
                          fontStyle: 'italic',
                        }}
                      >
                        "{testimonial.text}"
                      </Typography>

                      {/* Author Info */}
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar
                          sx={{
                            width: { xs: 40, md: 48 },
                            height: { xs: 40, md: 48 },
                            backgroundColor: '#6366f1',
                            fontSize: { xs: '0.9rem', md: '1rem' },
                            fontWeight: 600,
                          }}
                        >
                          {testimonial.avatar}
                        </Avatar>
                        <Box>
                          <Typography
                            variant="subtitle1"
                            sx={{
                              fontWeight: 700,
                              color: '#1a1a1a',
                              fontSize: { xs: '0.9rem', md: '1rem' },
                            }}
                          >
                            {testimonial.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: '#666',
                              fontSize: { xs: '0.8rem', md: '0.9rem' },
                            }}
                          >
                            {testimonial.role}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{
                              color: '#999',
                              fontSize: '0.75rem',
                              fontWeight: 600,
                            }}
                          >
                            {testimonial.company}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      {/* About Section */}
      <Box sx={{ py: { xs: 8, md: 12 }, px: { xs: 2, md: 3 }, backgroundColor: '#f8f9fa' }}>
        <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
          <Grid container spacing={{ xs: 4, md: 8 }} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Typography
                  variant="h2"
                  sx={{
                    mb: 4,
                    fontWeight: 800,
                    color: '#1a1a1a',
                    fontSize: { xs: '2rem', md: '2.5rem', lg: '3rem' },
                    letterSpacing: '-0.02em',
                  }}
                >
                  Built for Modern Professionals
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    mb: 4,
                    color: '#555',
                    lineHeight: 1.7,
                    fontSize: { xs: '1rem', md: '1.1rem' },
                  }}
                >
                  TaskFlow empowers busy professionals to manage their tasks with unprecedented efficiency.
                  Our AI-powered platform combines intuitive design with powerful features to help you stay
                  organized, focused, and ahead of your goals.
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    mb: 4,
                    color: '#555',
                    lineHeight: 1.7,
                    fontSize: { xs: '1rem', md: '1.1rem' },
                  }}
                >
                  Whether you're managing complex projects, coordinating remote teams, or simply keeping track of
                  daily tasks, TaskFlow adapts to your workflow and scales with your needs. Experience the
                  difference with enterprise-grade security and 24/7 support.
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <CheckCircleIcon sx={{ color: '#16a34a', fontSize: '1.2rem' }} />
                    <Typography sx={{ color: '#333', fontWeight: 500 }}>
                      Free 14-day trial, no credit card required
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <CheckCircleIcon sx={{ color: '#16a34a', fontSize: '1.2rem' }} />
                    <Typography sx={{ color: '#333', fontWeight: 500 }}>
                      Cancel anytime, no hidden fees
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <CheckCircleIcon sx={{ color: '#16a34a', fontSize: '1.2rem' }} />
                    <Typography sx={{ color: '#333', fontWeight: 500 }}>
                      Enterprise-grade security & compliance
                    </Typography>
                  </Box>
                </Box>

                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: '#6366f1',
                    color: 'white',
                    px: { xs: 3, md: 4 },
                    py: { xs: 1.5, md: 2 },
                    borderRadius: 3,
                    fontSize: { xs: '0.9rem', md: '1rem' },
                    fontWeight: 700,
                    textTransform: 'none',
                    boxShadow: '0 8px 32px rgba(99, 102, 241, 0.3)',
                    '&:hover': {
                      backgroundColor: '#5855eb',
                      transform: 'translateY(-3px)',
                      boxShadow: '0 12px 40px rgba(99, 102, 241, 0.4)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Start Your Free Trial
                </Button>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Box
                  sx={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    borderRadius: 4,
                    p: { xs: 3, md: 4 },
                    color: 'white',
                    position: 'relative',
                    boxShadow: '0 12px 48px rgba(102, 126, 234, 0.3)',
                    overflow: 'hidden',
                  }}
                >
                  {/* Background Pattern */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      opacity: 0.1,
                      backgroundImage: 'radial-gradient(circle at 20% 80%, #ffffff 1px, transparent 1px), radial-gradient(circle at 80% 20%, #ffffff 1px, transparent 1px)',
                      backgroundSize: '30px 30px',
                    }}
                  />

                  <Box sx={{ position: 'relative', zIndex: 1 }}>
                    <Typography
                      variant="h4"
                      sx={{
                        mb: 3,
                        fontWeight: 700,
                        fontSize: { xs: '1.5rem', md: '1.75rem' },
                      }}
                    >
                      "TaskFlow transformed how our entire team manages projects. The interface is clean,
                      the features are powerful, and it just works seamlessly across all devices."
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <Avatar
                        sx={{
                          width: { xs: 50, md: 60 },
                          height: { xs: 50, md: 60 },
                          backgroundColor: 'rgba(255,255,255,0.2)',
                          fontSize: { xs: '1rem', md: '1.2rem' },
                          fontWeight: 700,
                        }}
                      >
                        SC
                      </Avatar>
                      <Box>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 700,
                            fontSize: { xs: '1rem', md: '1.1rem' },
                          }}
                        >
                          Sarah Chen
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            opacity: 0.9,
                            fontSize: { xs: '0.85rem', md: '0.9rem' },
                          }}
                        >
                          Product Manager at TechCorp
                        </Typography>
                      </Box>
                    </Box>
                    <Stack direction="row" spacing={0.5}>
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} sx={{ color: '#ffd700', fontSize: '1.1rem' }} />
                      ))}
                    </Stack>
                  </Box>

                  {/* Decorative elements */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: -30,
                      right: -30,
                      width: 80,
                      height: 80,
                      background: 'rgba(255,255,255,0.1)',
                      borderRadius: '50%',
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: -25,
                      left: -25,
                      width: 60,
                      height: 60,
                      background: 'rgba(255,255,255,0.1)',
                      borderRadius: '50%',
                    }}
                  />
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          py: { xs: 10, md: 12 },
          px: { xs: 2, md: 3 },
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background pattern */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.1,
            backgroundImage: 'radial-gradient(circle at 20% 80%, #ffffff 1px, transparent 1px), radial-gradient(circle at 80% 20%, #ffffff 1px, transparent 1px), radial-gradient(circle at 50% 50%, #ffffff 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Floating elements */}
        <Box
          sx={{
            position: 'absolute',
            top: '20%',
            left: '10%',
            width: 60,
            height: 60,
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '50%',
            animation: 'float 6s ease-in-out infinite',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '60%',
            right: '15%',
            width: 40,
            height: 40,
            background: 'rgba(255,255,255,0.15)',
            borderRadius: '50%',
            animation: 'float 8s ease-in-out infinite reverse',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '30%',
            left: '20%',
            width: 50,
            height: 50,
            background: 'rgba(255,255,255,0.12)',
            borderRadius: '50%',
            animation: 'float 7s ease-in-out infinite',
          }}
        />

        <Box sx={{ maxWidth: 900, mx: 'auto', position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Typography
              variant="h2"
              sx={{
                color: 'white',
                mb: 4,
                fontWeight: 800,
                fontSize: { xs: '2.2rem', md: '3rem', lg: '3.5rem' },
                textShadow: '0 4px 8px rgba(0,0,0,0.3)',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
              }}
            >
              Ready to Transform Your Productivity?
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: 'rgba(255,255,255,0.95)',
                mb: 6,
                fontSize: { xs: '1.1rem', md: '1.3rem', lg: '1.4rem' },
                lineHeight: 1.6,
                textShadow: '0 2px 4px rgba(0,0,0,0.2)',
                maxWidth: 700,
                mx: 'auto',
              }}
            >
              Join thousands of professionals who have streamlined their workflow with TaskFlow.
              Start your free trial today and experience the difference.
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 3, justifyContent: 'center', alignItems: 'center', mb: 4 }}>
              <Button
                component={Link}
                to="/register"
                variant="contained"
                sx={{
                  backgroundColor: 'white',
                  color: '#6366f1',
                  px: { xs: 4, md: 6 },
                  py: { xs: 2, md: 2.5 },
                  borderRadius: 3,
                  fontSize: { xs: '1rem', md: '1.2rem' },
                  fontWeight: 700,
                  textTransform: 'none',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                  minWidth: { xs: '100%', sm: 'auto' },
                  '&:hover': {
                    backgroundColor: '#f8f9fa',
                    transform: 'translateY(-4px) scale(1.05)',
                    boxShadow: '0 12px 48px rgba(0,0,0,0.3)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                🚀 Start Free Trial
              </Button>
              <Button
                component={Link}
                to="/login"
                variant="outlined"
                sx={{
                  borderColor: 'rgba(255,255,255,0.8)',
                  color: 'white',
                  px: { xs: 4, md: 6 },
                  py: { xs: 2, md: 2.5 },
                  borderRadius: 3,
                  fontSize: { xs: '1rem', md: '1.2rem' },
                  fontWeight: 700,
                  textTransform: 'none',
                  backdropFilter: 'blur(10px)',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  minWidth: { xs: '100%', sm: 'auto' },
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    borderColor: 'white',
                    transform: 'translateY(-4px) scale(1.05)',
                    boxShadow: '0 8px 32px rgba(255,255,255,0.1)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Sign In
              </Button>
            </Box>

            <Typography
              variant="body2"
              sx={{
                color: 'rgba(255,255,255,0.8)',
                fontSize: { xs: '0.9rem', md: '1rem' },
                fontWeight: 500,
              }}
            >
              ✨ No credit card required • 14-day free trial • Cancel anytime
            </Typography>
          </motion.div>
        </Box>

        {/* CSS for floating animation */}
        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
        `}</style>
      </Box>

      {/* Footer */}
      <Box sx={{ py: 6, px: 3, backgroundColor: '#1a1a1a', color: 'white' }}>
        <Box sx={{ maxWidth: 1200, mx: 'auto', textAlign: 'center' }}>
          <Typography
            variant="h6"
            sx={{
              mb: 2,
              fontWeight: 600,
              fontSize: '1.25rem',
            }}
          >
            TaskFlow
          </Typography>
          <Typography
            variant="body2"
            sx={{
              mb: 3,
              color: '#ccc',
              maxWidth: 600,
              mx: 'auto',
              lineHeight: 1.6,
            }}
          >
            Professional task management for modern teams. Built with precision,
            designed for productivity, trusted by professionals worldwide.
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: '#999',
              fontSize: '0.9rem',
            }}
          >
            © 2026 TaskFlow. All rights reserved. | Privacy Policy | Terms of Service
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default LandingPage;