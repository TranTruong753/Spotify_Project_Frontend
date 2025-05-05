import { useDispatch, useSelector } from "react-redux";
import { togglePlay, playNext } from "@/features/audioplayer/playerSlice";
import { RootState } from "@/app/store";
import { useEffect, useRef } from "react";

const AudioPlayer = () => {
  const dispatch = useDispatch();
  const audioRef = useRef<HTMLAudioElement>(null);
  const prevSongRef = useRef<string | null>(null);

  const { currentSong, isPlaying } = useSelector((state: RootState) => state.player);

  // handle play/pause logic
  useEffect(() => {
    if (!audioRef.current) return;
  
    if (isPlaying) {
      audioRef.current
        .play()
        .catch((err) => {
          console.warn("Auto play was blocked:", err);
        });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // handle song ends
  useEffect(() => {
    const audio = audioRef.current;

    const handleEnded = () => {
      dispatch(playNext());
    };

    audio?.addEventListener("ended", handleEnded);

    return () => audio?.removeEventListener("ended", handleEnded);
  }, [dispatch]);

  // handle song changes
  useEffect(() => {
    if (!audioRef.current || !currentSong) return;

    const audio = audioRef.current;

    // check if this is actually a new song
    const isSongChange = prevSongRef.current !== currentSong?.audio_url;
    if (isSongChange) {
        audio.src = currentSong.audio_url;
        audio.currentTime = 0;
        prevSongRef.current = currentSong.audio_url;
      
        if (isPlaying) {
          audio
            .play()
            .catch((err) => console.warn("Play blocked on song change:", err));
        }
      }
  }, [currentSong, isPlaying]);

  return <audio ref={audioRef} />;
};

export default AudioPlayer;
