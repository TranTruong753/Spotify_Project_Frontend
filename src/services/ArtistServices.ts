import axios, { AxiosResponse } from "axios";

import { Artist, ArtistApiResponse } from "@/types";
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
export const postArtists = async (artist: FormData): Promise<Artist> => {
  const response = await fetch("http://127.0.0.1:8000/api/artists/", {
    method: "POST",
    body: artist,
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }

  return await response.json();
};
