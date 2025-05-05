// store/playerSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Song } from "@/types";
import { RootState } from "@/app/store";

interface PlayerState {
  currentSong: Song | null;
  isPlaying: boolean;
  queue: Song[];
  currentIndex: number;
}

const initialState: PlayerState = {
  currentSong: null,
  isPlaying: false,
  queue: [],
  currentIndex: -1,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    initializeQueue: (state, action: PayloadAction<Song[]>) => {
      state.queue = action.payload;
      state.currentSong = state.currentSong || action.payload[0];
      if (state.currentIndex === -1) state.currentIndex = 0;
    },

    playAlbum: (state, action: PayloadAction<{ songs: Song[]; startIndex?: number }>) => {
      const { songs, startIndex = 0 } = action.payload;
      if (songs.length === 0) return;
      const song = songs[startIndex];
      state.queue = songs;
      state.currentSong = song;
      state.currentIndex = startIndex;
      state.isPlaying = true;
    },

    setCurrentSong: (state, action: PayloadAction<Song | null>) => {
      const song = action.payload;
      if (!song) return;
      const index = state.queue.findIndex((s) => s.id === song.id);
      state.currentSong = song;
      state.isPlaying = true;
      state.currentIndex = index !== -1 ? index : state.currentIndex;
    },

    togglePlay: (state) => {
      state.isPlaying = !state.isPlaying;
    },

    playNext: (state) => {
      const nextIndex = state.currentIndex + 1;
      if (nextIndex < state.queue.length) {
        const song = state.queue[nextIndex];
        state.currentSong = song;
        state.currentIndex = nextIndex;
        state.isPlaying = true;
      } else {
        state.isPlaying = false;
      }
    },

    playPrevious: (state) => {
      const prevIndex = state.currentIndex - 1;
      if (prevIndex >= 0) {
        const song = state.queue[prevIndex];
        state.currentSong = song;
        state.currentIndex = prevIndex;
        state.isPlaying = true;
      } else {
        state.isPlaying = false;
      }
    },
  },
});

export const {
  initializeQueue,
  playAlbum,
  setCurrentSong,
  togglePlay,
  playNext,
  playPrevious,
} = playerSlice.actions;

export const selectPlayer = (state: RootState) => state.player;

export default playerSlice.reducer;
