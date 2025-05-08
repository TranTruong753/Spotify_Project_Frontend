import { jwtDecode } from "jwt-decode";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL as string;

interface JwtPayload {
    exp: number;
    [key: string]: any; // để chấp nhận các field khác nếu có
}

interface RefreshResponse {
    access: string;
    refresh: string;
}

export async function checkAndRefreshToken(): Promise<boolean> {

    // const { accessToken, refreshToken } = useSelector((state: RootState) => state.auth)

    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (!accessToken) return false;

    try {
        const decoded = jwtDecode<JwtPayload>(accessToken);
        const currentTime = Date.now() / 1000;

        if (decoded.exp > currentTime) {
            // access token còn hạn
            return true;
        }

        // Nếu hết hạn và có refresh token thì gọi refresh
        if (refreshToken) {
            const response = await axios.post<RefreshResponse>(`${API_URL}/token/refresh/`, {
                refresh: refreshToken,
            });

            if (response.status === 200) {
                const { access, refresh } = response.data;

                localStorage.setItem("accessToken", access);
                localStorage.setItem("refreshToken", refresh);

                return true;
            }
        }

        return false;
    } catch (error) {
        console.error("Token error:", error);
        return false;
    }
}
