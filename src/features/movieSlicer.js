import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Alert } from 'react-native';
import { postApi, getApi } from '@app/api';
import { API_KEY } from "@env"

const initialState = {
    loading: false,
    search: [],
    upcoming: [],
    trending: [],
    popular: [],
    top: [],
    detail: null,
    casts: [],
    similar: [],
    detailAccountState: null
};

export const searchMovie = createAsyncThunk('MOVIE_SEARCH', async (payload) => {
    try {
        const res = await getApi(3, `search/movie?query=${payload.query}&api_key=${API_KEY}&language=en-US&page=1&include_adult=false`);
        return res.data.results;
    } catch (error) {
        throw error?.response?.data?.detail || error?.message;
    }
});

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
        const res = await getApi(3, `trending/movie/day?api_key=${API_KEY}`);
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

export const getTopRated = createAsyncThunk('MOVIE_GET_TOPRATED', async () => {
    try {
        const res = await getApi(3, `movie/top_rated?api_key=${API_KEY}`);
        return res.data;
    } catch (error) {
        throw error?.response?.data?.detail || error?.message;
    }
});
export const getMovieDetail = createAsyncThunk('MOVIE_GET_DETAIL', async (id) => {
    try {
        const res = await getApi(3, `movie/${id}?api_key=${API_KEY}&language=en-US`);
        return res.data;
    } catch (error) {
        throw error?.response?.data?.detail || error?.message;
    }
});

export const getCredits = createAsyncThunk('MOVIE_GET_CREDITS', async (id) => {
    try {
        const res = await getApi(3, `movie/${id}/credits?api_key=${API_KEY}&language=en-US`);
        return res.data.cast.slice(0, 10);
    } catch (error) {
        throw error?.response?.data?.detail || error?.message;
    }
});

export const getSimilar = createAsyncThunk('MOVIE_GET_SIMILAR', async (id) => {
    try {
        const res = await getApi(3, `movie/${id}/similar?api_key=${API_KEY}&language=en-US`);
        return res.data.results.slice(0, 6);
    } catch (error) {
        throw error?.response?.data?.detail || error?.message;
    }
});

export const getAccountStates = createAsyncThunk('MOVIE_GET_ACCOUNT_STATES', async (id) => {
    try {
        const res = await getApi(3, `movie/${id}/account_states`);
        return res.data
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
        builder.addCase(searchMovie.pending, state => {
            state.loading = true;
        }),
            builder.addCase(searchMovie.fulfilled, (state, action) => {
                state.loading = false;
                state.search = action.payload;
            }),
            builder.addCase(searchMovie.rejected, (state, action) => {
                state.loading = false;
                state.search = [];
            }),
            builder.addCase(getUpcoming.pending, state => {
                state.loading = true;
            }),
            builder.addCase(getUpcoming.fulfilled, (state, action) => {
                state.loading = false;
                state.upcoming = action.payload.results;
            }),
            builder.addCase(getUpcoming.rejected, (state, action) => {
                state.loading = false;
                state.upcoming = [];
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
                state.trending = [];
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
                state.popular = [];
            }),
            builder.addCase(getTopRated.pending, state => {
                state.loading = true;
            }),
            builder.addCase(getTopRated.fulfilled, (state, action) => {
                state.loading = false;
                state.top = action.payload.results;
            }),
            builder.addCase(getTopRated.rejected, (state, action) => {
                state.loading = false;
                state.top = [];
            }),
            builder.addCase(getMovieDetail.pending, state => {
                state.loading = true;
            }),
            builder.addCase(getMovieDetail.fulfilled, (state, action) => {
                state.loading = false;
                state.detail = action.payload;
            }),
            builder.addCase(getMovieDetail.rejected, (state, action) => {
                state.loading = false;
                state.detail = null;
            }),
            builder.addCase(getCredits.pending, state => {
                state.loading = true;
            }),
            builder.addCase(getCredits.fulfilled, (state, action) => {
                state.loading = false;
                state.casts = action.payload;
            }),
            builder.addCase(getCredits.rejected, (state, action) => {
                state.loading = false;
                state.casts = [];
            }),
            builder.addCase(getSimilar.pending, state => {
                state.loading = true;
            }),
            builder.addCase(getSimilar.fulfilled, (state, action) => {
                state.loading = false;
                state.similar = action.payload;
            }),
            builder.addCase(getSimilar.rejected, (state, action) => {
                state.loading = false;
                state.similar = [];
            }),
            builder.addCase(getAccountStates.pending, state => {
                state.loading = true;
            }),
            builder.addCase(getAccountStates.fulfilled, (state, action) => {
                state.loading = false;
                state.detailAccountState = action.payload;
            }),
            builder.addCase(getAccountStates.rejected, (state, action) => {
                state.loading = false;
                state.detailAccountState = [];
            })
    },
});

// export const { setLoading } = movieSlicer.actions;
export default movieSlicer.reducer;
