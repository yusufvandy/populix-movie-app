import { configureStore } from '@reduxjs/toolkit';
import movieSlicer from '@features/movieSlicer';
import accountSlicer from '@features/accountSlicer';

export const store = configureStore({
  reducer: {
    movie: movieSlicer,
    account: accountSlicer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
});
