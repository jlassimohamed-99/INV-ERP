import React from 'react';

const Facturation = () => {
  return (
    <div>
      <h2>Facturation</h2>
      <div>
        <input type="file" />
        <button>Upload Facture</button>
      </div>
      <div>
        <h3>Factures</h3>
        {/* Display list of factures here */}
      </div>
    </div>
  );
};

export default Facturation;
