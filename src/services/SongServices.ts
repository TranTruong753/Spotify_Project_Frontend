import axios from "axios";

import { SongApiResponse, Song } from '@/types'
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

export const postSong = async (album: FormData): Promise<Song> => {
    try {
      const response = await axios.post<Song>(
        `${API_URL}/songs/`,
        album,
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
