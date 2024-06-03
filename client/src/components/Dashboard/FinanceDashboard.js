import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FinanceDashboard = () => {
  const [factures, setFactures] = useState([]);
  const [devis, setDevis] = useState([]);
  const [declarations, setDeclarations] = useState([]);
  const [depenses, setDepenses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const facturesResponse = await axios.get('http://localhost:5000/api/factures/', {
          headers: {
            'x-auth-token': localStorage.getItem('token')
          }
        });
        setFactures(facturesResponse.data);

        const devisResponse = await axios.get('http://localhost:5000/api/devis/', {
          headers: {
            'x-auth-token': localStorage.getItem('token')
          }
        });
        setDevis(devisResponse.data);

        const declarationsResponse = await axios.get('http://localhost:5000/api/declarations/', {
          headers: {
            'x-auth-token': localStorage.getItem('token')
          }
        });
        setDeclarations(declarationsResponse.data);

        const depensesResponse = await axios.get('http://localhost:5000/api/depenses/', {
          headers: {
            'x-auth-token': localStorage.getItem('token')
          }
        });
        setDepenses(depensesResponse.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Finance Dashboard</h2>
      <div>
        <h3>Facturation</h3>
        <ul>
          {factures.map(facture => (
            <li key={facture._id}>{facture.name}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Gestion des Devis</h3>
        <ul>
          {devis.map(devis => (
            <li key={devis._id}>{devis.name}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Déclaration Fiscales</h3>
        <ul>
          {declarations.map(declaration => (
            <li key={declaration._id}>{declaration.name}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Gestion des Dépenses</h3>
        <ul>
          {depenses.map(depense => (
            <li key={depense._id}>{depense.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FinanceDashboard;
