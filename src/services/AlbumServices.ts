import axios from "axios";

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


export const getAllAlbumById = async (id:number): Promise<Album> => {
  try {
      const response = await axios.get<Album>(`${API_URL}/albums/${id}/`);
      console.log("getAllAlbums", response.data);  // Kiểm tra dữ liệu trả về
      return response.data;  // Trả về dữ liệu có cấu trúc đúng
  } catch (error) {
      console.log("getAllAlbums", error);
      throw error;
  }
};

// export const postAlbums = async (album: FormData): Promise<Album> => {
//     const response = await fetch('http://127.0.0.1:8000/api/albums/', {
//       method: 'POST',
//       body: album,
//     });
  
//     if (!response.ok) {
//       const error = await response.text();
//       throw new Error(error);
//     }
  
//     return await response.json();
//   };


  export const postAlbums = async (album: FormData): Promise<Album> => {
    try {
      const response = await axios.post<Album>(
        `${API_URL}/albums/`,
        album,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log("postAlbums", response.data); // Log kết quả nếu cần
      return response.data;
    } catch (error: any) {
      console.error("postAlbums error:", error);
      throw new Error(error.response?.data?.detail || 'Failed to create album');
    }
  };

  export const patchAlbums = async (id: number, album: FormData): Promise<Album> => {
    try {
      const response = await axios.patch<Album>(
        `${API_URL}/albums/${id}/`, // chú ý dấu `/` cuối nếu backend yêu cầu
        album,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log("patchAlbums", response.data);
      return response.data;
    } catch (error: any) {
      console.error("patchAlbums error:", error);
      throw new Error(error.response?.data?.detail || 'Failed to update album');
    }
  };

  export const deleteAlbums = async (id: number): Promise<Album> => {
    try {
      const response = await axios.delete<Album>(
        `${API_URL}/albums/${id}/`, // chú ý dấu `/` cuối nếu backend yêu cầu     
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log("deleteAlbums", response.data);
      return response.data;
    } catch (error: any) {
      console.error("deleteAlbums error:", error);
      throw new Error(error.response?.data?.detail || 'Failed to update album');
    }
  };
  
  