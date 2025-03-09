import { useState, useEffect } from "react";
import React from "react";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import MovieManagement from "./components/MovieManagement";


const App = () => {
  const [isLogged, setIsLogged] = useState(
    localStorage.getItem("isLogged") === "true"
  );
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const handleLogin = () => {
    setIsLogged(true);
    localStorage.setItem("isLogged", "true");
  };

  const handleLogout = () => {
    setIsLogged(false);
    localStorage.setItem("isLogged", "false");
  };

  return (
    <>
      <Navbar isLogged={isLogged} onLogout={handleLogout} darkMode={darkMode} setDarkMode={setDarkMode} />
      {isLogged ? <MovieManagement /> : <Login onLogin={handleLogin} />}
    </>
  );
};

export default App;

