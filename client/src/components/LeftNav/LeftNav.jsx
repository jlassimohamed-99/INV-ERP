import React, { useEffect, useState } from 'react';
import './LeftNav.css';

const LeftNav = ({ selectedEmployee }) => {
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    if (selectedEmployee) {
      setEmployee(selectedEmployee);
    }
  }, [selectedEmployee]);

  return (
    <nav className='leftNav'>
      <div className="employeeDetail full-detail">
        <h2>Full Detail</h2>
        {employee ? (
          <>
            <img src={employee.profilePicture || 'https://i.ytimg.com/vi/SSi4DmUAjBM/maxresdefault.jpg'} alt={employee.name} />
            <h1>{employee.name}</h1>
            <p>{employee.email}</p>
            <p>{employee.phone}</p>
            <p>{employee.role}</p>
            <p className='date'>{employee.dateOfJoining}</p>
          </>
        ) : (
          <p>Select an employee to see details</p>
        )}
      </div>
    </nav>
  );
};

export default LeftNav;
