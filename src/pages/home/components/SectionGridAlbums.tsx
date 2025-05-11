import { Button } from "@/components/ui/button";
import { Album } from "@/types";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { playAlbum } from "@/features/audioplayer/playerSlice";
import PlayButtonAlbum from "@/pages/home/components/PlayButtonAlbum";
import { useNavigate } from "react-router";

type SectionGridProps = {
  title?: string;
  albums?: Album[];
  isLoading: boolean;
};

const SectionGrid = ({ albums, title }: SectionGridProps) => {



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
        {albums &&
          albums.map((song) => <CardAlbums key={song.id} albumItem={song} />)}
      </div>
    </div>
  );
};

const CardAlbums = ({ albumItem }: { albumItem: Album }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentIndex  } = useSelector((state: RootState) => state.player);
  const navigate = useNavigate()

  const handleClickPlayAlbum = () => {
    if (albumItem?.album_songs?.length) {
      dispatch(playAlbum({ songs: albumItem.album_songs, startIndex: currentIndex >= 0 ? currentIndex : 0 }));
      // dispatch(setCurrentSong(albumItem.album_songs[0]));
    }
  };

  return (
    <Card
    onClick={()=>navigate(`/album/${albumItem.id}`)}

      className="bg-zinc-950 group relative transition-all duration-300 ease-in-out p-4 border-0 hover:shadow-xl hover:scale-105 cursor-pointer gap-2"
    >
      <CardContent className="p-0 rounded-sm overflow-hidden">
        <img
          className="w-full aspect-square rounded-sm object-cover"
          src={albumItem?.img_url}
          alt={albumItem?.name}
        />
        <div className="mt-3">
          <h3 className="font-medium mb-2 truncate">{albumItem?.name}</h3>
          {/* <div className="flex gap-3">
            <p className="text-sm text-zinc-400 truncate">
              {albumItem.description}
            </p>
          </div> */}
        </div>
      </CardContent>

      {albumItem.album_songs && albumItem.album_songs?.length > 0 && (
        <PlayButtonAlbum
          songs={albumItem.album_songs}
          handleClickPlayAlbum={handleClickPlayAlbum}
        />
      )}

    </Card>
  );
};


export default SectionGrid;
