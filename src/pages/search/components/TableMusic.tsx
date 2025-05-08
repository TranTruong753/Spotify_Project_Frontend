import { AppDispatch } from '@/app/store'
import { playAlbum, togglePlay } from '@/features/audioplayer/playerSlice'
import { Song } from '@/types'
import { formatDate, formatTime } from '@/utils'
import { Clock, Pause, Play } from 'lucide-react'
import React from 'react'
import { useDispatch } from 'react-redux'


interface Songs {
    songs: Song[]
    currentSong: Song | null;
    isPlaying: boolean;
}

const TableMusic = ({ songs,currentSong,isPlaying }: Songs) => {
    const dispatch = useDispatch<AppDispatch>()

    const handlePlaySong = (index: number,isCurrentSong:boolean) => {
      
        if(isCurrentSong && isPlaying){
            dispatch(togglePlay());
        }
        else if (songs) {
       
          dispatch(playAlbum({ songs, startIndex: index }));
        }
      };
    return (
       
    
        <div className="bg-black/20 backdrop-blur-sm">
        {/* table header */}
        <div className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-10 py-2 text-sm text-zinc-400 border-b border-white/5">
            <div>#</div>
            <div>Title</div>
            <div>Released Date</div>
            <div>
                <Clock className="h-4 w-4" />
            </div>
        </div>

        {/* songs list */}

        <div className='px-6'>
            <div className='space-y-2 py-4'>
                {songs && songs.map((item, index) => {
                   const isCurrentSong = currentSong?.id === item.id;
                    return (
                        <div
                            key={item.id}
                            onClick={() => handlePlaySong(index,isCurrentSong)}
                            className={`grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-4 py-2 text-sm 
  text-zinc-400 hover:bg-white/5 rounded-md group cursor-pointer
  `}
                        >
                            <div className='flex items-center justify-center'>
                                {isCurrentSong && isPlaying ? (
                                    <div className='size-4 text-green-500'>♫</div>
                                ) : (
                                    isCurrentSong ? (<><Pause></Pause></>) : <span className='group-hover:hidden '>{index + 1}</span>
                                )}
                                {!isCurrentSong && (
                                    <Play className='h-4 w-4 hidden group-hover:block' />
                                )}
                            </div>

                            <div className='flex items-center gap-3'>
                                <img src={item.img_url} alt={item.name} className='size-10' />

                                <div>
                                    <div className={`font-medium text-white`}>{item.name}</div>
                                    {/* <div>{song.artist}</div> */}
                                </div>
                            </div>
                            <div className='flex items-center'>{formatDate(item.created_at)}</div>
                            <div className='flex items-center'>{formatTime(item.duration)}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    </div>
  )
}

export default TableMusic