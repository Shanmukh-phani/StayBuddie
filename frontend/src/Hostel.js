import React, { useState } from 'react';
import { AppBar, Box, Button, Card, Chip, Dialog, DialogContent, DialogTitle, DialogActions, Typography, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import { ArrowBack, Wifi as WifiIcon, LocalParking as LocalParkingIcon, LocalDining as LocalDiningIcon, Verified as VerifiedIcon, ExpandMore as ExpandMoreIcon, Star as StarIcon, FilterList as FilterListIcon } from '@mui/icons-material';
import Slider from 'react-slick';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import ImgHostel1 from './assets/hostel1.jpg';
import ImgHostel2 from './assets/hostel2.jpg';
import ImgHostel3 from './assets/hostel3.jpg';
import profileImage from './assets/buddie.jpg';
import { useNavigate, useParams } from 'react-router-dom';

import Img11 from './assets/img11.jpg';
import Img22 from './assets/img22.jpg';
import Img33 from './assets/img33.jpg';




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


const carouselSettings = {
  // dots: true,
  infinite: true,
  speed: 200,
  autoplay: true, // Auto-scroll
  autoplaySpeed: 3000, // Speed of auto-scroll
  slidesToShow: 1,
  slidesToScroll: 1,
};


const CarouselContainer = styled('div')({
  height: '350px',
  position: 'relative',
  overflow: 'hidden',
});








const FooterContainer = styled(Box)({

  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  padding: '14px 16px',
  // borderRadius: '4px',
  position: 'fixed',
  bottom: 0,
  left: 0,
  width: '100%',
  boxSizing: 'border-box',
  backgroundColor: '#fff',
  zIndex: 1000,
});





const CarouselImage = styled('img')({
  width: '100%',
  // height: '100%',
  height: '350px',
  objectFit: 'contain',
});






const LocationChip = styled(Chip)({
  fontFamily: 'Anta',
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#ffffff',
  backgroundColor: '#006399',
  padding: '12px 24px',
  borderRadius: '50px',
});

const FilterButton = styled(Button)({
  marginLeft: '16px',
  color: '#006399',
});

const Description = styled(Typography)({
  textAlign: 'left',
  margin: '10px 0',
  fontStyle: 'italic',
});

const HostelCard = styled(Card)({
  marginBottom: '20px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
  borderRadius: '10px',
});

const HostelSlider = styled(Slider)({
  '.slick-slide img': {
    width: '80%',
    height: 'auto',
    borderRadius: '10px 10px 0 0',
  },
});

const SectionContainer = styled(Box)({
  backgroundColor: '#fff',
  padding: '16px',
  borderRadius: '10px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  marginBottom: '20px',
});

const SectionTitle = styled(Typography)({
  fontWeight: 'bold',
  fontSize: '20px',
  marginBottom: '16px',
});

const ReadMoreButton = styled(Button)({
  fontSize: '12px',
  textTransform: 'none',
  color: '#007BFF',
  padding: '0',
});

const RatingsContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#fff',
  padding: '16px',
  borderRadius: '10px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  marginBottom: '20px',
});

const RatingValue = styled(Typography)({
  fontSize: '36px',
  fontWeight: 'bold',
  color: '#333',
});

const RatingSlider = styled(Slider)({
  '.slick-slide': {
    textAlign: 'center',
  },
  '.slick-slide img': {
    width: '100px',
    height: 'auto',
    borderRadius: '10px',
  },
});




const testimonials = [
  { message: 'Great stay! The staff was friendly and the amenities were top-notch.', name: 'John Doe', rating: 4 },
  { message: 'Very clean and well-maintained. I will definitely come back.', name: 'Jane Smith', rating: 5 },
  { message: 'Very clean and well-maintained. I will definitely come back.', name: 'Jane Smith', rating: 5 },

];

const ratingsData = [
  { star: 5, value: 60 },
  { star: 4, value: 30 },
  { star: 3, value: 70 },
  { star: 2, value: 20 },
  { star: 1, value: 10 },
];

const hostels = [
  ImgHostel1,
  ImgHostel2,
  ImgHostel3,
];

const amenities = [
  { icon: WifiIcon, label: 'High-speed Wi-Fi', color: '#0288d1' },
  { icon: LocalParkingIcon, label: 'Secure Parking', color: '#f57c00' },
  { icon: LocalDiningIcon, label: 'Hygienic Food', color: '#388e3c' },
];

