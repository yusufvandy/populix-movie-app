import { configureStore } from '@reduxjs/toolkit';
import accountSlicer from '@features/accountSlicer';
import movieSlicer from '@features/movieSlicer';
import tvSlicer from '@features/tvSlicer';
import profileSlicer from '@features/profileSlicer';

export const store = configureStore({
  reducer: {
    account: accountSlicer,
    movie: movieSlicer,
    tv: tvSlicer,
    profile: profileSlicer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
});
