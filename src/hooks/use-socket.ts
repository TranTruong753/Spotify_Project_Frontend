import { useDispatch } from 'react-redux';
import { addMessage } from '@/features/chats/chatSlice';
import React from 'react';

const useSocket = (roomName: string) => {
    const dispatch = useDispatch();
    const socketRef = React.useRef<WebSocket | null>(null);

    React.useEffect(() => {
        const socket = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${roomName}/`);
        socketRef.current = socket;

        socket.onopen = () => {
            console.log('WebSocket connected');
            socket.send(JSON.stringify({ type: 'join_room', room: roomName }));
        };

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'receive_message') {
                dispatch(addMessage(data));
            }
        };

        socket.onclose = () => {
            console.log('WebSocket closed');
        };

        return () => {
            socket.close();
        };
    }, [roomName, dispatch]);

    return socketRef;
};


export default useSocket;
