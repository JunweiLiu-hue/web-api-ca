import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom"; 
import { MoviesContext } from "../contexts/moviesContext";

const LogoutPage = () => {
  const { logout } = useContext(MoviesContext); 
  const navigate = useNavigate(); 

  useEffect(() => {
    logout();
    navigate("/homePage");
  }, [logout, navigate]);

  return (
    <div>
      <h1>Loging out</h1>
    </div>
  );
};

export default LogoutPage;
