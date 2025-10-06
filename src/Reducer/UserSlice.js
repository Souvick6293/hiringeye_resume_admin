import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import resumeBuilderAdminApi from "../store/ResumeBuilderAdminApi";
import serverApi from "../store/ServerApi";

export const getUsers = createAsyncThunk(
  "users/getUsers",
  async ({ page, limit, searchQuery, app_id }, { rejectWithValue }) => {
    try {
      const response = await resumeBuilderAdminApi.get(
        `/api/user-mange/list?page=${page}&limit=${limit}&app_id=${app_id}&searchQuery=${encodeURIComponent(searchQuery)}`
      );

      if (response?.data?.status_code === 200) {
        return response.data;
      } else {
        return rejectWithValue(response?.data?.errors || "Something went wrong.");
      }
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const userActiveDeactive = createAsyncThunk(
  "users/userActiveDeactive",
  async (user_id, { rejectWithValue }) => {
    try {
      const response = await serverApi.patch("/api/manage-user/user-activation", {
        user_id: user_id,
      });

      if (response?.data?.status_code === 200) {
        return response.data;
      } else {
        return rejectWithValue(response.data.errors || "Something went wrong.");
      }
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const initialState = {
  loading: false,
  userData: null,
  error: false,
  page: 1,
  limit: 10,
  app_id: 1,
};

const UserSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
    setAppId: (state, action) => {
      state.app_id = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUsers.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userData = payload;
        state.error = false;
      })
      .addCase(getUsers.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const { setPage, setLimit, setAppId } = UserSlice.actions;
export default UserSlice.reducer;
