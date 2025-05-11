import * as React from "react"
import {
  IconUsers,
  IconMusic,
  IconAlbum,
  IconMicrophone2,
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
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";



export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useSelector((state: RootState) => state.auth)

const data = {
  user: {
    name: user?.full_name ?? '',
    email: user?.email ?? '',
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [

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
      icon: IconAlbum,
    },
    {
      title: "Singer",
      url: "/admin/singer",
      icon: IconMicrophone2,
    },
    {
      title: "Back to Home",
      url: "/",
      icon: IconHome,
    },
  ],

}

  return (
    <Sidebar collapsible="offcanvas" {...props} className="bg-zinc-900 text-zinc-300" >
      <SidebarHeader className="bg-zinc-900">
        <SidebarMenu >
          <SidebarMenuItem >
            <SidebarMenuButton
              asChild
              className=" focus-visible:outline-none !important hover:bg-transparent! p-1.5"
            >

              <Link to={"/"} className="hover:text-zinc-100 focus-visible:outline-none focus-visible:ring-transparent">

                <FaSpotify className="!size-8" />
                <span className="text-base font-semibold">Spotify</span>
              </Link>

            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="bg-zinc-900">
        <NavMain items={data.navMain} />

      </SidebarContent>
      <SidebarFooter className="bg-zinc-900">
        {user && <NavUser user={data.user} />}
      </SidebarFooter>
    </Sidebar>
  )
}
