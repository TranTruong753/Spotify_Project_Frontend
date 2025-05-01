import axios, { AxiosResponse } from "axios";

import { Album, AlbumApiResponse } from '@/types'
// Interface cho một album (bạn nên sửa theo cấu trúc thực tế)


const API_URL = import.meta.env.VITE_API_URL as string;


export const getAllAlbums = async (): Promise<AlbumApiResponse> => {
    try {
        const response = await axios.get<AlbumApiResponse>(`${API_URL}/albums`);
        console.log("getAllAlbums", response.data);  // Kiểm tra dữ liệu trả về
        return response.data;  // Trả về dữ liệu có cấu trúc đúng
    } catch (error) {
        console.log("getAllAlbums", error);
        throw error;
    }
};

// export const postAlbums = async (data:Album): Promise<Album> => {
//     try {
//         const response = await axios.post<Album>(`${API_URL}/albums`,data);
//         console.log("getAllAlbums", response.data);  // Kiểm tra dữ liệu trả về
//         return response.data;  // Trả về dữ liệu có cấu trúc đúng
//     } catch (error) {
//         console.log("getAllAlbums", error);
//         throw error;
//     }
// }

export const postAlbums = async (album: FormData): Promise<Album> => {
    const response = await fetch('http://127.0.0.1:8000/api/albums/', {
      method: 'POST',
      body: album,
    });
  
    if (!response.ok) {
      const error = await response.text();
      throw new Error(error);
    }
  
    return await response.json();
  };
