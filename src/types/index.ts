export interface Song {
	id: string;
	name: string;
	song_singers: Artist[] | [];
	video: string | null;
	// albumId: string | null;
	album: Album | null;
	audio_url: string;
	duration: number;
	lyrics: string;
	genre: string;
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