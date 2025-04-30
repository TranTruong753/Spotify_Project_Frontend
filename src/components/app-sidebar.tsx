import * as React from "react"
import {
  IconDashboard,
  IconUsers,
  IconMusic,
  IconAlbum ,
  IconMicrophone2 ,
  IconHome 
} from "@tabler/icons-react"

import { FaSpotify } from "react-icons/fa";


import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link } from "react-router";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/admin/",
      icon: IconDashboard,
    },
    {
      title: "User",
      url: "/admin/user",
      icon: IconUsers,
    },
    {
      title: "Music",
      url: "/admin/music",
      icon: IconMusic,
    },
    {
      title: "Album",
      url: "/admin/album",
      icon: IconAlbum ,
    },
    {
      title: "Singer",
      url: "/admin/singer",
      icon: IconMicrophone2 ,
    },
    {
      title: "Back to Home",
      url: "/",
      icon: IconHome  ,
    },
  ],
 
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="focus-visible:outline-none !important hover:bg-transparent p-1.5"
            >
             
             <Link to={"/"} className="focus-visible:outline-none focus-visible:ring-transparent">
               
                  <FaSpotify className="!size-8" />
                  <span className="text-base font-semibold">Spotify</span>
              </Link>
          
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
     
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
