import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Paper, Card, CardContent, Divider, useTheme, alpha } from '@mui/material';
import AdminLayout from '../../components/AdminLayout';
import { PeopleAlt, LibraryBooks, Announcement, Storage, Speed } from '@mui/icons-material';
import adminService from '../../services/AdminService';

// Sample data 
const systemMetrics = {
  activeUsers: 245,
  activeCourses: 68,
  totalAnnouncements: 17,
  storageUsed: '28.4 GB',
  serverLoad: '32%',
  averageResponseTime: '86ms'
};

const AdminDashboard: React.FC = () => {
  const theme = useTheme();
  const [firstName, setFirstName] = useState('');

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const userSettings = await adminService.getUserSettings();
        if (userSettings) {
          setFirstName(userSettings.firstName);
        }
      } catch (error) {
        console.error('Failed to load user profile', error);
      }
    };

    loadUserProfile();
  }, []);

  // Listen for user profile updates
  useEffect(() => {
    const handleUserUpdated = () => {
      // Reload user profile when it's updated
      adminService.getUserSettings().then(settings => {
        if (settings) setFirstName(settings.firstName);
      });
    };

    // Add event listener
    window.addEventListener('user-updated', handleUserUpdated);
    
    // Clean up
    return () => {
      window.removeEventListener('user-updated', handleUserUpdated);
    };
  }, []);

  return (
    <AdminLayout title="Dashboard">
      <Box sx={{ py: 3 }}>
        <Typography variant="h5" component="h1" fontWeight="bold" color="white" mb={3}>
          Welcome, {firstName}
        </Typography>
        <Typography variant="body1" color="rgba(255, 255, 255, 0.7)" mb={4}>
          Manage users, courses, and system-wide settings across all ISCP campuses.
        </Typography>

        {/* Quick Stats */}
        <Grid container spacing={3} mb={4}>
          <Box sx={{ gridColumn: { xs: 'span 12', sm: 'span 6', md: 'span 4' }, width: '100%', px: 1.5 }}>
            <Paper sx={{ 
              p: 2, 
              height: '100%',
              bgcolor: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              borderRadius: 2,
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ 
                  p: 1.5, 
                  bgcolor: alpha(theme.palette.primary.main, 0.1), 
                  borderRadius: 2,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  mr: 2
                }}>
                  <PeopleAlt sx={{ color: theme.palette.primary.main }} />
                </Box>
                <Box>
                  <Typography variant="h5" color="white" fontWeight="bold">
                    {systemMetrics.activeUsers}
                  </Typography>
                  <Typography variant="body2" color="rgba(255, 255, 255, 0.7)">
                    Active Users
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Box>
          
          <Box sx={{ gridColumn: { xs: 'span 12', sm: 'span 6', md: 'span 4' }, width: '100%', px: 1.5 }}>
            <Paper sx={{ 
              p: 2, 
              height: '100%',
              bgcolor: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              borderRadius: 2,
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ 
                  p: 1.5, 
                  bgcolor: alpha(theme.palette.success.main, 0.1), 
                  borderRadius: 2,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  mr: 2
                }}>
                  <LibraryBooks sx={{ color: theme.palette.success.main }} />
                </Box>
                <Box>
                  <Typography variant="h5" color="white" fontWeight="bold">
                    {systemMetrics.activeCourses}
                  </Typography>
                  <Typography variant="body2" color="rgba(255, 255, 255, 0.7)">
                    Active Courses
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Box>
          
          <Box sx={{ gridColumn: { xs: 'span 12', sm: 'span 6', md: 'span 4' }, width: '100%', px: 1.5 }}>
            <Paper sx={{ 
              p: 2, 
              height: '100%',
              bgcolor: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              borderRadius: 2,
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ 
                  p: 1.5, 
                  bgcolor: alpha(theme.palette.info.main, 0.1), 
                  borderRadius: 2,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  mr: 2
                }}>
                  <Announcement sx={{ color: theme.palette.info.main }} />
                </Box>
                <Box>
                  <Typography variant="h5" color="white" fontWeight="bold">
                    {systemMetrics.totalAnnouncements}
                  </Typography>
                  <Typography variant="body2" color="rgba(255, 255, 255, 0.7)">
                    Announcements
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Box>
        </Grid>

        {/* Quick Links */}
        <Box mb={4}>
          <Typography variant="h6" color="white" mb={2}>
            Quick Actions
          </Typography>
          <Box sx={{ 
            p: 3, 
            bgcolor: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            borderRadius: 2,
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <Grid container spacing={3}>
              <Box sx={{ gridColumn: { xs: 'span 12', sm: 'span 6', md: 'span 3' }, width: '100%', px: 1.5 }}>
                <Card sx={{ 
                  bgcolor: 'rgba(0, 0, 0, 0.2)',
                  borderRadius: 2,
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  height: '100%',
                  transition: 'all 0.2s',
                  '&:hover': {
                    bgcolor: 'rgba(0, 0, 0, 0.3)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)'
                  },
                  cursor: 'pointer'
                }}>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Box sx={{ 
                      p: 1.5, 
                      bgcolor: alpha(theme.palette.primary.main, 0.1), 
                      borderRadius: '50%',
                      display: 'inline-flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      mb: 1
                    }}>
                      <PeopleAlt sx={{ color: theme.palette.primary.main }} />
                    </Box>
                    <Typography variant="h6" color="white" mb={1}>
                      User Management
                    </Typography>
                    <Typography variant="body2" color="rgba(255, 255, 255, 0.7)">
                      Manage user accounts
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
              
              <Box sx={{ gridColumn: { xs: 'span 12', sm: 'span 6', md: 'span 3' }, width: '100%', px: 1.5 }}>
                <Card sx={{ 
                  bgcolor: 'rgba(0, 0, 0, 0.2)',
                  borderRadius: 2,
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  height: '100%',
                  transition: 'all 0.2s',
                  '&:hover': {
                    bgcolor: 'rgba(0, 0, 0, 0.3)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)'
                  },
                  cursor: 'pointer'
                }}>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Box sx={{ 
                      p: 1.5, 
                      bgcolor: alpha(theme.palette.success.main, 0.1), 
                      borderRadius: '50%',
                      display: 'inline-flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      mb: 1
                    }}>
                      <LibraryBooks sx={{ color: theme.palette.success.main }} />
                    </Box>
                    <Typography variant="h6" color="white" mb={1}>
                      Course Management
                    </Typography>
                    <Typography variant="body2" color="rgba(255, 255, 255, 0.7)">
                      Manage courses
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
              
              <Box sx={{ gridColumn: { xs: 'span 12', sm: 'span 6', md: 'span 3' }, width: '100%', px: 1.5 }}>
                <Card sx={{ 
                  bgcolor: 'rgba(0, 0, 0, 0.2)',
                  borderRadius: 2,
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  height: '100%',
                  transition: 'all 0.2s',
                  '&:hover': {
                    bgcolor: 'rgba(0, 0, 0, 0.3)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)'
                  },
                  cursor: 'pointer'
                }}>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Box sx={{ 
                      p: 1.5, 
                      bgcolor: alpha(theme.palette.warning.main, 0.1), 
                      borderRadius: '50%',
                      display: 'inline-flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      mb: 1
                    }}>
                      <Announcement sx={{ color: theme.palette.warning.main }} />
                    </Box>
                    <Typography variant="h6" color="white" mb={1}>
                      Announcements
                    </Typography>
                    <Typography variant="body2" color="rgba(255, 255, 255, 0.7)">
                      Manage announcements
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
              
              <Box sx={{ gridColumn: { xs: 'span 12', sm: 'span 6', md: 'span 3' }, width: '100%', px: 1.5 }}>
                <Card sx={{ 
                  bgcolor: 'rgba(0, 0, 0, 0.2)',
                  borderRadius: 2,
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  height: '100%',
                  transition: 'all 0.2s',
                  '&:hover': {
                    bgcolor: 'rgba(0, 0, 0, 0.3)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)'
                  },
                  cursor: 'pointer'
                }}>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Box sx={{ 
                      p: 1.5, 
                      bgcolor: alpha(theme.palette.error.main, 0.1), 
                      borderRadius: '50%',
                      display: 'inline-flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      mb: 1
                    }}>
                      <Speed sx={{ color: theme.palette.error.main }} />
                    </Box>
                    <Typography variant="h6" color="white" mb={1}>
                      System Monitor
                    </Typography>
                    <Typography variant="body2" color="rgba(255, 255, 255, 0.7)">
                      View system status
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          </Box>
        </Box>

        {/* System Status */}
        <Box>
          <Typography variant="h6" color="white" mb={2}>
            System Status
          </Typography>
          <Paper sx={{ 
            p: 3, 
            bgcolor: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            borderRadius: 2,
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <Grid container spacing={4}>
              <Box sx={{ gridColumn: { xs: 'span 12', md: 'span 4' }, width: '100%', px: 1.5 }}>
                <Box>
                  <Typography variant="body2" color="rgba(255, 255, 255, 0.7)" mb={1}>
                    Storage Used
                  </Typography>
                  <Typography variant="h5" color="white" fontWeight="medium">
                    {systemMetrics.storageUsed}
                  </Typography>
                  <Divider sx={{ my: 2, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                </Box>
              </Box>
              
              <Box sx={{ gridColumn: { xs: 'span 12', md: 'span 4' }, width: '100%', px: 1.5 }}>
                <Box>
                  <Typography variant="body2" color="rgba(255, 255, 255, 0.7)" mb={1}>
                    Server Load
                  </Typography>
                  <Typography variant="h5" color="white" fontWeight="medium">
                    {systemMetrics.serverLoad}
                  </Typography>
                  <Divider sx={{ my: 2, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                </Box>
              </Box>
              
              <Box sx={{ gridColumn: { xs: 'span 12', md: 'span 4' }, width: '100%', px: 1.5 }}>
                <Box>
                  <Typography variant="body2" color="rgba(255, 255, 255, 0.7)" mb={1}>
                    Response Time
                  </Typography>
                  <Typography variant="h5" color="white" fontWeight="medium">
                    {systemMetrics.averageResponseTime}
                  </Typography>
                  <Divider sx={{ my: 2, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                </Box>
              </Box>
            </Grid>
          </Paper>
        </Box>
      </Box>
    </AdminLayout>
  );
};

export default AdminDashboard; 