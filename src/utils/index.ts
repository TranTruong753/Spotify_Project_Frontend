export function formatDate(dateString: string): string {
    if (!dateString) return ""; // Kiểm tra nếu không có giá trị
  
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Ngày không hợp lệ"; // Kiểm tra ngày không hợp lệ
  
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
  
    return `${day}-${month}-${year}`;
  }
  
export  function formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  }
  
export function parseGenre(value: string | string[]): string[] {
  if (typeof value === 'string' && value.includes('-')) {
    return value.split('-');
  }
  if (Array.isArray(value)) {
    return value;
  }
  return value ? [value] : [];

}

  
export const getInitials = (fullName:string) => {
    if (!fullName) return "";
  
    return fullName
      .trim()
      .split(/\s+/) // tách theo khoảng trắng
      .map(word => word[0].toUpperCase())
      .join("");
  }



export const generateRoomName = (id1:number, id2:number) => {
  const sortedIds = [id1, id2].sort(); // sắp xếp tăng dần
  return `${sortedIds[0]}_${sortedIds[1]}`; // tạo room name
}


  
