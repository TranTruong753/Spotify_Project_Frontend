import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Button as ButtonAtd } from "antd";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CircleCheckBig, CirclePlus, Clock, Pause, Play } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAlbumById } from "@/features/albums/albumsSlice";
import { AppDispatch, RootState } from "@/app/store";
import { Album } from "@/types";
import { useParams } from "react-router";  // Import useParams
import { formatDate, formatTime } from "@/utils";
import { playAlbum, togglePlay } from "@/features/audioplayer/playerSlice";
import { addAlbum, deleteAlbumFavorite, getAlbumFavorite } from "@/services/AuthenticateServices";
import { getAlbumsFavorite } from "@/features/accounts/authSlice";

const AlbumDetailPage = () => {
	const { id } = useParams<{ id: string }>();  // Get albumId from URL
	const dispatch = useDispatch<AppDispatch>()

	const { currentAlbum, loading, error } = useSelector(
		(state: RootState) => state.albums
	);

	const { albums, user, isAuthenticated } = useSelector(
		(state: RootState) => state.auth
	);


	const isAlbumFovorite = albums ? albums.some((album) => album.album.id === currentAlbum?.id) : false;

	const { currentSong, isPlaying } = useSelector((state: RootState) => state.player);

	// Fetch album when component mounts
	useEffect(() => {
		if (id) {
			dispatch(fetchAlbumById(Number(id))); // Dispatch the action to fetch album
		}
	}, [dispatch, id]);



	//   if (loading) {
	//     return <div>Loading...</div>;
	//   }

	//   if (error) {
	//     return <div>Error: {error}</div>;
	//   }

	const handlePlayAlbum = () => {
		console.log("1");
		if (!currentAlbum) return;

		console.log("2");

		if (currentAlbum?.album_songs) {
			const isCurrentAlbumPlaying = currentAlbum?.album_songs.some(
				(song) => song.id === currentSong?.id
			);
			console.log("3", isCurrentAlbumPlaying);

			// Kiểm tra nếu album đang phát, toggle để dừng phát
			if (isCurrentAlbumPlaying) {
				dispatch(togglePlay());
			}

			// Bắt đầu phát album từ bài hát đầu tiên nếu chưa phát
			dispatch(playAlbum({ songs: currentAlbum?.album_songs, startIndex: 0 }));
		}
	};


	const handlePlaySong = (index: number) => {
		if (!currentAlbum) return;

		if (currentAlbum?.album_songs) {
			// start playing the album from the beginning
			dispatch(playAlbum({ songs: currentAlbum?.album_songs, startIndex: index }));
		}
	};

	const handleAddAlbumFavourite = async () => {
		const formData = new FormData();
		if (user) formData.append("account", user.id.toString());

		if (id) formData.append("album", id);

		await addAlbum(formData)

		if (user) await dispatch(getAlbumsFavorite(user.id))


	}

	const handleDeleteAlbumFavourite = async () => {
		const favoriteAlbumId = albums?.find(album => album.album.id === currentAlbum?.id)?.id || null;
		console.log("run",favoriteAlbumId)
		if(favoriteAlbumId){
			await deleteAlbumFavorite(favoriteAlbumId)
		}
		if (user) await dispatch(getAlbumsFavorite(user.id))
	}


	return (
		<div className="h-full">
			<ScrollArea className="h-full rounded-md">
				{/* Main Content */}
				<div className="relative min-h-full">
					{/* bg gradient */}
					<div
						className="absolute inset-0 bg-gradient-to-b from-[#5038a0]/80 via-zinc-900/80 to-zinc-900 pointer-events-none"
						aria-hidden="true"
					/>

					{/* Content */}
					<div className="relative z-10">
						<div className="flex p-6 gap-6 pb-8">
							<img
								src={currentAlbum?.img_url}
								alt={currentAlbum?.name}
								className="w-[240px] h-[240px] shadow-xl rounded"
							/>
							<div className="flex flex-col justify-end">
								<p className="text-sm font-medium">Album</p>
								<h1 className="text-7xl font-bold my-4">{currentAlbum?.name}</h1>
								<div className="flex items-center gap-2 text-sm text-zinc-100">
									{/* <span className="font-medium text-white">{currentAlbum?.artist}</span> */}
									<span>{currentAlbum?.album_songs?.length} songs</span>
								</div>
							</div>
						</div>

						{/* play button */}
						<div className='px-6 pb-4 flex items-center gap-6'>
							<Button
								onClick={handlePlayAlbum}
								size='icon'
								className='w-14 h-14 rounded-full bg-green-500 hover:bg-green-400 
                hover:scale-105 transition-all'
							>
								{isPlaying && (currentAlbum?.album_songs && currentAlbum?.album_songs.some((song) => song.id === currentSong?.id)) ? (
									<Pause className='h-7 w-7 text-black' />
								) : (
									<Play className='h-7 w-7 text-black' />
								)}
							</Button>

							{isAuthenticated ? (isAlbumFovorite ?
								<ButtonAtd shape="circle"
									color="green"
									variant="solid"
									onClick={() => handleDeleteAlbumFavourite()}
								>

									<CircleCheckBig size={18} />
								</ButtonAtd>

								:

								<ButtonAtd shape="circle"
									color="green"
									variant="solid"
									onClick={() => handleAddAlbumFavourite()}
								>

									<CirclePlus size={18} />
								</ButtonAtd>) : ""}

						</div>

						{/* Table Section */}
						<div className="bg-black/20 backdrop-blur-sm">
							{/* table header */}
							<div className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-10 py-2 text-sm text-zinc-400 border-b border-white/5">
								<div>#</div>
								<div>Title</div>
								<div>Released Date</div>
								<div>
									<Clock className="h-4 w-4" />
								</div>
							</div>

							{/* songs list */}

							<div className='px-6'>
								<div className='space-y-2 py-4'>
									{currentAlbum?.album_songs && currentAlbum?.album_songs.map((song, index) => {
										const isCurrentSong = currentSong?.id === song.id;
										return (
											<div
												key={song.id}
												onClick={() => handlePlaySong(index)}
												className={`grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-4 py-2 text-sm 
                      text-zinc-400 hover:bg-white/5 rounded-md group cursor-pointer
                      `}
											>
												<div className='flex items-center justify-center'>
													{isCurrentSong && isPlaying ? (
														<div className='size-4 text-green-500'>♫</div>
													) : (
														<span className='group-hover:hidden'>{index + 1}</span>
													)}
													{!isCurrentSong && (
														<Play className='h-4 w-4 hidden group-hover:block' />
													)}
												</div>

												<div className='flex items-center gap-3'>
													<img src={song.img_url} alt={song.name} className='size-10' />

													<div>
														<div className={`font-medium text-white`}>{song.name}</div>
														{/* <div>{song.artist}</div> */}
													</div>
												</div>
												<div className='flex items-center'>{formatDate(song.created_at)}</div>
												<div className='flex items-center'>{formatTime(song.duration)}</div>
											</div>
										);
									})}
								</div>
							</div>
						</div>
					</div>
				</div>
			</ScrollArea>
		</div>
	);
};

export default AlbumDetailPage;
