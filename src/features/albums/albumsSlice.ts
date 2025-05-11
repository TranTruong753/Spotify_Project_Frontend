import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAllAlbums, patchAlbums, postAlbums, deleteAlbums, getAllAlbumById } from '@/services/AlbumServices'
import { Album, AlbumApiResponse } from '@/types'



// GET all albums
export const fetchAlbums = createAsyncThunk<AlbumApiResponse, void>(
  'albums/fetchAlbums',
  async () => {
    const res = await getAllAlbums();
    return {
      results: res.results,  // Mảng album
      count: res.count,      // Tổng số album
    };
  }
);

export const fetchAlbumById = createAsyncThunk(
  'albums/fetchAlbumById',
  async (albumId: number) => {
    const response = await getAllAlbumById(albumId);
    return response;
  }
);

// POST a new album
export const createAlbum = createAsyncThunk<Album, FormData>('albums/createAlbum', async (formData) => {
  const res = await postAlbums(formData);
  return res;
});




// DELETE an album by id
export const deleteAlbum = createAsyncThunk<number, { id: number }>(
  'albums/deleteAlbum',
  async ({ id }) => {
    await deleteAlbums(id);
    return id;
  }
);
// export const deleteAlbum = createAsyncThunk<number, number>('albums/deleteAlbum', async (id) => {
//   await fetch(`/api/albums/${id}`, { method: 'DELETE' })
//   return id // trả về id để xóa trong state
// })

// UPDATE an album
export const updateAlbum = createAsyncThunk<Album, { id: number; formData: FormData }>(
  'albums/updateAlbum',
  async ({ id, formData }) => {
    const res = await patchAlbums(id, formData);
    return res;
  }
);


interface AlbumsState {
  list: Album[]
  loading: boolean
  error: string | null
  count: number
  currentAlbum: Album | null
}

const initialState: AlbumsState = {
  list: [],
  loading: false,
  error: null,
  count: 0,
  currentAlbum: null,
}

const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlbums.pending, (state) => {
        state.loading = true
      })

      .addCase(fetchAlbums.fulfilled, (state, action) => {
        // Cập nhật đúng state.list và state.count
        state.list = action.payload.results;  // Chỉ lấy results để lưu vào list
        state.count = action.payload.count;   // Lưu count vào count
        state.loading = false;
      })
      .addCase(fetchAlbums.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch albums'
      })

      .addCase(createAlbum.fulfilled, (state, action) => {
        state.list.push(action.payload)
        state.count += 1;
      })

      .addCase(updateAlbum.fulfilled, (state, action) => {
        const index = state.list.findIndex(album => album.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })

      .addCase(deleteAlbum.fulfilled, (state, action) => {
        state.list = state.list.filter(album => album.id !== action.payload);
        state.count -= 1;
      })

      .addCase(fetchAlbumById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAlbumById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentAlbum = action.payload;
      })
      .addCase(fetchAlbumById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch album";
      });


    //   .addCase(updateAlbum.fulfilled, (state, action) => {
    //     const index = state.list.findIndex(a => a.id === action.payload.id)
    //     if (index !== -1) {
    //       state.list[index] = action.payload
    //     }
    //   })
  }
})

export default albumsSlice.reducer
