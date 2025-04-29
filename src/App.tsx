import './App.css'
import { Route, Routes } from "react-router";
import MainLayout from './layout/MainLayout';
import AdminLayout from './layout/AdminLayout';
import HomePage from './pages/home/HomePage';
import HomePageAdmin from './pages/admin/dashboard/HomePageAdmin';
import UserPageAdmin from './pages/admin/user/UserPageAdmin';
import AlbumPageAdmin from './pages/admin/album/AlbumPageAdmin';
import SongPageAdmin from './pages/admin/songs/SongPageAdmin';
import SingerPageAdmin from './pages/admin/singer/SingerPageAdmin';

import LoginPage from './pages/login/LoginPage';


function App() {

  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path='/'  element={<HomePage />} />
        </Route>

        <Route  path='/login' element={<LoginPage />}>
        </Route>

      

    
        <Route element={<AdminLayout/>}>
          <Route path='/admin/'  element={<HomePageAdmin/>} />
          {/* <Route path='/admin/dashboard'  element={<HomePageAdmin/>} /> */}
          <Route path='/admin/user'  element={<UserPageAdmin/>} />
          <Route path='/admin/music'  element={<SongPageAdmin/>} />
          <Route path='/admin/singer'  element={<SingerPageAdmin/>} />
          <Route path='/admin/album'  element={<AlbumPageAdmin/>} />
        </Route>
      </Routes>
    </>
  )
}

export default App
