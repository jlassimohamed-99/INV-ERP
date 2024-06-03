import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AddDevis = () => {
  const [formData, setFormData] = useState({ amount: '', date: '', description: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement the form submission logic here
    console.log('Devis added:', formData);
    navigate('/finance'); // Navigate back to the Finance Dashboard after submission
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>Add Devis</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          name="amount"
          label="Amount"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.amount}
          onChange={handleChange}
        />
        <TextField
          name="date"
          label="Date"
          type="date"
          variant="outlined"
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          value={formData.date}
          onChange={handleChange}
        />
        <TextField
          name="description"
          label="Description"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.description}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" color="primary">Add Devis</Button>
      </form>
    </div>
  );
};

export default AddDevis;
