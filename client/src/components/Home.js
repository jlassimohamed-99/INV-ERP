import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="logo-container">
        <img src="/logo.png" alt="Logo" className="logo" />
      </div>
      <div className="header">
        <h1>Dashboard</h1>
      </div>
      <div className="card-container">
        <Link to="/hr" className="card">
          <h2>Gestion de ressources humaines</h2>
        </Link>
        <Link to="/project" className="card">
          <h2>Gestion des projets</h2>
        </Link>
        <Link to="/finance" className="card">
          <h2>Comptabilité</h2>
        </Link>
      </div>
    </div>
  );
};

export default Home;
