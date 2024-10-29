// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navigation'; // Import the Navbar component
import LoginForm from './components/login';
import ClaimProcess from './components/claimprocess';
import HomePage from './components/homepage';
import EditClaim from './components/editclaim';
import RunBatch from './components/runbatch';
import JsonFileUpload from './components/jsonfileupload';
import './App.css';
import TrackClaim from './components/trackclaim';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <div className={`App ${isLoggedIn ? 'authenticated' : 'login-screen'}`}>
        {!isLoggedIn ? (
          <LoginForm onLogin={handleLogin} />
        ) : (
          <>
            <Navbar /> {/* Display Navbar when logged in */}
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/claim/claim_process" element={<ClaimProcess />} />
              <Route path="/edit-claim/:claimId" element={<EditClaim />} />
              <Route path="/claim/run_batch" element={<RunBatch />} />
              <Route path="/claim/jsonfileupload" element={<JsonFileUpload />} />
              <Route path="/claim/trackclaim" element={<TrackClaim />} />
            </Routes>
          </>
        )}
      </div>
    </Router>
  );
};

export default App;
