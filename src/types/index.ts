export interface Song {
	id: string;
	name: string;
	title: string;
	artist: string;
	albumId: string | null;
	imageUrl: string;
	audioUrl: string;
	duration: number;
	createdAt: string;
	updatedAt: string;
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
