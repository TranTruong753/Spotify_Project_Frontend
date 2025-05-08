import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AudioPlayerState {
  currentSongId: string | null;
  isPlaying: boolean;
  currentTime: number;
  volume: number;
  duration: number;
}
const initialState: AudioPlayerState = {
  currentSongId: null,
  isPlaying: false,
  currentTime: 0,
  volume: 1,
  duration: 0,
};

const audioPlayerSlice = createSlice({
  name: 'audioPlayer',
  initialState,
  reducers: {
    setCurrentSong: (state, action: PayloadAction<string>) => {
      state.currentSongId = action.payload;
    },
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    setCurrentTime: (state, action: PayloadAction<number>) => {
      state.currentTime = action.payload;
    },
    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload;
    },
    setDuration: (state, action: PayloadAction<number>) => {
      state.duration = action.payload;
    },
    resetPlayer: (state) => {
      return initialState;
    },
  },
});

export const {
  setCurrentSong,
  setIsPlaying,
  setCurrentTime,
  setVolume,
  setDuration,
  resetPlayer,
} = audioPlayerSlice.actions;

export default audioPlayerSlice.reducer;