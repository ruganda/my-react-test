import React from 'react';
import {Typography, Button, Box } from '@mui/material';

const EmptyState = ({fetchData =()=>{}}) => {
  return (
    <Box sx={{ height: '90vh', display: 'flex',flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
      <h3>What are you looking for?</h3>
      <Typography variant="body1">
        get started by searching & filtering a few
      </Typography>
      <Button variant="contained" color="primary" onClick={fetchData}>
        Fetch data
      </Button>
      <Typography variant="body1" style={{ color: 'blue' }}>
        {' or search for an item'}
      </Typography>
    </Box>
  );
};

export default EmptyState;
