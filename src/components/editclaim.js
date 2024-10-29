import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import './login.css';

const EditClaim = () => {
    const { claimId } = useParams();
    const location = useLocation();
    const claims = location.state?.claims || [];
    const currentIndex = claims.findIndex(claim => claim.claim_id === parseInt(claimId));

    const [claimData, setClaimData] = useState({});
    const [patientData, setPatientData] = useState({});
    const [totalAmount, setTotalAmount] = useState(0);
    const [discountPercentage, setDiscountPercentage] = useState(0);
    const [initialTotalAmount, setInitialTotalAmount] = useState(0);
    const [isFinalized, setIsFinalized] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const claimResponse = await fetch(`http://127.0.0.1:8000/api/claim/${claimId}/`);
                if (claimResponse.ok) {
                    const claimData = await claimResponse.json();
                    setClaimData(claimData.claim);
                    setPatientData(claimData.patient);
                    setInitialTotalAmount(claimData.claim.total_amount || 0);
                    setTotalAmount(claimData.claim.total_amount || 0);
                    setDiscountPercentage(claimData.patient.discount_percentage || 0);
                    setIsFinalized(claimData.claim.isFinalized); // Updated to use isFinalized
                } else {
                    console.error('Failed to fetch claim data');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [claimId]);

    const finalizeDiscount = () => {
        if (!isFinalized) {
            // Calculate discounted total amount
            const discountAmount = initialTotalAmount * (discountPercentage / 100);
            const finalizedTotal = initialTotalAmount - discountAmount;
            setTotalAmount(finalizedTotal.toFixed(2));
            setIsFinalized(true); // Set isFinalized to true
        } else {
            alert("This claim has already been finalized.");
        }
    };

    const handleClaimChange = (e) => {
        const { name, value } = e.target;
        setClaimData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/claim/${claimId}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...claimData,
                    total_amount: isFinalized ? totalAmount : initialTotalAmount, // Update total_amount based on finalization
                    discount_percentage: discountPercentage,
                    isFinalized: isFinalized // Updated to use isFinalized
                })
            });

            if (response.ok) {
                // Move to the next claim
                if (currentIndex < claims.length - 1) {
                    const nextClaim = claims[currentIndex + 1];
                    navigate(`/edit-claim/${nextClaim.claim_id}`, { state: { claims } });
                } else {
                    // If no more claims, navigate back or show a message
                    navigate('/claim/claim_process'); // Navigate back to claim process
                }
            } else {
                console.error('Failed to update claim');
            }
        } catch (error) {
            console.error('Error updating claim:', error);
        }
    };

    return (
        <div>
            <h2>Edit Claim</h2>
            <form>
                <fieldset>
                    <legend>Patient Details</legend>
                    <label>
                        Patient ID:
                        <input type="number" value={patientData.patient_id || ''} disabled />
                    </label>
                    <label>
                        Patient Name:
                        <input type="text" value={patientData.patient_name || ''} disabled />
                    </label>
                    <label>
                        Patient Address:
                        <textarea value={patientData.patient_address || ''} disabled />
                    </label>
                    <label>
                        Discount Percentage:
                        <input 
                            type="number" 
                            name="discount_percentage" 
                            value={discountPercentage || ''} 
                            readOnly
                        />
                    </label>
                    <button type="button" onClick={finalizeDiscount}>
                        Finalize
                    </button>
                    <label>
                        Total Amount:
                        <input 
                            type="number" 
                            name="total_amount" 
                            value={totalAmount || ''} 
                            readOnly // Ensure total amount is read-only
                        />
                    </label>
                </fieldset>

                <fieldset>
                    <legend>Claim Details</legend>
                    <label>
                        Claim ID:
                        <input type="number" name="claim_id" value={claimData.claim_id || ''} disabled />
                    </label>
                    <label>
                        Claim Status:
                        <select name="claim_status" value={claimData.claim_status || ''} onChange={handleClaimChange}>
                            <option value="New">New</option>
                            <option value="Pending">Pending</option>
                            <option value="Rejected">Rejected</option>
                            <option value="Approved">Approved</option>
                        </select>
                    </label>
                    <label>
                        Disease Name:
                        <input type="text" name="disease_name" value={claimData.disease_name || ''} onChange={handleClaimChange} />
                    </label>
                    <label>
                        Date of Service:
                        <input type="date" name="date_of_service" value={claimData.date_of_service || ''} onChange={handleClaimChange} />
                    </label>
                    <label>
                        Treatment Given:
                        <textarea name="treatment_given" value={claimData.treatment_given || ''} onChange={handleClaimChange} />
                    </label>
                    <label>
                        Lab Test:
                        <input type="text" name="lab_test" value={claimData.lab_test || ''} onChange={handleClaimChange} />
                    </label>
                    <label>
                        Hospital Name:
                        <input type="text" name="hospital_name" value={claimData.hospital_name || ''} onChange={handleClaimChange} />
                    </label>
                    <label>
                        Hospital Address:
                        <textarea name="hospital_address" value={claimData.hospital_address || ''} onChange={handleClaimChange} />
                    </label>
                    <label>
                        Hospital City:
                        <input type="text" name="hospital_city" value={claimData.hospital_city || ''} onChange={handleClaimChange} />
                    </label>
                    <label>
                        Hospital State:
                        <input type="text" name="hospital_state" value={claimData.hospital_state || ''} onChange={handleClaimChange} />
                    </label>
                    <label>
                        Hospital Pincode:
                        <input type="text" name="hospital_pincode" value={claimData.hospital_pincode || ''} onChange={handleClaimChange} />
                    </label>
                </fieldset>

                <button type="button" onClick={handleSave}>Save Changes</button>
            </form>
        </div>
    );
};

export default EditClaim;
