// src/Reducer/jobSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../store/Api";

// Add Job
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

// Edit Job
export const editJob = createAsyncThunk(
  "job/editJob",
  async ({ jobId, jobData }, { rejectWithValue }) => {
    try {
      const payload = { ...jobData, job_id: jobId };
      const response = await api.put(`/api/manage/featured-job/edit`, payload);
      if (response?.data?.status_code === 200) {
        return response.data;
      } else {
        return rejectWithValue(response?.data || { message: "Failed to edit job" });
      }
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

// Fetch Jobs with Pagination
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

// Fetch single job detail
export const fetchJobDetail = createAsyncThunk(
  "job/fetchJobDetail",
  async (jobId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/manage/featured-job/detail/${jobId}`);
      if (response?.data?.status_code === 200) {
        return response.data.data; // job detail
      } else {
        return rejectWithValue(response?.data || { message: "Failed to fetch job detail" });
      }
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

// Job Activation / Deactivation
export const toggleJobActivation = createAsyncThunk(
  "job/toggleJobActivation",
  async ({ id, currentStatus }, { rejectWithValue }) => {
    try {
      const payload = { job_id: id, currentStatus };
      const response = await api.patch(`/api/manage/featured-job/activation`, payload);
      if (response?.data?.status_code === 200) {
        return {
          jobId: id,
          is_active: response.data?.data?.is_active ?? (currentStatus ? 1 : 0),
          message: response.data?.message,
        };
      } else {
        return rejectWithValue(response.data || { message: "Failed to update job status" });
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
  jobs: [],
  pagination: {
    page: 1,
    limit: 10,
    totalPages: 0,
    totalItems: 0,
  },
  jobData: {}, // For add/edit job response
  jobDetail: null, // For single job detail
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
      state.jobDetail = null;
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
    toggleLocalStatus: (state, action) => {
      const jobId = action.payload;
      state.jobs = state.jobs.map((job) =>
        job.id === jobId
          ? { ...job, is_active: job.is_active === 1 ? 0 : 1 }
          : job
      );
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
        // Update jobDetail if editing current job
        if (state.jobDetail && state.jobDetail.id === payload?.data?.id) {
          state.jobDetail = payload.data;
        }
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
          page: payload?.pagination?.current_page || 1,
          limit: payload?.pagination?.limit || 10,
          totalItems: payload?.pagination?.total_count || payload?.data?.length || 0,
          totalPages: payload?.pagination?.total_pages || 1,
        };
      })
      .addCase(fetchJobs.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = true;
        state.jobs = [];
        state.message = payload?.message || "Something went wrong while fetching jobs.";
      })

      // Fetch Job Detail
      .addCase(fetchJobDetail.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.jobDetail = null;
      })
      .addCase(fetchJobDetail.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.jobDetail = payload;
      })
      .addCase(fetchJobDetail.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = true;
        state.message = payload?.message || "Something went wrong while fetching job detail";
      })

      .addCase(toggleJobActivation.pending, (state) => {
        state.loading = true;
      })
      .addCase(toggleJobActivation.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.message = payload?.message || "Job status updated!";
        state.jobs = state.jobs.map((job) =>
          job.id === payload.jobId ? { ...job, is_active: payload.is_active } : job
        );
        if (state.jobDetail && state.jobDetail.id === payload.jobId) {
          state.jobDetail = { ...state.jobDetail, is_active: payload.is_active };
        }
      })
      .addCase(toggleJobActivation.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = true;
        state.message = payload?.message || "Failed to update job status.";
      });
  },
});

export const { resetJobState, resetJobListState, setPage, setLimit, toggleLocalStatus } = jobSlice.actions;
export default jobSlice.reducer;
