export function formatDate(dateString: string): string {
    if (!dateString) return ""; // Kiểm tra nếu không có giá trị
  
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Ngày không hợp lệ"; // Kiểm tra ngày không hợp lệ
  
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
  
    return `${day}-${month}-${year}`;
  }
  