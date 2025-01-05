import React, { useState } from 'react';
import { register } from '../api/tmdb-api';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleRegister = async () => {
        try {
            const data = await register(username, password);
            setSuccessMessage('Registration successful!');
            setErrorMessage('');
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
