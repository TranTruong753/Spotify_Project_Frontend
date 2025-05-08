import "./App.css";
import { Route, Routes } from "react-router";
import MainLayout from "./layout/MainLayout";
import AdminLayout from "./layout/AdminLayout";
import HomePage from "./pages/home/HomePage";
import DashBoardPageAdmin from "./pages/admin/dashboard/DashBoardPageAdmin";
import UserPageAdmin from "./pages/admin/user/UserPageAdmin";
import AlbumPageAdmin from "./pages/admin/album/AlbumPageAdmin";
import AlbumDetailPage from "./pages/album/AlbumDetailPage";
import AlbumUserDetailPage from "./pages/album/AlbumUserDetailPage";
import ChatPage from "./pages/chat/ChatPage";
import SongPageAdmin from "./pages/admin/songs/SongPageAdmin";
import SingerPageAdmin from "./pages/admin/singer/SingerPageAdmin";

import SearchPage from "./pages/search/SearchPage"

import LoginPage from "./pages/login/LoginPage";
import SongFavorite from "./pages/songs/SongFavorite";
import RegisterPage from "./pages/register/RegisterPage";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";

import RequireAuth from "./pages/authenticator/RequireAuth";



function App() {
  const { user } = useSelector((state: RootState) => state.auth)

  return (
    <>
      <Routes>
        <Route element={
          <RequireAuth>
            <MainLayout />
          </RequireAuth>
          }>
          <Route path="/" element={<HomePage />} />
          <Route path="/album/:id" element={<AlbumDetailPage />} />
          <Route path="/chat/:id" element={<ChatPage />} />
          <Route path="/album-user/:id" element={<AlbumUserDetailPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/music-favorite" element={<SongFavorite />} />
        </Route>

        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>

        <Route element={
          <RequireAuth user={user}>
             <AdminLayout />
         </RequireAuth>
        
          }>
          <Route path="/admin/" element={<DashBoardPageAdmin />} />
          {/* <Route path='/admin/dashboard'  element={<HomePageAdmin/>} /> */}
          <Route path="/admin/user" element={<UserPageAdmin />} />
          <Route path="/admin/music" element={<SongPageAdmin />} />
          <Route path="/admin/singer" element={<SingerPageAdmin />} />
          <Route path="/admin/album" element={<AlbumPageAdmin />} />
         
        </Route>
      </Routes>
    </>
  );
}

export default App;
