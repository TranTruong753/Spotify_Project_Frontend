import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { ConfigProvider } from "antd";
import { theme as antdTheme } from 'antd';
import { Outlet } from "react-router";

export default function AdminLayout() {
  return (
    <ConfigProvider
      theme={{
        algorithm: antdTheme.darkAlgorithm,

      }}
    >
      <SidebarProvider className="bg-zinc-900! text-zinc-300">
        <AppSidebar variant="inset" />
        <SidebarInset className="bg-zinc-800!">
          <SiteHeader />
          <div className="flex flex-1 flex-col bg-zinc-800 ">

            {/* <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6"> */}
            <Outlet />
            {/* </div> */}

          </div>


        </SidebarInset>
      </SidebarProvider>
    </ConfigProvider>
  )
}
