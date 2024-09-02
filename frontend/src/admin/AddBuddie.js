import React, { useEffect, useState } from 'react';
import {
  AppBar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField,
  Grid, Card, Typography, IconButton, InputAdornment, Chip,
  Autocomplete
} from '@mui/material';
import {
  MenuItem, Select, InputLabel, FormControl
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Phone as PhoneIcon } from '@mui/icons-material';
import profileImage from '../assets/hostel1.jpg'; // Replace with your "No Buddies Found" image
import notFound from '../assets/notFound.png';
import { styled } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';
import BottomNavBar from './BottomNavBar';
import { toast } from 'react-toastify';
import axios from 'axios';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import toastify styles

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import ConfirmDialog from './ConfirmDelete'; // Adjust the path as necessary
import Skeleton from '@mui/material/Skeleton';




const HeaderContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  mb: 4,
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

const AddBuddie = () => {



  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const [buddies, setBuddies] = useState([]);




  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedBuddieId, setSelectedBuddieId] = useState(null);

  // Function to handle open dialog for deletion
  const openConfirmDialog = (buddieId) => {
    setSelectedBuddieId(buddieId);
    setDialogOpen(true);
  };






  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteBuddieId, setDeleteBuddieId] = useState(null);
  const [search, setSearch] = useState('');
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    buddie_name: '',
    buddie_dob: '',
    buddie_gender: '',
    buddie_contact: '',
    buddie_email: '',
    buddie_profession: '',
    buddie_guardian_name: '',
    buddie_emergency_contact: '',
    buddie_id_proof: null,
    buddie_bike_no: '',
    buddie_photo: null,
    buddie_password: '',
    buddie_confirm_password: '',
    room_no: '' // Add room_no here
  });
  const [editFormData, setEditFormData] = useState(null);


  const [errors, setErrors] = useState({});



  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleEditClose = () => setEditOpen(false);
  const handleEdit = (buddie) => {
    setEditFormData(buddie);
    setEditOpen(true);
  };












  // Function to fetch buddies
  const getBuddies = async () => {
    setLoading(true); // Set loading to true before fetching

    try {
      // Retrieve hostel_id and token from local storage
      const hostel_id = localStorage.getItem('hostel_id');
      const token = localStorage.getItem('authToken');

      // Check if token and hostel_id are available
      if (!token || !hostel_id) {
        console.error('No token or hostel_id found.');
        toast.error('Authentication failed. Please log in again.');
        return;
      }

      // Fetch buddies from API
      const response = await fetch(`${process.env.REACT_APP_URL}/admin/buddies?hostel_id=${hostel_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
        },
      });

      // Handle non-2xx responses
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(`HTTP error! Status: ${response.status} - ${errorResponse.message || 'An error occurred'}`);
      }

      // Parse and set the fetched buddies
      const buddieData = await response.json();
      setBuddies(buddieData); // Update the state with the fetched buddies

    } catch (error) {
      console.error('Error fetching buddies:', error);
      toast.error('Failed to fetch buddies. Please try again.');
    } finally {
      setLoading(false); // Always set loading to false after completion
    }
  };

  // Fetch buddies when the component mounts
  useEffect(() => {
    getBuddies();
  }, []);




  // Function to fetch rooms
  const getRooms = async () => {

    try {
      const hostel_id = localStorage.getItem('hostel_id'); // authToken is your hostel_id
      const token = localStorage.getItem('authToken'); // authToken is your hostel_id

      const response = await fetch(`${process.env.REACT_APP_URL}/admin/rooms?hostel_id=${hostel_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const roomsData = await response.json();
      setRooms(roomsData); // Update the state with the fetched rooms
    } catch (error) {
      console.error('Error fetching rooms:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch rooms when the component mounts
  useEffect(() => {
    getRooms();
  }, []);






  const validateField = (name, value) => {
    switch (name) {
      case 'buddie_contact':
        if (!/^\d{10}$/.test(value)) {
          return 'Phone number must be 10 digits.';
        }
        break;
      case 'buddie_email':
        if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return 'Invalid email address.';
        }
        break;
      case 'buddie_name':
        if (!value) {
          return 'Name is required.';
        }
        break;
      case 'buddie_password':
        if (!value) {
          return 'Password is required.';
        }
        break;
      case 'buddie_confirm_password':
        if (value !== formData.buddie_password) {
          return 'Passwords do not match.';
        }
        break;
      case 'buddie_id_proof':
        if (!value) {
          return 'ID Proof is required.';
        }
        break;
      case 'room_no':
        if (!value) {
          return 'Room number is required.';
        }
        break;
      default:
        return '';
    }
  };





  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    const errorMsg = validateField(name, value);
    setErrors({ ...errors, [name]: errorMsg });

  };



  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({ ...prevData, [name]: reader.result.split(',')[1] }));
      };
      reader.readAsDataURL(file);
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: null }));
    }

    const errorMsg = validateField(name, file ? file.name : '');
    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMsg }));
  };





  const handleEditFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditFormData((prevData) => ({ ...prevData, [name]: reader.result.split(',')[1] }));
      };
      reader.readAsDataURL(file);
    } else {
      setEditFormData((prevData) => ({ ...prevData, [name]: null }));
    }

    const errorMsg = validateField(name, file ? file.name : '');
    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMsg }));
  };





  const handleAddBuddie = async () => {
    let isValid = true;
    const newErrors = {};
  
    // Validate each field
    Object.keys(formData).forEach((key) => {
      const errorMsg = validateField(key, formData[key]);
      if (errorMsg) {
        isValid = false;
        newErrors[key] = errorMsg;
      }
    });
    setErrors(newErrors);
  
    if (isValid) {
      try {
        const hostelId = localStorage.getItem('hostel_id'); // Retrieve hostel_id from local storage
        const token = localStorage.getItem('authToken'); // Retrieve token from local storage
  
        if (!hostelId || !token) {
          throw new Error('Missing hostel_id or token.');
        }
  
        // Prepare the data to send, including hostel_id
        const dataToSend = { ...formData, hostel_id: hostelId };
  
        // Send POST request to add a new buddie
        const response = await axios.post(`${process.env.REACT_APP_URL}/admin/addBuddie`, dataToSend, {
          headers: {
            'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
            'Content-Type': 'application/json',
          },
        });
  
        // Update the state with the new buddie
        setBuddies((prevBuddies) => [...prevBuddies, response.data]);
        toast.success('Buddie added successfully!');
        setOpen(false); // Close the modal or form
      } catch (error) {
        console.error('Error adding buddie:', error);
        
        // Check if error response exists and contains a message
        if (error.response && error.response.data && error.response.data.message) {
          toast.error(`Failed to add the buddie: ${error.response.data.message}`);
        } else {
          toast.error('Failed to add the buddie. Please try again.');
        }
      }
    } else {
      toast.error('Please correct the highlighted errors.');
    }
  };
  



  const handleEditSubmit = async () => {
    let isValid = true;
    const newErrors = {};
  
    // Validate each field
    Object.keys(editFormData).forEach((key) => {
      const errorMsg = validateField(key, editFormData[key]);
      if (errorMsg) {
        isValid = false;
        newErrors[key] = errorMsg;
      }
    });
    setErrors(newErrors);
  
    if (isValid) {
      try {
        const hostelId = localStorage.getItem('hostel_id'); // Retrieve hostel_id from local storage
        const token = localStorage.getItem('authToken'); // Retrieve token from local storage
  
        if (!hostelId || !token) {
          throw new Error('Missing hostel_id or token.');
        }
  
        // Prepare the data to send, including hostel_id
        const dataToSend = { ...editFormData, hostel_id: hostelId };
  
        // Send PUT request to update a buddie
        const response = await axios.put(
          `${process.env.REACT_APP_URL}/admin/updateBuddie/${editFormData._id}`,
          dataToSend,
          {
            headers: {
              'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
              'Content-Type': 'application/json',
            },
          }
        );
  
        // Update the state with the updated buddie
        setBuddies(prevBuddies =>
          prevBuddies.map(buddie => buddie._id === editFormData._id ? response.data : buddie)
        );
        toast.success('Buddie updated successfully!');
        setEditFormData(null);
        setEditOpen(false);
      } catch (error) {
        console.error('Error updating buddie:', error);
        toast.error(error.response?.data?.message || 'Failed to update the buddie. Please try again.');
      }
    } else {
      toast.error('Please correct the highlighted errors.');
    }
  };



