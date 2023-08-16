import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Stack, Typography } from '@mui/material';
import HeroBannerImage from '../assets/images/gymhome.jpg';

export default function HeroBanner()  {
const handleScroll=()=>{
  scrollBy(0,1200)
}

  return(
  <>
    <Box sx={{ mt: { lg: '20px', xs: '20px' }, ml: { sm: '50px' } }} className="mt-5" position="relative" p="20px">
      <Typography fontWeight={900} sx={{ color: 'white', fontSize: { lg: '54px', xs: '50px' }, fontFamily: 'Lato, sans-serif' }} mb="33px" mt="10px">
        <span style={{ color: 'red' }}>Sweat</span>, Smile <br />
        And Repeat
      </Typography>
      <button type="button" className="explore-btn" onClick={handleScroll}>
        <Link to='' style={{ fontSize: '22px', textDecoration: 'none', color: 'white' }}>Explore Exercises</Link>
      </button>

      <Typography fontWeight={600} color="white" sx={{ opacity: '0.1', display: { lg: 'block', md: 'block', xs: 'none' }, fontSize: '200px' }}>
        Exercise
      </Typography>
      <img src={HeroBannerImage} alt="" className="hero-banner-img mt-4" />
    </Box>
  </>
);
}
