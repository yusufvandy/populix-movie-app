import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
};
export const logout = createAsyncThunk('AUTH_LOGOUT', () => {
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
        builder.addCase(logout.fulfilled, state => {
            state.loading = false;
            state.token = null;
            state.user = null;
        });
    },
});

// export const { setLoading } = accountSlicer.actions;
export default accountSlicer.reducer;
