import './App.css'
import { Route, Routes } from "react-router";
import { Button } from './components/ui/button'
import MainLayout from './layout/MainLayout';
import HomePage from './pages/home/HomePage';
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
      </Routes>
    </>
  )
}

export default App
