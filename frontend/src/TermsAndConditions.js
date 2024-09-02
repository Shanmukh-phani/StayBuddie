import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Paper, Divider } from '@mui/material';
import { AppBar,IconButton,Grid, Card, CardContent, Avatar } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import Sidebar from './sidebar';
import { Place as PlaceIcon } from '@mui/icons-material';


import img1 from './assets/img1.jpg';
import img2 from './assets/img2.jpg';
import img3 from './assets/img3.jpg';





const StyledContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: '#f9f9f9',
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: '#ffffff',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Default shadow
  borderRadius: theme.shape.borderRadius,
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 'bold',
  marginBottom: theme.spacing(3),
  color: '#006399',
}));




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


const TermsAndConditions = () => {



  const termsAndConditions = `
  1. **Acceptance of Terms**: By accessing and using our software, you agree to comply with and be bound by these terms and conditions. If you disagree with any part of the terms, you may not use our services.

  2. **User Responsibilities**: Users are responsible for maintaining the confidentiality of their account credentials and for all activities that occur under their account.

  3. **Service Availability**: We strive to ensure the software is available 24/7; however, we do not guarantee uninterrupted access and reserve the right to suspend the service for maintenance or updates.

  4. **Data Privacy**: We are committed to protecting your personal information. All data collected is used solely for providing and improving our services, in accordance with our Privacy Policy.

  5. **Subscription & Payment**: Access to certain features of the software may require a subscription. Users agree to provide accurate payment information and comply with the payment terms.

  6. **Cancellation & Refunds**: Users may cancel their subscription at any time. Refunds will be issued only in accordance with our refund policy.

  7. **Intellectual Property**: All content and software provided by us are protected by intellectual property laws. Users are prohibited from copying, distributing, or creating derivative works without our permission.

  8. **Limitation of Liability**: We are not liable for any indirect, incidental, or consequential damages arising from the use of our software.

  9. **Amendments**: We reserve the right to modify these terms at any time. Users will be notified of significant changes, and continued use of the service constitutes acceptance of the new terms.

  10. **Governing Law**: These terms are governed by and construed in accordance with the laws of the relevant jurisdiction.
  `;





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

    <StyledContainer maxWidth="md" style={{marginTop:'60px'}}>
      <StyledPaper>
        <SectionTitle variant="h4" gutterBottom>
          Terms & Conditions
        </SectionTitle>
        <Divider sx={{ mb: 3 }} />
        <Typography variant="body1">
          {termsAndConditions.split('\n').map((line, index) => (
            <React.Fragment key={index}>
              {line.trim()}
              <br />
            </React.Fragment>
          ))}
        </Typography>
      </StyledPaper>
    </StyledContainer>
    </div>
  );
};

export default TermsAndConditions;
