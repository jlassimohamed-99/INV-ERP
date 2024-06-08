import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  RadialLinearScale,
} from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { useNavigate, useLocation } from 'react-router-dom';
import './FinanceDashboard.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  RadialLinearScale
);

Modal.setAppElement('#root');

const FinanceDashboard = () => {
  const [paiements, setPaiements] = useState([]);
  const [selectedPaiement, setSelectedPaiement] = useState(null);
  const [isFormShown, setIsFormShown] = useState(false);
  const [formData, setFormData] = useState({ type: '', amount: '', description: '', date: '' });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchPaiements();
  }, []);

  const fetchPaiements = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/payments', {
        headers: { token: localStorage.getItem('token') },
      });
      const activePaiements = response.data.filter(payment => !payment.isDeleted);
      setPaiements(activePaiements);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddPaiement = () => {
    setSelectedPaiement(null);
    setIsFormShown(true);
    setFormData({ type: '', amount: '', description: '', date: '' });
  };

  const handleEditPaiement = (paiement) => {
    setSelectedPaiement(paiement);
    setIsFormShown(true);
    setFormData({
      type: paiement.type,
      amount: paiement.amount,
      description: paiement.description,
      date: paiement.date.split('T')[0] // Format date for input[type="date"]
    });
  };

  const handleDeletePaiement = async (paiementId) => {
    try {
      await axios.delete(`http://localhost:5000/api/payments/${paiementId}`, {
        headers: { token: localStorage.getItem('token') },
      });
      fetchPaiements();
    } catch (err) {
      console.error('Erreur lors de la suppression du paiement:', err.response ? err.response.data : err.message);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedPaiement) {
        await axios.put(`http://localhost:5000/api/payments/${selectedPaiement._id}`, formData, {
          headers: { token: localStorage.getItem('token') },
        });
      } else {
        await axios.post('http://localhost:5000/api/payments', formData, {
          headers: { token: localStorage.getItem('token') },
        });
      }
      fetchPaiements();
      setIsFormShown(false);
    } catch (err) {
      console.error('Erreur lors de l\'envoi du formulaire:', err);
    }
  };

  // Preprocess data to sum amounts for each type
  const paiementSums = paiements.reduce((acc, paiement) => {
    if (!acc[paiement.type]) {
      acc[paiement.type] = 0;
    }
    acc[paiement.type] += paiement.amount;
    return acc;
  }, {});

  const types = Object.keys(paiementSums);
  const amounts = types.map(type => paiementSums[type]);

  // Data for charts
  const chartData = {
    labels: types,
    datasets: [
      {
        label: 'Montant du Paiement',
        data: amounts,
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="finance-dashboard">
      <div className="header">
        <h2>Tableau de Bord Financier</h2>
        <button onClick={handleAddPaiement}>+ Ajouter un Paiement</button>
        {location.pathname === '/finance' && (
          <button onClick={handleLogout} className="logout-button">Se Déconnecter</button>
        )}
      </div>
      <Modal
        isOpen={isFormShown}
        onRequestClose={() => setIsFormShown(false)}
        contentLabel="Formulaire de Paiement"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <div className="form-container">
          <form onSubmit={handleFormSubmit}>
            <label>Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              required
            >
              <option value="">Sélectionner le Type</option>
              <option value="facturation">Facturation</option>
              <option value="depense">Dépense</option>
              <option value="devis">Devis</option>
            </select>
            <label>Montant</label>
            <input
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              required
            />
            <label>Description</label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
            <label>Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
            />
            <button type="submit">Enregistrer</button>
            <button type="button" onClick={() => setIsFormShown(false)}>Annuler</button>
          </form>
        </div>
      </Modal>
      <div className="charts-container">
        <div className="chart">
          <h3>Diagramme à Barres</h3>
          <Bar data={chartData} />
        </div>
        <div className="chart">
          <h3>Diagramme Circulaire</h3>
          <Pie data={chartData} />
        </div>
        <div className="chart">
          <h3>Diagramme en Lignes</h3>
          <Line data={chartData} />
        </div>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Montant</th>
              <th>Description</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paiements.map((paiement) => (
              <tr key={paiement._id}>
                <td>{paiement.type}</td>
                <td>{paiement.amount}</td>
                <td>{paiement.description}</td>
                <td>{new Date(paiement.date).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => handleEditPaiement(paiement)}>Modifier</button>
                  <button onClick={() => handleDeletePaiement(paiement._id)}>Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FinanceDashboard;
