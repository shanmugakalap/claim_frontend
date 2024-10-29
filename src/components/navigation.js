import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = ({ isLoggedIn }) => {
    return (
      <nav>
        <ul>
          {/* Only show these links if the user is logged in */}
          {isLoggedIn && (
            <>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/claim/jsonfileupload">Json File Upload</Link>
              </li>
              <li>
                <Link to="/claim/claim_process">Claim Process</Link>
              </li>
              <li>
                <Link to="/claim/run_batch">Run Batch</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    );
  };
  
  export default Navigation;
