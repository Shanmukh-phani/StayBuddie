import React, { useState, useEffect } from 'react';
import { AppBar,IconButton,Box, Typography, Grid, Card, CardContent, Avatar, Container } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import Sidebar from './sidebar';
import { Place as PlaceIcon } from '@mui/icons-material';


import img1 from './assets/img1.jpg';
import img2 from './assets/img2.jpg';
import img3 from './assets/img3.jpg';




const HeaderContainer = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    // justifyContent: 'flex-start',
    justifyContent: 'space-between',
    mb: 4,
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    padding: '14px 16px',
    // borderRadius: '4px',
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
    color: 'orange',
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


const StyledContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(4, 2),
  backgroundColor: '#f0f4f8',
  borderRadius: '8px',
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '2rem',
  fontWeight: 'bold',
  marginBottom: theme.spacing(3),
  color: '#006399',
}));

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(2),
  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
  borderRadius: theme.spacing(2),
  textAlign: 'center',
  backgroundColor: '#ffffff',
  border: '1px solid #e0e0e0',
}));

const IconAvatar = styled(Avatar)(({ theme }) => ({
  width: 50,
  height: 50,
  marginBottom: theme.spacing(2),
  backgroundColor: '#e0f7fa',
}));

const AboutUs = () => {

    useEffect(() => {
        // Check if a city is stored in local storage
        const storedCity = localStorage.getItem('selectedCity');
        if (storedCity) {
          setSelectedCity(storedCity);
        } else {
          // If no city is stored, open the location dialog
          setIsLocationDialogOpen(true);
        }
      }, []);
    
    
    
      const [open, setOpen] = useState(false);
    
      const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
    


  // Inside your component
  const navigate = useNavigate();

  const handleCityClick = (city) => {
    // Navigate to the hostels page with the city name as a query parameter
    navigate(`/hostels?city=${city.name}`);
  };



  const [selectedCity, setSelectedCity] = useState('');
  const [isLocationDialogOpen, setIsLocationDialogOpen] = useState(false);

  const handleLocationClick = () => {
    setIsLocationDialogOpen(true);
  };

  const handleLocationDialogClose = () => {
    setIsLocationDialogOpen(false);
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city);
  };

  const handleLocationConfirm = () => {
    // Store the selected city in local storage
    localStorage.setItem('selectedCity', selectedCity);
    setIsLocationDialogOpen(false);
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
        <IconButton color="inherit" onClick={handleLocationClick}>
          <PlaceIcon style={{ color: '#006399' }} />
          <Typography variant="h6" style={{ marginRight: '16px', color: '#333' }}>
            {selectedCity || 'Select City'}
          </Typography>
        </IconButton>
      </Box>
      <Box display="flex" alignItems="center">
        <StayText variant="h4" component="h1" style={{ color: '#006399' }}>
          Stay
        </StayText>
        <BuddieText variant="h4" component="h1" style={{ marginRight: '10px' }}>
          Buddie
        </BuddieText>
         <ProfileIcon onClick={handleProfileIconClick}>
                      {/* <img src={profileImage} alt="Profile" style={{ width: '100%', height: '100%' }} />  */}
        <Sidebar open={drawerOpen} onClose={handleDrawerClose} />

        </ProfileIcon> 
   
      </Box>

    </HeaderContainer>
  </AppBar>



    <StyledContainer maxWidth="lg" style={{marginTop:'60px'}}>
      <SectionTitle variant="h2" align="center">
        About Us
      </SectionTitle>

      <Typography variant="h6" align="center" paragraph>
        We provide software to hostels to streamline their management processes, allowing owners to focus on creating a comfortable and efficient environment for their residents.
      </Typography>

      <Grid container spacing={4} justifyContent="center" sx={{ marginTop: '20px' }}>
        <Grid item xs={12} md={4}>
          <StyledCard>
            <IconAvatar>
              <img src={img1} alt="Our Mission" />
            </IconAvatar>
            <Typography variant="h6" gutterBottom>
              Our Mission
            </Typography>
            <Typography variant="body2">
              To empower hostel owners with innovative software that simplifies management tasks and optimizes resources.
            </Typography>
          </StyledCard>
        </Grid>

        <Grid item xs={12} md={4}>
          <StyledCard>
            <IconAvatar>
              <img src={img2} alt="Our Vision" />
            </IconAvatar>
            <Typography variant="h6" gutterBottom>
              Our Vision
            </Typography>
            <Typography variant="body2">
              To be the global leader in hostel management solutions, known for our user-friendly interface and exceptional customer support.
            </Typography>
          </StyledCard>
        </Grid>

        <Grid item xs={12} md={4}>
          <StyledCard>
            <IconAvatar>
              <img src={img3} alt="Our Values" />
            </IconAvatar>
            <Typography variant="h6" gutterBottom>
              Our Values
            </Typography>
            <Typography variant="body2">
              Innovation, integrity, and customer satisfaction are at the heart of everything we do.
            </Typography>
          </StyledCard>
        </Grid>
      </Grid>

      <Box mt={6} textAlign="center" bgcolor="#e3f2fd" p={4} borderRadius="8px">
        <Typography variant="h4" color="primary" gutterBottom>
          Why Choose Us?
        </Typography>
        <Typography variant="body1" paragraph>
          Our software is designed specifically for hostel management, offering features like automated booking, resident management, financial tracking, and real-time reporting.
        </Typography>
        <Typography variant="body1">
          Join hundreds of hostel owners who have streamlined their operations and increased profitability with our software.
        </Typography>
      </Box>
    </StyledContainer>
    </div>
  );
};

export default AboutUs;
