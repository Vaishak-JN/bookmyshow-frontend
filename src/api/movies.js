import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "./api";

// Add a new movie
export const AddMovie = async (payload) => {
    try {
        const response = await axiosInstance.post("/api/movies/add-movie", payload);
        return response.data;
    } catch (error) {
        return error.response;
    }
}

// get all movies
export const GetAllMovies = createAsyncThunk("movies/getAllMovies", async () => {
    try {
        const response = await axiosInstance.get("/api/movies/get-all-movies");
        // console.log(response.data.data)
        return response.data.data;
    } catch (error) {
        return error.response;
    }
})

// export const GetAllMovies = async () => {
//     try {
//         const response = await axiosInstance.get("/api/movies/get-all-movies");
//         return response.data;
//     } catch (error) {
//         return error.response;
//     }
// }

// update a movie
export const UpdateMovie = createAsyncThunk("movies/updateMovie", async (payload) => {
    try {
        const response = await axiosInstance.post("/api/movies/update-movie", payload);
        return payload;
    } catch (error) {
        return error.response;
    }
})
// export const UpdateMovie = async (payload) => {
//     try {
//         const response = await axiosInstance.post("/api/movies/update-movie", payload);
//         return response.data;
//     } catch (error) {
//         return error.response;
//     }
// }

// delete a movie
export const DeleteMovie = async (payload) => {
    try {
        const response = await axiosInstance.post("/api/movies/delete-movie", payload);
        return response.data;
    } catch (error) {
        return error.response;
    }
}

// get a movie by id
export const GetMovieById = createAsyncThunk("movies/getMovieById", async (id) => {
    try {
        const response = await axiosInstance.get(`/api/movies/get-movie-by-id/${id}`);
        return response.data.data;
    } catch (error) {
        return error.response;
    }
})