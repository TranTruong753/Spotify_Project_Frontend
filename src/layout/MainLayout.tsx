import React, { useState, useEffect } from 'react'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { theme as antdTheme } from 'antd';
import { Outlet } from "react-router";
import LeftSidebar from './components/LeftSidebar';
import FriendsActivity from './components/FriendsActivity';
import PlaybackControls from './components/PlaybackControls';
import Header from './components/Header';
import AudioPlayer from './components/AudioPlayer';
import { ConfigProvider } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/store';
import { getAlbumsFavorite, getAlbumsUser } from '@/features/accounts/authSlice';
const MainLayout = () => {
  const [isMobile, setIsMobile] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (user && user.id) {
      dispatch(getAlbumsFavorite(user.id));
      dispatch(getAlbumsUser(user.id));
    }
  }, [user, dispatch]);

  useEffect(() => {
		const checkMobile = () => {
      const newIsMobile = window.innerWidth < 768;
      setIsMobile(newIsMobile);
      console.log('isMobile updated:', newIsMobile);
		};

		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

  return (
    <>
     <ConfigProvider
        theme={{
          algorithm: antdTheme.darkAlgorithm ,
        
        }}
        >
      <div className='h-screen bg-black text-white flex flex-col'>
        <Header></Header>
        <ResizablePanelGroup direction='horizontal' className='flex-1 flex h-full overflow-hidden px-2 pt-2 '>
          <AudioPlayer />
          {/* left sidebar */}
          <ResizablePanel id="leftSidebar" order={1} defaultSize={20} minSize={isMobile ? 0 : 10} maxSize={30}>
            <LeftSidebar />
          </ResizablePanel>

          <ResizableHandle className='w-2 bg-black rounded-lg transition-colors' />

          {/* Main content */}
          <ResizablePanel id="mainContent" order={2}  defaultSize={isMobile ? 80 : 60}>
            <Outlet />
          </ResizablePanel>

          {!isMobile && (
            <>
              <ResizableHandle className='w-2 bg-black rounded-lg transition-colors' />

              {/* right sidebar */}
              <ResizablePanel id="rightSidebar" order={3} defaultSize={20} minSize={0} maxSize={25} collapsedSize={0}>
                <FriendsActivity />
              </ResizablePanel>
            </>
          )}
        </ResizablePanelGroup>

        <PlaybackControls />
      </div>
      </ConfigProvider>
    </>
  )
}

export default MainLayout