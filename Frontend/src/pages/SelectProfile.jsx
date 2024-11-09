// // src/SelectProfile.jsx
// import  { useState } from 'react';
// // import './SelectProfile.css';

// const SelectProfile = () => {
//     const [selectedRole, setSelectedRole] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');
//     const [success, setSuccess] = useState('');

//     const handleRoleChange = (role) => {
//         setSelectedRole(role);
//         setError('');
//         setSuccess('');
//     };

//     const handleSubmit = async () => {
//         if (!selectedRole) {
//             setError('Please select a role to continue.');
//             return;
//         }

//         setLoading(true);
//         setError('');
//         setSuccess('');

//         try {
//             const response = await fetch('/api/submit-role', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({ role: selectedRole })
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to submit role. Please try again later.');
//             }

//             const data = await response.json();
//             setSuccess(`Role submitted successfully: ${data.role}`);
//             console.log('Server Response:', data);
//         } catch (err) {
//             console.error('Error:', err);
//             setError(err.message || 'Something went wrong.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="select-profile">
//             <h2>Want to share food?</h2>
//             <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
//             <hr />
//             <h3>Choose your role</h3>

//             <div className="role-options">
//                 <label className={`role-option ${selectedRole === 'donor' ? 'selected' : ''}`} onClick={() => handleRoleChange('donor')}>
//                     <input 
//                         type="radio" 
//                         value="donor" 
//                         checked={selectedRole === 'donor'} 
//                         onChange={() => handleRoleChange('donor')}
//                     />
//                     <span>Donor</span>
//                     <p>Donate some food to the needful.</p>
//                 </label>

//                 <label className={`role-option ${selectedRole === 'receiver' ? 'selected' : ''}`} onClick={() => handleRoleChange('receiver')}>
//                     <input 
//                         type="radio" 
//                         value="receiver" 
//                         checked={selectedRole === 'receiver'} 
//                         onChange={() => handleRoleChange('receiver')}
//                     />
//                     <span>Receiver</span>
//                     <p>Pickup and deliver food to the needful.</p>
//                 </label>

//                 <label className={`role-option ${selectedRole === 'volunteer' ? 'selected' : ''}`} onClick={() => handleRoleChange('volunteer')}>
//                     <input 
//                         type="radio" 
//                         value="volunteer" 
//                         checked={selectedRole === 'volunteer'} 
//                         onChange={() => handleRoleChange('volunteer')}
//                     />
//                     <span>Volunteer</span>
//                     <p>Pickup and deliver food to the needful.</p>
//                 </label>
//             </div>

//             {error && <p className="error">{error}</p>}
//             {success && <p className="success">{success}</p>}

//             <button onClick={handleSubmit} className="continue-button" disabled={loading}>
//                 {loading ? 'Submitting...' : 'Continue'}
//             </button>
//         </div>
//     );
// };

// export default SelectProfile;


import { useState } from 'react';
import { motion } from 'framer-motion';

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
            setError("Please select a role to continue.");
            return;
        }
    
        setLoading(true);
        setError("");
        setSuccess("");
    
        try {
            const response = await fetch("http://localhost:5000/api/submit-role", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}` // Ensure token is set if needed
                },
                body: JSON.stringify({ role: selectedRole })
            });
    
            if (!response.ok) {
                throw new Error("Failed to submit role. Please try again later.");
            }
    
            const data = await response.json();
            setSuccess(`Role submitted successfully: ${data.role}`);
            console.log("Server Response:", data);
        } catch (err) {
            console.error("Error:", err);
            setError(err.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden"
        >
            <div className="p-8">
                <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">
                    Want to share food?
                </h2>
                <p className="text-center text-gray-600 mb-6">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                </p>

                <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">Choose Your Role</h3>
                
                <div className="space-y-4">
                    {["donor", "receiver", "volunteer"].map((role) => (
                        <motion.label
                            key={role}
                            className={`flex items-center gap-3 p-4 rounded-lg shadow transition-all cursor-pointer ${
                                selectedRole === role ? "bg-green-100 border-2 border-green-500" : "bg-gray-100"
                            }`}
                            onClick={() => handleRoleChange(role)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <input
                                type="radio"
                                value={role}
                                checked={selectedRole === role}
                                onChange={() => handleRoleChange(role)}
                                className="hidden"
                            />
                            <span className="text-lg font-medium text-gray-700 capitalize">
                                {role.charAt(0).toUpperCase() + role.slice(1)}
                            </span>
                            <p className="text-sm text-gray-600 flex-grow">
                                {role === "donor"
                                    ? "Donate some food to the needful."
                                    : "Pickup and deliver food to the needful."}
                            </p>
                        </motion.label>
                    ))}
                </div>

                {error && <p className="text-red-500 font-semibold mt-4">{error}</p>}
                {success && <p className="text-green-500 font-semibold mt-4">{success}</p>}

                <motion.button
                    onClick={handleSubmit}
                    className="mt-6 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-white transition duration-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={loading}
                >
                    {loading ? "Submitting..." : "Continue"}
                </motion.button>
            </div>
        </motion.div>
    );
};

export default SelectProfile;
