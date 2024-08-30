import React, { useState, useEffect } from 'react';
import { AppBar,IconButton,Box,CircularProgress, Typography, Avatar, Card, CardContent, Grid, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Chip } from '@mui/material';
import { LocationOn, Wifi, Restaurant, LocalLaundryService, LocalParking } from '@mui/icons-material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper ,useTheme} from '@mui/material';

import img1 from './../assets/hostel1.jpg';
// Import a Map component or use a map API here
// Example: import Map from './MapComponent'; 
import profileImage from '../assets/buddie.jpg';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import BottomNavBar from './BottomNavBar';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



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



const HostelProfile = () => {

  const IP_ADDRESS='http://192.168.1.2:5000';

  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleEditOpen = () => {
    setIsEditOpen(true);
  };

  const handleEditClose = () => {
    setIsEditOpen(false);
  };

  
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true); // Set loading state to true initially
  const [error, setError] = useState(null);

  const getProfile = async () => {
    setLoading(true); // Set loading state to true before fetching
    setError(null); // Clear any previous errors

    try {
      const hostel_id = localStorage.getItem('hostel_id');
      const token = localStorage.getItem('authToken');

      if (!hostel_id || !token) {
        toast.error('No hostel_id or token found.');
        setError('No hostel_id or token found.');
        return;
      }

      const response = await axios.get(`${IP_ADDRESS}/admin/hostelProfile`, {
        params: { hostel_id },
        headers: {
          'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
        },
      });

      if (response.status === 200) {
        setProfile(response.data); // Update the state with the fetched profile
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error('Failed to fetch profile. Please try again.');
      setError('Failed to fetch profile. Please try again.');
    } finally {
      setLoading(false); // Set loading state to false after fetching
    }
  };

  useEffect(() => {
    getProfile(); // Fetch profile data on component mount
  }, []);

  const theme = useTheme();




  

  return (
<div>
    <Box>
      {/* Top Background with Hostel Image */}
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
      <ProfileIcon>
        <img src={profileImage} alt="Profile" style={{ width: '100%', height: '100%' }} />
      </ProfileIcon>
    </HeaderContainer>
  </AppBar>

      <Box sx={{ 
        position: 'relative', 
        height: '300px', 
        backgroundImage: `url(${img1})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        {/* Circular Owner Image */}
        <Avatar 
          alt="Owner Name" 
          src={img1}
          sx={{ 
            width: 100, 
            height: 100, 
            position: 'absolute', 
            bottom: '-50px', 
            left: '20px', 
            border: '4px solid white' 
          }} 
        />
      </Box>
      

      
      {profile && (
    <Box sx={{ padding: '60px 20px 20px' }}>
  
    
        <Typography variant="h4" component="div">
          {profile.hostel_name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Since {profile.hostel_year}
        </Typography>
        <Box display="flex" alignItems="center" sx={{ mt: 1 }}>
          <LocationOn fontSize="small" sx={{ mr: 1 }} />
          <Typography variant="body2">
            {profile.hostel_area}, {profile.hostel_city}, {profile.hostel_pin_code}
          </Typography>
        </Box>
        
        {/* Hostel Message */}
        <Typography variant="body1" sx={{ mt: 2 }}>
         {profile.hostel_message}
        </Typography>
    </Box>
       )}
      
       {/* <Box sx={{ padding: '20px' }}>
        <Typography variant="h6" gutterBottom>
          Location Map
        </Typography>
     
        <Box sx={{ height: '300px', backgroundColor: '#e0e0e0', borderRadius: '8px' }}>
        </Box>
      </Box> */}
<Box sx={{ padding: '20px' }}>
  <Typography variant="h6" gutterBottom>
    Facilities
  </Typography>
  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
    {profile && profile.hostel_facilities && profile.hostel_facilities.length > 0 ? (
      profile.hostel_facilities.map((facility, index) => (
        <Chip 
          key={index} 
          label={facility} 
          sx={{
            borderRadius: '16px', // Round the corners of the chip
            padding: '4px 8px', // Adjust padding
            backgroundColor: '#f0f0f0', // Background color for chips
            color: '#333', // Text color for chips
            fontWeight: 'bold', // Text boldness
            border: '1px solid #dcdcdc', // Border color for chips
          }} 
        />
      ))
    ) : (
      <Typography variant="body1" color="textSecondary">
        No facilities available
      </Typography>
    )}
  </Box>


  <Typography variant="h6" gutterBottom style={{marginTop:'30px'}}>
        Sharing Prices
      </Typography>
      <TableContainer component={Paper} sx={{ boxShadow: 3 }} >
        <Table >
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: theme.palette.primary.main, color: '#fff' }}>
                Share Type
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: theme.palette.primary.main, color: '#fff' }}>
                Price
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {profile && profile.sharing_prices && profile.sharing_prices.length > 0 ? (
              profile.sharing_prices.map((price, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}>
                    {price.share_type}
                  </TableCell>
                  <TableCell sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}>
                    {price.price}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2} align="center" sx={{ padding: '16px' }}>
                  No sharing prices available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      </Box>


      {/* Edit Profile Button at Bottom */}
      <Box sx={{ padding: '20px', display: 'flex', justifyContent: 'center' }} mb={6}>
        <Button variant="contained" color="primary" onClick={handleEditOpen}>
          Edit Profile
        </Button>
      </Box>







      {/* Edit Profile Dialog */}
      <Dialog open={isEditOpen} onClose={handleEditClose}>
        <DialogTitle>Edit Hostel Profile</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Hostel Name"
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Since"
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Location"
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Facilities"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} color="primary">
            Save
          </Button>
          <Button onClick={handleEditClose} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
    <BottomNavBar/>
    </div>
  );
};

export default HostelProfile;
