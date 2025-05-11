import React, { useEffect, useState } from 'react'
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { HeadphonesIcon, Music, Users, MessageCircleMore } from "lucide-react";

import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/store';
import { Link } from 'react-router';
import { generateRoomName } from '@/utils';
import { Avatar } from 'antd';
import { fetchListFriend } from '@/features/accounts/authSlice';

const FriendsList = () => {

    const dispatch = useDispatch<AppDispatch>()

    const { listFriend, isAuthenticated, user, accessToken } = useSelector((state: RootState) => state.auth)

    useEffect(() => {

        // console.log("token", accessToken);

        if(!accessToken) return

        const socket = new WebSocket(
            `wss://54.89.188.157/ws/friends/?token=${accessToken}`
        );

        console.log("socket",socket)

        socket.onopen = () => {
            console.log("WebSocket connected");
        };

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log("socket", data);

            // ví dụ bạn kiểm tra loại thông điệp
            if (data.action === "request_accepted") {
                dispatch(fetchListFriend()); // gọi lại API để lấy danh sách mới
            }

        };

        socket.onclose = () => {
            console.log("WebSocket disconnected");
        };

        return () => {
            socket.close();
        };
    }, [dispatch,accessToken]);

    return (
        <>

            <div className="bg-zinc-900 h-full border rounded-lg flex flex-col border-zinc-900 text-zinc-300">


                <div className='p-4 flex justify-between items-center border-b border-zinc-300'>
                    <div className='flex items-center gap-2'>
                        <Users className='size-5 shrink-0' />
                        <h2 className='font-semibold'>Danh sách bạn bè</h2>
                    </div>
                </div>

                {!isAuthenticated ? <LoginPrompt /> :
                    <ScrollArea className='flex-1'>
                        <div className='p-4 space-y-2 '>

                            {
                                listFriend && listFriend.map((friend) => (

                                    <div key={friend.id}
                                        className='cursor-pointer hover:bg-accent p-3 rounded-md transition-colors group bg-zinc-950'
                                    >
                                        <div className='flex items-start gap-3'>
                                            <div className='relative'>
                                                {/* <Avatar className='size-10 border border-zinc-900 '>
                                                <AvatarImage src="/avatars/avatar.png" alt="" />

                                            </Avatar> */}

                                                <Avatar

                                                    // className="bg-blue-500!"
                                                    className={"bg-zinc-800! select-none"}
                                                >

                                                    {friend.full_name.split(" ").reverse().join(" ").charAt(0)}
                                                </Avatar>


                                            </div>

                                            <div className='flex-1 min-w-0'>
                                                <div className='flex justify-between'>
                                                    <div className='flex items-center gap-2'>
                                                        <span className='font-medium text-sm text-zinc-300'>{friend.full_name}</span>
                                                        {true && <Music className='size-3.5 text-emerald-400 shrink-0' />}
                                                    </div>
                                                    <Link to={`/chat`}
                                                        state={{
                                                            roomName: user && generateRoomName(user?.id, friend.id),
                                                            myFriend: friend

                                                        }}

                                                    >
                                                        <Button size={"icon"} className=' bg-zinc-900 text-white rounded-full cursor-pointer hover:bg-black hover:scale-105'>
                                                            <MessageCircleMore />
                                                        </Button>
                                                    </Link>
                                                </div>


                                            </div>
                                        </div>
                                    </div>

                                ))
                            }









                        </div>

                    </ScrollArea>}



            </div>

        </>
    )
}


export default FriendsList


const LoginPrompt = () => (
    <div className='h-full flex flex-col items-center justify-start p-6 text-center space-y-4'>
        <div className='relative'>
            <div
                className='absolute -inset-1 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-full blur-lg
       opacity-75 animate-pulse'
                aria-hidden='true'
            />
            <div className='relative bg-gray-100 rounded-full p-4'>
                <HeadphonesIcon className='size-8 text-emerald-400' />
            </div>
        </div>

        <div className='space-y-2 max-w-[250px]'>
            <h3 className='text-lg font-semibold text-white'>Xem danh sách bạn bè</h3>
            <Link to={"/"}><p className='text-sm text-zinc-400'>Đăng nhập để nhắn tin với bạn bè của bạn ngay bây giờ</p></Link>
        </div>
    </div>
);