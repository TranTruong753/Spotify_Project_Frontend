import { ScrollArea } from '@/components/ui/scroll-area'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/app/store'
import { Button, Flex, Spin } from 'antd'
import TableMusic from './components/TableMusic'
import { useSearchParams } from 'react-router'
import { fetchSearchSongs } from '@/features/songs/songSlice'


const SearchPage = () => {
    const dispatch = useDispatch<AppDispatch>()
    const {listSearch, loading } = useSelector((state: RootState) => state.songs)
    const {isPlaying, currentSong } = useSelector((state: RootState) => state.player)
    // const [isLoading, setIsLoading] = useState(false)

    const [searchParams] = useSearchParams();
    const searchValue = searchParams.get('search');
  
    useEffect(()=>{
        setTimeout(() => {
            if(searchParams){
                dispatch(fetchSearchSongs({key:searchValue}))
            }
        }, 500);
      
    },[searchValue])

    

    return (
        <main className=' rounded-md overflow-hidden h-full bg-zinc-900 dark:bg-gradient-to-b from-zinc-800 to-zinc-900'>
            <ScrollArea className='h-[calc(100vh-180px)] w-full'>
                <div className='px-4 sm:px-6'>
                    {/* <h1 className='text-2xl sm:text-3xl font-bold mb-6'>Good afternoon</h1> */}

                    <div className='relative space-y-8 w-full h-[calc(100vh-180px)] '>
                        <div className='flex gap-2 fixed bg-zinc-900 pt-5'>
                            <Button shape="round" color='default' variant='solid'>
                                <span className='font-semibold'>Tất cả</span>
                            </Button>

                            <Button shape="round" color='default' variant='solid'>
                                <span className='font-semibold'>Bài hát</span>
                            </Button>

                            <Button shape="round" color='default' variant='solid'>
                                <span className='font-semibold'>Hồ sơ</span>
                            </Button>

                        </div>
                        <div className=' pt-20' >
                            <TableMusic songs={listSearch} isPlaying={isPlaying} currentSong={currentSong}></TableMusic>
                            {searchValue}
                        </div>

                        {loading && <Flex gap="middle" className='justify-center absolute top-1/2 right-1/2 translate-x-1/2'>
                            <Spin tip="Loading" size="large" className='text-green-500'>

                            </Spin>
                        </Flex>}
                    </div>
                </div>
            </ScrollArea>
        </main>
    )
}

export default SearchPage