import React from "react";

const Login = ({ onLogin }) => {
    return (
        <>
        <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
            <div className="bg-white dark:bg-slate-800 p-6 shadow-lg rounded-s  flex-col items-center justify-center ">
                <h1 className="text-slate-900 dark:text-white font-bold text-4xl m-2">Movie Manager App</h1>
                <p className="dark:text-slate-500 text-m m-4">Please log in to manage your movie collection.</p>
                <button
                    onClick={onLogin}
                    className="w-full dark:bg-white font-bold dark:text-slate-800 px-6 py-3 bg-slate-900 text-white rounded-lg shadow-md hover:bg-slate-950 transition"
                >
                    Log In
                </button>
            </div>
        </div>
        </>
    );
};

export default Login;
