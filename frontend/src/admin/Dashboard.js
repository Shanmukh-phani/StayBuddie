import React, { useEffect, useState } from 'react';
import { AppBar, Box, Typography, Card, CardContent, Grid, Chip, IconButton } from '@mui/material';
import { Bar, Pie, Line, Doughnut, Radar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { People, Group, GroupAdd, EventAvailable, Chair, Home } from '@mui/icons-material';
import profileImage from '../assets/buddie.jpg';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import BottomNavBar from './BottomNavBar';
import AdminSidebar from './AdminSidebar';
import axios from 'axios';

// Styled Components
const HeaderContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  padding: '14px 16px',
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  boxSizing: 'border-box',
  backgroundColor: '#fff',
  zIndex: 1000,
});

const StayText = styled(Typography)({
  fontFamily: '"Sofia", sans-serif',
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#006399',
});

const BuddieText = styled(Typography)({
  fontFamily: '"Sofia", sans-serif',
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#333',
});

const ProfileIcon = styled(IconButton)({
  borderRadius: '50%',
  backgroundColor: '#ddd',
  width: '40px',
  height: '40px',
});

// Dashboard Component
const Dashboard = () => {
  const [data, setData] = useState({
    vacancies: 0,
    rooms: 0,
    buddies: 0,
    fiveShare: 0,
    fourShare: 0,
    oneShare: 0
  });

  const navigate = useNavigate();



  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await axios.get('http://192.168.1.29:5000/admin/dashboard', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          },
        });

        setData(response.data);
      } catch (error) {
        console.error('Error fetching dashboard:', error);
      }
    };

    fetchDashboard();
  }, []);













  // Chart Data
  const barData = {
    labels: ['Vacancies', 'Rooms', 'Buddies', 'Five Shares', 'Four Shares', 'One Share'],
    datasets: [
      {
        label: 'Count',
        data: [data.vacancies, data.rooms, data.buddies, data.fiveShare, data.fourShare, data.oneShare],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
        borderColor: '#ffffff',
        borderWidth: 2,
      },
    ],
  };

  const pieData = {
    labels: ['Five Shares', 'Four Shares', 'One Share'],
    datasets: [
      {
        data: [data.fiveShare, data.fourShare, data.oneShare],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        borderColor: '#ffffff',
        borderWidth: 1,
      },
    ],
  };

  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Monthly Occupancy',
        data: [50, 60, 70, 80, 90, 100, 110], // Sample data
        borderColor: '#FF6384',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
      },
    ],
  };

  const doughnutData = {
    labels: ['Vacancies', 'Occupied'],
    datasets: [
      {
        data: [data.vacancies, data.rooms - data.vacancies],
        backgroundColor: ['#FF6384', '#36A2EB'],
        borderColor: '#ffffff',
        borderWidth: 1,
      },
    ],
  };

  const radarData = {
    labels: ['Room Quality', 'Hygiene', 'Food', 'Power', 'Wi-Fi'],
    datasets: [
      {
        label: 'Facilities Rating',
        data: [4, 5, 3, 4, 5], // Sample data
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: '#36A2EB',
        borderWidth: 1,
      },
    ],
  };


  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleProfileIconClick = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };



  return (
    <div>
      <AppBar position="static">
        <HeaderContainer>
          <Box display="flex" alignItems="center">
            <StayText variant="h4" component="h1">
              Stay
            </StayText>
            <BuddieText variant="h4" component="h1">
              Buddie
            </BuddieText>
          </Box>
          <ProfileIcon onClick={handleProfileIconClick}>
                            {/* <img src={profileImage} alt="Profile" style={{ width: '100%', height: '100%' }} />  */}
              <AdminSidebar open={drawerOpen} onClose={handleDrawerClose} />

              </ProfileIcon> 
        </HeaderContainer>
      </AppBar>


      <Box padding={4} mt={10}>
        <Typography variant="h4" gutterBottom>
          Hostel Dashboard
        </Typography>

        {/* Key Metrics */}
        <Grid container spacing={2} mb={4}>
          {/* Row 1 */}
          <Grid item xs={6} sm={6} md={4}>
            <Typography variant="h6" style={{ textAlign: 'center' }}>Vacancies</Typography>
            <Chip
              icon={<Home />}
              label={`: ${data.vacancies}`}
              color="primary"
              variant="outlined"
              sx={{
                borderRadius: '20px',
                fontSize: '1rem',
                padding: '12px 24px',
                backgroundColor: '#e3f2fd',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                mb: 1,
              }}
            />
          </Grid>
          <Grid item xs={6} sm={6} md={4}>
            <Typography variant="h6" style={{ textAlign: 'center' }}>Rooms</Typography>
            <Chip
              icon={<Chair />}
              label={`: ${data.rooms}`}
              color="secondary"
              variant="outlined"
              sx={{
                borderRadius: '20px',
                fontSize: '1rem',
                padding: '12px 24px',
                backgroundColor: '#fce4ec',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                mb: 1,
              }}
            />
          </Grid>
          {/* Row 2 */}
          <Grid item xs={6} sm={6} md={4}>
            <Typography variant="h6" style={{ textAlign: 'center' }}>Buddies</Typography>
            <Chip
              icon={<People />}
              label={`: ${data.buddies}`}
              color="success"
              variant="outlined"
              sx={{
                borderRadius: '20px',
                fontSize: '1rem',
                padding: '12px 24px',
                backgroundColor: '#e8f5e9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                mb: 1,
              }}
            />
          </Grid>
          <Grid item xs={6} sm={6} md={4}>
            <Typography variant="h6" style={{ textAlign: 'center' }}>Five Shares</Typography>
            <Chip
              icon={<GroupAdd />}
              label={`: ${data.fiveShare}`}
              color="warning"
              variant="outlined"
              sx={{
                borderRadius: '20px',
                fontSize: '1rem',
                padding: '12px 24px',
                backgroundColor: '#fff3e0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                mb: 1,
              }}
            />
          </Grid>
          {/* Row 3 */}
          <Grid item xs={6} sm={6} md={4}>
            <Typography variant="h6" style={{ textAlign: 'center' }}>Four Shares</Typography>
            <Chip
              icon={<GroupAdd />}
              label={`: ${data.fourShare}`}
              color="info"
              variant="outlined"
              sx={{
                borderRadius: '20px',
                fontSize: '1rem',
                padding: '12px 24px',
                backgroundColor: '#e1f5fe',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                mb: 1,
              }}
            />
          </Grid>
          <Grid item xs={6} sm={6} md={4}>
            <Typography variant="h6" style={{ textAlign: 'center' }}>One Share</Typography>
            <Chip
              icon={<GroupAdd />}
              label={`: ${data.oneShare}`}
              color="default"
              variant="outlined"
              sx={{
                borderRadius: '20px',
                fontSize: '1rem',
                padding: '12px 24px',
                backgroundColor: '#c8e6c9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                mb: 1,
              }}
            />
          </Grid>
        </Grid>

        {/* Charts Section */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h5">Occupancy Bar Chart</Typography>
                <Bar data={barData} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h5">Room Share Pie Chart</Typography>
                <Pie data={pieData} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h5">Monthly Occupancy Line Chart</Typography>
                <Line data={lineData} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h5">Occupancy Doughnut Chart</Typography>
                <Doughnut data={doughnutData} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h5">Facilities Radar Chart</Typography>
                <Radar data={radarData} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <BottomNavBar/>
    </div>
  );
};

export default Dashboard;
