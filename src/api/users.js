
import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "./api";
import { SetUser } from "../redux/usersSlice";
import { useDispatch } from "react-redux";

// Register a new user
export const RegisterUser = async (payload) => {
    try {
        const response = await axiosInstance.post("/api/users/register", payload);
        return response.data;
    } catch (error) {
        return error.response;
    }
};

// Login a user
export const LoginUser = createAsyncThunk("users/loginUser", async (payload) => {
    try {
        const response = await axiosInstance.post("/api/users/login", payload);
        localStorage.setItem("token", response.data.data)
        return response.data;
    } catch (error) {
        return error.response;
    }
})

// Get current user
export const GetCurrentUser = createAsyncThunk("users/get-current-user", async (payload) => {
    try {
        const response = await axiosInstance.get("/api/users/get-current-user", payload);
        return response.data;

    } catch (error) {
        return error;
    }
})
// export const GetCurrentUser = async (payload) => {
//     try {
//         const response = await axiosInstance.get("/api/users/get-current-user", payload);
//         return response.data;

//     } catch (error) {
//         return error;
//     }
// }