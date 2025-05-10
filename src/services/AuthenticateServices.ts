import { Album, User } from "@/types";
import axios from "axios";


const API_URL = import.meta.env.VITE_API_URL as string;

type regAccountType = {
    email: string,
    password: string,
    full_name: string,
    sex?: string,
    birthday?: string,
    role_id: number
}

type loginAccountType = {
    email: string,
    password: string,
}

export const regAccount = async (data:regAccountType)=> {
    try {
        const response = await axios.post(`${API_URL}/account/register/`,data);
        console.log("regAccount", response.data);  // Kiểm tra dữ liệu trả về
        return response.data;  // Trả về dữ liệu có cấu trúc đúng
    } catch (error) {
        console.log("regAccount", error);
        throw error;
    }
};

export const loginAccount = async (data:loginAccountType)=> {
    try {
        const response = await axios.post(`${API_URL}/account/login/`,data);
        console.log("loginAccount", response.data);  // Kiểm tra dữ liệu trả về
        return response;  // Trả về dữ liệu có cấu trúc đúng
    } catch (error) {
        console.log("loginAccount", error);
        throw error;
    }
};

export const addAlbum = async (data: FormData) => {
    try {
        const response = await axios.post(`${API_URL}/favourite-albums/`,data);
        console.log("addAlbum", response.data);  // Kiểm tra dữ liệu trả về
        return response;  // Trả về dữ liệu có cấu trúc đúng
    } catch (error) {
        console.log("loginAccount", error);
        throw error;
    }
}


export const deleteAlbumFavorite = async (id: number) => {
    try {
        const response = await axios.delete(`${API_URL}/favourite-albums/${id}`);
        console.log("deleteAlbumFavorite", response.data);  // Kiểm tra dữ liệu trả về
        return response;  // Trả về dữ liệu có cấu trúc đúng
    } catch (error) {
        console.log("deleteAlbumFavorite", error);
        throw error;
    }
}


export const getAlbumFavorite = async (id:number) => {
    try {
        const response = await axios.get(`${API_URL}/account/get-favourite-albums/${id}/`);
        console.log("getAlbumFavourite", response.data);  // Kiểm tra dữ liệu trả về
        return response;  // Trả về dữ liệu có cấu trúc đúng
    } catch (error) {
        console.log("getAlbumFavourite", error);
        throw error;
    }
}

//http://127.0.0.1:8000/api/favourite-songs/
export const getSongsFavoriteUser = async (id:number) => {
  try {
      const response = await axios.get(`${API_URL}/account/get-favourite-songs/${id}/`);
      console.log("getSongsFavoriteUser", response.data);  // Kiểm tra dữ liệu trả về
      return response;  // Trả về dữ liệu có cấu trúc đúng
  } catch (error) {
      console.log("getSongsFavoriteUser", error);
      throw error;
  }
}


export const postSongFavoriteUser = async (song: FormData) => {
  try {
    const response = await axios.post(
      `${API_URL}/favourite-songs/`,
      song,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    console.log("postSongFavoriteUser", response.data); // Log kết quả nếu cần
    return response.data;
  } catch (error: any) {
    console.error("postSongFavoriteUser error:", error);
    throw new Error(error.response?.data?.detail || 'Failed to postSongFavoriteUser');
  }
}

export const deleteSongFavoriteUser = async (id:number) => {
  try {
    const response = await axios.delete(
      `${API_URL}/favourite-songs/${id}/`
    );
    console.log("deleteSongFavoriteUser", response.data); // Log kết quả nếu cần
    return response.data;
  } catch (error: any) {
    console.error("deleteSongFavoriteUser error:", error);
    throw new Error(error.response?.data?.detail || 'Failed to deleteSongFavoriteUser');
  }
}


  export const postAlbumUser = async (album: FormData)=> {
    try {
      const response = await axios.post(
        `${API_URL}/album-users/`,
        album,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log("postAlbumUser", response.data); // Log kết quả nếu cần
      return response.data;
    } catch (error: any) {
      console.error("postAlbumUser error:", error);
      throw new Error(error.response?.data?.detail || 'Failed to create album');
    }
  };

  export const deleteAlbumUser= async (id: number) => {
    try {
        const response = await axios.delete(`${API_URL}/album-users/${id}`);
        console.log("deleteAlbumUser", response.data);  // Kiểm tra dữ liệu trả về
        return response;  // Trả về dữ liệu có cấu trúc đúng
    } catch (error) {
        console.log("deleteAlbumUser", error);
        throw error;
    }
}



  export const getAlbumUser = async (id:number) => {
    try {
        const response = await axios.get(`${API_URL}/account/get-albums/${id}/`);
        console.log("getAlbumUser", response.data);  // Kiểm tra dữ liệu trả về
        return response;  // Trả về dữ liệu có cấu trúc đúng
    } catch (error) {
        console.log("getAlbumUser", error);
        throw error;
    }
}

export const getAllAlbumByIdUser = async (id:number) => {
  try {
      const response = await axios.get(`${API_URL}/album-users/${id}/`);
      console.log("getAllAlbumByIdUser", response.data);  // Kiểm tra dữ liệu trả về
      return response.data;  // Trả về dữ liệu có cấu trúc đúng
  } catch (error) {
      console.log("getAllAlbumByIdUser", error);
      throw error;
  }
};

// thêm nhạc vào album user
 export const postAlbumUserSong = async (song: FormData) => {
    try {
      const response = await axios.post<Album>(
        `${API_URL}/album-songs/`,
        song,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log("postAlbumUserSong", response.data); // Log kết quả nếu cần
      return response.data;
    } catch (error: any) {
      console.error("postAlbumUserSong error:", error);
      throw new Error(error.response?.data?.detail || 'Failed to add song in user album');
    }
  };


export const searchAccount = async (key:string | null): Promise<User[]> => {
  try {
    const response = await axios.get<User[]>(
      `${API_URL}/account/?search=${key}`
    );
    console.log("searchAccount", response.data);
    return response.data;
  } catch (error: any) {
    console.error("searchAccount error:", error);
    throw new Error(error.response?.data?.detail || 'Failed to search Account');
  }
} 