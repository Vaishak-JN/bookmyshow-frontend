import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "./api";

// Add a new theatre
export const AddTheatre = createAsyncThunk("theatres/addTheatre", async (payload) => {
    try {
        const response = await axiosInstance.post(
            "/api/theatres/add-theatre",
            payload
        );
        return payload;
    } catch (error) {
        return error.response;
    }
});
// export const AddTheatre = async (payload) => {
//     try {
//         const response = await axiosInstance.post(
//             "/api/theatres/add-theatre",
//             payload
//         );
//         return response.data;
//     } catch (error) {
//         return error.response;
//     }
// };

// get all theatres
export const GetAllTheatres = createAsyncThunk("theatres/getAllTheatres", async () => {
    try {
        const response = await axiosInstance.get("/api/theatres/get-all-theatres");
        console.log(response.data)
        return response.data;
    } catch (error) {
        return error.response;
    }
});
// export const GetAllTheatres = async () => {
//     try {
//         const response = await axiosInstance.get("/api/theatres/get-all-theatres");
//         return response.data;
//     } catch (error) {
//         return error.response;
//     }
// };

// get all theatres by owner
export const GetAllTheatresByOwner = createAsyncThunk("theatres/getAllTheatresByOwner", async (payload) => {
    try {
        const response = await axiosInstance.post(
            "/api/theatres/get-all-theatres-by-owner",
            payload
        );
        console.log(response.data)
        return response.data;
    } catch (error) {
        return error.response;
    }
});
// export const GetAllTheatresByOwner = async (payload) => {
//     try {
//         const response = await axiosInstance.post(
//             "/api/theatres/get-all-theatres-by-owner",
//             payload
//         );
//         // console.log(response.data)
//         return response.data;
//     } catch (error) {
//         return error.response;
//     }
// };

// update theatre
export const UpdateTheatre = createAsyncThunk("theatres/updateTheatre", async (payload) => {
    try {
        const response = await axiosInstance.post(
            "/api/theatres/update-theatre",
            payload
        );
        return payload;
    } catch (error) {
        return error.response;
    }
});
// export const UpdateTheatre = async (payload) => {
//     try {
//         const response = await axiosInstance.post(
//             "/api/theatres/update-theatre",
//             payload
//         );
//         return response.data;
//     } catch (error) {
//         return error.response;
//     }
// };

// delete theatre
export const DeleteTheatre = createAsyncThunk("theatres/deleteTheatre", async (payload) => {
    try {
        const response = await axiosInstance.post(
            "/api/theatres/delete-theatre",
            payload
        );
        console.log("payload", payload)
        return payload;
    } catch (error) {
        return error.response;
    }
});
// export const DeleteTheatre = async (payload) => {
//     try {
//         const response = await axiosInstance.post(
//             "/api/theatres/delete-theatre",
//             payload
//         );
//         return response.data;
//     } catch (error) {
//         return error.response;
//     }
// };

// add show
export const AddShow = createAsyncThunk("theatres/addShow", async (payload) => {
    try {
        const response = await axiosInstance.post(
            "/api/theatres/add-show",
            payload
        );
        // return payload;
        return response.data.data;
    } catch (error) {
        return error.response;
    }
});
// export const AddShow = async (payload) => {
//     try {
//         const response = await axiosInstance.post(
//             "/api/theatres/add-show",
//             payload
//         );
//         return response.data;
//     } catch (error) {
//         return error.response;
//     }
// };

// get all shows
export const GetAllShowsByTheatre = createAsyncThunk("theatres/getShowsByTheatre", async (payload) => {
    try {
        const response = await axiosInstance.post(
            "/api/theatres/get-all-shows-by-theatre",
            payload
        );
        return response.data;
    } catch (error) {
        return error.response;
    }
});
// export const GetAllShowsByTheatre = async (payload) => {
//     try {
//         const response = await axiosInstance.post(
//             "/api/theatres/get-all-shows-by-theatre",
//             payload
//         );
//         return response.data;
//     } catch (error) {
//         return error.response;
//     }
// };

// delete show
export const DeleteShow = createAsyncThunk("theatre/deleteShow", async (payload) => {
    try {
        const response = await axiosInstance.post(
            "/api/theatres/delete-show",
            payload
        );
        return payload.showId;
        // return response.data;
    } catch (error) {
        return error.response;
    }
});

// get all theatres for a movie
export const GetAllTheatresByMovie = createAsyncThunk("theatres/getAllTheatresByMovie", async (payload) => {
    try {
        const response = await axiosInstance.post(
            "/api/theatres/get-all-theatres-by-movie",
            payload
        );
        return response.data.data;
    } catch (error) {
        return error.response;
    }
});
// export const GetAllTheatresByMovie = async (payload) => {
//     try {
//         const response = await axiosInstance.post(
//             "/api/theatres/get-all-theatres-by-movie",
//             payload
//         );
//         return response.data;
//     } catch (error) {
//         return error.response;
//     }
// };


// get show by id
export const GetShowById = createAsyncThunk("theatres,getShowById", async (payload) => {
    try {
        const response = await axiosInstance.post(
            "/api/theatres/get-show-by-id",
            payload
        );
        return response.data;
    } catch (error) {
        return error.response;
    }
})
// export const GetShowById = async (payload) => {
//     try {
//         const response = await axiosInstance.post(
//             "/api/theatres/get-show-by-id",
//             payload
//         );
//         return response.data;
//     } catch (error) {
//         return error.response;
//     }
// }