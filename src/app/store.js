import { configureStore } from '@reduxjs/toolkit';
import accountSlicer from '@features/accountSlicer';
import movieSlicer from '@features/movieSlicer';
import tvSlicer from '@features/tvSlicer';

export const store = configureStore({
  reducer: {
    account: accountSlicer,
    movie: movieSlicer,
    tv: tvSlicer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
});
