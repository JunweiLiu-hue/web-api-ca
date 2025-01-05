import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 导入 useNavigate 钩子
import { login } from '../api/tmdb-api';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate(); 
    const handleLogin = async () => {
        try {
            const data = await login(username, password);
            setSuccessMessage('Login successful!');
            localStorage.setItem('token', data.token); 
            setTimeout(() => {
                navigate('/'); 
            }, 1000); 
        } catch (error) {
            setErrorMessage(error.message);
            setSuccessMessage('');
        }
    };
    return (
        <div>
            <h2>Login</h2>
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
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default LoginPage;
