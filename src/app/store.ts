import { configureStore } from "@reduxjs/toolkit";

import albumsReducer from "@/features/albums/albumsSlice";
import artistsReducer from "@/features/artists/artistsSlice";
import songReducer from "@/features/songs/songSlice"
import audioPlayerReducer from "@/features/audioplayer/audioPlayerSlice";
import playerReducer from "@/features/audioplayer/playerSlice";
import authReducer from "@/features/accounts/authSlice";

export const store = configureStore({
  reducer: {
    albums: albumsReducer,
    artists: artistsReducer,
    songs: songReducer,
    audioPlayer: audioPlayerReducer,
    player: playerReducer, 
    auth: authReducer
  },
});

// Get the type of our store variable
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore["dispatch"];
