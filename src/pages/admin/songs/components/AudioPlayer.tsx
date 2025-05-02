import { useState, useEffect, useRef, ChangeEvent } from 'react';
import { Pause, Play, Volume2, MoreVertical } from 'lucide-react';
import {formatTime} from '@/utils'
type AudioPlayerProps = {
    audio_url: string;
    nameSong: string;
    isGlobalPlaying: boolean;
    onPlay: () => void;
};

export default function AudioPlayer({ audio_url, nameSong, isGlobalPlaying, onPlay }: AudioPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [volume, setVolume] = useState(1);
    
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const progressRef = useRef<HTMLInputElement | null>(null);

    // Hiệu ứng để xử lý khi isGlobalPlaying thay đổi
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        // Nếu không phải là player đang được chọn để phát (isGlobalPlaying = false), thì dừng lại
        if (!isGlobalPlaying && isPlaying) {
            audio.pause();
            setIsPlaying(false);
        }
    }, [isGlobalPlaying, isPlaying]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleLoadedMetadata = () => {
            setDuration(audio.duration);
        };

        const handleTimeUpdate = () => {
            setCurrentTime(audio.currentTime);
        };

        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        audio.addEventListener('timeupdate', handleTimeUpdate);

        return () => {
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audio.removeEventListener('timeupdate', handleTimeUpdate);
        };
    }, []);

    const togglePlay = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.pause();
            setIsPlaying(false);
        } else {
            // Thông báo cho component cha biết rằng player này đang được phát
            onPlay();
            audio.play();
            setIsPlaying(true);
        }
    };

    const handleProgressChange = (e: ChangeEvent<HTMLInputElement>) => {
        const audio = audioRef.current;
        if (!audio) return;

        const newTime = (Number(e.target.value) / 100) * duration;
        setCurrentTime(newTime);
        audio.currentTime = newTime;
    };

    const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newVolume = Number(e.target.value) / 100;
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
        }
    };

    return (
        <div className="relative w-full max-w-md bg-white rounded-lg shadow-lg p-4 flex items-stretch justify-center">
            {/* Hidden audio element */}
            <audio ref={audioRef} src={audio_url} preload="metadata" />

            {/* Play/Pause Button */}
            <button
                onClick={togglePlay}
                className="cursor-pointer w-12 h-12 flex items-center justify-center bg-gray-300 rounded-full bg-green-500 hover:bg-green-400 hover:scale-105 transition-all "
            >
                {isPlaying ? (
                    <Pause className="w-6 h-6 text-gray-700" />
                ) : (
                    <Play className="w-6 h-6 text-gray-700 ml-1" />
                )}
            </button>

            {/* Progress Bar */}
            <div className="flex-grow ml-4 items-start gap-2 flex flex-col justify-self-start">
                <h1 className='font-semibold'>{nameSong}</h1>
                <input
                    ref={progressRef}
                    type="range"
                    min="0"
                    max="100"
                    value={(currentTime / duration) * 100 || 0}
                    onChange={handleProgressChange}
                    className="w-full h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                    style={{
                        background: `linear-gradient(to right, #22c55e ${(currentTime / duration) * 100}%, #d1d5db ${(currentTime / duration) * 100}%)`,
                    }}                
                />
            </div>
                
            <span className="ml-2 mr-3 flex items-center mt-3">{formatTime(duration)}</span>

            {/* Volume Control */}
            <div className="group mr-2 flex items-center mt-3">
                {/* Icon loa */}
                <Volume2 className="w-6 h-6 text-gray-700 cursor-pointer" />

                {/* Thanh chỉnh âm lượng (hiện khi hover) */}
                <div className="flex-grow mx-1 items-center flex">
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={volume * 100}
                        onChange={handleVolumeChange}
                        className="w-16 h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer"   
                        style={{
                            background: `linear-gradient(to right, #22c55e ${volume * 100}%, #d1d5db ${volume * 100}%)`,
                        }}
                    />
                </div>
            </div>
        </div>
    );
}