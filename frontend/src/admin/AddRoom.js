
import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField,
  Grid, Card, CardContent, Typography, IconButton, InputAdornment,
  Chip
} from '@mui/material';
import BottomNavBar from './BottomNavBar';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import { DoorBack, HomeWork, People } from '@mui/icons-material';
import { Skeleton } from '@mui/material';

import { List, ListItem, ListItemText } from '@mui/material';
import profileImage from '../assets/buddie.jpg';
import { styled } from '@mui/system';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

import ConfirmDialog from './ConfirmDelete'; // Adjust the path as necessary
import notFound from '../assets/notFound.png';




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



const RoomManagement = () => {

  // Add a validation function
  const validateRoomData = () => {
    if (roomData.room_vacancy > roomData.room_sharing) {
      toast.error('Room vacancy cannot be less than room sharing!');
      return false;
    }
    return true;
  };

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState(null);

  // Function to handle open dialog for deletion
  const openConfirmDialog = (roomId) => {
    setSelectedRoomId(roomId);
    setDialogOpen(true);
  };


  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [roomData, setRoomData] = useState({ room_number: '', room_sharing: '', room_vacancy: '' });
  const [editRoomData, setEditRoomData] = useState(null);




  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleEditClose = () => setEditOpen(false);
  const handleEdit = (room) => {
    setEditRoomData(room);
    setEditOpen(true);
  };




  const handleChange = (e) => {
    setRoomData({ ...roomData, [e.target.name]: e.target.value });
  };



  const getRooms = async () => {

    setLoading(true); // Set loading state to true before fetching
  
    try {
      const hostel_id = localStorage.getItem('hostel_id');
      const token = localStorage.getItem('authToken');
  
      if (!hostel_id || !process.env.REACT_APP_URL) {
        toast.error('No hostel_id found.');
      }
      
      const response = await axios.get(`${process.env.REACT_APP_URL}/admin/rooms`, {
        params: { hostel_id },
        headers: {
          'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
        },
      });
  
      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const roomsData = response.data;
      setRooms(roomsData); // Update the state with the fetched rooms
    } catch (error) {
      console.error('Error fetching rooms:', error);
    } finally {
      setLoading(false); // Set loading state to false after fetching
    }
  };
  
  useEffect(() => {
    getRooms();
  }, []);
    

  

  // Filtered rooms based on search term
  const filteredRooms = rooms.filter(room => {
    const searchLower = search.toLowerCase();
    const roomNumber = String(room.room_number).toLowerCase();
    const roomVacancy = String(room.room_vacancy).toLowerCase();

    return roomNumber.includes(searchLower) || roomVacancy.includes(searchLower);
  });






  const handleSubmit = async () => {
    if (!validateRoomData()) return;

    try {
      const hostel_id = localStorage.getItem('hostel_id'); // Retrieve hostel_id from local storage
      const token = localStorage.getItem('authToken'); // Retrieve token from local storage

      if (!hostel_id) {
        toast.error('No hostel_id found.');
        return;
      }

      // Validate room data
      if (!roomData.room_number || !roomData.room_sharing || !roomData.room_vacancy) {
        toast.error('Incomplete room data.');
        return;
      }

      console.log('Sending data:', { ...roomData, hostel_id });

      // Send POST request to add a new room
      const response = await fetch(`${process.env.REACT_APP_URL}/admin/addRoom`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Include the token in the Authorization header
        },
        body: JSON.stringify({ ...roomData, hostel_id }),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        toast.error(`Error: ${errorResponse.message || 'An error occurred'}`);
        throw new Error(`HTTP error! status: ${response.status} - ${errorResponse.message || 'An error occurred'}`);
      }

      const newRoom = await response.json();
      console.log('New room added:', newRoom);

      // Update the rooms state with the new room
      setRooms((prevRooms) => [...prevRooms, { ...roomData, _id: newRoom._id }]);

      // Reset the form data
      setRoomData({
        room_number: '',
        room_sharing: '',
        room_vacancy: '',
      });

      handleClose(); // Close the modal or form after adding the room

      // Show success toast message
      toast.success('Room added successfully.');

    } catch (error) {
      console.error('Error adding room:', error);
    }
  };




  // Fetch rooms when the component mounts
  useEffect(() => {
    getRooms();
  }, []);




  const validateEditRoomData = () => {
    if (editRoomData.room_vacancy > editRoomData.room_sharing) {
      toast.error('Room vacancy cannot be less than room sharing!');
      return false;
    }
    return true;
  };



