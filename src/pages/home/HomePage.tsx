import { ScrollArea } from '@/components/ui/scroll-area'

import { useEffect } from 'react'
import SectionGrid from '@/pages/home/components/SectionGrid'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/app/store'
import { fetchAlbums } from '@/features/albums/albumsSlice'
import { fetchSongs } from '@/features/songs/songSlice'
import { initializeQueue } from '@/features/audioplayer/playerSlice'
import SectionGridAlbums from '@/pages/home/components/SectionGridAlbums'
import { fetchMusicFavoriteUserById } from '@/features/accounts/authSlice'


const HomePage = () => {

  const dispatch = useDispatch<AppDispatch>()

  const { list: listAlbum, loading: loadingAlbum } = useSelector((state: RootState) => state.albums)

  const { list: listSong, loading: loadingSong } = useSelector((state: RootState) => state.songs)

  const { user } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    const fetchSong = async () => {
      if (user?.id) {
        await dispatch(fetchMusicFavoriteUserById(user.id));
      }
    };

    fetchSong();
  }, [user?.id]);


  useEffect(() => {
    // Gọi chỉ 1 lần khi component mount
    dispatch(initializeQueue(listSong));

  }, [dispatch, listSong]); // hoặc thêm `yourSongList` nếu nó là biến


  useEffect(() => {
    if (!listAlbum.length) {
      dispatch(fetchAlbums());
    }
    if (!listSong.length) {
      dispatch(fetchSongs())
    }
  }, [dispatch, listAlbum.length, listSong.length]);


  return (
    <main className='rounded-md overflow-hidden h-full bg-zinc-900 dark:bg-gradient-to-b from-zinc-800 to-zinc-900'>
      <ScrollArea className='h-[calc(100vh-180px)]'>
        <div className='p-4 sm:p-6'>
          {/* <h1 className='text-2xl sm:text-3xl font-bold mb-6'>Good afternoon</h1> */}

          <div className='space-y-8'>
            <SectionGrid title='Dành cho bạn' isLoading={loadingSong} songs={listSong} />

            <SectionGridAlbums title='Albums' isLoading={loadingAlbum} albums={listAlbum} />

          </div>
        </div>
      </ScrollArea>
    </main>
  )
}

export default HomePage