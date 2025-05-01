import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getAllArists } from "@/services/ArtistServices";
import { Artist, ArtistApiResponse } from "@/types";

// GET all albums
export const fetchArtists = createAsyncThunk<ArtistApiResponse, void>(
  "arists/fetchArists",
  async () => {
    const res = await getAllArists();
    return {
      results: res.results, // Mảng album
      count: res.count, // Tổng số album
    };
  }
);

// POST a new album
// export const createAlbum = createAsyncThunk<Album, Album>('albums/createAlbum', async (newAlbum) => {
//   const res = await fetch('/api/albums', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(newAlbum)
//   })
//   return await res.json()
// })

// DELETE an album by id
// export const deleteAlbum = createAsyncThunk<number, number>('albums/deleteAlbum', async (id) => {
//   await fetch(`/api/albums/${id}`, { method: 'DELETE' })
//   return id // trả về id để xóa trong state
// })

// UPDATE an album
// export const updateAlbum = createAsyncThunk<Album, Album>('albums/updateAlbum', async (updatedAlbum) => {
//   const res = await fetch(`/api/albums/${updatedAlbum.id}`, {
//     method: 'PUT',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(updatedAlbum)
//   })
//   return await res.json()
// })

interface AristsState {
  list: Artist[];
  loading: boolean;
  error: string | null;
  count: number;
}

const initialState: AristsState = {
  list: [],
  loading: false,
  error: null,
  count: 0,
};

const artistsSlice = createSlice({
  name: "artists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArtists.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchArtists.fulfilled, (state, action) => {
        // Cập nhật đúng state.list và state.count
        state.list = action.payload.results; // Chỉ lấy results để lưu vào list
        state.count = action.payload.count; // Lưu count vào count
        state.loading = false;
      })
      .addCase(fetchArtists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch albums";
      });

    //   .addCase(createAlbum.fulfilled, (state, action) => {
    //     state.list.push(action.payload)
    //   })

    //   .addCase(deleteAlbum.fulfilled, (state, action) => {
    //     state.list = state.list.filter(album => album.id !== action.payload)
    //   })

    //   .addCase(updateAlbum.fulfilled, (state, action) => {
    //     const index = state.list.findIndex(a => a.id === action.payload.id)
    //     if (index !== -1) {
    //       state.list[index] = action.payload
    //     }
    //   })
  },
});

export default artistsSlice.reducer;
