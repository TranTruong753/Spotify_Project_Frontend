import React, { useState, useEffect } from 'react'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

import { Outlet } from "react-router";
import LeftSidebar from './components/LeftSidebar';
import FriendsActivity from './components/FriendsActivity';
import Header from './components/Header';
const MainLayout = () => {
  const [isMobile, setIsMobile] = useState(false);

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
      <div className='h-screen bg-white text-black flex flex-col'>
        <Header></Header>
        <ResizablePanelGroup direction='horizontal' className='flex-1 flex h-full overflow-hidden p-2 '>
          {/* <AudioPlayer /> */}
          {/* left sidebar */}
          <ResizablePanel id="leftSidebar" order={1} defaultSize={20} minSize={isMobile ? 0 : 10} maxSize={30}>
            <LeftSidebar />
          </ResizablePanel>

          <ResizableHandle className='w-2 bg-white rounded-lg transition-colors' />

          {/* Main content */}
          <ResizablePanel id="mainContent" order={2}  defaultSize={isMobile ? 80 : 60}>
            <Outlet />
          </ResizablePanel>

          {!isMobile && (
            <>
              <ResizableHandle className='w-2 bg-white rounded-lg transition-colors' />

              {/* right sidebar */}
              <ResizablePanel id="rightSidebar" order={3} defaultSize={20} minSize={0} maxSize={25} collapsedSize={0}>
                <FriendsActivity />
              </ResizablePanel>
            </>
          )}
        </ResizablePanelGroup>

        {/* <PlaybackControls /> */}
      </div>
    </>
  )
}

export default MainLayout