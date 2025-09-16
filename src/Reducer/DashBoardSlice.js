import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../store/Api";

// Dashboard Info Thunk
export const dashboardInfo = createAsyncThunk(
    "dashboardInfo",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/api/dashboard/info");

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

// Dashboard Cards Thunk
export const dashboardCards = createAsyncThunk(
    "cards",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/dashboard/counts");
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
    infoData: [],
    dashboardData: [],
};

const DashBoardSlice = createSlice({
    name: "dashboards",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //  Dashboard Cards
            .addCase(dashboardCards.pending, (state) => {
                state.cardsLoading = true;
                state.error = null;
            })
            .addCase(dashboardCards.fulfilled, (state, { payload }) => {
                state.cardsLoading = false;
                state.dashboardData = payload;
                state.error = false;
            })
            .addCase(dashboardCards.rejected, (state, { payload }) => {
                state.cardsLoading = false;
                state.error = true;
                state.message =
                    payload?.message || "Something went wrong. Try again later.";
            })

            //  Dashboard Info
            .addCase(dashboardInfo.pending, (state) => {
                state.infoLoading = true;
                state.error = null;
                state.message = null;
            })
            .addCase(dashboardInfo.fulfilled, (state, { payload }) => {
                state.infoLoading = false;
                state.infoData = payload;
                state.error = false;
            })
            .addCase(dashboardInfo.rejected, (state, { payload }) => {
                state.infoLoading = false;
                state.error = true;
                state.message =
                    payload?.message || "Something went wrong. Try again later.";
            });
    },
});

export default DashBoardSlice.reducer;
