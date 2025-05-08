import { createSlice, createAsyncThunk, PayloadAction, ThunkDispatch } from '@reduxjs/toolkit'
import { deleteSong, getAllSongs, postSong, searchSong } from '@/services/SongServices'
import { SongApiResponse, Song, User } from '@/types'
import { patchSong } from '@/services/SongServices';
import { searchAccount } from '@/services/AuthenticateServices';



// GET all songs
export const fetchSongs = createAsyncThunk<SongApiResponse, void>(
  'songs/fetchSongs',
  async () => {
    const res = await getAllSongs();
    return {
      results: res.results,  // Mảng album
      count: res.count,      // Tổng số album
    };
  }
);

// POST a new album
export const createSong = createAsyncThunk<Song, FormData>(
  'songs/createSong',
  async (formData, { dispatch }) => {
    const res = await postSong(formData);

    // Gọi lại danh sách bài hát sau khi tạo thành công
    dispatch(fetchSongs());

    return res;
  }
);

// UPDATE an album
export const updateSong = createAsyncThunk<Song, { id: number; formData: FormData }>(
  'songs/updateVideo',
  async ({ id, formData }, { dispatch }) => {
    const res = await patchSong(id, formData);
    dispatch(fetchSongs()); // gọi lại danh sách bài hát
    return res;
  }
);

// DELETE an song by id
export const deleteSongs = createAsyncThunk<number, { id: number }>(
  'songs/deleteSong',
  async ({ id }) => {
    await deleteSong(id);
    return id;
  }
);


// SEARCH 
export const fetchSearchSongs = createAsyncThunk<SongApiResponse, {key: string | null}>(
  'songs/fetchSearchSongs',
  async ({key}) => {
    const res = await searchSong(key);
    return {
      results: res.results,  // Mảng album
      count: res.count,      // Tổng số album
    };
  }
);

// SEARCH 
export const fetchSearchAccount = createAsyncThunk<User[], {key: string | null}>(
  'auth/fetchSearchSongs',
  async ({key}) => {
    const res = await searchAccount(key);
    return res
  }
);



interface SongsState {
  list: Song[]
  loading: boolean
  error: string | null
  count: number
  listSearch: Song[],
  listAccountSearch: User[],
}

const initialState: SongsState = {
  list: [],
  loading: false,
  error: null,
  count: 0,
  listSearch: [],
  listAccountSearch: []
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

      .addCase(fetchSearchSongs.pending, (state) => {
        state.loading = true
      })

      .addCase(fetchSearchSongs.fulfilled, (state, action) => {
        // Cập nhật đúng state.list và state.count
        state.listSearch = action.payload.results;  // Chỉ lấy results để lưu vào list
     
        state.loading = false;
      })

      .addCase(fetchSearchSongs.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch albums'
      })


      .addCase(fetchSearchAccount.fulfilled, (state, action) => {
        state.listAccountSearch = action.payload;  // Chỉ lấy results để lưu vào list
     
      })


     
      .addCase(deleteSongs.fulfilled, (state, action) => {
        state.list = state.list.filter(song => song.id !== action.payload);
        state.count -= 1;
      })
  }
})

export default songSlice.reducer

