import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postApi, getApi } from '@app/api';

const initialState = {
    loading: false,
    request_token: null,
    access_token: null,
    account_id: null,
};

export const postRequestToken = createAsyncThunk('ACCOUNT_POST_REQUEST_TOKEN', async () => {
    try {
        const res = await postApi(4, `auth/request_token`, { redirect_to: 'http://www.themoviedb.org/' });
        return res.data;
    } catch (error) {
        throw error?.response?.data?.detail || error?.message;
    }
});

export const postAccessToken = createAsyncThunk('ACCOUNT_POST_ACCESS_TOKEN', async () => {
    const request_token = await AsyncStorage.getItem('request_token')
    try {
        const res = await postApi(4, `auth/access_token`, { request_token: request_token });
        return res.data;
    } catch (error) {
        throw error?.response?.data?.detail || error?.message;
    }
});

export const logout = createAsyncThunk('AUTH_LOGOUT', () => {
    console.log('Logout called!')
    AsyncStorage.clear();
});

export const accountSlicer = createSlice({
    name: 'account',
    initialState,
    reducers: {
        setLoading(state, action) {
            state.loading = action.payload;
        },
    },
    extraReducers: builder => {
        builder.addCase(postRequestToken.pending, state => {
            state.loading = true;
        }),
            builder.addCase(postRequestToken.fulfilled, (state, action) => {
                state.loading = false;
                state.request_token = action.payload.request_token;
                AsyncStorage.setItem('request_token', action.payload.request_token);
            }),
            builder.addCase(postRequestToken.rejected, (state, action) => {
                state.loading = false;
                state.request_token = null;
                AsyncStorage.removeItem('request_token');
            }),
            builder.addCase(postAccessToken.pending, state => {
                state.loading = true;
            }),
            builder.addCase(postAccessToken.fulfilled, (state, action) => {
                state.loading = false;
                state.request_token = action.payload.request_token;
                state.account_id = action.payload.account_id;
                AsyncStorage.setItem('access_token', action.payload.access_token);
                AsyncStorage.setItem('account_id', action.payload.account_id);
            }),
            builder.addCase(postAccessToken.rejected, (state, action) => {
                state.loading = false;
                state.request_token = null;
                state.account_id = null;
                AsyncStorage.removeItem('access_token');
                AsyncStorage.removeItem('account_id');
            }),
            builder.addCase(logout.fulfilled, state => {
                state.loading = false;
                state.request_token = null;
                state.access_token = null;
                state.account_id = null;
                AsyncStorage.removeItem('request_token');
                AsyncStorage.removeItem('access_token');
                AsyncStorage.removeItem('account_id');
            })
    },
});

export const { setLoading } = accountSlicer.actions;
export default accountSlicer.reducer;
