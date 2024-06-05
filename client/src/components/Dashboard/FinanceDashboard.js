import React, { useState, useEffect } from 'react';
import axios from 'axios';
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

const FinanceDashboard = () => {
  const [payments, setPayments] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isFormShown, setIsFormShown] = useState(false);
  const [formData, setFormData] = useState({ type: '', amount: '', description: '' });

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/payments', {
        headers: { token: localStorage.getItem('token') },
      });
      const activePayments = response.data.filter(payment => !payment.isDeleted);
      setPayments(activePayments);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddPayment = () => {
    setSelectedPayment(null);
    setIsFormShown(true);
    setFormData({ type: '', amount: '', description: '' });
  };

  const handleEditPayment = (payment) => {
    setSelectedPayment(payment);
    setIsFormShown(true);
    setFormData(payment);
  };

  const handleDeletePayment = async (paymentId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/payments/${paymentId}`, {
        headers: { token: localStorage.getItem('token') },
      });
      console.log('Delete response:', response);
      fetchPayments();
    } catch (err) {
      console.error('Error deleting payment:', err.response ? err.response.data : err.message);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting form data:', formData);
    try {
      if (selectedPayment) {
        await axios.put(`http://localhost:5000/api/payments/${selectedPayment._id}`, formData, {
          headers: { token: localStorage.getItem('token') },
        });
      } else {
        await axios.post('http://localhost:5000/api/payments', formData, {
          headers: { token: localStorage.getItem('token') },
        });
      }
      fetchPayments();
      setIsFormShown(false);
    } catch (err) {
      console.error('Error submitting form:', err);
    }
  };

  // Preprocess data to sum amounts for each type
  const paymentSums = payments.reduce((acc, payment) => {
    if (!acc[payment.type]) {
      acc[payment.type] = 0;
    }
    acc[payment.type] += payment.amount;
    return acc;
  }, {});

  const types = Object.keys(paymentSums);
  const amounts = types.map(type => paymentSums[type]);

  // Data for charts
  const chartData = {
    labels: types,
    datasets: [
      {
        label: 'Payment Amount',
        data: amounts,
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  return (
    <div className="finance-dashboard">
      <div className="header">
        <h2>Finance Dashboard</h2>
        <button onClick={handleAddPayment}>+ Add Payment</button>
      </div>
      {isFormShown && (
        <div className="form-container">
          <form onSubmit={handleFormSubmit}>
            <label>Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            >
              <option value="">Select Type</option>
              <option value="facturation">Facturation</option>
              <option value="depense">Depense</option>
              <option value="devis">Devis</option>
            </select>
            <label>Amount</label>
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
            <button type="submit">Save</button>
            <button type="button" onClick={() => setIsFormShown(false)}>Cancel</button>
          </form>
        </div>
      )}
      <div className="charts-container">
        <div className="chart">
          <h3>Bar Chart</h3>
          <Bar data={chartData} />
        </div>
        <div className="chart">
          <h3>Pie Chart</h3>
          <Pie data={chartData} />
        </div>
        <div className="chart">
          <h3>Line Chart</h3>
          <Line data={chartData} />
        </div>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Amount</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment._id}>
                <td>{payment.type}</td>
                <td>{payment.amount}</td>
                <td>{payment.description}</td>
                <td>
                  <button onClick={() => handleEditPayment(payment)}>Edit</button>
                  <button onClick={() => handleDeletePayment(payment._id)}>Delete</button>
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
