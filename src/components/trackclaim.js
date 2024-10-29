import React, { useEffect, useState } from 'react';

const TrackClaim = () => {
    const [claims, setClaims] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredClaims, setFilteredClaims] = useState([]);
    const [selectedClaim, setSelectedClaim] = useState(null);
    
    useEffect(() => {
        const fetchClaims = async () => {
            const response = await fetch('http://127.0.0.1:8000/api/claimcreate/'); // Adjust the endpoint accordingly
            const data = await response.json();
            setClaims(data); // Assume data is a list of claims
            setFilteredClaims(data); // Set the initial state of filtered claims
        };

        fetchClaims();
    }, []);

    const handleSearch = () => {
        const filtered = claims.filter(claim =>
            claim.claim_id.toString().includes(searchTerm) ||
            claim.patient_id.toString().includes(searchTerm) ||
            claim.claim_status.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredClaims(filtered);
    };

    const handlePreview = (claim) => {
        setSelectedClaim(claim); // Set the selected claim to show details
    };

    return (
        <div>
            <h1>Claim List</h1>
            <input
                type="text"
                placeholder="Search by claim_id, patient_id, or claim_status"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>

            <table>
                <thead>
                    <tr>
                        <th>Claim ID</th>
                        <th>Patient ID</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredClaims.length > 0 ? (
                        filteredClaims.map(claim => (
                            <tr key={claim.claim_id}>
                                <td>{claim.claim_id}</td>
                                <td>{claim.patient_id}</td>
                                <td>{claim.claim_status}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No claims found</td>
                        </tr>
                    )}
                </tbody>
            </table>
 
        </div>
    );
};

export default TrackClaim;
