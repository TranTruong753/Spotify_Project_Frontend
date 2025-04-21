import { Button } from "@/components/ui/button"
import { Pause, Play } from "lucide-react";

const PlayButton = () => {
    const isCurrentSong = false;
    const isPlaying = false;
    return (
        <Button
            size={"icon"}
         
            className={`cursor-pointer absolute bottom-3 right-2 bg-green-500 hover:bg-green-400 hover:scale-105 transition-all 
        opacity-0 translate-y-2 group-hover:translate-y-0  ${isCurrentSong ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                }`}
        >
            {isCurrentSong && isPlaying ? (
                <Pause className='size-5 text-black' />
            ) : (
                <Play className='size-5 text-black' />
            )}
        </Button>
    )
}

export default PlayButton