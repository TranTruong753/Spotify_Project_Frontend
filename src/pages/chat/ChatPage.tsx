
import { useEffect, useState } from "react";


import { ScrollArea } from "@/components/ui/scroll-area";

import MessageInput from "@/pages/chat/components/MessageInput";
import ChatHeader from "@/pages/chat/components/ChatHeader";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";

import React from "react";
import { addMessage, fetchChatHistory, sendMessage } from "@/features/chats/chatSlice";

import { Avatar } from "antd";
import { cn } from "@/lib/utils";

const formatTime = (date: string) => {
	return new Date(date).toLocaleTimeString("en-US", {
		hour: "2-digit",
		minute: "2-digit",
		hour12: true,
	});
};


const ChatPage = () => {
	const location = useLocation();
	const roomName = location.state?.roomName;
	const myFriend = location.state?.myFriend;

	const bottomRef = React.useRef<HTMLDivElement | null>(null);



	const dispatch = useDispatch<AppDispatch>();
	const [socket, setSocket] = useState<WebSocket>();
	const { messages } = useSelector((state: RootState) => state.chat);
	const { user } = useSelector((state: RootState) => state.auth);
	const [message, setMessage] = useState('');

	// Lắng nghe WebSocket và hiển thị tin nhắn
	// const socketRef = useSocket(roomName);
	// console.log("messages", messages)

	React.useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages]);


	useEffect(() => {
		if (roomName) {
			const socket = new WebSocket(`wss://54.89.188.157/ws/chat/${roomName}/`);
			setSocket(socket);

			socket.onmessage = (event) => {
				const data = JSON.parse(event.data);
				console.log("onmessage", JSON.parse(event.data));
				dispatch(addMessage({
					sender: data.sender,
					message: data.message,
					timestamp: new Date().toISOString()
				}));


			};
			return () => {
				socket.close();
			};
		}

	}, [roomName])


	// Lấy lịch sử chat khi component mount
	React.useEffect(() => {
		dispatch(fetchChatHistory(roomName));
	}, [dispatch, roomName]);

	const handleSendMessage = () => {

		if (socket?.readyState === WebSocket.OPEN && user) {
			console.log("có socket")
			dispatch(sendMessage(socket, roomName, user?.email, message));
			setMessage('');
		}

		else {
			console.warn('Socket is not ready');
		}
	};


	return (
		<main className='h-full rounded-lg bg-gradient-to-b from-zinc-900 to-zinc-900 overflow-hidden'>

			<div className=' h-[calc(100vh-180px)]'>


				{/* chat message */}
				<div className='flex flex-col h-full'>


					<>
						<ChatHeader friend={myFriend} />

						{/* Messages */}
						<ScrollArea className='h-[calc(100vh-340px)]'>
							<div className='p-4 space-y-4'>

								{messages.map((message, index) => (
									<div
										key={index}
										className={`flex items-start gap-3  ${message.sender === user?.email ? "flex-row-reverse" : ""
											}`}
									>
										{/* <Avatar className='size-8'>
											<AvatarImage
												src={
													"/avatars/avatar.png"
												}
											/>
											<AvatarFallback>{myFriend.full_name[0]}</AvatarFallback>
										</Avatar> */}
										<Avatar
									
											// className="bg-blue-500!"
											className={cn(message.sender === user?.email ? "bg-green-500!" : "bg-zinc-800!","select-none")}
										>

											{message.sender === user?.email ? user.full_name.split(" ").reverse().join(" ").charAt(0)  :myFriend.full_name.split(" ").reverse().join(" ").charAt(0)}
										</Avatar>

										<div
											className={`rounded-lg p-3 max-w-[70%]
													${message.sender === user?.email ? "bg-green-500" : "bg-zinc-800"}
												`}
										>
											<p className='text-sm'>{message.message}</p>
											<span className='text-xs text-zinc-300 mt-1 block'>
												{formatTime(message.timestamp)}
											</span>
										</div>
									</div>
								))}
								{/* Phần tử trống để cuộn tới */}
								<div ref={bottomRef}></div>
							</div>
						</ScrollArea>

						<MessageInput handleSendMessage={handleSendMessage} newMessage={message} setNewMessage={setMessage} />
					</>

				</div>
			</div>
		</main>
	);
};
export default ChatPage;

// const NoConversationPlaceholder = () => (
// 	<div className='flex flex-col items-center justify-center h-full space-y-6'>
// 		<img src='/spotify.png' alt='Spotify' className='size-16 animate-bounce' />
// 		<div className='text-center'>
// 			<h3 className='text-zinc-300 text-lg font-medium mb-1'>No conversation selected</h3>
// 			<p className='text-zinc-500 text-sm'>Choose a friend to start chatting</p>
// 		</div>
// 	</div>
// );
