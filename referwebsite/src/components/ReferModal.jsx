// src/components/ReferModal.jsx
import React from 'react';
import { Modal, Backdrop, Fade, TextField, Button } from '@material-ui/core';
import axios from 'axios';

const ReferModal = ({ open, handleClose }) => {
  const [formData, setFormData] = React.useState({
    referrerName: '',
    referrerEmail: '',
    refereeName: '',
    refereeEmail: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/refer', formData);
      alert('Referral submitted successfully!');
      handleClose();
    } catch (error) {
      alert('Error submitting referral');
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={open}>
        <div className="modal-content bg-white p-8 rounded">
          <h2>Refer a Friend</h2>
          <form onSubmit={handleSubmit}>
            <TextField
              name="referrerName"
              label="Your Name"
              fullWidth
              margin="normal"
              value={formData.referrerName}
              onChange={handleChange}
              required
            />
            <TextField
              name="referrerEmail"
              label="Your Email"
              type="email"
              fullWidth
              margin="normal"
              value={formData.referrerEmail}
              onChange={handleChange}
              required
            />
            <TextField
              name="refereeName"
              label="Friend's Name"
              fullWidth
              margin="normal"
              value={formData.refereeName}
              onChange={handleChange}
              required
            />
            <TextField
              name="refereeEmail"
              label="Friend's Email"
              type="email"
              fullWidth
              margin="normal"
              value={formData.refereeEmail}
              onChange={handleChange}
              required
            />
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </form>
        </div>
      </Fade>
    </Modal>
  );
};

export default ReferModal;
