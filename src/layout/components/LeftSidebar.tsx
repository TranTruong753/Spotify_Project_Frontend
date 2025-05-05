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
import ModalCreateAlbumUser from './ModalCreateAlbumUser';
import { Album } from '@/types';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';

const LeftSidebar = () => {
    const [isLoading, setIsLoading] = useState(false)

    const [data, setData] = useState<number | null>(0)

    const [isModalOpen, setIsModalOpen] = useState(false);

    const { albums, isAuthenticated, accountAlbums } = useSelector(
		(state: RootState) => state.auth
	);

    

    const handleCreatAlbumUser = (id:number) => {
        setIsModalOpen(true);
    }
    return (
        <div className='h-full flex flex-col gap-2 '>
         
            {/* Library section */}
            <div className='flex-1 rounded-lg bg-zinc-900 border p-4 border-zinc-900'>
                <div className='flex items-center justify-between mb-4'>
                    <div className='flex items-center text-zinc-300 px-2'>
                        <Library className='size-5 mr-2' />
                        <span className='hidden md:inline font-medium'>Thư viện</span>
                    </div>
                    {isAuthenticated && <Button className='transition-all duration-300 ease-out rounded-3xl bg-zinc-950 text-white hover:scale-110 hover:bg-zinc-950 hover:cursor-pointer '
                        onClick={()=>handleCreatAlbumUser(1)}
                    >

                        <FaPlus />Tạo

                    </Button>}
                </div>

                <div className='my-2'> 
                    {/* Search */}
                    <div className='flex items-center border rounded px-2 border-zinc-400'>
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
                            albums.map((album)=>(
                                <CardFavourite  key={album.id} album={album.album}/>
                            ))
                           
                        )}

                        {accountAlbums && accountAlbums.map((accountAlbum)=>(
                                <CardUser  key={accountAlbum.id} album={accountAlbum}/>
                        ))}
                    </div>
                </ScrollArea>
            </div>

            <ModalCreateAlbumUser
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
            ></ModalCreateAlbumUser>
        </div>
    )
}
type CardFavouriteProps = {
    album: Album
};

const CardFavourite = ({album}:CardFavouriteProps) => {
    return (
        <Link
        to={`/album/${album.id}`}
      
        className='transition-all duration-300 ease-in-out p-2 hover:bg-zinc-950 rounded-md flex items-center gap-3 group cursor-pointer'
    >
        <img
            src={album.img_url}
            alt='Playlist img'
            className='size-12 rounded-md flex-shrink-0 object-cover'
        />

        <div className='flex-1 min-w-0 hidden md:block'>
            <p className='text-md font-medium truncate text-zinc-300'>{album.name}</p>
        </div>
    </Link>
    )
}

const CardUser = ({album}:CardFavouriteProps) => {
    return (
        <Link
        to={`/album-user/${album.id}`}
      
        className='transition-all duration-300 ease-in-out p-2 hover:bg-zinc-950 rounded-md flex items-center gap-3 group cursor-pointer'
    >
        <img
            src={album.img_url}
            alt='Playlist img'
            className='size-12 rounded-md flex-shrink-0 object-cover'
        />

        <div className='flex-1 min-w-0 hidden md:block'>
            <p className='text-md font-medium truncate text-zinc-300'>{album.name}</p>
        </div>
    </Link>
    )
}


export default LeftSidebar