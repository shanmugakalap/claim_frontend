import React, { useState } from 'react';
import LoginForm from './components/login';
import ClaimProcess from './components/claimprocess';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/navigation'; // Import the Navigation component
import HomePage from './components/homepage';
import EditClaim from './components/editclaim';
import RunBatch from './components/runbatch';
import JsonFileUpload from './components/jsonfileupload';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to manage login status

  const handleLogin = () => {
    setIsLoggedIn(true); // Update login status on successful login
  };

  return (
    <Router>
      <div className="App">
        {!isLoggedIn ? (
          <LoginForm onLogin={handleLogin} /> // Pass the handleLogin function as a prop
        ) : (
          <>
            <Navigation isLoggedIn={isLoggedIn}/> {/* Add the navigation menu */}
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/claim/claim_process" element={<ClaimProcess />} />
              <Route path="/edit-claim/:claimId" element={<EditClaim />} />
              <Route path="/claim/run_batch" element={<RunBatch />} />
              <Route path="/claim/jsonfileupload" element={<JsonFileUpload />} />

              
            </Routes>
          </>
        )}
      </div>
    </Router>
  );
};

export default App;
