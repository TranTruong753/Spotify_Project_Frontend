import { User } from "@/types";
import axios from "axios";

interface GoogleLoginResponse {
  access: string;
  refresh: string;
  user: User;
}

const API_URL = import.meta.env.VITE_API_URL as string;

export async function loginWithGoogle(token: string): Promise<GoogleLoginResponse> {
  const response = await axios.post(
    `${API_URL}/account/auth/google-login/`,
    { token },
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );

  return response.data;
}