// Function to handle the actual deletion
const handleDelete = async () => {
  const token = localStorage.getItem('authToken');
  const hostelId = localStorage.getItem('hostel_id');

  if (!token || !hostelId) {
    toast.error('Authentication failed. Please log in again.');
    return;
  }

  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_URL}/admin/deleteBuddie/${selectedBuddieId}`,
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
      toast.success('Buddie deleted successfully!');
      // Optionally, update the state to remove the deleted buddie
      setBuddies(prevBuddies => prevBuddies.filter(buddie => buddie._id !== selectedBuddieId));
    } else {
      toast.error(`Error: ${response.data.message || 'An error occurred'}`);
    }
  } catch (error) {
    console.error('Error deleting buddie:', error);
    toast.error('Failed to delete the buddie. Please try again.');
  }
};

  

  const [selectedRoomNo, setSelectedRoomNo] = useState('');




  const filteredBuddies = buddies.filter(buddie =>
    buddie.buddie_name.toLowerCase().includes(search.toLowerCase()) ||
    buddie.buddie_contact.includes(search)
  );


  return (
    <div style={{ marginTop: '80px' }}>
      <Box>
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

        <Button
          variant="contained"
          onClick={handleOpen}
          style={{ backgroundColor: 'orange', color: 'white', fontWeight: 'bold', float: 'right', margin: '30px' }}
        >
          Add New Buddie
        </Button>

        {/* Search Bar */}
        <Box padding={2}>
          <TextField
            fullWidth
            label="Search Buddies"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
          />
        </Box>






{loading ? ( // Check if the data is still loading
  <Box padding={2} display="flex" flexDirection="column" gap={2} mb={6}>
    <Grid container spacing={2}>
      {[...Array(6)].map((_, index) => ( // Number of skeleton items to show
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card
            variant="outlined"
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: 2,
              backgroundColor: '#fff',
              borderRadius: 2,
            }}
          >
            {/* Skeleton for Buddie Details */}
            <Box display="flex" alignItems="center" gap={2}>
              <Skeleton variant="circular" width={60} height={60} />
              <Box display="flex" flexDirection="column">
                <Skeleton variant="text" width={150} height={30} />
                <Skeleton variant="text" width={120} height={20} />
                <Skeleton variant="text" width={100} height={20} />
              </Box>
            </Box>

            {/* Skeleton for Actions */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Skeleton variant="circular" width={40} height={40} />
              <Skeleton variant="circular" width={40} height={40} />
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Box>
) : (
  filteredBuddies.length > 0 ? (
    <Box padding={2} display="flex" flexDirection="column" gap={2} mb={6}>
      <Grid container spacing={2}>
        {filteredBuddies.map((buddie) => (
          <Grid item xs={12} sm={6} md={4} key={buddie._id}>
            <Card
              variant="outlined"
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: 2,
                backgroundColor: '#fff',
                borderRadius: 2,
              }}
            >
              {/* Buddie Details */}
              <Box display="flex" alignItems="center" gap={2}>
                <img
                  src={buddie.buddie_photo ? `data:image/jpeg;base64,${buddie.buddie_photo}` : profileImage}
                  alt="Buddie"
                  style={{ width: '60px', height: '60px', borderRadius: '50%' }}
                  onError={(e) => {
                    console.error('Error loading image:', e);
                    e.target.src = profileImage; // Fallback to default image
                  }}
                />
                <Box display="flex" flexDirection="column">
                  <Typography variant="h6" color="textPrimary">
                    {buddie.buddie_name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <PhoneIcon fontSize="small" /> {buddie.buddie_contact}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {`Room: ${buddie.room_no}`}
                  </Typography>
                </Box>
              </Box>

              {/* Actions */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton color="primary" onClick={() => handleEdit(buddie)}>
                  <EditIcon />
                </IconButton>
                <IconButton color="secondary" onClick={() => openConfirmDialog(buddie._id)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  ) : (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" padding={4}>
    <img src={notFound} alt="No Rooms Found" style={{ width: '350px', height: '350px', marginBottom: '16px' }} />
    <Typography variant="h6" color="textSecondary">No Buddies Found</Typography>
    </Box>
  )
)}







        {/* Form Dialog */}
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
          <DialogTitle>Add New Buddie</DialogTitle>
          <DialogContent>
            {step === 1 && (
              <>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="buddie_name"
                      label="Buddie Name"
                      value={formData.buddie_name}
                      onChange={handleChange}
                      error={!!errors.buddie_name}
                      helperText={errors.buddie_name}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="buddie_dob"
                      label="Date of Birth"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      value={formData.buddie_dob}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>Gender</InputLabel>
                      <Select
                        name="buddie_gender"
                        value={formData.buddie_gender}
                        onChange={handleChange}
                      >
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="buddie_contact"
                      label="Contact Number"
                      value={formData.buddie_contact}
                      onChange={handleChange}
                      error={!!errors.buddie_contact}
                      helperText={errors.buddie_contact}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="buddie_email"
                      label="Email Address"
                      value={formData.buddie_email}
                      onChange={handleChange}
                      error={!!errors.buddie_email}
                      helperText={errors.buddie_email}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel id="buddie-profession-label">Profession</InputLabel>
                      <Select
                        labelId="buddie-profession-label"
                        name="buddie_profession"
                        value={formData.buddie_profession}
                        onChange={handleChange}
                        label="Profession"
                      >
                        <MenuItem value="Work">Work</MenuItem>
                        <MenuItem value="Student">Student</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <Box display="flex" justifyContent="space-between" marginTop={2}>
                  <Button onClick={() => setStep(2)} variant="contained" color="primary">
                    Next
                  </Button>
                </Box>
              </>
            )}
            {step === 2 && (
              <>
                <Grid container spacing={2}>

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <Autocomplete
                        options={rooms} // Array of room objects
                        getOptionLabel={(option) => option.room_number} // Displayed option label
                        value={rooms.find((room) => room.room_number === selectedRoomNo) || null} // Correctly set value
                        onChange={(event, newValue) => {
                          setSelectedRoomNo(newValue ? newValue.room_number : '');
                          setFormData((prevData) => ({
                            ...prevData,
                            room_no: newValue ? newValue.room_number : '' // Update formData with selected room number
                          }));
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Room Number"
                            variant="outlined"
                            fullWidth
                          />
                        )}
                        isOptionEqualToValue={(option, value) => option.room_number === value.room_number} // Correctly compare options
                      />
                    </FormControl>
                  </Grid>



                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="buddie_guardian_name"
                      label="Guardian Name"
                      value={formData.buddie_guardian_name}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="buddie_emergency_contact"
                      label="Emergency Contact"
                      value={formData.buddie_emergency_contact}
                      onChange={handleChange}
                      error={!!errors.buddie_emergency_contact}
                      helperText={errors.buddie_emergency_contact}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="buddie-photo-upload"
                        type="file"
                        name="buddie_photo"
                        onChange={handleFileChange}
                      />
                      <label htmlFor="buddie-photo-upload">
                        <Button variant="contained" component="span">
                          Upload Photo
                        </Button>
                        {formData.buddie_photo && (
                          <Chip
                            label={formData.buddie_photo.name}
                            onDelete={() => setFormData({ ...formData, buddie_photo: null })}
                            style={{ marginLeft: '10px' }}
                          />
                        )}
                      </label>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="buddie_bike_no"
                      label="Bike Number"
                      value={formData.buddie_bike_no}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="buddie-id-proof-upload"
                        type="file"
                        name="buddie_id_proof"
                        onChange={handleFileChange}
                      />
                      <label htmlFor="buddie-id-proof-upload">
                        <Button variant="contained" component="span">
                          Upload ID Proof
                        </Button>
                        {formData.buddie_id_proof && (
                          <Chip
                            label={formData.buddie_id_proof.name}
                            onDelete={() => setFormData({ ...formData, buddie_id_proof: null })}
                            style={{ marginLeft: '10px' }}
                          />
                        )}
                      </label>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="buddie_password"
                      label="Password"
                      type="password"
                      value={formData.buddie_password}
                      onChange={handleChange}
                      error={!!errors.buddie_password}
                      helperText={errors.buddie_password}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="buddie_confirm_password"
                      label="Confirm Password"
                      type="password"
                      value={formData.buddie_confirm_password}
                      onChange={handleChange}
                      error={!!errors.buddie_confirm_password}
                      helperText={errors.buddie_confirm_password}
                    />
                  </Grid>
                </Grid>
                <Box display="flex" justifyContent="space-between" marginTop={2}>
                  <Button onClick={() => setStep(1)} variant="outlined" color="primary">
                    Back
                  </Button>
                  {/* <Button onClick={handleAddBuddie} variant="contained" color="primary">
                    Submit
                  </Button> */}
                  <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleAddBuddie}>Submit</Button>
                  </DialogActions>

                </Box>
              </>
            )}
          </DialogContent>
        </Dialog>








        {/* ==================================================================================================================== */}


        {/* Form Dialog */}
        <Dialog open={editOpen} onClose={handleEditClose} maxWidth="md" fullWidth>
          <DialogTitle>Update Buddie</DialogTitle>
          <DialogContent>
            {step === 1 && (
              <>
                {editFormData && (
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        name="buddie_name"
                        label="Buddie Name"
                        value={editFormData.buddie_name}
                        onChange={(e) => setEditFormData({ ...editFormData, buddie_name: e.target.value })}  
                        error={!!errors.buddie_name}
                        helperText={errors.buddie_name}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        name="buddie_contact"
                        label="Contact Number"
                        value={editFormData.buddie_contact}
                        onChange={(e) => setEditFormData({ ...editFormData, buddie_contact: e.target.value })}  

                        error={!!errors.buddie_contact}
                        helperText={errors.buddie_contact}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        name="buddie_email"
                        label="Email Address"
                        value={editFormData.buddie_email}
                        onChange={(e) => setEditFormData({ ...editFormData, buddie_email: e.target.value })}  
                        error={!!errors.buddie_email}
                        helperText={errors.buddie_email}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel id="buddie-profession-label">Profession</InputLabel>
                        <Select
                          labelId="buddie-profession-label"
                          name="buddie_profession"
                          value={editFormData.buddie_profession}
                          onChange={(e) => setEditFormData({ ...editFormData, buddie_profession: e.target.value })}  
                          label="Profession"
                        >
                          <MenuItem value="Work">Work</MenuItem>
                          <MenuItem value="Student">Student</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                )}
                <Box display="flex" justifyContent="space-between" marginTop={2}>
                  <Button onClick={() => setStep(2)} variant="contained" color="primary">
                    Next
                  </Button>
                </Box>
              </>
            )}
            {step === 2 && (
              <>
                {editFormData && (
                  <>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <Autocomplete
                            options={rooms} // Array of room objects
                            getOptionLabel={(option) => option.room_number} // Displayed option label
                            value={rooms.find((room) => room.room_number === editFormData.room_no) || null} // Correctly set value
                            onChange={(event, newValue) => {
                              const newRoomNo = newValue ? newValue.room_number : '';
                              setSelectedRoomNo(newRoomNo);
                              setEditFormData((prevData) => ({
                                ...prevData,
                                room_no: newRoomNo // Update formData with selected room number
                              }));
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Room Number"
                                variant="outlined"
                                fullWidth
                              />
                            )}
                            isOptionEqualToValue={(option, value) => option.room_number === value.room_number} // Correctly compare options
                          />
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          name="buddie_emergency_contact"
                          label="Emergency Contact"
                          value={editFormData.buddie_emergency_contact}
                          onChange={(e) => setEditFormData({ ...editFormData, buddie_emergency_contact: e.target.value })}  
                          error={!!errors.buddie_emergency_contact}
                          helperText={errors.buddie_emergency_contact}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <input
                            accept="image/*"
                            style={{ display: 'none' }}
                            id="buddie-photo-upload"
                            type="file"
                            name="buddie_photo"
                            onChange={handleEditFileChange}
                          />
                          <label htmlFor="buddie-photo-upload">
                            <Button variant="contained" component="span">
                              Upload Photo
                            </Button>
                            {editFormData.buddie_photo && (
                              <Chip
                                label={editFormData.buddie_photo.name}
                                onDelete={() => setEditFormData({ ...editFormData, buddie_photo: null })}
                                style={{ marginLeft: '10px' }}
                              />
                            )}
                          </label>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          name="buddie_bike_no"
                          label="Bike Number"
                          value={editFormData.buddie_bike_no}
                          onChange={(e) => setEditFormData({ ...editFormData, buddie_bike_no: e.target.value })}  
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <input
                            accept="image/*"
                            style={{ display: 'none' }}
                            id="buddie-id-proof-upload"
                            type="file"
                            name="buddie_id_proof"
                            onChange={handleEditFileChange}
                          />
                          <label htmlFor="buddie-id-proof-upload">
                            <Button variant="contained" component="span">
                              Upload ID Proof
                            </Button>
                            {editFormData.buddie_id_proof && (
                              <Chip
                                label={editFormData.buddie_id_proof.name}
                                onDelete={() => setEditFormData({ ...editFormData, buddie_id_proof: null })}
                                style={{ marginLeft: '10px' }}
                              />
                            )}
                          </label>
                        </FormControl>
                      </Grid>


                    </Grid>
                    <Box display="flex" justifyContent="space-between" marginTop={2}>
                      <Button onClick={() => setStep(1)} variant="outlined" color="primary">
                        Back
                      </Button>
                
                      <DialogActions>
                        <Button onClick={handleEditClose}>Cancel</Button>
                        <Button onClick={handleEditSubmit}>Submit</Button>
                      </DialogActions>

                    </Box>
                  </>
                )}
              </>
            )}
          </DialogContent>
        </Dialog>
      </Box>
      <ToastContainer />
            {/* Confirmation Dialog */}
            <ConfirmDialog
        open={isDialogOpen}
        onClose={() => setDialogOpen(false)}
        onConfirm={handleDelete}
      />
      <BottomNavBar />
    </div>
  );
}

export default AddBuddie;

