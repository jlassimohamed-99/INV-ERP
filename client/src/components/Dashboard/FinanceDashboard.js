import React, { useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Card, CardContent, Typography, Button, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import './FinanceDashboard.css';
import AddEditFacture from '../AddEditFacture';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const FinanceDashboard = () => {
  const navigate = useNavigate();
  const [showForm,setShowForm]=useState(false)

  const handleDelete = (id) => {
    // Implement the delete logic here
    console.log(`Delete item with id: ${id}`);
  };

  const facturationData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Facturation',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(75,192,192,1)',
        data: [65, 59, 80, 81, 56, 55]
      }
    ]
  };

  const depensesData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Dépenses',
        backgroundColor: 'rgba(255,99,132,1)',
        borderColor: 'rgba(255,99,132,1)',
        data: [35, 45, 60, 70, 46, 33]
      }
    ]
  };

  const devisData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Devis',
        backgroundColor: 'rgba(153,102,255,1)',
        borderColor: 'rgba(153,102,255,1)',
        data: [20, 30, 50, 40, 70, 60]
      }
    ]
  };

  return (
    <div className="finance-dashboard">
      <Typography variant="h4" gutterBottom>Finance Dashboard</Typography>
      
      <div className="card-container">
        <Card className="card">
          <CardContent>
            <Typography variant="h5" component="h2">Facturation</Typography>
            <Bar data={facturationData} />
            <Button variant="contained" onClick={() => setShowForm(true)}>Add Facture</Button>
            <IconButton onClick={() => navigate(`/edit-facture/1`)}><EditIcon /></IconButton>
            <IconButton onClick={() => handleDelete(1)}><DeleteIcon /></IconButton>
          </CardContent>
        </Card>

        <Card className="card">
          <CardContent>
            <Typography variant="h5" component="h2">Gestion des Dépenses</Typography>
            <Line data={depensesData} />
            <Button variant="contained" onClick={() => navigate('/add-depense')}>Add Depense</Button>
            <IconButton onClick={() => navigate(`/edit-depense/1`)}><EditIcon /></IconButton>
            <IconButton onClick={() => handleDelete(1)}><DeleteIcon /></IconButton>
          </CardContent>
        </Card>

        <Card className="card">
          <CardContent>
            <Typography variant="h5" component="h2">Gestion des Devis</Typography>
            <Line data={devisData} />
            <Button variant="contained" onClick={() => navigate('/add-devis')}>Add Devis</Button>
            <IconButton onClick={() => navigate(`/edit-devis/1`)}><EditIcon /></IconButton>
            <IconButton onClick={() => handleDelete(1)}><DeleteIcon /></IconButton>
          </CardContent>
        </Card>
        {
          showForm && <AddEditFacture mode="add" setShowForm={setShowForm} />
        }
      </div>
    </div>
  );
};

export default FinanceDashboard;
