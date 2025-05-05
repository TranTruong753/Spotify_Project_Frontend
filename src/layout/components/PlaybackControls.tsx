import React, { useEffect, useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Laptop2, ListMusic, Mic2, Pause, Play, Repeat, Shuffle, SkipBack, SkipForward, TvMinimalPlay, Volume1 } from "lucide-react";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/store';
import { togglePlay, playNext, playPrevious } from "@/features/audioplayer/playerSlice";
import { formatTime } from '@/utils';
import { Modal } from 'antd';
import { Video } from '@/types';

const PlaybackControls = () => {
	const dispatch = useDispatch<AppDispatch>()
	const { currentSong, isPlaying } = useSelector((state: RootState) => state.player);
	const [isSeeking, setIsSeeking] = useState(false);

	const [volume, setVolume] = useState(75);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);
	const audioRef = useRef<HTMLAudioElement | null>(null);

	// 
	const [isModalOpen, setIsModalOpen] = useState(false);
	
	const handleCancel = () => {
		console.log("dong tab")
		setIsModalOpen(false);
	  };
	// 

	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.volume = volume / 100; // vì volume trong audio là từ 0 đến 1
		}
	}, [volume]);
	

	useEffect(() => {
		audioRef.current = document.querySelector("audio");

		const audio = audioRef.current;
		if (!audio) return;

		const updateTime = () => {
			if (!isSeeking) {
				setCurrentTime(audio.currentTime);
			}
		};

		const updateDuration = () => setDuration(audio.duration);

		audio.addEventListener("timeupdate", updateTime);
		audio.addEventListener("loadedmetadata", updateDuration);

		const handleEnded = () => {
			dispatch(togglePlay()); // Đảm bảo khi bài hát kết thúc, phát lại tự động
		};

		audio.addEventListener("ended", handleEnded);

		return () => {
			audio.removeEventListener("timeupdate", updateTime);
			audio.removeEventListener("loadedmetadata", updateDuration);
			audio.removeEventListener("ended", handleEnded);
		};
	}, [currentSong, dispatch]);

	const handleTogglePlay = () => {
		dispatch(togglePlay());
	};

	const handlePlayNext = () => {
		dispatch(playNext());
	};

	const handlePlayPrevious = () => {
		dispatch(playPrevious());
	};

	const handleShowVide = () => {
		if(currentSong?.video?.video_url){
			if(isPlaying) dispatch(togglePlay());
			
			setIsModalOpen(true)
			console.log("currentSong",currentSong)
		}
	
	}

	return (
		<footer className='h-20 sm:h-24 bg-black border-t border-zinc-800 px-4'>
			<div className='flex justify-between items-center h-full max-w-[1800px] mx-auto'>
				{/* currently playing song */}
				<div className='hidden sm:flex items-center gap-4 min-w-[180px] w-[30%]'>
					{currentSong && (
						<>
							<img
								src={currentSong.img_url} // Use actual song image URL here
								alt={currentSong.name}
								className='w-14 h-14 object-cover rounded-md'
							/>
							<div className='flex-1 min-w-0'>
								<div className='font-medium truncate hover:underline cursor-pointer'>
									{currentSong.name}
								</div>
								<div className='text-sm text-zinc-400 truncate hover:underline cursor-pointer'>
									{/* {currentSong.artist?.name} Assuming artist is part of the song object */}
									{currentSong?.song_singers && currentSong?.song_singers.map((singer: any) => (
										<p key={singer.artist.id}>
											{singer.artist.name}
										</p>
									))}
								</div>
							</div>
						</>
					)}
				</div>

				{/* player controls */}
				<div className='flex flex-col items-center gap-2 flex-1 max-w-full sm:max-w-[45%]'>
					<div className='flex items-center gap-4 sm:gap-6'>
						<Button
							size='icon'
							variant='ghost'
							className='hidden sm:inline-flex hover:text-white text-zinc-400'
						>
							<Shuffle className='h-4 w-4' />
						</Button>

						<Button
							size='icon'
							variant='ghost'
							className='hover:text-white text-zinc-400'
							onClick={handlePlayPrevious}
							disabled={!currentSong}
						>
							<SkipBack className='h-4 w-4' />
						</Button>

						<Button
							size='icon'
							className='bg-white hover:bg-white/80 text-black rounded-full h-8 w-8'
							onClick={handleTogglePlay}
							disabled={!currentSong}
						>
							{isPlaying ? <Pause className='h-5 w-5' /> : <Play className='h-5 w-5' />}
						</Button>

						<Button
							size='icon'
							variant='ghost'
							className='hover:text-white text-zinc-400'
							onClick={handlePlayNext}
							disabled={!currentSong}
						>
							<SkipForward className='h-4 w-4' />
						</Button>

						<Button
							size='icon'
							variant='ghost'
							className='hidden sm:inline-flex hover:text-white text-zinc-400'
						>
							<Repeat className='h-4 w-4' />
						</Button>
					</div>

					<div className='hidden sm:flex items-center gap-2 w-full'>
						<div className='text-xs text-zinc-400'>
							{`${formatTime(currentTime)}`} {/* Format the time if needed */}
						</div>
						<Slider
							value={[currentTime]}
							max={duration}
							step={1}
							className='w-full hover:cursor-grab active:cursor-grabbing bg-zinc-300'
							onValueChange={(value) => {
								setIsSeeking(true);
								setCurrentTime(value[0]); // cập nhật giao diện tức thời 
							}}
							onValueCommit={(value) => {
								if (audioRef.current) {
									audioRef.current.currentTime = value[0]; // cập nhật thời gian thực tế
								}
								setIsSeeking(false);
							}}
						/>


						<div className='text-xs text-zinc-400'>
							{`${formatTime(duration)}`} {/* Format the duration if needed */}
						</div>
					</div>
				</div>

				{/* volume controls */}
				<div className='hidden sm:flex items-center gap-4 min-w-[180px] w-[30%] justify-end'>
				
					<Button size='icon' variant='ghost' className='hover:text-white text-zinc-400 cursor-pointer'
					
					onClick={()=> handleShowVide()}
					>
						<TvMinimalPlay className='h-4 w-4' />
					</Button>

					<div className='flex items-center gap-2'>
						<Button size='icon' variant='ghost' className='hover:text-white text-zinc-400'>
							<Volume1 className='h-4 w-4' />
						</Button>

						<Slider
							value={[volume]}
							max={100}
							step={1}
							className='w-24 hover:cursor-grab active:cursor-grabbing bg-white'
							onValueChange={(value) => setVolume(value[0])}
						/>
					</div>
				</div>
			</div>

			<Modal
				title={`Video`}
				open={isModalOpen}
				// onOk={handleOk}
				onCancel={handleCancel}
				footer={null}
				destroyOnClose={true}
				onClose={handleCancel}
				maskClosable={false}
			>
				<video controls style={{ width: '100%' }}>
					<source src={currentSong?.video?.video_url} type="video/mp4" />
					Your browser does not support the video tag.
				</video>
			</Modal>

		</footer>
	);
}

export default PlaybackControls;
