import axios, { AxiosResponse } from "axios";

import { ArtistApiResponse } from "@/types";
// Interface cho một album (bạn nên sửa theo cấu trúc thực tế)

const API_URL = import.meta.env.VITE_API_URL as string;

export const getAllArists = async (): Promise<ArtistApiResponse> => {
  try {
    const response = await axios.get<ArtistApiResponse>(`${API_URL}/artists/`);
    console.log("getAllArist", response.data); // Kiểm tra dữ liệu trả về
    return response.data; // Trả về dữ liệu có cấu trúc đúng
  } catch (error) {
    console.log("getAllArist", error);
    throw error;
  }
};
