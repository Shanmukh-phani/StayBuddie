import React, { useState } from 'react';
import { AppBar, IconButton, Typography, Box, Card, Chip, CardContent, Dialog, DialogTitle, DialogContent, DialogActions, Button, Checkbox, FormControlLabel } from '@mui/material';

import { styled } from '@mui/system';
import {ArrowBack, Wifi as WifiIcon, LocalDining as LocalDiningIcon, LocalParking as LocalParkingIcon, LocalLaundryService as LocalLaundryServiceIcon, BatteryChargingFull as BatteryChargingFullIcon, CleanHands as CleanHandsIcon, FilterList as FilterListIcon } from '@mui/icons-material';

import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import Slider from 'react-slick';

import ImgHostel1 from './assets/hostel1.jpg';
import ImgHostel2 from './assets/hostel2.jpg';
import ImgHostel3 from './assets/hostel3.jpg';
import profileImage from './assets/buddie.jpg';
import Header from './Header';

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

const LocationName = styled(Typography)({
    marginTop: '60px',
    fontSize: '24px',
    fontWeight: 'bold',
    textAlign: 'left',
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
        width: '100%',
        height: 'auto',
        // borderRadius: '10px 10px 0 0',
    },
});

const LocationChip = styled(Chip)({
    marginTop: '100px',
    fontFamily: 'Anta',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#ffffff',
    backgroundColor: '#006399',
    padding: '20px 22px',
    borderRadius: '100px',
    borderTopLeftRadius:'0px',
    borderBottomLeftRadius:'0px',
    // borderTopRightRadius:'0px'


});


const FilterButton = styled(IconButton)({
    marginRight: '16px',
    marginTop: '100px',
    color: '#006399',
});

const hostels = [
    {
        name: 'Sunrise Hostel',
        location: 'Downtown, Cityville',
        rating: 4.5,
        images: [ImgHostel1, ImgHostel2, ImgHostel3],
        highlights: [
            { icon: WifiIcon, text: 'High-speed Wi-Fi', color: '#0288d1' },
            { icon: LocalDiningIcon, text: 'Hygienic & Tasty Food', color: '#388e3c' },
            { icon: LocalParkingIcon, text: 'Secure Parking', color: '#f57c00' },
            { icon: LocalLaundryServiceIcon, text: 'On-site Laundry', color: '#7b1fa2' },
            { icon: BatteryChargingFullIcon, text: '24/7 Power Backup', color: '#1976d2' },
            { icon: CleanHandsIcon, text: 'Daily Cleaning Services', color: '#d32f2f' },
        ]
    },
    {
        name: 'Sunrise Hostel',
        location: 'Downtown, Cityville',
        rating: 4.5,
        images: [ImgHostel3, ImgHostel1, ImgHostel2],
        highlights: [
            { icon: WifiIcon, text: 'High-speed Wi-Fi', color: '#0288d1' },
            { icon: LocalDiningIcon, text: 'Hygienic & Tasty Food', color: '#388e3c' },
            { icon: LocalParkingIcon, text: 'Secure Parking', color: '#f57c00' },
            { icon: LocalLaundryServiceIcon, text: 'On-site Laundry', color: '#7b1fa2' },
            { icon: BatteryChargingFullIcon, text: '24/7 Power Backup', color: '#1976d2' },
            { icon: CleanHandsIcon, text: 'Daily Cleaning Services', color: '#d32f2f' },
        ]
    },
    {
        name: 'Sunrise Hostel',
        location: 'Downtown, Cityville',
        rating: 4.5,
        images: [ImgHostel2, ImgHostel1, ImgHostel3],
        highlights: [
            { icon: WifiIcon, text: 'High-speed Wi-Fi', color: '#0288d1' },
            { icon: LocalDiningIcon, text: 'Hygienic & Tasty Food', color: '#388e3c' },
            { icon: LocalParkingIcon, text: 'Secure Parking', color: '#f57c00' },
            { icon: LocalLaundryServiceIcon, text: 'On-site Laundry', color: '#7b1fa2' },
            { icon: BatteryChargingFullIcon, text: '24/7 Power Backup', color: '#1976d2' },
            { icon: CleanHandsIcon, text: 'Daily Cleaning Services', color: '#d32f2f' },
        ]
    },
    {
        name: 'Sunrise Hostel',
        location: 'Downtown, Cityville',
        rating: 4.5,
        images: [ImgHostel1, ImgHostel3, ImgHostel2],
        highlights: [
            { icon: WifiIcon, text: 'High-speed Wi-Fi', color: '#0288d1' },
            { icon: LocalDiningIcon, text: 'Hygienic & Tasty Food', color: '#388e3c' },
            { icon: LocalParkingIcon, text: 'Secure Parking', color: '#f57c00' },
            { icon: LocalLaundryServiceIcon, text: 'On-site Laundry', color: '#7b1fa2' },
            { icon: BatteryChargingFullIcon, text: '24/7 Power Backup', color: '#1976d2' },
            { icon: CleanHandsIcon, text: 'Daily Cleaning Services', color: '#d32f2f' },
        ]
    }
    
    // Add more hostels as needed
];


