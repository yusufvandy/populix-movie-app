import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postApi, getApi } from '@app/api';
import { API_KEY } from "@env"

const initialState = {
    loading: true,
    favorites: [],
    watchlist: [],
    list: [],
    listDetail: null
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

export const getList = createAsyncThunk('PROFILE_GET_LIST', async () => {
    const account_id = await AsyncStorage.getItem('account_id');
    try {
        const res = await getApi(4, `account/${account_id}/lists?page=1`);
        return res.data.results;
    } catch (error) {
        throw error?.response?.data?.detail || error?.message;
    }
});

export const getListDetail = createAsyncThunk('PROFILE_GET_LIST_DETAIL', async (payload) => {
    try {
        const res = await getApi(4, `list/${payload.id}?page=1&api_key=${API_KEY}`);
        return res.data;
    } catch (error) {
        throw error?.response?.data?.detail || error?.message;
    }
});

export const postList = createAsyncThunk('PROFILE_POST_LIST', async (payload) => {
    const access_token = await AsyncStorage.getItem('access_token');
    try {
        const res = await postApi(4, `list`, payload, access_token);
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
                state.favorites = [];
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
                state.watchlist = [];
            }),
            builder.addCase(markWatchlist.pending, state => {
                state.loading = true;
            }),
            builder.addCase(markWatchlist.fulfilled, (state, action) => {
                state.loading = false;
            }),
            builder.addCase(markWatchlist.rejected, (state, action) => {
                state.loading = false;
            }),
            builder.addCase(getList.pending, state => {
                state.loading = true;
            }),
            builder.addCase(getList.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            }),
            builder.addCase(getList.rejected, (state, action) => {
                state.loading = false;
                state.list = []
            }),
            builder.addCase(getListDetail.pending, state => {
                state.loading = true;
            }),
            builder.addCase(getListDetail.fulfilled, (state, action) => {
                state.loading = false;
                state.listDetail = action.payload;
            }),
            builder.addCase(getListDetail.rejected, (state, action) => {
                state.loading = false;
                state.listDetail = []
            }),
            builder.addCase(postList.pending, state => {
                state.loading = true;
            }),
            builder.addCase(postList.fulfilled, (state, action) => {
                state.loading = false;
            }),
            builder.addCase(postList.rejected, (state, action) => {
                state.loading = false;
            })
    },
});

// export const { setLoading } = profileSlicer.actions;
export default profileSlicer.reducer;
