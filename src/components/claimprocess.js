import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './claimprocess.css'; // Import your CSS file for styling

const ClaimProcess = () => {
    const [claims, setClaims] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchClaims = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/claimcreate/');
                if (!response.ok) {
                    throw new Error('Failed to fetch claims data');
                }
                const data = await response.json();
                // Filter to only include claims with status "New"
                const newClaims = data.filter(claim => claim.claim_status === 'New');
                setClaims(newClaims); // Set the filtered claims
                setLoading(false); // Set loading to false after fetching
                //setClaims(data);
            } catch (error) {
                console.error('Error fetching claims:', error);
                setError(error.message); // Set error message
                setLoading(false); // Ensure loading is set to false even on error
            }
        };

        fetchClaims();
    }, []);

    const handleEdit = (claimId) => {
        // Handle edit action here, maybe navigate to an edit page or open a modal
        console.log(`Edit claim with ID: ${claimId}`);
        navigate(`/edit-claim/${claimId}`, { state: { claims } });
    };

    if (loading) {
        return <div>Loading claims...</div>; // Display a loading message
    }

    if (error) {
        return <div>Error: {error}</div>; // Display error message if any
    }

    // If no new claims are available
    if (claims.length === 0) {
        return <div>All claims are processed, there are no new claims.</div>;
    }

    return (
        <div className="claim-process">
            <h2>Claim Process</h2>
            <table>
                <thead>
                    <tr>
                        <th>Claim ID</th>
                        <th>Status</th>
                        <th>Disease Name</th>
                        <th>Date of Service</th>
                        <th>Total Amount</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {claims.map((claim) => (
                        <tr key={claim.claim_id}>
                            <td>{claim.claim_id}</td>
                            <td>{claim.claim_status}</td>
                            <td>{claim.disease_name}</td>
                            <td>{claim.date_of_service}</td>
                            <td>{claim.total_amount}</td>
                            <td>
                                <button onClick={() => handleEdit(claim.claim_id)}>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ClaimProcess;
