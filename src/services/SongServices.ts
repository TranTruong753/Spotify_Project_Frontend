import axios from "axios";

import { SongApiResponse, Song, Video } from '@/types'
// Interface cho một album (bạn nên sửa theo cấu trúc thực tế)


const API_URL = import.meta.env.VITE_API_URL as string;


export const getAllSongs = async (): Promise<SongApiResponse> => {
    try {
        const response = await axios.get<SongApiResponse>(`${API_URL}/songs`);
        console.log("getAllSongs", response.data);  // Kiểm tra dữ liệu trả về
        return response.data;  // Trả về dữ liệu có cấu trúc đúng
    } catch (error) {
        console.log("getAllSongs", error);
        throw error;
    }
};

export const postSong = async (song: FormData): Promise<Song> => {
    try {
      const response = await axios.post<Song>(
        `${API_URL}/songs/`,
        song,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log("postSong", response.data); // Log kết quả nếu cần
      return response.data;
    } catch (error: any) {
      console.error("postSong error:", error);
      throw new Error(error.response?.data?.detail || 'Failed to create album');
    }
  };

export const postSingerAndSong = async (song: FormData): Promise<Song> => {
  try {
    const response = await axios.post<Song>(
      `${API_URL}/songs/`,
      song,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    console.log("postSong", response.data); // Log kết quả nếu cần
    return response.data;
  } catch (error: any) {
    console.error("postSong error:", error);
    throw new Error(error.response?.data?.detail || 'Failed to create album');
  }
};


export const patchSong = async (id: number, song: FormData): Promise<Song> => {
  try {
    const response = await axios.patch<Song>(
      `${API_URL}/songs/${id}/`, // chú ý dấu `/` cuối nếu backend yêu cầu
      song,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    console.log("patchSong", response.data);
    return response.data;
  } catch (error: any) {
    console.error("patchSong error:", error);
    throw new Error(error.response?.data?.detail || 'Failed to update album');
  }
};

export const postVideo = async (song: FormData): Promise<Video>  => {
  try {
    const response = await axios.post<Video>(
      `${API_URL}/videos/`,
      song,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    console.log("postVideo", response.data); // Log kết quả nếu cần
    return response.data;
  } catch (error: any) {
    console.error("postVideo error:", error);
    throw new Error(error.response?.data?.detail || 'Failed to create album');
  }
};

export const patchVideo = async (id: number, video: FormData): Promise<Video>  => {
  try {
    const response = await axios.patch<Video>(
      `${API_URL}/videos/${id}/`,
      video,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    console.log("patchVideo", response.data); // Log kết quả nếu cần
    return response.data;
  } catch (error: any) {
    console.error("patchVideo error:", error);
    throw new Error(error.response?.data?.detail || 'Failed to create album');
  }
};

export const postSinger = async (singer: FormData) => {
  try {
    const response = await axios.post(
      `${API_URL}/singers/`,
      singer,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    console.log("postSinger", response.data); // Log kết quả nếu cần
    return response.data;
  } catch (error: any) {
    console.error("postSinger error:", error);
    throw new Error(error.response?.data?.detail || 'Failed to create album');
  }
};


export const deleteSong = async (id: number): Promise<Song> => {
  try {
    const response = await axios.delete<Song>(
      `${API_URL}/songs/${id}/`, // chú ý dấu `/` cuối nếu backend yêu cầu     
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    console.log("deleteSong", response.data);
    return response.data;
  } catch (error: any) {
    console.error("deleteSong error:", error);
    throw new Error(error.response?.data?.detail || 'Failed to update album');
  }
};

