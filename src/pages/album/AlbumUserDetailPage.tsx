import  { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Button as ButtonAtd } from "antd";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CircleCheckBig, Clock, Pause, Play } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { Song } from "@/types";
import { useNavigate, useParams } from "react-router";  // Import useParams
import { formatDate, formatTime } from "@/utils";
import { playAlbum, togglePlay } from "@/features/audioplayer/playerSlice";
import { deleteAlbumUser } from "@/services/AuthenticateServices";
import { fetchAlbumUserById, getAlbumsUser } from "@/features/accounts/authSlice";



const AlbumUserDetailPage = () => {
	const { id } = useParams<{ id: string }>();  // Get albumId from URL
	const dispatch = useDispatch<AppDispatch>()

	const navigate = useNavigate()
	const { user, isAuthenticated, currentAlbumUser, accountAlbums } = useSelector(
		(state: RootState) => state.auth
	);


	const { currentSong, isPlaying } = useSelector((state: RootState) => state.player);

	// Fetch album when component mounts
	useEffect(() => {
		if (id) {
			dispatch(fetchAlbumUserById(Number(id))); // Dispatch the action to fetch album
		}
	}, [dispatch, id]);



	//   if (loading) {
	//     return <div>Loading...</div>;
	//   }

	//   if (error) {
	//     return <div>Error: {error}</div>;
	//   }

	const handlePlayAlbum = () => {
		if (!currentAlbumUser) return;

		if (currentAlbumUser.album_user_song) {
			// Chuyển đổi song thành kiểu Song chuẩn
			const songs: Song[] = currentAlbumUser.album_user_song.map((item) => ({
				...item.song,

			}));

			const isCurrentAlbumPlaying = songs.some(
				(song) => song.id === currentSong?.id
			);


			if (isCurrentAlbumPlaying) {
				dispatch(togglePlay());
			} else {
				dispatch(playAlbum({ songs, startIndex: 0 }));
			}
		}
	};




	const handlePlaySong = (index: number, isCurrentAlbumPlaying: boolean) => {
		if (!currentAlbumUser) return;

		if (isCurrentAlbumPlaying && isPlaying) {
			dispatch(togglePlay());
		}
		else if (currentAlbumUser.album_user_song) {
			const songs: Song[] = currentAlbumUser.album_user_song.map((item) => {
				const song = item.song;

				return {
					...song,
					//   song_singers: song.song_singers.map((s) => s.artist), // Chuyển đúng sang Artist[]
				};
			});

			dispatch(playAlbum({ songs, startIndex: index }));
		}
	};



	// const handleAddAlbumFavourite = async () => {
	// 	const formData = new FormData();
	// 	if (user) formData.append("account", user.id.toString());

	// 	if (id) formData.append("album", id);

	// 	await addAlbum(formData)

	// 	if (user) await dispatch(getAlbumsFavorite(user.id))


	// }

	const handleDeleteAlbumFavourite = async () => {

		if (currentAlbumUser) await deleteAlbumUser(currentAlbumUser.id)

		if (user) await dispatch(getAlbumsUser(user.id))

		navigate("/")
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
								src={currentAlbumUser?.img_url}
								alt={currentAlbumUser?.name}
								className="w-[240px] h-[240px] shadow-xl rounded"
							/>
							<div className="flex flex-col justify-end">
								<p className="text-sm font-medium">Album</p>
								<h1 className="text-7xl font-bold my-4">{currentAlbumUser?.name}</h1>
								<div className="flex items-center gap-2 text-sm text-zinc-100">
									{/* <span className="font-medium text-white">{currentAlbum?.artist}</span> */}
									<span>{currentAlbumUser?.album_user_song?.length} songs</span>
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
								{isPlaying && (currentAlbumUser?.album_user_song && currentAlbumUser?.album_user_song.some((item) => item.song.id === currentSong?.id)) ? (
									<Pause className='h-7 w-7 text-green' />
								) : (
									<Play className='h-7 w-7 text-black' />
								)}
							</Button>

							{isAuthenticated ?
								<ButtonAtd shape="circle"
									color="green"
									variant="solid"
									onClick={() => handleDeleteAlbumFavourite()}
								>

									<CircleCheckBig size={18} />
								</ButtonAtd>
								: ""}

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
									{currentAlbumUser?.album_user_song && currentAlbumUser?.album_user_song.map((item, index) => {
										const isCurrentSong = currentSong?.id === item.song.id;
										return (
											<div
												key={item.song.id}
												onClick={() => handlePlaySong(index, isCurrentSong)}
												className={`grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-4 py-2 text-sm 
                      text-zinc-400 hover:bg-white/5 rounded-md group cursor-pointer
                      `}
											>
												<div className='flex items-center justify-center'>
													{isCurrentSong && isPlaying ? (
														<div className='size-4 text-green-500'>♫</div>
													) : (
														isCurrentSong ? (<><Play></Play></>) : <span className='group-hover:hidden '>{index + 1}</span>
													)}
													{!isCurrentSong && (
														<Play className='h-4 w-4 hidden group-hover:block' />
													)}
												</div>

												<div className='flex items-center gap-3'>
													<img src={item.song.img_url} alt={item.song.name} className='size-10' />

													<div>
														<div className={`font-medium text-white`}>{item.song.name}</div>
														{/* <div>{song.artist}</div> */}
													</div>
												</div>
												<div className='flex items-center'>{formatDate(item.song.created_at)}</div>
												<div className='flex items-center'>{formatTime(item.song.duration)}</div>
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

export default AlbumUserDetailPage;
