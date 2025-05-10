import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { HeadphonesIcon, Music, Users, MessageCircleMore } from "lucide-react";

import { Button } from '@/components/ui/button';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { Link } from 'react-router';
import { generateRoomName } from '@/utils';

const FriendsList = () => {

    const { listFriend, isAuthenticated, user } = useSelector((state: RootState) => state.auth)

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
                                            <Avatar className='size-10 border border-zinc-900 '>
                                                <AvatarImage src="/public/avatars/avatar.png" alt="" />

                                            </Avatar>

                                        </div>

                                        <div className='flex-1 min-w-0'>
                                            <div className='flex justify-between'>
                                                <div className='flex items-center gap-2'>
                                                    <span className='font-medium text-sm text-zinc-300'>{friend.full_name}</span>
                                                    {true && <Music className='size-3.5 text-emerald-400 shrink-0' />}
                                                </div>
                                                <Link to={`/chat`} 
                                                state={{ roomName: user && generateRoomName(user?.id,friend.id) ,
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

                </ScrollArea>  }
        


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