import { createSlice } from "@reduxjs/toolkit";
import { AddTheatre, DeleteTheatre, GetAllTheatres, GetAllTheatresByOwner, UpdateTheatre, AddShow, GetAllShowsByTheatre, DeleteShow, GetAllTheatresByMovie, GetShowById } from "../api/theatres";

const theatresSlice = createSlice({
    name: "theatres",
    initialState: {
        theatres: [],
        shows: [],
        theatresByMovie: [],
        showById: {}
    },
    reducers: {
        ResetTheatres: (state, action) => {
            state.theatresByMovie = []
        },
        ResetTheatresShow: (state, action) => {
            state.showById = {}
        }
    },
    extraReducers: (builder) => {
        builder.addCase(GetAllTheatres.fulfilled, (state, action) => {
            state.theatres = action.payload.data
        })
        builder.addCase(AddTheatre.fulfilled, (state, action) => {
            state.theatres.unshift(action.payload)
        })
        builder.addCase(GetAllTheatresByOwner.fulfilled, (state, action) => {
            state.theatres = action.payload.data
        })
        builder.addCase(UpdateTheatre.fulfilled, (state, action) => {
            state.theatres = state.theatres.map((theatre) => {
                if (theatre._id === action.payload.theatreId) {
                    return action.payload
                } else {
                    return theatre
                }
            })
        })
        builder.addCase(DeleteTheatre.fulfilled, (state, action) => {
            state.theatres = state.theatres.filter(theatre => theatre._id !== action.payload.theatreId)
        })
        builder.addCase(AddShow.fulfilled, (state, action) => {
            state.shows.unshift(action.payload)
        })
        builder.addCase(GetAllShowsByTheatre.fulfilled, (state, action) => {
            state.shows = action.payload.data
        })
        builder.addCase(DeleteShow.fulfilled, (state, action) => {
            state.shows = state.shows.filter(show => show._id !== action.payload)
        })
        builder.addCase(GetAllTheatresByMovie.fulfilled, (state, action) => {
            state.theatresByMovie = action.payload
        })
        builder.addCase(GetShowById.fulfilled, (state, action) => {
            state.showById = action.payload.data
        })
    }
});

export const { ResetTheatres, ResetTheatresShow } = theatresSlice.actions

export default theatresSlice.reducer;