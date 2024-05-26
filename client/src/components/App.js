import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Home from './components/Home';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import HRDashboard from './components/Dashboard/HRDashboard';
import ProjectDashboard from './components/Dashboard/ProjectDashboard';
import FinanceDashboard from './components/Dashboard/FinanceDashboard';
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <PrivateRoute path="/admin" component={AdminDashboard} />
        <PrivateRoute path="/hr" component={HRDashboard} />
        <PrivateRoute path="/project" component={ProjectDashboard} />
        <PrivateRoute path="/finance" component={FinanceDashboard} />
        <PrivateRoute path="/employee" component={EmployeeDashboard} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
