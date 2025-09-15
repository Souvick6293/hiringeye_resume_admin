import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../store/Api";

export const createAudioForNarator = createAsyncThunk(
    'createAudioForNarator',
    async (user_input, { rejectWithValue }) => {
        try {
            const response = await api.post(`https://audiobookpython.bestworks.cloud/process_pdf_narrator`, user_input);
            if (response?.data?.status_code === 200) {
                return response?.data;
            } else {
                return rejectWithValue(response);
            }
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)

export const createAudioForCharater = createAsyncThunk(
    'createAudioForCharater',
    async (user_input, { rejectWithValue }) => {
        try {
            const response = await api.post(`https://audiobookpython.bestworks.cloud/process_pdf`, user_input);
            if (response?.data?.status_code === 200) {
                return response?.data;
            } else {
                return rejectWithValue(response);
            }
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)

export const createAudioForFinal = createAsyncThunk(
    'createAudioForFinal',
    async (user_input, { rejectWithValue }) => {
        try {
            const response = await api.post(`https://storylimopythonapi.storylimo.com/agent/full-audiobook`, user_input);
            if (response?.data?.status_code === 200) {
                return response?.data;
            } else {
                return rejectWithValue(response);
            }
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)


export const getVoice = createAsyncThunk(
    'getVoice',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get(`https://audiobookpython.bestworks.cloud/get_voices`);
            if (response?.data?.status_code === 200) {
                return response?.data;
            } else {
                return rejectWithValue(response);
            }
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)

export const getVideo = createAsyncThunk(
    'getVideo',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get(`/admin/audiobook/list`);
            if (response?.data?.status_code === 200) {
                return response?.data;
            } else {
                return rejectWithValue(response);
            }
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)

export const createVideo = createAsyncThunk(
    'createVideo',
    async (user_input, { rejectWithValue }) => {
        try {
            const response = await api.post(`/admin/audiobook/create`, user_input);
            if (response?.data?.status_code === 200) {
                return response?.data;
            } else {
                return rejectWithValue(response);
            }
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)
const initialState = {
    videoGenerateLoading: false,
    loading: false,
    narateAudioData: [],
    charAudioData: [],
    finalData: [],
    error: false,
    voice: [],
    videoList: [],
    createVidoData: {}
}
const AddAudioSlice = createSlice(
    {
        name: 'audio',
        initialState,
        reducers: {},
        extraReducers: (builder) => {
            builder
                .addCase(createAudioForNarator.pending, (state) => {
                    state.videoGenerateLoading = true
                })
                .addCase(createAudioForNarator.fulfilled, (state, { payload }) => {
                    state.videoGenerateLoading = false
                    state.narateAudioData = payload
                    state.error = false
                })
                .addCase(createAudioForNarator.rejected, (state, { payload }) => {
                    state.videoGenerateLoading = false
                    state.error = payload
                })
                .addCase(createAudioForCharater.pending, (state) => {
                    state.videoGenerateLoading = true
                })
                .addCase(createAudioForCharater.fulfilled, (state, { payload }) => {
                    state.videoGenerateLoading = false
                    state.charAudioData = payload
                    state.error = false
                })
                .addCase(createAudioForCharater.rejected, (state, { payload }) => {
                    state.videoGenerateLoading = false
                    state.error = payload
                })
                .addCase(createAudioForFinal.pending, (state) => {
                    state.loading = true
                })
                .addCase(createAudioForFinal.fulfilled, (state, { payload }) => {
                    state.loading = false
                    state.finalData = payload
                    state.error = false
                })
                .addCase(createAudioForFinal.rejected, (state, { payload }) => {
                    state.loading = false
                    state.error = payload
                })
                .addCase(getVoice.pending, (state) => {
                    state.loading = true
                })
                .addCase(getVoice.fulfilled, (state, { payload }) => {
                    state.loading = false
                    state.voice = payload
                    state.error = false
                })
                .addCase(getVoice.rejected, (state, { payload }) => {
                    state.loading = false
                    state.error = payload
                })
                .addCase(getVideo.pending, (state) => {
                    state.loading = true
                })
                .addCase(getVideo.fulfilled, (state, { payload }) => {
                    state.loading = false
                    state.videoList = payload
                    state.error = false
                })
                .addCase(getVideo.rejected, (state, { payload }) => {
                    state.loading = false
                    state.error = payload
                })
                .addCase(createVideo.pending, (state) => {
                    state.loading = true
                })
                .addCase(createVideo.fulfilled, (state, { payload }) => {
                    state.loading = false
                    state.createVidoData = payload
                    state.error = false
                })
                .addCase(createVideo.rejected, (state, { payload }) => {
                    state.loading = false
                    state.error = payload
                })
        }
    }
)
export default AddAudioSlice.reducer;