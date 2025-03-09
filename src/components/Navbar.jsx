import { useEffect, useState } from "react";
import React from "react";

const Navbar = ({ isLogged, onLogout }) => {
  const getInitialTheme = () => {
    if (localStorage.getItem("theme")) {
      return localStorage.getItem("theme") === "dark";
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  };

  const [darkMode, setDarkMode] = useState(getInitialTheme);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <>
    <nav className="flex justify-between w-full items-center border-b-transparent fixed top-0 left-0 px-6 py-4 bg-white dark:bg-gray-800 shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Movie Manager</h1>
      <div>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="mr-4 dark:text-slate-950 font-medium px-4 py-2 bg-slate-500 dark:bg-slate-100 text-white rounded hover:bg-slate-600 dark:hover:bg-gray-200 transition"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
        {isLogged && (
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
    </>
  );
};

export default Navbar;
