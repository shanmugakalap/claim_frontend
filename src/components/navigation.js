import React from 'react';
import { Link } from 'react-router-dom';
import './navigation.css';

const Navigation = ({ isLoggedIn }) => {
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/claim/jsonfileupload">Import File</Link>
      <Link to="/claim/claim_process">Claim Approval Process</Link>
      <Link to="/claim/trackclaim">Track Claim</Link>
      <Link to="/claim/run_batch">Export</Link>
    </nav>
  );
};
  
  export default Navigation;
