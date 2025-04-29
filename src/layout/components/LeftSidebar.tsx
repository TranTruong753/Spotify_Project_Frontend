import { Music } from 'lucide-react'
import React, { useState } from 'react'
import { HomeIcon, Library, MessageCircle } from "lucide-react";
import { useEffect } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from "react-router";
import { IoSearch } from "react-icons/io5";
import { Input } from '@/components/ui/input';
import { FaPlus } from "react-icons/fa";

const LeftSidebar = () => {
    const [isLoading, setIsLoading] = useState(false)

    return (
        <div className='h-full flex flex-col gap-2'>
            {/* Navigation menu */}

            {/* <div className='rounded-lg bg-white border-1  p-4'>
        <div className='space-y-2'>
            <Link
                to={"/"}
                className={cn(
                    buttonVariants({
                        variant: "ghost",
                        className: "w-full justify-start text-black dark:hover:bg-zinc-800",
                    })
                )}
            >
                <HomeIcon className='mr-2 size-5' />
                <span className='hidden md:inline'>Home</span>
            </Link>

          
        </div>
    </div> */}

            {/* Library section */}
            <div className='flex-1 rounded-lg bg-white border p-4 border-[hsl(220,13%,91%)]'>
                <div className='flex items-center justify-between mb-4'>
                    <div className='flex items-center text-black px-2'>
                        <Library className='size-5 mr-2' />
                        <span className='hidden md:inline font-medium'>Thư viện</span>
                    </div>
                    <Button className='transition-all duration-300 ease-out rounded-3xl bg-black text-white hover:scale-110 hover:bg-black hover:cursor-pointer '>

                        <FaPlus />Tạo

                    </Button>
                </div>

                <div className='my-2'>
                    {/* Search */}
                    <div className='flex items-center border rounded px-2 border-[hsl(220,13%,91%)]'>
                        {/* icon */}
                        <span>
                            <IoSearch className='text-2xl text-(--border)' />
                        </span>

                        <Input placeholder="Tìm kiếm trong thư viện" className="border-0 shadow-none font-medium placeholder:text-(--border)" />

                    </div>
                </div>

                <ScrollArea className='h-[calc(100vh-300px)]'>
                    <div className='space-y-2'>
                        {isLoading ? (
                            <p>Loading</p>
                        ) : (
                           <CardFavourite />
                        )}
                    </div>
                </ScrollArea>
            </div>
        </div>
    )
}
type CardFavouriteProps = {
    Album?: {
        name?: string; 
        image?: string; 
        path?: string; 

    }; 
};

const CardFavourite = ({Album}:CardFavouriteProps) => {
    return (
        <Link
        to={"/"}
       
        className='transition-all duration-300 ease-in-out p-2 hover:bg-zinc-300 dark:hover:bg-zinc-800 rounded-md flex items-center gap-3 group cursor-pointer'
    >
        <img
            src='../../../public/avatars/avatar1.jpg'
            alt='Playlist img'
            className='size-12 rounded-md flex-shrink-0 object-cover'
        />

        <div className='flex-1 min-w-0 hidden md:block'>
            <p className='text-md font-medium truncate'> em của ngày hôm qua</p>
            <p className='text-sm text-zinc-400 truncate'>Album • Sơn Tùng</p>
        </div>
    </Link>
    )
}

export default LeftSidebar