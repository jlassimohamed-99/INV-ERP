import React, { useState } from 'react';
import axios from 'axios';
import "./AddEmployeeForm.css"

const AddEmployeeForm = ({ onEmployeeAdded,setIsFormShown }) => {
  const [employee, setEmployee] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    job: '',
    dateofjoining: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/', employee, {
        headers: {
          'x-auth-token': localStorage.getItem('token')
        }
      });
      onEmployeeAdded(response.data);
      setEmployee({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        job: '',
        dateofjoining: ''
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='popup'>
<div className=' popup-content'>
  <button className='close' onClick={()=>setIsFormShown(false)}>X</button>
    <h3>Ajouter un employer</h3>

    <form onSubmit={handleSubmit}>
      <input type="text" name="firstname" placeholder="First Name" value={employee.firstname} onChange={handleChange} required />
      <input type="text" name="lastname" placeholder="Last Name" value={employee.lastname} onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" value={employee.email} onChange={handleChange} required />
      <input type="tel" name="phone" placeholder="Phone" value={employee.phone} onChange={handleChange} required />
      <input type="text" name="job" placeholder="Job Title" value={employee.job} onChange={handleChange} required />
      <input type="date" name="dateofjoining" placeholder="Date of Joining" value={employee.dateofjoining} onChange={handleChange} required />
      <button type="submit">Add Employee</button>
    </form>
</div>
    </div>
  );
};

export default AddEmployeeForm;
