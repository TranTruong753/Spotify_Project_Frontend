import { Button } from "@/components/ui/button";
import { Song } from "@/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PlayButton from "./PlayButton";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { initializeQueue, playAlbum } from "@/features/audioplayer/playerSlice";
import { CirclePlus, EllipsisVertical, Heart } from "lucide-react";
import { Dropdown, MenuProps } from "antd";
import { Link } from "react-router";
import { addAlbumUserSong, addSongInFavoriteUser, fetchAlbumUserById, fetchMusicFavoriteUserById } from "@/features/accounts/authSlice";
import { useEffect, useState } from "react";
import { deleteSongFavoriteUser } from "@/services/AuthenticateServices";

type SectionGridProps = {
  title?: string;
  songs?: Song[];
  isLoading: boolean;
};

const SectionGrid = ({ songs, title, isLoading }: SectionGridProps) => {

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-bold">{title}</h2>
        <Button
          variant="link"
          className="text-sm text-zinc-400 dark:hover:text-white cursor-pointer"
        >
          Hiển thị tất cả
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {songs &&
          songs.map((song) => <CardSongs key={song.id} songItem={song} songs={songs} />)}
      </div>
    </div>
  );
};

// ✅ Sửa: destructuring prop songItem
const CardSongs = ({ songItem, songs }: { songItem: Song, songs: Song[] }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentIndex } = useSelector((state: RootState) => state.player);

  const { accountAlbums, user , isAuthenticated, listSongFavorite } = useSelector((state: RootState) => state.auth);

  const [isSongFavorite, setIsSongFavorite] = useState(false)

  useEffect(() => {
    if (listSongFavorite) {
      const isFav = listSongFavorite.some((item) => item.song.id === songItem.id);
     console.log("isFav:", isFav);
      setIsSongFavorite(isFav);
    }
  }, [listSongFavorite]);


  

  const handleClickPlaySong = () => {
    // if (songs) {
    //   // dispatch(initializeQueue( songs ));
    // }
  };

  // Tạo danh sách item cho dropdown con từ accountAlbums
  const items2: MenuProps['items'] = accountAlbums.map((album) => (

    {
    label: album.name, // hoặc album.title tuỳ theo cấu trúc
    key: album.id.toString(), // key phải là string
  }

));

  // 2. Hàm xử lý khi chọn album
  const handleSelectAlbum = async ({ key }: { key: string }) => {
    const selectedAlbum = accountAlbums.find((album) => album.id.toString() === key);
    if (selectedAlbum) {
      console.log("Selected album:", selectedAlbum.id);
      console.log("Selected songItem:", songItem.id);
      // Thực hiện thêm logic như thêm bài hát vào album, gọi API, v.v.
      const formData = new FormData();
      formData.append("album_user", selectedAlbum.id.toString());
      formData.append("song", songItem.id.toString());
      formData.append("is_deleted", "false"); // hoặc từ values

      await dispatch(addAlbumUserSong(formData)).unwrap 

      if(user) await dispatch(fetchAlbumUserById(user.id)).unwrap 
    }
  };

  const handleAddSong = async () => {
    console.log("item",songItem.id)
    if(songItem && user){
      const formData = new FormData();
      formData.append("account", user.id.toString());
      formData.append("song", songItem.id.toString());
      formData.append("is_deleted", "false"); // hoặc từ values
      await dispatch(addSongInFavoriteUser(formData)).unwrap 
    }
   
  }

  const handleAddSongInFavorite = async () => {
    if (!isAuthenticated || !user) return;
  
    const isFavorite = listSongFavorite.some(
      (item) => item.song.id === songItem.id
    );
  
    try {
      if (isFavorite) {
        // Xoá khỏi danh sách yêu thích
        const favoriteItem = listSongFavorite.find(
          (item) => item.song.id === songItem.id
        );
        if (favoriteItem) {
        //  await dispatch(removeFavoriteSong(favoriteItem.id)).unwrap();
        console.log("hàm xóa",favoriteItem)
        await deleteSongFavoriteUser(favoriteItem.id)
        setIsSongFavorite(false)
       
        }
      } else {
        // Thêm vào danh sách yêu thích
        await handleAddSong();
        setIsSongFavorite(true)
      
    
      }
      if(user) { console.log("huihi")
        await dispatch(fetchMusicFavoriteUserById(user.id))}
    
    } catch (error) {
     
      console.error(error);
    }
  };
  

  const items: MenuProps['items'] = [
    {
      label: (
        <div onClick={handleAddSongInFavorite}>
          {isSongFavorite
            ? <Heart strokeWidth={3} size={18} className="text-red-500" /> 
            : <Heart size={18} />}
        </div>
      ),
       key: '0',
    },
    ...(accountAlbums.length > 0
      ? [
          {
            label: (
              <Dropdown menu={{ items: items2, onClick: handleSelectAlbum }}>
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  <CirclePlus size={18} />
                </span>
              </Dropdown>
            ),
            key: '1',
          },
        ]
      : []),
  ];
  
  return (
    <Card className="bg-zinc-950 group relative transition-all duration-300 ease-in-out p-4 border-0 hover:shadow-xl hover:scale-105 cursor-pointer gap-2 ">
      <CardContent className="p-0 rounded-sm overflow-hidden ">
        <img
          className="w-full aspect-square rounded-sm object-cover"
          src={songItem?.img_url}
          alt=""
        />
        <div className="mt-3">
          <div className="flex justify-between mb-2">
            <h3 className="font-medium mb-2 truncate">{songItem?.name}</h3>
           {isAuthenticated && <Dropdown menu={{ items }} trigger={['click']}>
              <EllipsisVertical />
            </Dropdown>}
          </div>
          <div className="flex gap-3">
            {songItem?.song_singers.length > 0 ? songItem?.song_singers.map((singer: any) => (
              <p key={singer.artist.id} className="text-sm text-zinc-400 truncate">
                {singer.artist.name}
              </p>
            )): 
              <p className="text-sm text-zinc-400 truncate">
               Chưa có
              </p>
            
            }
          </div>
        </div>
      </CardContent>
      <PlayButton song={songItem} handleClickPlaySong={handleClickPlaySong} />
    </Card>
  );
};

export default SectionGrid;


// const Modal