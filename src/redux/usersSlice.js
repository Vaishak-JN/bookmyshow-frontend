import { createSlice } from "@reduxjs/toolkit";
import { GetCurrentUser, LoginUser } from "../api/users";
import { GetBookingsOfUser } from "../api/bookings";

const usersSlice = createSlice({
    name: "users",
    initialState: {
        user: {},
        token: localStorage.getItem("token") || null,
        bookings: []
    },
    reducers: {
        // SetUser: (state, action) => {
        //     state.user = action.payload;
        // },
        SetToken: (state, action) => {
            state.token = action.payload
        },
        ResetState: (state, action) => {
            state.user = ""
            state.token = null
        }
    },

    extraReducers: (builder) => {
        builder.addCase(LoginUser.fulfilled, (state, action) => {
            state.token = action.payload.data
            state.user = action.payload.user
        })
        builder.addCase(GetCurrentUser.fulfilled, (state, action) => {
            state.user = action.payload.data
        })
        builder.addCase(GetBookingsOfUser.fulfilled, (state, action) => {
            console.log(action.payload.data)
            state.bookings = [...action.payload.data]
        })
    }
});

export const { SetUser, SetToken, ResetState } = usersSlice.actions;

export default usersSlice.reducer;