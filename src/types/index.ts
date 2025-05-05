export interface Song {
	id: number;
	name: string;
	song_singers: Artist[] | [];
	video: Video | null;
	// albumId: string | null;
	album: Album | null;
	audio_url: string;
	img_url: string;
	duration: number;
	lyrics: string;
	genre: string;
	created_at: string;
}

export interface Video {
	id: number;
	video_url: string;
	title: string;
	duration: number;
	created_at: string;
}

export interface Album {
	id: number;
	name: string;
	description: string;
	img_url: string;
	album_songs?: Song[];

}
export interface Artist {
	id: number;
	name: string;
	img_url: string;
}

export interface Account {
	refresh: string;
	access: string;
	user: User;

}

export interface User {
	id: number;
	email: string;
	full_name: string;
	sex: string | null;
	birthday: string | null;
	role: Role;

}

export interface Role {
	id: number ;
	name: string;
}

// Kiểu dữ liệu trả về từ API
export interface AlbumApiResponse {
	results: Album[]; // Mảng album
	count: number; // Tổng số album
}
export interface ArtistApiResponse {
	results: Artist[]; // Mảng album
	count: number; // Tổng số album
}

export interface SongApiResponse {
	results: Song[]; // Mảng album
	count: number; // Tổng số album
}