import React, { useState } from 'react';
import { register } from '../api/tmdb-api';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate(); 

    const handleRegister = async () => {
        try {
            await register(username, password);
            setSuccessMessage('Registration successful!');
            setErrorMessage('');
            setTimeout(() => {
                navigate('/login'); 
            }, 1000); 
        } catch (error) {
            setErrorMessage(error.message);
            setSuccessMessage('');
        }
    };

    return (
        <div>
            <h2>Register</h2>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleRegister}>Register</button>
        </div>
    );
};

export default RegisterPage;