const handleEditSubmit = async () => {
  if (!validateEditRoomData()) return; // Prevent submission if validation fails

  try {
    const hostel_id = localStorage.getItem('hostel_id'); // Retrieve hostel_id from local storage
    const token = localStorage.getItem('authToken'); // Retrieve token from local storage

    if (!hostel_id) {
      toast.error('No hostel_id found.');
      return;
    }

    console.log('Sending data:', editRoomData);

    // Send PUT request to update a room
    const response = await axios.put(
      `${process.env.REACT_APP_URL}/admin/updateRoom/${editRoomData._id}`,
      { ...editRoomData, hostel_id }, // Include hostel_id in the request body
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
        },
      }
    );

    // Check if response status is OK
    if (response.status === 200) {
      const updatedRoom = response.data;
      toast.success('Room updated successfully!');

      // Update the rooms state with the updated room
      setRooms((prevRooms) =>
        prevRooms.map((room) => (room._id === updatedRoom._id ? updatedRoom : room))
      );

      // Reset edit room data and close edit form
      setEditRoomData(null);
      setEditOpen(false);
    } else {
      // Handle different response statuses if needed
      const message = response.data.message || 'An error occurred';
      toast.error(`Error: ${message}`);
      throw new Error(`HTTP error! status: ${response.status} - ${message}`);
    }
  } catch (error) {
    // Display error message from the catch block
    toast.error(`Error updating room: ${error.response?.data?.message || error.message || 'An error occurred'}`);
    console.error('Error updating room:', error);
  }
};






