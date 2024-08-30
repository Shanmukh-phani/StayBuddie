import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Grid, Typography, Avatar } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { styled } from '@mui/system';
import profileImage from './assets/buddie.jpg';
import { useNavigate } from 'react-router-dom';
import { AppBar, IconButton } from '@mui/material';
import {ArrowBack, Wifi as WifiIcon, LocalDining as LocalDiningIcon, LocalParking as LocalParkingIcon, LocalLaundryService as LocalLaundryServiceIcon, BatteryChargingFull as BatteryChargingFullIcon, CleanHands as CleanHandsIcon, FilterList as FilterListIcon } from '@mui/icons-material';


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


const Login = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [otpSent, setOtpSent] = useState(false);
  const otpRefs = useRef([]);

  const handleSendOtp = async () => {
    try {
      await axios.post('http://192.168.1.29:5000/admin/send-otp', { email });
      setOtpSent(true);
      toast.success('OTP sent successfully!');
    } catch (error) {
      toast.error('Error sending OTP');
    }
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return; // Ensure only a single digit is entered
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to the next input box if the current one is filled
    if (value !== '' && index < otpRefs.current.length - 1) {
      otpRefs.current[index + 1].focus();
    }
  };

  const handleVerifyOtp = async () => {
    const enteredOtp = otp.join('');
    try {
      await axios.post('http://192.168.1.29:5000/admin/verify-otp', { email, otp: enteredOtp });
      toast.success('OTP verified successfully');
      setTimeout(() => {
        window.location.href = '/admin'; // Redirect to home page
      }, 2000);
    } catch (error) {
      toast.error('Invalid OTP');
    }
  };




const navigate = useNavigate(); // Initialize navigate function

const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
};


  return (

    <div>


<AppBar position="static">
                <HeaderContainer>
                    <Box display="flex" alignItems="center">
                        <IconButton edge="start" color="inherit" aria-label="back" style={{ color: 'black' }} onClick={handleBackClick}>
                            <ArrowBack  />
                        </IconButton>
                        <StayText variant="h4" component="h1" style={{ marginLeft: '25px',color:'#006399' }}>
                            Stay
                        </StayText>
                        <BuddieText variant="h4" component="h1">
                            Buddie
                        </BuddieText>
                    </Box>

                    <Box >
            <ProfileIcon>
              <img src={profileImage} alt="Profile" style={{ width: '100%', height: '100%' }} />
            </ProfileIcon>
          </Box>
                </HeaderContainer>
            </AppBar>




    <Box sx={{ padding: '50px', maxWidth: '400px', marginTop: '60px', textAlign: 'center' }}>
      <Avatar
        src="https://example.com/path-to-login-image.jpg"
        alt="Login Image"
        sx={{ width: 100, height: 100, margin: 'auto', marginBottom: 2 }}
      />
      <Typography variant="h5" gutterBottom>
        OTP Authentication
      </Typography>
      <Box sx={{ marginBottom: 3 }}>
        <TextField
          fullWidth
          label="Enter your email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={otpSent}
        />
        {!otpSent && (
          <Button
            fullWidth
            variant="contained"
            sx={{ marginTop: 2 }}
            onClick={handleSendOtp}
          >
            Send OTP
          </Button>
        )}
      </Box>
      {otpSent && (
        <Box>
          <Grid container spacing={2} justifyContent="center">
            {otp.map((digit, index) => (
              <Grid item xs={3} key={index}>
                <TextField
                  inputProps={{ maxLength: 1, style: { textAlign: 'center' } }}
                  variant="outlined"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  inputRef={(el) => (otpRefs.current[index] = el)}
                />
              </Grid>
            ))}
          </Grid>
          <Button
            fullWidth
            variant="contained"
            sx={{ marginTop: 2 }}
            onClick={handleVerifyOtp}
          >
            Verify OTP
          </Button>
        </Box>
      )}
      <ToastContainer position="top-center" autoClose={3000} />
    </Box>
    </div>
  );
};

export default Login;
