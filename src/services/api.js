import axios from "axios";

const BASE_URL = "https://67a46e0e31d0d3a6b78652f0.mockapi.io/api/movies"; 


export const getMovies = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const addMovie = async (movie) => {
  const response = await axios.post(BASE_URL, movie);
  return response.data;
};


export const deleteMovie = async (movieId) => {
  await axios.delete(`${BASE_URL}/${movieId}`);
};

export const updateMovie = async (movieId, updatedData) => {
    const response = await axios.put(`${BASE_URL}/${movieId}`, updatedData);
    return response.data;
  };