const handleDelete = async () => {
  const token = localStorage.getItem('authToken');
  const hostelId = localStorage.getItem('hostel_id');

  if (!token || !hostelId) {
    toast.error('Authentication failed. Please log in again.');
    return;
  }

  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_URL}/admin/deleteRoom/${selectedRoomId}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
          'Content-Type': 'application/json',
        },
        data: {
          hostel_id: hostelId, // Include hostel_id in the request body for verification
        },
      }
    );

    if (response.status === 200) {
      toast.success('Room deleted successfully!');
      // Optionally, update the state to remove the deleted room
      setRooms(prevRooms => prevRooms.filter(room => room._id !== selectedRoomId));
    } else {
      toast.error(`Error: ${response.data.message || 'An error occurred'}`);
    }
  } catch (error) {
    console.error('Error deleting room:', error);
    toast.error('Failed to delete the room. Please try again.');
  }
};





  const [selectedCity, setSelectedCity] = useState('');
  const [isLocationDialogOpen, setIsLocationDialogOpen] = useState(false);

  // const handleLocationClick = () => {
  //   setIsLocationDialogOpen(true);
  // };

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



  return (
    <div style={{ marginTop: '80px' }}>
      <Box>

        <>
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

          <Dialog open={isLocationDialogOpen} onClose={handleLocationDialogClose} fullWidth={true} maxWidth="sm">
            <DialogTitle>Select a City</DialogTitle>
            <DialogContent>
              <List>
                <ListItem button selected={selectedCity === 'Hyderabad'} onClick={() => handleCitySelect('Hyderabad')}>
                  <ListItemText primary="Hyderabad" />
                </ListItem>
                <ListItem button selected={selectedCity === 'Mumbai'} onClick={() => handleCitySelect('Mumbai')}>
                  <ListItemText primary="Mumbai" />
                </ListItem>
                <ListItem button selected={selectedCity === 'Chennai'} onClick={() => handleCitySelect('Chennai')}>
                  <ListItemText primary="Chennai" />
                </ListItem>
              </List>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleLocationDialogClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleLocationConfirm} color="primary">
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </>
        <Button variant="contained" onClick={handleOpen} style={{ backgroundColor: 'orange', color: 'white', fontWeight: 'bold', float: 'right', margin: '30px' }}>
          Add New Room
        </Button>




        {/* Search Bar */}
        <Box padding={2}>
          <TextField
            fullWidth
            label="Search Rooms"
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Room Cards */}
        <Box padding={2} display="flex" flexDirection="column" gap={2} mb={6}>



        {loading ? (
  Array.from(new Array(5)).map((_, index) => (
    <Card
      key={index}
      variant="outlined"
      sx={{ display: 'flex', justifyContent: 'space-between', padding: 2, alignItems: 'center', boxShadow: 3, borderRadius: 2 }}
    >
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Skeleton variant="text" width={100} height={20} />
        <Skeleton variant="text" width={80} height={20} />
        <Skeleton variant="text" width={80} height={20} />
      </CardContent>
      <Box display="flex" flexDirection="column" justifyContent="center">
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton disabled sx={{ backgroundColor: '#F57C00', color: 'white' }}>
            <EditIcon />
          </IconButton>
          <IconButton disabled sx={{ backgroundColor: '#D32F2F', color: 'white' }}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>
    </Card>
  ))
) : filteredRooms.length > 0 ? (
  filteredRooms.map((room) => (
    <Card
      key={room._id}
      variant="outlined"
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: 2,
        alignItems: 'center',
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Chip
          icon={<DoorBack />}
          label={`Room ${room.room_number}`}
          variant="outlined"
          color="primary"
          sx={{ fontSize: '0.875rem', fontWeight: 'bold' }}
        />
        <Box display="flex" alignItems="center" gap={1}>
          <People color="action" />
          <Typography variant="body2">Sharing: {room.room_sharing}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={1}>
          <HomeWork color="action" />
          <Typography variant="body2">Vacancy: {room.room_vacancy}</Typography>
        </Box>
      </CardContent>
      <Box display="flex" flexDirection="column" justifyContent="center">
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton
            onClick={() => handleEdit(room)}
            sx={{
              backgroundColor: '#F57C00',
              color: 'white',
              '&:hover': { backgroundColor: '#FFB300' },
              boxShadow: 1,
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => openConfirmDialog(room._id)}
            sx={{
              backgroundColor: '#D32F2F',
              color: 'white',
              '&:hover': { backgroundColor: '#E57373' },
              boxShadow: 1,
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>
    </Card>
  ))
) : (
  <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" padding={4}>
    <img src={notFound} alt="No Rooms Found" style={{ width: '350px', height: '350px', marginBottom: '16px' }} />
    <Typography variant="h6" color="textSecondary">No Rooms Found</Typography>
  </Box>
)}

{/* E3D292 */}
         
         
         
         </Box>





        {/* Dialog for adding a new room */}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add New Room</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Room Number"
                  name="room_number"
                  value={roomData.room_number}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Room Sharing"
                  name="room_sharing"
                  value={roomData.room_sharing}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Room Vacancy"
                  name="room_vacancy"
                  type="number"
                  value={roomData.room_vacancy}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleSubmit} color="primary">
              Add Room
            </Button>
          </DialogActions>
        </Dialog>
      </Box>




      <Dialog open={editOpen} onClose={handleEditClose}>
        <DialogTitle>Edit Room Details</DialogTitle>
        <DialogContent>
          {editRoomData && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Room Number"
                  name="room_number"
                  value={editRoomData.room_number}
                  onChange={(e) => setEditRoomData({ ...editRoomData, room_number: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Room Sharing"
                  name="room_sharing"
                  value={editRoomData.room_sharing}
                  onChange={(e) => setEditRoomData({ ...editRoomData, room_sharing: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Room Vacancy"
                  name="room_vacancy"
                  type="number"
                  value={editRoomData.room_vacancy}
                  onChange={(e) => setEditRoomData({ ...editRoomData, room_vacancy: e.target.value })}
                />
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} color="secondary">Cancel</Button>
          <Button onClick={handleEditSubmit} color="primary">Save Changes</Button>
        </DialogActions>
      </Dialog>




      <BottomNavBar />
            {/* Confirmation Dialog */}
            <ConfirmDialog
        open={isDialogOpen}
        onClose={() => setDialogOpen(false)}
        onConfirm={handleDelete}
      />
      <ToastContainer />
    </div>
  );
};

export default RoomManagement;
