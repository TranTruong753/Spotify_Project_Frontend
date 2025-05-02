import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { getAllSongs, postSong } from '@/services/SongServices'
import { SongApiResponse, Song } from '@/types'



// GET all songs
export const fetchSongs = createAsyncThunk<SongApiResponse, void>(
  'albums/fetchSongs',
  async () => {
    const res = await getAllSongs();
    return {
      results: res.results,  // Mảng album
      count: res.count,      // Tổng số album
    };
  }
);

// POST a new album
export const createSong = createAsyncThunk<Song, FormData>('albums/createSong', async (formData) => {
  const res = await postSong(formData);
  return res;
});


interface SongsState {
  list: Song[]
  loading: boolean
  error: string | null
  count: number
}

const initialState: SongsState = {
  list: [],
  loading: false,
  error: null,
  count: 0,
}

const songSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSongs.pending, (state) => {
        state.loading = true
      })

      .addCase(fetchSongs.fulfilled, (state, action) => {
        // Cập nhật đúng state.list và state.count
        state.list = action.payload.results;  // Chỉ lấy results để lưu vào list
        state.count = action.payload.count;   // Lưu count vào count
        state.loading = false;
      })

      .addCase(fetchSongs.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch albums'
      })

      .addCase(createSong.fulfilled, (state, action) => {
        state.list.push(action.payload)
        state.count += 1;
      })

  }
})

export default songSlice.reducer
