import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Alert } from 'react-native';
import { postApi, getApi } from '@app/api';
import { API_KEY } from "@env"

const initialState = {
    loading: false,
    upcoming: [],
    trending: [],
    popular: []
};

export const getUpcoming = createAsyncThunk('MOVIE_GET_UPCOMING', async () => {
    try {
        const res = await getApi(3, `movie/upcoming?api_key=${API_KEY}`);
        return res.data;
    } catch (error) {
        throw error?.response?.data?.detail || error?.message;
    }
});

export const getTrending = createAsyncThunk('MOVIE_GET_TRENDING', async () => {
    try {
        const res = await getApi(3, `trending/all/day?api_key=${API_KEY}`);
        return res.data;
    } catch (error) {
        throw error?.response?.data?.detail || error?.message;
    }
});

export const getPopular = createAsyncThunk('MOVIE_GET_POPULAR', async () => {
    try {
        const res = await getApi(3, `movie/popular?api_key=${API_KEY}`);
        return res.data;
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
        builder.addCase(getUpcoming.pending, state => {
            state.loading = true;
        }),
            builder.addCase(getUpcoming.fulfilled, (state, action) => {
                state.loading = false;
                state.upcoming = action.payload.results;
            }),
            builder.addCase(getUpcoming.rejected, (state, action) => {
                state.loading = false;
                state.upcoming = null;
            }),
            builder.addCase(getTrending.pending, state => {
                state.loading = true;
            }),
            builder.addCase(getTrending.fulfilled, (state, action) => {
                state.loading = false;
                state.trending = action.payload.results;
            }),
            builder.addCase(getTrending.rejected, (state, action) => {
                state.loading = false;
                state.trending = null;
            }),
            builder.addCase(getPopular.pending, state => {
                state.loading = true;
            }),
            builder.addCase(getPopular.fulfilled, (state, action) => {
                state.loading = false;
                state.popular = action.payload.results;
            }),
            builder.addCase(getPopular.rejected, (state, action) => {
                state.loading = false;
                state.popular = null;
            })
    },
});

// export const { setLoading } = movieSlicer.actions;
export default movieSlicer.reducer;
