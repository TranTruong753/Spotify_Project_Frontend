import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAlbumFavorite, getAlbumUser, getAllAccount, getAllAlbumByIdUser, getSongsFavoriteUser, loginAccount, postAlbumUser, postAlbumUserSong, postSongFavoriteUser } from '@/services/AuthenticateServices'
import { Album, Artist, Song, User, Video } from '@/types';
import { getFriends, getRequestsMakeFriends } from '@/services/FriendsServices';


// GET all albums
export const fetchAccount = createAsyncThunk<User[], void>(
  'albums/fetchAccount',
  async () => {
    const res = await getAllAccount();
    return res;
  }
);


export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      if (credentials.email.trim() === "") return rejectWithValue({ email: 'Vui lòng nhập email!' })
      if (credentials.password.trim() === "") return rejectWithValue({ detail: 'Vui lòng nhập mật khẩu!' })
      const response = await loginAccount(credentials)
      return response.data
    } catch (err: any) {
      if (err.response && err.response.data) {
        return rejectWithValue(err.response.data)
      }
      return rejectWithValue({ detail: 'Đã có lỗi xảy ra!' })
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


export const fetchMusicFavoriteUserById = createAsyncThunk(
  'auth/fetchMusicFavoriteUserById',
  async (id: number, { rejectWithValue }) => { // Chỉ truyền id thay vì đối tượng { id: number }
    try {
      const response = await getSongsFavoriteUser(id); // Truyền id vào hàm
      return response.data;
    } catch (err: any) {
      if (err.response && err.response.data) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue({ detail: 'Something went wrong' });
    }
  }
);


// POST a new album user
export const createAlbumUser = createAsyncThunk<AlbumAccount, FormData>('auth/createAlbumUser', async (formData) => {
  const res = await postAlbumUser(formData);
  return res;
});


export const addAlbumUserSong = createAsyncThunk<Album, FormData>('auth/addAlbumUserSong', async (formData) => {
  const res = await postAlbumUserSong(formData);
  return res;
});

export const addSongInFavoriteUser = createAsyncThunk<listSongFavorite, FormData>('auth/addSongInFavoriteUser', async (formData) => {
  const res = await postSongFavoriteUser(formData);
  return res;
});

export const fetchListFriend = createAsyncThunk(
  'auth/fetchListFriend',
  async () => { // Chỉ truyền id thay vì đối tượng { id: number }

    const response = await getFriends(); // Truyền id vào hàm
    return response;


  }
);


export const fetchListRequestMakeFriend = createAsyncThunk(
  'auth/fetchListRequestMakeFriend',
  async () => { // Chỉ truyền id thay vì đối tượng { id: number }

    const response = await getRequestsMakeFriends(); // Truyền id vào hàm
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
  accountAlbums: AlbumAccount[],
  accountSongs: Song[],
  currentAlbumUser: AlbumAccount | null
  loading: boolean
  listAccount: User[],
  listSongFavorite: listSongFavorite[],
  listFriend: User[],
  listRequestMakeFiend: listRequestMakeFiend[],
}

interface listRequestMakeFiend {
  id: number
  created_at: string;
  sender: User;
  status: string
}

interface listSongFavorite {
  id: number;
  song: Song
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
  listAccount: [],
  listSongFavorite: [],
  listFriend: [],
  listRequestMakeFiend: []

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

    },
    setUserFromGoogle: (state, action) => {
      const { user, accessToken, refreshToken } = action.payload;
      state.user = user;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.isAuthenticated = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(login.fulfilled, (state, action) => {
        const { user, access, refresh } = action.payload;
        state.user = user;
        state.accessToken = access;
        state.refreshToken = refresh;
        state.isAuthenticated = true;
        state.error = null;
        state.loading = false;

        localStorage.setItem('accessToken', access);
        localStorage.setItem('refreshToken', refresh);
        localStorage.setItem('user', JSON.stringify(user));

      })

      .addCase(fetchAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.listAccount = action.payload;
      })
      .addCase(fetchAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch Account";
      })


      .addCase(login.rejected, (state, action: any) => {
        state.loading = false
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
        state.error = action.error.message || "Failed to fetchAlbumUserById";
      })

      .addCase(fetchMusicFavoriteUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMusicFavoriteUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.listSongFavorite = action.payload;
      })
      .addCase(fetchMusicFavoriteUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch song";
      })

      .addCase(fetchListFriend.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchListFriend.fulfilled, (state, action) => {
        state.loading = false;
        state.listFriend = action.payload;
      })
      .addCase(fetchListFriend.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch fetchListFriend";
      })

      .addCase(fetchListRequestMakeFriend.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchListRequestMakeFriend.fulfilled, (state, action) => {
        state.loading = false;
        state.listRequestMakeFiend = action.payload;
      })
      .addCase(fetchListRequestMakeFriend.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch fetchListRequestMakeFriend";
      })




      .addCase(createAlbumUser.fulfilled, (state, action) => {
        state.accountAlbums.push(action.payload)
      })


  }
})

export const { logout, setUserFromGoogle } = authSlice.actions
export default authSlice.reducer
