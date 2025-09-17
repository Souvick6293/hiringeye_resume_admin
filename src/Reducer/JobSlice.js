import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../store/Api";

//  Async thunk for adding a job
export const addJob = createAsyncThunk(
  "job/addJob",
  async (jobData, { rejectWithValue }) => {
    try {
      const response = await api.post(`/api/manage/featured-job/add`, jobData);

      if (response?.data?.status_code === 201) {
        return response?.data;
      } else {
        return rejectWithValue(response?.data || { message: "Failed to add job" });
      }
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

// Async thunk for editing a job
export const editJob = createAsyncThunk(
  "job/editJob",
  async ({ jobId, jobData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/api/manage/featured-job/edit/${jobId}`, jobData);

      if (response?.data?.status_code === 200) {
        return response?.data;
      } else {
        return rejectWithValue(response?.data || { message: "Failed to edit job" });
      }
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

// Async thunk for fetching jobs with pagination
export const fetchJobs = createAsyncThunk(
  "job/fetchJobs",
  async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/manage/featured-job/list?page=${page}&limit=${limit}`);

      if (response?.data?.status_code === 200) {
        return response.data;
      } else {
        return rejectWithValue(response?.data || { message: "Failed to fetch jobs" });
      }
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

const initialState = {
  loading: false,
  error: false,
  success: false,
  message: "",
  jobData: {}, // for single job add/edit response
  jobs: [], // for job list
  pagination: {
    page: 1,
    limit: 10,
    totalPages: 0,
    totalItems: 0,
  },
};

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    resetJobState: (state) => {
      state.loading = false;
      state.error = false;
      state.success = false;
      state.message = "";
      state.jobData = {};
    },
    resetJobListState: (state) => {
      state.jobs = [];
      state.pagination = {
        page: 1,
        limit: 10,
        totalPages: 0,
        totalItems: 0,
      };
    },
    setPage: (state, action) => {
      state.pagination.page = action.payload;
    },
    setLimit: (state, action) => {
      state.pagination.limit = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Add Job
      .addCase(addJob.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.success = false;
      })
      .addCase(addJob.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.jobData = payload;
        state.message = payload?.message || "Job added successfully!";
      })
      .addCase(addJob.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = true;
        state.message = payload?.message || "Something went wrong while adding the job.";
      })

      // Edit Job
      .addCase(editJob.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.success = false;
      })
      .addCase(editJob.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.jobData = payload;
        state.message = payload?.message || "Job updated successfully!";
      })
      .addCase(editJob.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = true;
        state.message = payload?.message || "Something went wrong while updating the job.";
      })

      // Fetch Jobs
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.success = false;
      })
      .addCase(fetchJobs.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.jobs = payload?.data || [];
        state.pagination = {
          page: payload?.pagination?.page || 1,
          limit: payload?.pagination?.limit || 10,
          totalPages: payload?.pagination?.totalPages || 0,
          totalItems: payload?.pagination?.totalItems || 0,
        };
      })
      .addCase(fetchJobs.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = true;
        state.jobs = [];
        state.message = payload?.message || "Something went wrong while fetching jobs.";
      });
  },
});

export const { resetJobState, resetJobListState, setPage, setLimit } = jobSlice.actions;
export default jobSlice.reducer;
