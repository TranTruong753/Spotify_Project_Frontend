import { configureStore } from "@reduxjs/toolkit";

import albumsReducer from "@/features/albums/albumsSlice";
import artistsReducer from "@/features/artists/artistsSlice";
import songReducer from "@/features/songs/songSlice"
import audioPlayerReducer from "@/features/audioplayer/audioPlayerSlice";

export const store = configureStore({
  reducer: {
    albums: albumsReducer,
    artists: artistsReducer,
    songs: songReducer,
    audioPlayer: audioPlayerReducer
  },
});

// Get the type of our store variable
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore["dispatch"];
