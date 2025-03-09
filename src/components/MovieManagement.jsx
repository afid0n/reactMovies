import { useState, useEffect } from "react";
import AddForm from "./AddForm";
import MovieList from "./MovieList";
import { getMovies } from "../services/api";
import React from "react";

const MovieManagement = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const data = await getMovies();
      setMovies(data);
    };
    fetchMovies();
  }, []);

  const handleMovieAdded = async () => {
    const data = await getMovies(); 
    setMovies(data);
  };

  const handleMovieDeleted = (id) => {
    setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id)); 
  };

  const handleMovieUpdated = (updatedMovie) => {
    setMovies((prevMovies) =>
      prevMovies.map((movie) => (movie.id === updatedMovie.id ? updatedMovie : movie))
    ); 
  };

  return (
    <div className="mt-15  p-6 bg-gray-50 dark:bg-gray-900">
        <h1 className="font-bold text-3xl dark:text-slate-200 text-slate-900 text-center">Welcome to My App</h1>
      <AddForm onMovieAdded={handleMovieAdded} />
      <MovieList movies={movies} onDelete={handleMovieDeleted} onUpdate={handleMovieUpdated} />
    </div>
  );
};

export default MovieManagement;
