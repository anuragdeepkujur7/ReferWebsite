// src/components/HeroSection.jsx
import React from 'react';
import { Button } from '@material-ui/core';
import ReferModal from './ReferModal';

const HeroSection = () => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="hero-section bg-blue-500 text-white p-8">
      <h1 className="text-4xl font-bold">Refer & Earn</h1>
      <Button variant="contained" color="secondary" onClick={handleOpen}>
        Refer Now
      </Button>
      <ReferModal open={open} handleClose={handleClose} />
    </div>
  );
};

export default HeroSection;
