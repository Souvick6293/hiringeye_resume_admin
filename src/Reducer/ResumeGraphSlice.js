import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../store/Api";

// Resume Graph Data Fetch
export const fetchResumeGraph = createAsyncThunk(
    "resumeGraph/fetchResumeGraph",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/api/dashboard/resume-create-graph");
            console.log("resume graph response", response);

            if (response?.data?.success) {
                return response.data; // return the API data as is
            } else {
                return rejectWithValue(response?.data?.message || "Something went wrong.");
            }
        } catch (err) {
            return rejectWithValue(err.message || "Network error");
        }
    }
);


const initialState = {
    loading: false,
    error: "",
    message: "",
    graphData: {},
};

const resumeGraphSlice = createSlice({
    name: "resumeGraph",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Pending
            .addCase(fetchResumeGraph.pending, (state) => {
                state.loading = true;
            })
            // Fulfilled
            .addCase(fetchResumeGraph.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.graphData = payload.data; // <-- use payload.data
                state.error = "";
                state.message = payload.message;
            })

            // Rejected
            .addCase(fetchResumeGraph.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = true;
                state.message =
                    payload !== undefined && payload.message
                        ? payload.message
                        : "Something went wrong. Try again later.";
            });
    },
});

export default resumeGraphSlice.reducer;
