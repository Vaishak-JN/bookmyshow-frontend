import { createSlice } from "@reduxjs/toolkit";
import { GetAllMovies, GetMovieById, UpdateMovie } from "../api/movies";

const moviesSlice = createSlice({
    name: "movies",
    initialState: {
        movies: [],
        movieById: {}
    },
    reducers: {
        SetMovieById: (state, action) => {
            state.movieById = {}
        }
    },
    extraReducers: (builder) => {
        builder.addCase(GetAllMovies.fulfilled, (state, action) => {
            state.movies = action.payload
        })
        builder.addCase(UpdateMovie.fulfilled, (state, action) => {
            state.movies = state.movies.map((movie) => {
                if (movie.id === action.payload.id) {
                    return { ...action.payload }
                } else {
                    return movie
                }
            })
        })
        builder.addCase(GetMovieById.fulfilled, (state, action) => {
            state.movieById = action.payload
        })
    }
});


export const { SetMovieById } = moviesSlice.actions
export default moviesSlice.reducer;