const filters = [
    { label: 'Men', value: 'men' },
    { label: 'Women', value: 'women' },
    { label: 'Wi-Fi', value: 'wifi' },
    { label: 'Food', value: 'food' },
    { label: 'Parking', value: 'parking' },
    { label: 'Location', value: 'location' },
];













const HostelsScreen = () => {
    const [selectedFilters, setSelectedFilters] = useState([]);
const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);

const handleFilterClick = () => {
    setIsFilterDialogOpen(true);
};

const handleDialogClose = () => {
    setIsFilterDialogOpen(false);
};

const handleFilterChange = (event) => {
    const { value, checked } = event.target;
    setSelectedFilters(prevFilters =>
        checked
            ? [...prevFilters, value]
            : prevFilters.filter(filter => filter !== value)
    );
};

const handleFilterApply = () => {
    // Apply filters here
    setIsFilterDialogOpen(false);
};


const location = useLocation();
const queryParams = new URLSearchParams(location.search);
const cityName = queryParams.get('city');
const filteredHostels = hostels.filter(hostel => hostel.city === cityName);


const navigate = useNavigate(); // Initialize navigate function

const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
};


const handleHostelClick = (hostelId) => {
    navigate(`/hostel/${hostelId}`); // Navigate to the hostel detail page
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


        

            <Box display="flex" alignItems="center" justifyContent="space-between">
    <LocationChip label={cityName || 'Select City'} />
    <FilterButton onClick={handleFilterClick}>
        <FilterListIcon />
    </FilterButton>
</Box>
     

            <Box mb={4} mt={3}>
                {hostels.map((hostel, index) => (
                    <HostelCard key={index}  onClick={() => handleHostelClick(index)}>
                        <HostelSlider dots={true} infinite={true} speed={500} slidesToShow={1} slidesToScroll={1} >
                            {hostel.images.map((image, idx) => (
                                <Box key={idx} position="relative">
                                    <img src={image} alt={`Hostel ${idx + 1}`} style={{ width: '100%', height: '200px',borderRadius:'10px' }} />
                                    <Box
                                        position="absolute"
                                        top="10px"
                                        right="10px"
                                        bgcolor="#ffd700"
                                        color="#000"
                                        // borderRadius="0px"
                                        padding="8px 12px"
                                        fontWeight="bold"
                                        fontSize="14px"
                                        boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)"
                                    >
                                        {hostel.rating}
                                    </Box>
                                </Box>
                            ))}
                        </HostelSlider>

                        <CardContent>
                            <Typography variant="h6" style={{ fontWeight: 'bold', marginBottom: '8px', color: '#333' }}>
                                {hostel.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" style={{ marginBottom: '16px' }}>
                                {hostel.location}
                            </Typography>

                            <Box display="flex" justifyContent="space-around" alignItems="flex-start">
                                {/* Left Highlights */}
                                <Box display="flex" flexDirection="column" pr={2}>
                                    {hostel.highlights.slice(0, Math.ceil(hostel.highlights.length / 2)).map((highlight, idx) => (
                                        <Box key={idx} display="flex" alignItems="center" mb={1}>
                                            <highlight.icon style={{ color: highlight.color, marginRight: '8px' }} />
                                            <Typography variant="body2">{highlight.text}</Typography>
                                        </Box>
                                    ))}
                                </Box>

                                {/* Right Highlights */}
                                <Box display="flex" flexDirection="column" pl={2}>
                                    {hostel.highlights.slice(Math.ceil(hostel.highlights.length / 2)).map((highlight, idx) => (
                                        <Box key={idx} display="flex" alignItems="center" mb={1}>
                                            <highlight.icon style={{ color: highlight.color, marginRight: '8px' }} />
                                            <Typography variant="body2">{highlight.text}</Typography>
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                        </CardContent>
                    </HostelCard>
                ))}
            </Box>





  {/* Filter Dialog */}
  <Dialog open={isFilterDialogOpen} onClose={handleDialogClose}>
                <DialogTitle>Filters</DialogTitle>
                <DialogContent>
                    {filters.map((filter) => (
                        <FormControlLabel
                            key={filter.value}
                            control={
                                <Checkbox
                                    checked={selectedFilters.includes(filter.value)}
                                    onChange={handleFilterChange}
                                    value={filter.value}
                                />
                            }
                            label={filter.label}
                        />
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleFilterApply} color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>


        </div>
    );
};

export default HostelsScreen;
