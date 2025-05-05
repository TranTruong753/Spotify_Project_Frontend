import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAlbumFavorite, getAlbumUser, getAllAlbumByIdUser, loginAccount } from '@/services/AuthenticateServices'
import { Album, Song, User } from '@/types';

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await loginAccount(credentials)
      return response.data
    } catch (err: any) {
      if (err.response && err.response.data) {
        return rejectWithValue(err.response.data)
      }
      return rejectWithValue({ detail: 'Something went wrong' })
    }
  }
)

export const getAlbumsFavorite = createAsyncThunk(
  'auth/getAlbumsFavorite',
  async (id: number, { rejectWithValue }) => { // Chỉ truyền id thay vì đối tượng { id: number }
    try {
      const response = await getAlbumFavorite(id); // Truyền id vào hàm
      return response.data;
    } catch (err: any) {
      if (err.response && err.response.data) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue({ detail: 'Something went wrong' });
    }
  }
);

export const getAlbumsUser = createAsyncThunk(
  'auth/getAlbumsUser',
  async (id: number, { rejectWithValue }) => { // Chỉ truyền id thay vì đối tượng { id: number }
    try {
      const response = await getAlbumUser(id); // Truyền id vào hàm
      return response.data;
    } catch (err: any) {
      if (err.response && err.response.data) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue({ detail: 'Something went wrong' });
    }
  }
);

export const fetchAlbumUserById = createAsyncThunk(
  'auth/fetchAlbumUserById',
  async (userId: number) => {
    const response = await getAllAlbumByIdUser(userId);
    return response;
  }
);



interface AuthState {
  user: User | null
  accessToken: string | null,
  refreshToken: string | null,
  isAuthenticated: boolean,
  error: any | null,
  albums: AlbumCustom[],
  accountAlbums: Album[],
  accountSongs: Song[],
  currentAlbumUser: Album | null
  loading: boolean
}

interface AlbumCustom {
  id: number,
  album: Album
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  error: null,
  albums: [],
  accountAlbums: [],
  accountSongs: [],
  currentAlbumUser: null,
  loading: false,
}



const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      state.accessToken = null
      state.refreshToken = null
      state.isAuthenticated = false
      state.error = null
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        const { user, access, refresh } = action.payload;
        state.user = user;
        state.accessToken = access;
        state.refreshToken = refresh;
        state.isAuthenticated = true;
        state.error = null;

        localStorage.setItem('accessToken', access);
        localStorage.setItem('refreshToken', refresh);
      })

      .addCase(login.rejected, (state, action: any) => {
        state.error = action.payload
      })

      .addCase(getAlbumsFavorite.fulfilled, (state, action) => {
        state.albums = action.payload;
      })

      .addCase(getAlbumsUser.fulfilled, (state, action) => {
        state.accountAlbums = action.payload;
      })

      .addCase(fetchAlbumUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAlbumUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentAlbumUser = action.payload;
      })
      .addCase(fetchAlbumUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch album";
      });
  }
})

export const { logout } = authSlice.actions
export default authSlice.reducer
