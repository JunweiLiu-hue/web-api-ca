import '../login.css'
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getRequestToken, createSession } from '../api/tmdb-api';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async () => {
    const requestToken = await getRequestToken();
    window.location.href = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=${process.env.REACT_APP_TMDB_REDIRECT_URI}`;
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const requestToken = searchParams.get('request_token');
    const approved = searchParams.get('approved');

    if (approved === 'true' && requestToken) {
      createSession(requestToken).then((sessionId) => {
        localStorage.setItem('tmdbSessionId', sessionId); 
        console.log(sessionId);
        navigate('/homePage'); 
      });
    }
  }, [location, navigate]);

  return (
    <div className="login-container">
      <h2>Login</h2>
      <button onClick={handleLogin}>Using TMDB</button>
    </div>
  );
};

export default LoginPage;