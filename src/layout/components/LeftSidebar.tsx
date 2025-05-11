import { Dot, Heart } from 'lucide-react'
import  { useState } from 'react'
import { Library } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from "react-router";
import { FaPlus } from "react-icons/fa";;
import ModalCreateAlbumUser from '@/layout/components/ModalCreateAlbumUser';
import { Album, User } from '@/types';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';

const LeftSidebar = () => {
    const [isLoading, setIsLoading] = useState(false)

    const [isModalOpen, setIsModalOpen] = useState(false);

    const { albums, isAuthenticated, accountAlbums, user } = useSelector(
        (state: RootState) => state.auth
    );



    const handleCreatAlbumUser = (id: number) => {
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
                        onClick={() => handleCreatAlbumUser(1)}
                    >

                        <FaPlus />Tạo

                    </Button>}
                </div>

           

                <ScrollArea className='h-[calc(100vh-300px)]'>
                    {isAuthenticated ? <div className='space-y-2'>
                      
                       <CardFavouriteSong></CardFavouriteSong>

                         {
                         albums && 
                         (
                            albums.map((album) => (
                                <CardFavourite key={album.id} album={album.album} />
                            ))

                        )}

                        {
                        accountAlbums && accountAlbums.map((accountAlbum) => (
                            <CardUser key={accountAlbum.id} album={accountAlbum} user={user} />
                        ))
                        }
                        
                    </div> : 
                          <Link to={"/"}><p className='text-sm text-zinc-400'>Đăng nhập để xem thư viện nhạc của bạn ngay bay giờ</p></Link>
                    }
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
    album: Album,
    user?: User | null,
};

const CardFavourite = ({ album }: CardFavouriteProps) => {
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

const CardUser = ({ album, user }: CardFavouriteProps) => {
    return (
        <Link
            to={`/album-user/${album.id}`}

            className='bg-zinc-900 transition-all duration-300 ease-in-out p-2 hover:bg-zinc-950 rounded-md flex items-center gap-3 group cursor-pointer'
        >
            <img
                src={album.img_url}
                alt='Playlist img'
                className='size-12 rounded-md flex-shrink-0 object-cover'
            />

            <div className='flex-1 min-w-0 hidden md:block'>
                <p className='text-md font-medium truncate text-zinc-300'>{album.name}</p>
                <p className='flex text-sm font-light truncate text-zinc-300'>danh sách phát  <Dot /> {user && user.full_name} </p>
            </div>
        </Link>
    )
}

const CardFavouriteSong = () => {
    return (
        <Link
            to={`/music-favorite`}

            className='bg-zinc-900 transition-all duration-300 ease-in-out p-2 hover:bg-zinc-950 rounded-md flex items-center gap-3 group cursor-pointer'
        >
            <div


                className='flex justify-center items-center bg-green-500 size-12 rounded-md flex-shrink-0 object-cover'
            >

                <Heart strokeWidth={3} />
            </div>

            <div className='flex-1 min-w-0 hidden md:block'>
                <p className='text-md font-medium truncate text-zinc-300'>Bài hát đã thích</p>
                {/* <p className='flex text-sm font-light truncate text-zinc-300'>danh sách phát  <Dot /> {user && user.full_name} </p> */}
            </div>
        </Link>
    )
}



export default LeftSidebar