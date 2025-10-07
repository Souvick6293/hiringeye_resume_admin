import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../store/Api";
import linkedInScraperApi from "../store/LinkedInScraperApi";

// Dashboard Info Thunk
export const linkdinDashboardInfo = createAsyncThunk(
    "linkdinDashboardInfo",
    async (_, { rejectWithValue }) => {
        try {
            const response = await linkedInScraperApi.get("/api/admin/dashboard/info");

            if (response?.data?.status_code === 200) {
                return response.data;
            } else {
                return rejectWithValue(
                    response?.data?.errors || "Something went wrong."
                );
            }
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);


const initialState = {
    infoLoading: false,
    cardsLoading: false,
    error: null,
    message: null,
    linkdinInfoData: [],
    dashboardData: [],
};

const linkdinDashboardSlice = createSlice({
    name: "linkdinDashboardInfo",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            //  Dashboard Info
            .addCase(linkdinDashboardInfo.pending, (state) => {
                state.infoLoading = true;
                state.error = null;
                state.message = null;
            })
            .addCase(linkdinDashboardInfo.fulfilled, (state, { payload }) => {
                state.infoLoading = false;
                state.linkdinInfoData = payload;
                state.error = false;
            })
            .addCase(linkdinDashboardInfo.rejected, (state, { payload }) => {
                state.infoLoading = false;
                state.error = true;
                state.message =
                    payload?.message || "Something went wrong. Try again later.";
            });
    },
});

export default linkdinDashboardSlice.reducer;
