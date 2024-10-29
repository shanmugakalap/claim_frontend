import React, { useState } from 'react';

const JsonFileUpload = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    // Function to fetch and process claims from the backend
    const fetchAndProcessClaims = async () => {
        setLoading(true);
        setMessages([]); // Reset messages before each fetch

        try {
            const response = await fetch('http://localhost:8000/api/googledriveview/');
            const data = await response.json();

            if (response.ok) {
                // Assuming backend sends an array of messages for each claim processed
                setMessages([data.success] || []);
            } else {
                // Display error messages if something went wrong
                setMessages([data.error] || []);
            }
        } catch (error) {
            setMessages([`Error: ${error.message}`]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Process Google Drive Claims</h1>
            <button onClick={fetchAndProcessClaims} disabled={loading}>
                {loading ? 'Processing...' : 'Fetch and Process Claims'}
            </button>

            {messages && messages.length > 0 && (
                <div style={{ marginTop: '20px' }}>
                    <h2>Results</h2>
                    <ul>
                        {messages.map((msg, index) => (
                            <li key={index}>{msg}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default JsonFileUpload;
