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
  const response = await fetch(`${API_URL}/artists/`, {
    method: "POST",
    body: artist,
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }

  return await response.json();
};

export const patchArtists = async (
  id: number,
  artist: FormData
): Promise<Artist> => {
  try {
    const response = await axios.patch<Artist>(
      `${API_URL}/artists/${id}/`, // chú ý dấu `/` cuối nếu backend yêu cầu
      artist,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("patchArtists", response.data);
    return response.data;
  } catch (error: any) {
    console.error("patchArtists error:", error);
    throw new Error(error.response?.data?.detail || "Failed to update artist");
  }
};

export const deleteArtists = async (id: number): Promise<Artist> => {
  try {
    const response = await axios.delete<Artist>(
      `${API_URL}/artists/${id}/`, // chú ý dấu `/` cuối nếu backend yêu cầu
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("deleteArtists", response.data);
    return response.data;
  } catch (error: any) {
    console.error("deleteArtists error:", error);
    throw new Error(error.response?.data?.detail || "Failed to update artist");
  }
};
