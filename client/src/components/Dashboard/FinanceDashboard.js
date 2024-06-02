import React, { useState } from 'react';
import Navbar from '../Navbar';
import Facturation from '../Finance/Facturation';
import GestionDevis from '../Finance/GestionDevis';
import DeclarationFiscale from '../Finance/DeclarationFiscale';
import GestionDepenses from '../Finance/GestionDepenses';

const FinanceDashboard = () => {
  const [activeSection, setActiveSection] = useState('facturation');

  return (
    <div>
      <Navbar />
      <h1>Finance Dashboard</h1>
      <div style={{ display: 'flex', justifyContent: 'space-around', padding: '20px' }}>
        <button onClick={() => setActiveSection('facturation')}>Facturation</button>
        <button onClick={() => setActiveSection('devis')}>Gestion des Devis</button>
        <button onClick={() => setActiveSection('declaration')}>Déclaration Fiscale</button>
        <button onClick={() => setActiveSection('depenses')}>Gestion des Dépenses</button>
      </div>
      <div>
        {activeSection === 'facturation' && <Facturation />}
        {activeSection === 'devis' && <GestionDevis />}
        {activeSection === 'declaration' && <DeclarationFiscale />}
        {activeSection === 'depenses' && <GestionDepenses />}
      </div>
    </div>
  );
};

export default FinanceDashboard;
