// src/SelectProfile.jsx
import  { useState } from 'react';
// import './SelectProfile.css';

const SelectProfile = () => {
    const [selectedRole, setSelectedRole] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleRoleChange = (role) => {
        setSelectedRole(role);
        setError('');
        setSuccess('');
    };

    const handleSubmit = async () => {
        if (!selectedRole) {
            setError('Please select a role to continue.');
            return;
        }

        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await fetch('/api/submit-role', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ role: selectedRole })
            });

            if (!response.ok) {
                throw new Error('Failed to submit role. Please try again later.');
            }

            const data = await response.json();
            setSuccess(`Role submitted successfully: ${data.role}`);
            console.log('Server Response:', data);
        } catch (err) {
            console.error('Error:', err);
            setError(err.message || 'Something went wrong.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="select-profile">
            <h2>Want to share food?</h2>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
            <hr />
            <h3>Choose your role</h3>

            <div className="role-options">
                <label className={`role-option ${selectedRole === 'donor' ? 'selected' : ''}`} onClick={() => handleRoleChange('donor')}>
                    <input 
                        type="radio" 
                        value="donor" 
                        checked={selectedRole === 'donor'} 
                        onChange={() => handleRoleChange('donor')}
                    />
                    <span>Donor</span>
                    <p>Donate some food to the needful.</p>
                </label>

                <label className={`role-option ${selectedRole === 'receiver' ? 'selected' : ''}`} onClick={() => handleRoleChange('receiver')}>
                    <input 
                        type="radio" 
                        value="receiver" 
                        checked={selectedRole === 'receiver'} 
                        onChange={() => handleRoleChange('receiver')}
                    />
                    <span>Receiver</span>
                    <p>Pickup and deliver food to the needful.</p>
                </label>

                <label className={`role-option ${selectedRole === 'volunteer' ? 'selected' : ''}`} onClick={() => handleRoleChange('volunteer')}>
                    <input 
                        type="radio" 
                        value="volunteer" 
                        checked={selectedRole === 'volunteer'} 
                        onChange={() => handleRoleChange('volunteer')}
                    />
                    <span>Volunteer</span>
                    <p>Pickup and deliver food to the needful.</p>
                </label>
            </div>

            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}

            <button onClick={handleSubmit} className="continue-button" disabled={loading}>
                {loading ? 'Submitting...' : 'Continue'}
            </button>
        </div>
    );
};

export default SelectProfile;
