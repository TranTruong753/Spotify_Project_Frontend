import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"


export function SiteHeader() {
  return (
   
    <header className="bg-zinc-800  text-zinc-300 flex h-16 shrink-0 items-center gap-2 border-b">
      <div className="flex items-center gap-2 px-3">
        <SidebarTrigger />
        <Separator orientation="vertical" className=" mr-2 h-4" />
        <h1 className="text-base font-medium">ADMIN</h1>
      </div>
    </header>
  )
}
