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
import { playAlbum } from "@/features/audioplayer/playerSlice";

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
          songs.map((song) => <CardSongs key={song.id} songItem={song} songs={songs}/>)}
      </div>
    </div>
  );
};

// ✅ Sửa: destructuring prop songItem
const CardSongs = ({ songItem, songs }: { songItem: Song, songs: Song[] }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentIndex  } = useSelector((state: RootState) => state.player);
  const handleClickPlaySong = () => {
    if (songs) {
      dispatch(playAlbum({ songs: songs, startIndex: currentIndex }));
    }
  };
  
  return (
    <Card className="bg-zinc-950 group relative transition-all duration-300 ease-in-out p-4 border-0 hover:shadow-xl hover:scale-105 cursor-pointer gap-2 ">
      <CardContent className="p-0 rounded-sm overflow-hidden ">
        <img
          className="w-full aspect-square rounded-sm object-cover"
          src={songItem?.img_url}
          alt=""
        />
        <div className="mt-3">
          <h3 className="font-medium mb-2 truncate">{songItem?.name}</h3>
          <div className="flex gap-3">
            {songItem?.song_singers.map((singer: any) => (
              <p key={singer.artist.id} className="text-sm text-zinc-400 truncate">
                {singer.artist.name}
              </p>
            ))}
          </div>
        </div>
      </CardContent>
      <PlayButton song={songItem} handleClickPlaySong={handleClickPlaySong} />
    </Card>
  );
};

export default SectionGrid;
