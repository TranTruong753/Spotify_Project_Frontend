
# 🎧 Spotify Clone - Frontend

Hướng dẫn cài đặt
---

### 🚀 Công nghệ sử dụng

- React 18  
- Vite  
- Axios (kết nối API)  
- React Router DOM  
- TailwindCSS / SCSS (nếu có)  
- Antd
- Shadcn

---

### 📁 Cấu trúc thư mục

```bash
frontend/
├── src/
│   ├── assets/         # Hình ảnh, biểu tượng, nhạc, v.v.
│   ├── components/     # Các thành phần UI tái sử dụng
│   ├── features/       # Các tính năng chính: MusicPlayer, Album, Auth...
│   ├── hooks/          # Custom React Hooks
│   ├── layout/         # Giao diện tổng thể: Header, Footer, Sidebar...
│   ├── lib/            # Cấu hình và thư viện bên thứ ba (ví dụ: axios instance)
│   ├── pages/          # Các trang chính của ứng dụng
│   ├── router/         # Cấu hình route
│   ├── services/       # Gọi API (Axios)
│   ├── types/          # Định nghĩa TypeScript types hoặc interfaces
│   ├── utils/          # Hàm tiện ích dùng chung
│   ├── App.jsx
│   └── main.jsx
├── public/
└── index.html
```

---

### ⚙️ Thiết lập môi trường

1. Truy cập thư mục `frontend`:

```bash
cd frontend
```

2. Cài đặt các thư viện cần thiết:

```bash
npm install
# hoặc
yarn
```

3. Tạo file `.env` để cấu hình đường dẫn API:

```bash
VITE_API_BASE_URL=http://localhost:8000/api
```

---

### ▶️ Chạy ứng dụng

```bash
npm run dev
# hoặc
yarn dev
```

> Ứng dụng sẽ khởi chạy tại: [http://localhost:5173](http://localhost:5173)

---

### ⚙️ Build Production

```bash
npm run build
```

---

### 📌 Tính năng chính

- Phát nhạc và video
- Tạo album, bài hát yêu thích
- Tải video âm nhạc
- Giao diện người dùng thân thiện
- Xử lý tương tác người dùng mượt mà
- Kết nối backend Django qua API
- Bảo mật: xác thực người dùng, phân quyền

---

### 🧑‍💻 Thành viên thực hiện phần Frontend

- **Trần Quang Trường**  
  - Phát triển giao diện trình phát nhạc, album  
  - Xử lý các tương tác người dùng  
  - Kết nối API từ backend  
