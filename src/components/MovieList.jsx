import { useState, useEffect } from "react";
import { getMovies, deleteMovie,addMovie } from "../services/api";
import EditForm from "./EditForm";
import React from "react";
import Swal from "sweetalert2";

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [editingMovie, setEditingMovie] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedGenre, setSelectedGenre] = useState("All");
    const [sortOrder, setSortOrder] = useState("asc");

    useEffect(() => {
        const fetchMovies = async () => {
            const data = await getMovies();
            setMovies(data);
        };
        fetchMovies();
    }, []);

 


    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await deleteMovie(id)
                setMovies(movies.filter((movie) => movie.id !== id));
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        });
    };

    const handleEdit = (movie) => {
        setEditingMovie(movie);
    };

    const handleUpdate = (updatedMovie) => {
        setMovies(movies.map((m) => (m.id === updatedMovie.id ? updatedMovie : m)));
        setEditingMovie(null);
    };


    const filteredMovies = movies.filter((movie) => {
        return (
            movie.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedGenre === "All" || movie.genre === selectedGenre)
        );
    });


    const sortedMovies = filteredMovies.sort((a, b) => {
        return sortOrder === "asc" ? a.year - b.year : b.year - a.year;
    });


    const genres = [...new Set(movies.map((movie) => movie.genre)), "All"];

    return (<>
        <div className="bg-white px-4 py-2 mt-4 dark:bg-slate-950">
            <h2 className=" dark:text-slate-100 mb-4 font-medium text-xl">Your movies</h2>

            <div className="flex gap-3 items-center justify-around">
                <input
                    type="text"
                    placeholder="Search by title..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full  dark:text-slate-400 rounded  border p-2 mb-4"
                />


                <select
                    value={selectedGenre}
                    onChange={(e) => setSelectedGenre(e.target.value)}
                    className=" w-full  dark:text-slate-400 rounded  border p-2 mb-4"
                >
                    {genres.map((genre) => (
                        <option key={genre} value={genre}>
                            {genre}
                        </option>
                    ))}
                </select>

                <button
                    onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                    className="w-full  dark:bg-white  dark:text-slate-900 rounded bg-slate-900 text-white px-4 py-2 mb-4"
                >
                    Sort by Year ({sortOrder === "asc" ? "Ascending" : "Descending"})
                </button>
            </div>

            {editingMovie ? (
                <EditForm movie={editingMovie} onUpdate={handleUpdate} onCancel={() => setEditingMovie(null)} />
            ) : (
                sortedMovies.map((movie) => (
                    <div key={movie.id} className="flex border dark:text-slate-500 rounded p-4 mb-2 items-center justify-between">
                        <div>
                            <h3 className="font-medium dark:text-slate-100">{movie.title}</h3>
                            <div className="flex gap-2 dark:text-slate-200">
                                <p>IMDb: {movie.imdbRate}</p>
                                <p>Genre: {movie.genre}</p>
                                <p>Year: {movie.year}</p>
                            </div>
                        </div>

                        <div>
                            <button onClick={() => handleEdit(movie)} className="bg-slate-500 rounded text-white px-2 py-1 mr-2">
                                Edit
                            </button>
                            <button onClick={() => handleDelete(movie.id)} className="bg-red-500 rounded text-white px-2 py-1">
                                Delete
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    </>
    );
};

export default MovieList;
