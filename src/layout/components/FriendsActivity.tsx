import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { HeadphonesIcon, Music, Users, MessageCircleMore } from "lucide-react";

import { Button } from '@/components/ui/button';

const FriendsActivity = () => {
    const [user, setUser] = useState(true)
    return (
        <>

            <div className="bg-zinc-900 h-full border rounded-lg flex flex-col border-zinc-900 text-zinc-300">


                <div className='p-4 flex justify-between items-center border-b border-zinc-300'>
                    <div className='flex items-center gap-2'>
                        <Users className='size-5 shrink-0' />
                        <h2 className='font-semibold'>Họ đang nghe gì ?</h2>
                    </div>
                </div>

                {!user && <LoginPrompt />}

                <ScrollArea className='flex-1'>
                    <div className='p-4 space-y-4 '>
                        {true && (
                            <div
                                className='cursor-pointer hover:bg-accent p-3 rounded-md transition-colors group bg-zinc-950'
                            >
                                <div className='flex items-start gap-3'>
                                    <div className='relative'>
                                        <Avatar className='size-10 border border-zinc-900 '>
                                            <AvatarImage src="../../../public/avatars/avatar1.jpg" alt="" />
                                            <AvatarFallback>{ }</AvatarFallback>
                                        </Avatar>
                                        <div
                                            className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border border-zinc-900  
                                               ${true ? "bg-green-500" : "bg-zinc-500"}
                                               `}
                                            aria-hidden='true'
                                        />
                                    </div>

                                    <div className='flex-1 min-w-0'>
                                        <div className='flex justify-between'>
                                            <div className='flex items-center gap-2'>
                                                <span className='font-medium text-sm text-zinc-300'>SKY</span>
                                                {true && <Music className='size-3.5 text-emerald-400 shrink-0' />}
                                            </div>
                                            <Button size={"icon"} className=' bg-zinc-900 text-white rounded-full cursor-pointer hover:bg-black hover:scale-105'>
                                                <MessageCircleMore />
                                            </Button>
                                        </div>

                                        {/* {true ? (
                                            <div className='mt-1'>
                                                <div className='mt-1 text-sm text-zinc-300 font-medium truncate'>
                                                    em của ngày hôm qua

                                                </div>
                                                <div className='text-xs text-zinc-400 truncate'>
                                                    Sơn Tung MTP

                                                </div>
                                            </div>
                                        ) : (
                                            <div className='mt-1 text-xs text-zinc-400'>Idle</div>
                                        )} */}
                                    </div>
                                </div>
                            </div>)}

                    </div>

                </ScrollArea>
                {/* <SheetDemo></SheetDemo> */}


            </div>

        </>
    )
}

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

export function SheetDemo() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline">Open</Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Edit profile</SheetTitle>
                    <SheetDescription>
                        Make changes to your profile here. Click save when you're done.
                    </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input id="name" value="Pedro Duarte" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Username
                        </Label>
                        <Input id="username" value="@peduarte" className="col-span-3" />
                    </div>
                </div>
                <SheetFooter>
                    <SheetClose asChild>
                        <Button type="submit">Save changes</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}

export default FriendsActivity

const ChatWithFriends = () => {
    return (
        <Sheet >

            <SheetTrigger asChild>
                <button >Open</button>
            </SheetTrigger>
            <SheetContent side={'left'} className='bg-white'>
                <SheetHeader>
                    <SheetTitle>Are you absolutely sure?</SheetTitle>
                    <SheetDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}

const LoginPrompt = () => (
    <div className='h-full flex flex-col items-center justify-center p-6 text-center space-y-4'>
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
            <h3 className='text-lg font-semibold text-white'>See What Friends Are Playing</h3>
            <p className='text-sm text-zinc-400'>Login to discover what music your friends are enjoying right now</p>
        </div>
    </div>
);