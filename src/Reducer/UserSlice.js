import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../store/Api";
import serverApi from "../store/ServerApi";

export const getUsers = createAsyncThunk(
  "getUsers",
  async (searchQuery = "", { rejectWithValue }) => {
    try {
      const response = await api.get(
        `/api/user-mange/list?searchQuery=${encodeURIComponent(searchQuery)}`
      );
      if (response?.data?.status_code === 200) {
        return response.data;
      } else {
        return rejectWithValue(response?.data?.errors || "Something went wrong.");
      }
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// export const getUsers = createAsyncThunk(
//     'getUsers',
//     async (searchQuery = '', { rejectWithValue }) => {
//         try {
//             const response = await api.get(`/api/user-mange/list`, {
//                 params: {
//                     searchQuery: searchQuery 
//                 }
//             });

//             if (response?.data?.status_code === 200) {
//                 return response.data;
//             } else {
//                 return rejectWithValue(response?.data?.errors || 'Something went wrong.');
//             }
//         } catch (err) {
//             return rejectWithValue(err);
//         }
//     }
// );

export const userActiveDeactive = createAsyncThunk(
  "userActiveDeactive",
  async (user_id, { rejectWithValue }) => {
    try {
      console.log("Toggling user:", user_id);

      const response = await serverApi.patch("/api/manage-user/user-activation", {
        user_id: user_id,
      });

      console.log("Status updated:", response.data);

      if (response?.data?.status_code === 200) {
        return response.data;
      } else {
        return rejectWithValue(response.data.errors || "Something went wrong.");
      }
    } catch (err) {
      console.error("Toggle error:", err);
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


const initialState = {
    loading: false,
    userData: [],
    error: false
}
const UserSlice = createSlice(
    {
        name: 'users',
        initialState,
        reducers: {},
        extraReducers: (builder) => {
            builder
                .addCase(getUsers.pending, (state) => {
                    state.loading = true
                })
                .addCase(getUsers.fulfilled, (state, { payload }) => {
                    state.loading = false
                    state.userData = payload
                    state.error = false
                })
                .addCase(getUsers.rejected, (state, { payload }) => {
                    state.loading = false
                    state.error = payload
                })
        }
    }
)
export default UserSlice.reducer