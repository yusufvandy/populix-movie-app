import { configureStore } from '@reduxjs/toolkit';
import accountSlicer from '@features/accountSlicer';
import movieSlicer from '@features/movieSlicer';
import profileSlicer from '@features/profileSlicer';

export const store = configureStore({
  reducer: {
    account: accountSlicer,
    movie: movieSlicer,
    profile: profileSlicer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
});
