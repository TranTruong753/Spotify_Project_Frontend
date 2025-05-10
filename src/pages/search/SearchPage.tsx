import { ScrollArea } from '@/components/ui/scroll-area'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/app/store'
import { Button, Flex, Spin } from 'antd'
import TableMusic from './components/TableMusic'
import { useSearchParams } from 'react-router'
import { fetchSearchAccount, fetchSearchSongs } from '@/features/songs/songSlice'
import ForUser from './components/ForUser'
import { cn } from '@/lib/utils'


const SearchPage = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { listSearch, loading, listAccountSearch } = useSelector((state: RootState) => state.songs)

    const { isPlaying, currentSong } = useSelector((state: RootState) => state.player)

    const { user, listFriend } = useSelector((state: RootState) => state.auth)
    // const [isLoading, setIsLoading] = useState(false)

    const [showMusic, setShowMusic] = useState(true)
    const [showUser, setShowUser] = useState(true)


    const [searchParams] = useSearchParams();
    const searchValue = searchParams.get('search');

    useEffect(() => {
        setTimeout(async () => {
            if (searchParams) {
                await dispatch(fetchSearchSongs({ key: searchValue }))
                await dispatch(fetchSearchAccount({ key: searchValue }))
            }
        }, 1000);

    }, [searchValue])

    const ShowAll = () => {
        setShowMusic(true)
        setShowUser(true)
    }

    const ShowMucis = () => {
        setShowMusic(true)
        setShowUser(false)
    }

    const ShowUser = () => {
        setShowMusic(false)
        setShowUser(true)
    }

    return (
        <main className=' rounded-md overflow-hidden h-full bg-zinc-900 dark:bg-gradient-to-b from-zinc-800 to-zinc-900'>
            <ScrollArea className='h-[calc(100vh-180px)] w-full pb-4'>
                <div className='px-4 sm:px-6'>
                    {/* <h1 className='text-2xl sm:text-3xl font-bold mb-6'>Good afternoon</h1> */}

                    <div className='relative space-y-8 '>


                        {loading ? (
                            <Flex gap="middle" className='h-[calc(100vh-180px)] justify-center items-center '>
                                <Spin tip="Loading" size="large" className='text-green-500'>
                                    <div style={{ padding: 20 }} /> {/* Thêm phần tử con để Spin hiển thị tip */}
                                </Spin>
                            </Flex>
                        ) :
                            (
                                <>
                                    <div className='flex gap-2 w-full sticky top-0 bg-zinc-900 pt-5 z-10'>
                                        <Button onClick={() => ShowAll()} shape="round" color={showMusic && showUser ? 'default' : undefined} variant='solid'


                                        >
                                            <span className='font-semibold'>Tất cả</span>
                                        </Button>

                                        <Button onClick={() => ShowMucis()} shape="round" color={showMusic && !showUser ? 'default' : undefined} variant='solid'>
                                            <span className='font-semibold'>Bài hát</span>
                                        </Button>

                                        <Button onClick={() => ShowUser()} shape="round" color={showUser && !showMusic ? 'default' : undefined} variant='solid'>
                                            <span className='font-semibold'>Hồ sơ</span>
                                        </Button>

                                    </div>
                                    <div className='' >
                                        {showMusic && (listSearch.length > 0 ?
                                            <TableMusic songs={listSearch} isPlaying={isPlaying} currentSong={currentSong}></TableMusic> : <p className='text-sm text-zinc-400 mt-2'>Không tìm thấy bài nhạc nào</p>
                                        )
                                        }

                                        {showUser &&
                                            (
                                                listAccountSearch.length > 0 ? <ForUser myFriend={listFriend} myUser={user} users={listAccountSearch}></ForUser> : <p className='text-sm text-zinc-400 mt-2'> Không tìm thấy hồ sơ người dung</p>
                                            )
                                        }

                                    </div>
                                </>
                            )

                        }

                    </div>
                </div>
            </ScrollArea>
        </main>
    )
}

export default SearchPage