const HostelScreen = () => {
  const [isReadMoreOpen, setIsReadMoreOpen] = useState(false);

  const handleReadMoreClick = () => {
    setIsReadMoreOpen(true);
  };

  const handleReadMoreClose = () => {
    setIsReadMoreOpen(false);
  };

  const { id } = useParams(); // Get the hostel ID from the URL
  const hostel = hostels[id]; // Retrieve the hostel details based on the ID


  const testimonialSettings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
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



      <CarouselContainer style={{ marginTop: '4px' }}>
        <Slider {...carouselSettings}>
          <div>
            <CarouselImage src={Img11} alt="Slide 1" />
          </div>
          <div>
            <CarouselImage src={Img22} alt="Slide 2" />
          </div>
          <div>
            <CarouselImage src={Img33} alt="Slide 3" />
          </div>
        </Slider>
      </CarouselContainer>


      <Box p={2}>
        {/* Section 1: Hostel Info */}
        <SectionContainer>
          <SectionTitle>Hostel Information</SectionTitle>
          <Typography variant="h5" fontWeight="bold">Sunrise Hostel</Typography>
          <Typography variant="body2" color="textSecondary" style={{ margin: '8px 0' }}>
            <StarIcon style={{ color: '#ffd700', marginRight: '4px' }} /> 4.5/5 Rating
          </Typography>
          <Typography variant="body2" color="textSecondary">Downtown, Cityville</Typography>
          <Typography variant="body2" color="textSecondary">Owner: John Doe</Typography>
          <Typography variant="body2" color="textSecondary">Since: 2010</Typography>
        </SectionContainer>

        {/* Section 2: About the Owner */}
        <SectionContainer>
          <SectionTitle>Hostel by John Doe</SectionTitle>
          <Typography variant="body2" color="textSecondary">Since: 2010</Typography>
          <Typography variant="body2" color="textSecondary">Speaks: Telugu, Hindi, English</Typography>
          <Typography variant="body2" color="textSecondary" style={{ marginTop: '8px' }}>
            John has been providing top-notch hostel services for over a decade...
          </Typography>
          <ReadMoreButton onClick={handleReadMoreClick}>
            Read more <ExpandMoreIcon fontSize="small" />
          </ReadMoreButton>
        </SectionContainer>

        {/* Section 3: About the Hostel */}
        <SectionContainer>
          <SectionTitle>About the Hostel</SectionTitle>
          <Typography variant="body2" color="textSecondary">
            Sunrise Hostel offers a comfortable stay with a wide range of amenities...
          </Typography>
          <Box mt={2}>
            <Typography variant="body2" color="textSecondary">Amenities Rated: 3.5/5</Typography>
            <Box display="flex" alignItems="center" mt={1}>
              {amenities.map((amenity, idx) => (
                <Box key={idx} display="flex" alignItems="center" mr={2}>
                  <amenity.icon style={{ color: amenity.color, marginRight: '4px' }} />
                  <Typography variant="body2">{amenity.label}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </SectionContainer>

        {/* Ratings Section */}
        <RatingsContainer>
          <Box>
            <Typography variant="body2" color="textSecondary">Overall Rating</Typography>
            <RatingValue>4.5</RatingValue>
            <Box display="flex" alignItems="center">
              <StarIcon style={{ color: '#ffd700', marginRight: '4px' }} />
              <Typography variant="body2">4.5/5</Typography>
            </Box>
          </Box>
          <Box width="50%">
            <RatingSlider {...testimonialSettings}>
              {ratingsData.map((data) => (
                <Box key={data.star} display="flex" flexDirection="column" alignItems="center">
                  <Typography variant="body2">{data.star} Star</Typography>
                  <Box width="100%" mt={1} height="20px" position="relative">
                    <Box
                      position="absolute"
                      top="0"
                      left="0"
                      width={`${data.value}%`}
                      height="100%"
                      backgroundColor="#ff9800"
                      borderRadius="10px"
                    />
                    <Box
                      position="absolute"
                      top="0"
                      left="0"
                      width="100%"
                      height="100%"
                      border="1px solid #ff9800"
                      borderRadius="10px"
                      backgroundColor="transparent"
                    />
                  </Box>
                </Box>
              ))}
            </RatingSlider>
          </Box>
        </RatingsContainer>

        {/* Testimonials Section */}
        <SectionContainer>
          <SectionTitle>Testimonials</SectionTitle>
          <Slider {...testimonialSettings}>
            {testimonials.map((testimonial, idx) => (
              <Box key={idx} p={2}>
                <Typography variant="body2" color="textSecondary" style={{ padding: '10px' }}>
                  "{testimonial.message}"
                </Typography>
                <Typography variant="body2" color="textSecondary" >
                  - {testimonial.name},
                </Typography>
                <Typography variant="body2" color="textSecondary" >
                  {/* {testimonial.rating} */}
                  {/* <StarIcon style={{ color: '#ffd700'}} />  */}
                </Typography>
              </Box>
            ))}
          </Slider>
        </SectionContainer>

        {/* Map Section */}
        <SectionContainer>
          <SectionTitle>Location Map</SectionTitle>
          <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '300px', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[51.505, -0.09]}>
              <Popup>Sunrise Hostel</Popup>
            </Marker>
          </MapContainer>
        </SectionContainer>
      </Box>




      <AppBar position="static">
        <FooterContainer>
          <Box>
            <Button variant="contained" color="success" style={{ width: '100%' }}>Book An Appointment</Button>
          </Box>
        </FooterContainer>
      </AppBar>




      <Dialog open={isReadMoreOpen} onClose={handleReadMoreClose}>
        <DialogTitle>About the Owner</DialogTitle>
        <DialogContent>
          <Typography variant="body2">
            John has been providing top-notch hostel services for over a decade. With a focus on quality and customer satisfaction, he ensures that every guest has a comfortable and enjoyable stay.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleReadMoreClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default HostelScreen;
