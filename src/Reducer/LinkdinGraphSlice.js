import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../store/Api";
import linkedInScraperApi from "../store/LinkedInScraperApi";

// Resume Graph Data Fetch
export const fetchLinkdinGraph = createAsyncThunk(
    "linkdinGraph/fetchLinkdinGraph",
    async (_, { rejectWithValue }) => {
        try {
            const response = await linkedInScraperApi.get("/api/admin/dashboard/linkedin-create-graph");
            console.log("linkdinGraph response", response);

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

const linkdinGraphSlice = createSlice({
    name: "linkdinGraph",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Pending
            .addCase(fetchLinkdinGraph.pending, (state) => {
                state.loading = true;
            })
            // Fulfilled
            .addCase(fetchLinkdinGraph.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.graphData = payload.data; // <-- use payload.data
                state.error = "";
                state.message = payload.message;
            })

            // Rejected
            .addCase(fetchLinkdinGraph.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = true;
                state.message =
                    payload !== undefined && payload.message
                        ? payload.message
                        : "Something went wrong. Try again later.";
            });
    },
});

export default linkdinGraphSlice.reducer;
