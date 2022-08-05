import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Alert } from 'react-native';
import { postApi, getApi } from '@app/api';

const initialState = {
    loading: false,
    trending: [],
};

export const getTrending = createAsyncThunk('MOVIE_GET_TRENDING', async payload => {
    try {
        const res = await postApi('auth/register', payload);
        return true;
    } catch (error) {
        throw error?.response?.data?.detail || error?.message;
    }
});

export const movieSlicer = createSlice({
    name: 'movie',
    initialState,
    reducers: {
        setLoading(state, action) {
            state.loading = action.payload;
        },
    },
    extraReducers: builder => {
        builder.addCase(getTrending.pending, state => {
            state.loading = true;
        }),
            builder.addCase(getTrending.fulfilled, (state, action) => {
                state.loading = false;
                state.trending = action.payload;
            }),
            builder.addCase(getTrending.rejected, (state, action) => {
                state.loading = false;
                state.trending = null;
            })
    },
});

// export const { setLoading } = movieSlicer.actions;
export default movieSlicer.reducer;
