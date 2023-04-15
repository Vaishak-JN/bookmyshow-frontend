import { configureStore } from "@reduxjs/toolkit";
import loadersReducer from "./loadersSlice";
import usersReducer from "./usersSlice";
import moviesReducer from "./moviesSlice";
import theatresReducer from "./theatresSlice";

const store = configureStore({
    reducer: {
        loaders: loadersReducer,
        users: usersReducer,
        movies: moviesReducer,
        theatres: theatresReducer
    },
});

export default store;