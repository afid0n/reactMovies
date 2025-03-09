import { useState } from "react";
import { addMovie } from "../services/api";
import React from "react";
import Swal from "sweetalert2";

const AddForm = ({ onMovieAdded }) => {
    const [movie, setMovie] = useState({ title: "", imdbRate: "", genre: "", year: "" });
    const [errors, setErrors] = useState({});

    const validate = () => {
        let errs = {};
        if (!movie.title) errs.title = "Title is required";
        if (!movie.imdbRate || movie.imdbRate < 0 || movie.imdbRate > 10) errs.imdbRate = "IMDB rating must be between 0-10";
        if (!movie.genre) errs.genre = "Genre is required";
        if (!movie.year) errs.year = "Release Year is required";
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!validate()) return;
    
        try {
            const newMovie = await addMovie(movie);
    
            onMovieAdded(newMovie);
    
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Movie added successfully",
                showConfirmButton: false,
                timer: 1500,
            });
                setMovie({ title: "", imdbRate: "", genre: "", year: "" });
        } catch (error) {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Failed to add movie",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };
    
    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-6 p-6 bg-white dark:bg-slate-950 shadow-lg rounded-lg">
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Movie Title"
                    value={movie.title}
                    onChange={(e) => setMovie({ ...movie, title: e.target.value })}
                    className="w-full dark:text-slate-200 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
            </div>

            <div className="mb-4">
                <input
                    type="number"
                    placeholder="IMDB Rating (0-10)"
                    value={movie.imdbRate}
                    onChange={(e) => setMovie({ ...movie, imdbRate: e.target.value })}
                    className="w-full dark:text-slate-200 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.imdbRate && <p className="text-red-500 text-sm">{errors.imdbRate}</p>}
            </div>

            <div className="mb-4">
                <select
                    value={movie.genre}
                    onChange={(e) => setMovie({ ...movie, genre: e.target.value })}
                    className="w-full dark:text-slate-200 px-3 py-2 border rounded-lg"
                >
                    <option value="">Select Genre</option>
                    <option value="Action">Action</option>
                    <option value="Drama">Drama</option>
                    <option value="Comedy">Comedy</option>
                    <option value="Thriller">Thriller</option>
                    <option value="Horror">Horror</option>
                    <option value="Romance">Romance</option>
                    <option value="Sci-Fi">Sci-Fi</option>
                    <option value="Fantasy">Fantasy</option>
                    <option value="Adventure">Adventure</option>
                    <option value="Animation">Animation</option>
                    <option value="Mystery">Mystery</option>
                    <option value="Documentary">Documentary</option>
                    <option value="Crime">Crime</option>
                    <option value="Family">Family</option>
                    <option value="Musical">Musical</option>
                    <option value="Biography">Biography</option>
                    <option value="History">History</option>
                    <option value="War">War</option>
                    <option value="Western">Western</option>

                </select>
                {errors.genre && <p className="text-red-500 text-sm">{errors.genre}</p>}
            </div>

            <div className="mb-4">
                <input
                    type="number"
                    placeholder="Release Year"
                    value={movie.year}
                    onChange={(e) => setMovie({ ...movie, year: e.target.value })}
                    className="w-full px-3 dark:text-slate-200 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.year && <p className="text-red-500 text-sm">{errors.year}</p>}
            </div>

            <button type="submit" className="w-full bg-slate-900 dark:bg-white dark:text-slate-900 text-white py-2 rounded-lg hover:bg-slate-950 transition">
                Add Movie
            </button>
        </form>
    );
};

export default AddForm;
