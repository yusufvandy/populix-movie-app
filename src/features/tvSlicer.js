import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getApi } from '@app/api';
import env from '../../env.config'
const { API_KEY } = env;

const initialState = {
    loading: false,
    popular: []
};

export const getPopular = createAsyncThunk('TV_GET_POPULAR', async () => {
    try {
        const res = await getApi(3, `tv/popular?api_key=${API_KEY}&language=en-US&page=1`);
        return res.data;
    } catch (error) {
        throw error?.response?.data?.detail || error?.message;
    }
});

export const tvSlicer = createSlice({
    name: 'tv',
    initialState,
    reducers: {
        setLoading(state, action) {
            state.loading = action.payload;
        },
    },
    extraReducers: builder => {
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

// export const { setLoading } = tvSlicer.actions;
export default tvSlicer.reducer;
