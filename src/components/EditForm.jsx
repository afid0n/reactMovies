import { useState } from "react";
import { updateMovie } from "../services/api"; 
import React from "react";

const EditForm = ({ movie, onUpdate, onCancel }) => {
  const [title, setTitle] = useState(movie.title);
  const [imdbRate, setImdbRate] = useState(movie.imdbRate);
  const [genre, setGenre] = useState(movie.genre);
  const [year, setYear] = useState(movie.year);
  const [error, setError] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!title || imdbRate === "" || !genre || !year) {
      setError("All fields are required!");
      return;
    }

    if (imdbRate < 0 || imdbRate > 10) {
      setError("IMDb rating must be between 0 and 10.");
      return;
    }

    const updatedMovie = { ...movie, title, imdbRate, genre, year };
    await updateMovie(movie.id, updatedMovie);
    onUpdate(updatedMovie); 
  };

  return (
    <div className=" p-4 border rounded bg-gray-100 dark:bg-gray-800">
      <h2 className="text-lg font-bold mb-2">Edit Movie</h2>

      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleUpdate}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="block w-full p-2 border mb-2"
        />

        <input
          type="number"
          value={imdbRate}
          onChange={(e) => setImdbRate(e.target.value)}
          placeholder="IMDb Rating (0-10)"
          className="block w-full p-2 border mb-2"
        />

        <input
          type="text"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          placeholder="Genre"
          className="block w-full p-2 border mb-2"
        />

        <input
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          placeholder="Year"
          className="block w-full p-2 border mb-2"
        />

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
          Update
        </button>
        <button type="button" onClick={onCancel} className="bg-gray-500 text-white px-4 py-2 rounded">
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditForm;
