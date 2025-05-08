import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAlbumFavorite, getAlbumUser, getAllAlbumByIdUser, loginAccount, postAlbumUser, postAlbumUserSong } from '@/services/AuthenticateServices'
import { Album, Artist, Song, User, Video } from '@/types';


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


// POST a new album user
export const createAlbumUser = createAsyncThunk<Album, FormData>('auth/createAlbumUser', async (formData) => {
  const res = await postAlbumUser(formData);
  return res;
});


export const addAlbumUserSong = createAsyncThunk<Album, FormData>('auth/addAlbumUserSong', async (formData) => {
  const res = await postAlbumUserSong(formData);
  return res;
});






interface AuthState {
  user: User | null
  accessToken: string | null,
  refreshToken: string | null,
  isAuthenticated: boolean,
  error: any | null,
  albums: AlbumCustom[],
  accountAlbums: Album[],
  accountSongs: Song[],
  currentAlbumUser: AlbumAccount | null
  loading: boolean
}

interface AlbumCustom {
  id: number,
  album: Album
}

interface AlbumAccount {
  id: number,
  album_user_song: UserSong[],
  name: string,
  description: string,
  img_url: string,
  account: number
}

interface UserSong {
  id: number,
  song: SongCustom,
	created_at: string;

}

interface SongCustom {
  id: number,
  name: string,
  album: Album,
  video: Video,
  song_singers: ArtistCustom[]
  audio_url: string;
	img_url: string;
	duration: number;
	lyrics: string;
	genre: string;
  created_at: string;
}

interface ArtistCustom {
  artist: Artist;
}

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  accessToken: localStorage.getItem('accessToken'),
  refreshToken: localStorage.getItem('refreshToken'),
  isAuthenticated: !!localStorage.getItem('accessToken'),
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
      localStorage.removeItem('user');

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
        localStorage.setItem('user', JSON.stringify(user));

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
      })

        .addCase(createAlbumUser.fulfilled, (state, action) => {
        state.accountAlbums.push(action.payload)
      })
}
})

export const { logout } = authSlice.actions
export default authSlice.reducer
