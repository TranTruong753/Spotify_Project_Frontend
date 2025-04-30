import axios, { AxiosResponse } from "axios";

import { AlbumApiResponse } from '@/types'
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
