import  { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {  Pause, Play } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { playAlbum, togglePlay } from "@/features/audioplayer/playerSlice";
import { fetchMusicFavoriteUserById } from "@/features/accounts/authSlice";
import TableMusicFavorite from "@/pages/songs/compnents/TableMusicFavorite";
import picture from "/liked-songs.jpg"
import { Song } from "@/types";

const SongFavorite = () => {

    const dispatch = useDispatch<AppDispatch>()
    const [songs, setSongs] = useState<Song[]>([])



    const { listSongFavorite, user, isAuthenticated } = useSelector(
        (state: RootState) => state.auth
    );


    const { currentSong, isPlaying } = useSelector((state: RootState) => state.player);

    useEffect(() => {
        const fetchSong = async () => {
            if (user?.id) {
                await dispatch(fetchMusicFavoriteUserById(user.id));
            }
        };

        fetchSong();
    }, [user?.id]);

    useEffect(() => {
        const songs: Song[] = listSongFavorite.map((item) => ({
            ...item.song,
        }));
        setSongs(songs);
    }, [listSongFavorite]);



    //   if (loading) {
    //     return <div>Loading...</div>;
    //   }

    //   if (error) {
    //     return <div>Error: {error}</div>;
    //   }

    const handlePlayAlbum = () => {


        if (listSongFavorite) {
            const songs: Song[] = listSongFavorite.map((item) => ({
                ...item.song,

            }));
            const isCurrentAlbumPlaying = listSongFavorite.some(
                (item) => item.song.id === currentSong?.id
            );
            console.log("3", isCurrentAlbumPlaying);


            // Kiểm tra nếu album đang phát, toggle để dừng phát
            if (isCurrentAlbumPlaying) {
                dispatch(togglePlay());
            }

            // Bắt đầu phát album từ bài hát đầu tiên nếu chưa phát
            dispatch(playAlbum({ songs: songs, startIndex: 0 }));
        }
    };


    const handlePlaySong = (index: number) => {
        // if (!currentAlbum) return;

        // if (currentAlbum?.album_songs) {
        //     // start playing the album from the beginning
        //     dispatch(playAlbum({ songs: currentAlbum?.album_songs, startIndex: index }));
        // }
    };

    const handleAddAlbumFavourite = async () => {
        // const formData = new FormData();
        // if (user) formData.append("account", user.id.toString());

        // if (id) formData.append("album", id);

        // await addAlbum(formData)

        // if (user) await dispatch(getAlbumsFavorite(user.id))


    }

    const handleDeleteAlbumFavourite = async () => {
        // const favoriteAlbumId = albums?.find(album => album.album.id === currentAlbum?.id)?.id || null;
        // console.log("run", favoriteAlbumId)
        // if (favoriteAlbumId) {
        //     await deleteAlbumFavorite(favoriteAlbumId)
        // }
        // if (user) await dispatch(getAlbumsFavorite(user.id))
    }


    return (
        <div className="h-full">
            <ScrollArea className="h-full rounded-md">
                {/* Main Content */}
                <div className="relative min-h-full">
                    {/* bg gradient */}
                    <div
                        className="absolute inset-0 bg-gradient-to-b from-[#5038a0]/80 via-zinc-900/80 to-zinc-900 pointer-events-none"
                        aria-hidden="true"
                    />

                    {/* Content */}
                    <div className="relative z-10">
                        <div className="flex p-6 gap-6 pb-8">
                            <img
                                src={picture}
                                // alt={currentAlbum?.name}
                                className="w-[240px] h-[240px] shadow-xl rounded"
                            />
                            <div className="flex flex-col justify-end">
                                <p className="text-sm font-medium">Playlist</p>
                                <h1 className="text-7xl font-bold my-4">Bài hát đã thích</h1>
                                <div className="flex items-center gap-2 text-sm text-zinc-100">
                                    {/* <span className="font-medium text-white">{currentAlbum?.artist}</span> */}
                                    {/* <span>{currentAlbum?.album_songs?.length} songs</span> */}
                                </div>
                            </div>
                        </div>

                        {/* play button */}
                        <div className='px-6 pb-4 flex items-center gap-6'>
                            <Button
                                onClick={handlePlayAlbum}
                                size='icon'
                                className='w-14 h-14 rounded-full bg-green-500 hover:bg-green-400 
                hover:scale-105 transition-all'
                            >
                                {isPlaying && (listSongFavorite && listSongFavorite.some((item) => item.song.id === currentSong?.id)) ? (
                                    <Pause className='h-7 w-7 text-black' />
                                ) : (
                                    <Play className='h-7 w-7 text-black' />
                                )}
                            </Button>

                            {/* {isAuthenticated ? (isAlbumFovorite ?
                                <ButtonAtd shape="circle"
                                    color="green"
                                    variant="solid"
                                    onClick={() => handleDeleteAlbumFavourite()}
                                >

                                    <CircleCheckBig size={18} />
                                </ButtonAtd>

                                :

                                <ButtonAtd shape="circle"
                                    color="green"
                                    variant="solid"
                                    onClick={() => handleAddAlbumFavourite()}
                                >

                                    <CirclePlus size={18} />
                                </ButtonAtd>) : ""} */}

                        </div>

                        {/* Table Section */}

                        {listSongFavorite &&
                            <TableMusicFavorite
                                songs={songs}
                                currentSong={currentSong}
                                // currentAlbum={currentAlbum}
                                isPlaying={isPlaying}
                            />}


                    </div>
                </div>
            </ScrollArea>
        </div>
    );
};

export default SongFavorite;
