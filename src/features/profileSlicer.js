import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postApi, getApi } from '@app/api';

const initialState = {
    loading: true,
    favorites: [],
    watchlist: [],
};

export const getFavorite = createAsyncThunk('PROFILE_GET_FAVORITE_MOVIE', async () => {
    const account_id = await AsyncStorage.getItem('account_id');
    try {
        const res = await getApi(4, `account/${account_id}/movie/favorites`);
        return res.data.results;
    } catch (error) {
        throw error?.response?.data?.detail || error?.message;
    }
});

export const markFavorite = createAsyncThunk('PROFILE_POST_FAVORITE_MOVIE', async (payload) => {
    const account_id = await AsyncStorage.getItem('account_id');
    try {
        const res = await postApi(3, `account/${account_id}/favorite`, { media_type: 'movie', media_id: payload.id, favorite: payload.state });
        return res.data;
    } catch (error) {
        throw error?.response?.data?.detail || error?.message;
    }
});

export const getWatchlist = createAsyncThunk('PROFILE_GET_WATCHLIST_MOVIE', async () => {
    const account_id = await AsyncStorage.getItem('account_id');
    try {
        const res = await getApi(4, `account/${account_id}/movie/watchlist`);
        return res.data.results;
    } catch (error) {
        throw error?.response?.data?.detail || error?.message;
    }
});

export const markWatchlist = createAsyncThunk('PROFILE_POST_WATCHLIST_MOVIE', async (payload) => {
    const account_id = await AsyncStorage.getItem('account_id');
    try {
        const res = await postApi(3, `account/${account_id}/watchlist`, { media_type: 'movie', media_id: payload.id, watchlist: payload.state });
        return res.data;
    } catch (error) {
        throw error?.response?.data?.detail || error?.message;
    }
});

export const profileSlicer = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setLoading(state, action) {
            state.loading = action.payload;
        },
    },
    extraReducers: builder => {
        builder.addCase(getFavorite.pending, state => {
            state.loading = true;
        }),
            builder.addCase(getFavorite.fulfilled, (state, action) => {
                state.loading = false;
                state.favorites = action.payload;
            }),
            builder.addCase(getFavorite.rejected, (state, action) => {
                state.loading = false;
                state.favorites = null;
            }),
            builder.addCase(markFavorite.pending, state => {
                state.loading = true;
            }),
            builder.addCase(markFavorite.fulfilled, (state, action) => {
                state.loading = false;
            }),
            builder.addCase(markFavorite.rejected, (state, action) => {
                state.loading = false;
            }),
            builder.addCase(getWatchlist.pending, state => {
                state.loading = true;
            }),
            builder.addCase(getWatchlist.fulfilled, (state, action) => {
                state.loading = false;
                state.watchlist = action.payload;
            }),
            builder.addCase(getWatchlist.rejected, (state, action) => {
                state.loading = false;
                state.watchlist = null;
            }),
            builder.addCase(markWatchlist.pending, state => {
                state.loading = true;
            }),
            builder.addCase(markWatchlist.fulfilled, (state, action) => {
                state.loading = false;
            }),
            builder.addCase(markWatchlist.rejected, (state, action) => {
                state.loading = false;
            })
    },
});

// export const { setLoading } = profileSlicer.actions;
export default profileSlicer.reducer;
