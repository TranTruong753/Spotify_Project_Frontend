
import axiosInstance from "./AxiosInstance";

// API gửi lời mời kết bạn

export const makeFriends = async (id: number) => {
    try {
        const response = await axiosInstance.post(`/account/${id}/send_friend_request/`)
        console.log("makeFriends", response.data);
        return response.data;
    } catch (error: any) {
        console.error("makeFriends error:", error);
        throw new Error(error.response?.data?.error || 'Failed to makeFriends ');
    }
}

// Lấy ds bạn bè(cần token) 
// GET http://127.0.0.1:8000/api/account/friends/

export const getFriends = async () => {
    try {
        const response = await axiosInstance.get(`/account/friends/`)
        console.log("getFriends", response.data);
        return response.data;
    } catch (error: any) {
        console.error("getFriends error:", error);
        throw new Error(error.response?.data?.detail || 'Failed to getFriends ');
    }
}

// lấy ds lời mời kết bạn(cần token)
// GET http://127.0.0.1:8000/api/account/pending_requests/

export const getRequestsMakeFriends = async () => {
    try {
        const response = await axiosInstance.get(`/account/pending_requests/`)
        console.log("getRequestsMakeFriends", response.data);
        return response.data;
    } catch (error: any) {
        console.error("getRequestsMakeFriends error:", error);
        throw new Error(error.response?.data?.detail || 'Failed to getRequestsMakeFriends ');
    }
}

// Phản hồi lời mời ,cần token
// POST http://127.0.0.1:8000/api/account/1/respond_friend_request/

export const responseRequestsMakeFriends = async (id:number, action: string) => {
    try {
        const response = await axiosInstance.post(`/account/${id}/respond_friend_request/`,{
             "action": action
        })
        console.log("responseRequestsMakeFriends", response.data);
        return response.data;
    } catch (error: any) {
        console.error("responseRequestsMakeFriends error:", error);
        throw new Error(error.response?.data?.detail || 'Failed to responseRequestsMakeFriends ');
    }
}
