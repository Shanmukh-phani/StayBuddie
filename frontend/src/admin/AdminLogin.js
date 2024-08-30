import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  InputAdornment,
  Snackbar,
  Alert,
  AppBar,
  IconButton
} from '@mui/material';
import { Phone, Lock, ArrowBack, Visibility, VisibilityOff } from '@mui/icons-material';
import { styled } from '@mui/system';
import profileImage from '../assets/buddie.jpg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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

const AdminLogin = () => {
  const navigate = useNavigate();

  // Check if the authToken exists
  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      navigate('/admin/home'); // Redirect to admin home if authToken exists
    }
  }, [navigate]);


  const [hostelPhone, setHostelPhone] = useState('');
  const [hostelPassword, setHostelPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState({ open: false, message: '', severity: '' });

  const handleBackClick = () => {
    navigate(-1);
  };

  const validatePhoneNumber = (value) => {
    if (!value) {
      return 'Phone number is required';
    } else if (!/^\d{10}$/.test(value)) {
      return 'Phone number must be 10 digits';
    }
    return '';
  };

  const validatePassword = (value) => {
    if (!value) {
      return 'Password is required';
    } else if (value.length < 6) {
      return 'Password must be at least 6 characters';
    }
    return '';
  };

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    setHostelPhone(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      phoneNumber: validatePhoneNumber(value),
    }));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setHostelPassword(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      password: validatePassword(value),
    }));
  };


  const handleLogin = async () => {
    const phoneNumberError = validatePhoneNumber(hostelPhone);
    const passwordError = validatePassword(hostelPassword);
  
    if (phoneNumberError || passwordError) {
      setErrors({
        phoneNumber: phoneNumberError,
        password: passwordError,
      });
      return;
    }
  
    setErrors({});
  
    try {
      const loginResponse = await axios.post('http://192.168.1.2:5000/admin/login', {
        hostel_phone: hostelPhone,
        hostel_password: hostelPassword,
      });
  
      console.log('Login Response:', loginResponse.data);
  
      if (loginResponse.status === 200 && loginResponse.data.token && loginResponse.data.hostel_id) {
        localStorage.setItem('authToken', loginResponse.data.token);
        localStorage.setItem('hostel_id', loginResponse.data.hostel_id);
  
        setToast({ open: true, message: 'Login successful', severity: 'success' });
  
        navigate('/admin/home');
      } else {
        throw new Error('Invalid phone number or password');
      }
    } catch (error) {
      console.error('Login Error:', error);
      setToast({ open: true, message: error.message || 'An error occurred', severity: 'error' });
    }
  };
      



  const handleToastClose = () => {
    setToast({ ...toast, open: false });
  };

  return (
    <div>
      <AppBar position="static">
        <HeaderContainer>
          <Box display="flex" alignItems="center">
            <IconButton edge="start" color="inherit" aria-label="back" onClick={handleBackClick}>
              <ArrowBack />
            </IconButton>
            <StayText variant="h4" component="h1" style={{ marginLeft: '25px' }}>
              Stay
            </StayText>
            <BuddieText variant="h4" component="h1">
              Buddie
            </BuddieText>
          </Box>
          <Box>
            <ProfileIcon>
              <img src={profileImage} alt="Profile" style={{ width: '100%', height: '100%' }} />
            </ProfileIcon>
          </Box>
        </HeaderContainer>
      </AppBar>

      <Container maxWidth="xs">
        <Paper elevation={3} sx={{ padding: 4, mt: 15 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Admin Login
          </Typography>
          <Box component="form" sx={{ mt: 3 }}>
            <TextField
              fullWidth
              variant="outlined"
              label="Phone Number"
              value={hostelPhone}
              onChange={handlePhoneNumberChange}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Phone />
                  </InputAdornment>
                ),
              }}
              error={Boolean(errors.phoneNumber)}
              helperText={errors.phoneNumber}
            />
            <TextField
              fullWidth
              variant="outlined"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={hostelPassword}
              onChange={handlePasswordChange}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={Boolean(errors.password)}
              helperText={errors.password}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleLogin}
              sx={{ mt: 3 }}
            >
              Login
            </Button>
          </Box>
        </Paper>
      </Container>

      <Snackbar open={toast.open} autoHideDuration={6000} onClose={handleToastClose}>
        <Alert onClose={handleToastClose} severity={toast.severity} sx={{ width: '100%' }}>
          {toast.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AdminLogin;
