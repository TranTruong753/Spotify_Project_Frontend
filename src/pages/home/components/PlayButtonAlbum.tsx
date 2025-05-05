import { AppDispatch, RootState } from "@/app/store";
import { Button } from "@/components/ui/button";
import { Song } from "@/types";
import { Pause, Play } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentSong,
  togglePlay,
} from "@/features/audioplayer/playerSlice";

const PlayButtonAlbum = ({
    songs,
    handleClickPlayAlbum
  }: {
    songs: Song[],
    handleClickPlayAlbum?: () => void;
  }) => {
    const dispatch = useDispatch<AppDispatch>()
    const { currentSong, isPlaying, currentIndex  } = useSelector((state: RootState) => state.player);
  
    const isSongInAlbum = songs.some((song) => song.id === currentSong?.id);

  
    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation(); 
      if (handleClickPlayAlbum) {
        handleClickPlayAlbum();
      }  

      console.log("currentSong",currentSong?.id)
      console.log("isSongInAlbum",isSongInAlbum)
      if (isSongInAlbum && isPlaying ) {
        console.log("1",isPlaying)
        dispatch(togglePlay());
        console.log("2",isPlaying)
      } else {
        console.log("currentIndex",currentIndex)
        dispatch(setCurrentSong(songs[currentIndex]));
      }
    };
  
    return (
      <Button
        size="icon"
        onClick={(e)=>handleClick(e)}
        className={`cursor-pointer absolute bottom-3 right-2 bg-green-500 hover:bg-green-400 hover:scale-105 transition-all 
          opacity-0 translate-y-2 group-hover:translate-y-0 ${isSongInAlbum ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
      >
        {isSongInAlbum && isPlaying ? (
          <Pause className="size-5 text-black" />
        ) : (
          <Play className="size-5 text-black" />
        )}
      </Button>
    );
  };
  

  
export default PlayButtonAlbum;