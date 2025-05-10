import axiosInstance from '@/services/AxiosInstance';
import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Socket } from 'dgram';
import { io } from 'socket.io-client';

export const fetchChatHistory = (roomName: string) => async (dispatch: Dispatch) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/chat-history/${roomName}/`);
    dispatch(setMessages(response.data)); // Lưu tin nhắn từ lịch sử vào state
  } catch (error: any) {
    dispatch(setError(error.response?.data?.message || 'Failed to fetch chat history.'));
  }
};

export const sendMessage = (
    socket: WebSocket,
    roomName: string,
    sender: string,
    message: string
) => (dispatch: Dispatch) => {
    const payload = {
        type: 'send_message',
        room: roomName,
        sender,
        message
    };
    socket.send(JSON.stringify(payload));

    // dispatch(addMessage({ sender, message, timestamp: new Date().toISOString() }));
};



interface ChatState {
  messages: { sender: string, message: string, timestamp: string }[];
  isConnected: boolean;
  error: string | null;
}

const initialState: ChatState = {
  messages: [],
  isConnected: false,
  error: null,
};

// Khởi tạo WebSocket
// const socket = io("ws://127.0.0.1:8000");

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setMessages: (state, action: PayloadAction<{ sender: string, message: string, timestamp: string }[]>) => {
      state.messages = action.payload;
    },
    addMessage: (state, action: PayloadAction<{ sender: string, message: string, timestamp: string }>) => {
      state.messages.push(action.payload);
    },
    setSocketConnectionStatus: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

// Export actions
export const { setMessages, addMessage, setSocketConnectionStatus, setError } = chatSlice.actions;

// Export reducer
export default chatSlice.reducer;
