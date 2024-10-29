import React, { useState } from 'react';
import './login'; // Import your CSS file for styling

const RunBatch = () => {
    const [startDate, setStartDate] = useState('');
    const [startTime, setStartTime] = useState('00:00:00'); // Default format
    const [endDate, setEndDate] = useState('');
    const [endTime, setEndTime] = useState('00:00:00'); // Default format
    const [claims, setClaims] = useState([]);
    const [error, setError] = useState('');

    const handleSearch = async (event) => {
        event.preventDefault();
        setError(''); // Reset error message

        // Build the API URL with query parameters in the specified format
        const url = new URL('http://localhost:8000/api/claimapproved/'); // Change to your actual URL

        // Create the date-time strings in the required format
        const startDateTime = `${startDate}T${startTime}`;
        const endDateTime = `${endDate}T${endTime}`;

        // Prepare query parameters
        const params = new URLSearchParams({
            startdate: startDateTime,
            enddate: endDateTime,
        });

        // Append the parameters to the URL
        url.search = params.toString();

        try {
            // Make API call using fetch
            const response = await fetch(url);

            // Check for errors
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setClaims(data); // Set the claims state
        } catch (err) {
            // Handle errors here
            setError('Error fetching claims. Please check your input.');
            console.error(err);
        }
    };

    const handleExportAndUpload = async () => {
        // Format start and end date-time strings as required
        const startDateTime = `${startDate}T${startTime}`;
        const endDateTime = `${endDate}T${endTime}`;
    
        // Construct the URL with query parameters
        const url = new URL('http://localhost:8000/api/claimexportview/');
        url.search = new URLSearchParams({
            startdate: startDateTime,
            enddate: endDateTime,
        }).toString();
    
        try {
            // Perform a GET request to the constructed URL
            const response = await fetch(url, {
                method: 'GET',
            });
    
            if (!response.ok) throw new Error('Error exporting claims');
    
            // Parse the response JSON
            const data = await response.json();
            alert(`Data exported successfully. Google Drive File ID: ${data.file_id}`);
        } catch (err) {
            setError('Error exporting claims');
            console.error(err);
        }
    };
    

    return (
        <div className="claims-container">
            <h2>Claim Search</h2>
            <form onSubmit={handleSearch}>
                <input
                    type="date"
                    placeholder="Start Date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Start Time (HH:MM:SS)"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    required
                    pattern="^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$"
                    title="Format: HH:MM:SS"
                />
                <input
                    type="date"
                    placeholder="End Date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="End Time (HH:MM:SS)"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    required
                    pattern="^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$"
                    title="Format: HH:MM:SS"
                />
                <button type="submit">Search Claims</button>
                {error && <p className="error">{error}</p>}
            </form>

            {claims.length > 0 && (
                <div>
                    <h2>Claims List</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Claim ID</th>
                                <th>Status</th>
                                <th>Disease</th>
                                <th>Date of Service</th>
                                <th>Last Timestamp</th>
                            </tr>
                        </thead>
                        <tbody>
                            {claims.map((claim) => (
                                <tr key={claim.claim_id}>
                                    <td>{claim.claim_id}</td>
                                    <td>{claim.claim_status}</td>
                                    <td>{claim.disease_name}</td>
                                    <td>{claim.date_of_service}</td>
                                    <td>{claim.last_timestamp}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <button onClick={handleExportAndUpload}>Export and Upload to Google Drive</button>
        </div>
    );
};

export default RunBatch;
