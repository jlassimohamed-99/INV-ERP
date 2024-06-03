import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const AddEditFacture = ({ mode }) => {
  const [formData, setFormData] = useState({ amount: '', date: '', description: '' });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (mode === 'edit' && id) {
      // Fetch the existing facture data and set it to formData
      // Example: fetchFactureById(id).then(data => setFormData(data));
    }
  }, [mode, id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === 'edit') {
      // Implement the form submission logic for editing
      console.log('Facture edited:', formData);
    } else {
      // Implement the form submission logic for adding
      console.log('Facture added:', formData);
    }
    navigate('/finance'); // Navigate back to the Finance Dashboard after submission
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>{mode === 'edit' ? 'Edit Facture' : 'Add Facture'}</Typography>
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
        <Button type="submit" variant="contained" color="primary">{mode === 'edit' ? 'Save Changes' : 'Add Facture'}</Button>
      </form>
    </div>
  );
};

export default AddEditFacture;
