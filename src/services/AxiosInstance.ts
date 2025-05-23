import axios from "axios";
// API base URL



const API_URL = import.meta.env.VITE_API_URL as string;

// Lấy token từ localStorage hoặc cookie
const getAccessToken = () => localStorage.getItem("accessToken");
const getRefreshToken = () => localStorage.getItem("refreshToken");

// Tạo một instance của Axios
const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  axiosInstance.interceptors.request.use(request => {
    const accessToken = getAccessToken();
    if (accessToken) {
      request.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return request;
  }, error => {
    return Promise.reject(error);
  });


// Thêm Interceptor để xử lý lỗi 401 (Unauthorized)
axiosInstance.interceptors.response.use(
    (response) => response, // Nếu request thành công thì trả về bình thường
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const refreshToken = getRefreshToken();
          if (!refreshToken) {
            console.log("Không có refresh token, cần đăng nhập lại");
            return Promise.reject(error);
          }
  
          // Gửi request làm mới token
          const response = await axios.post(`${API_URL}/token/refresh/`, {
            refresh: refreshToken,
          });
  
          if (response.status === 200) {
            const newAccessToken = response.data.access;
            const newRefreshToken = response.data.refresh;
            localStorage.setItem("accessToken", newAccessToken);
            localStorage.setItem("refreshToken", newRefreshToken);
            axiosInstance.defaults.headers["Authorization"] = `Bearer ${newAccessToken}`;
            originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
            return axiosInstance(originalRequest);
          }
        } catch (err) {
          console.log("Làm mới token thất bại, cần đăng nhập lại");
          return Promise.reject(err);
        }
      }
      return Promise.reject(error);
    }
  );    

  export default axiosInstance;

// Thêm Interceptor để xử lý lỗi 401 (Unauthorized)