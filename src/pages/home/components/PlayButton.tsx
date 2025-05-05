import { AppDispatch, RootState } from "@/app/store";
import { Button } from "@/components/ui/button";
import { Song } from "@/types";
import { Pause, Play } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentSong,
  togglePlay,
} from "@/features/audioplayer/playerSlice";

const PlayButton = ({ song, handleClickPlaySong }: 
  { song: Song, handleClickPlaySong?: () => void;}) => 
    {
  const dispatch = useDispatch<AppDispatch>()
  const { currentSong, isPlaying, currentIndex } = useSelector((state: RootState) => state.player);

  const isCurrentSong = currentSong?.id === song.id;

  const handleClick = () => {
   if(handleClickPlaySong){
      handleClickPlaySong();
      console.log("0 isPlaying",isPlaying)
      console.log("0 isCurrentSong",isCurrentSong)
      if (isCurrentSong && isPlaying) {
        console.log("1",isPlaying)
        dispatch(togglePlay());
        console.log("2",isPlaying)
      } else {
        dispatch(setCurrentSong(song));
        // dispatch(setCurrentSong(song[currentIndex]));
      }
      console.log("3 isPlaying",isPlaying)
      console.log("3 isCurrentSong",isCurrentSong)
    }
  };

  return (
    <Button
      size="icon"
      onClick={handleClick}
      className={`cursor-pointer absolute bottom-3 right-2 bg-green-500 hover:bg-green-400 hover:scale-105 transition-all 
        opacity-0 translate-y-2 group-hover:translate-y-0 ${isCurrentSong ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
    >
      {isCurrentSong && isPlaying ? (
        <Pause className="size-5 text-black" />
      ) : (
        <Play className="size-5 text-black" />
      )}
    </Button>
  );
};

export default PlayButton;
