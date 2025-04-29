import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"


export function SiteHeader() {
  return (
    // <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height) border-(--border)">
    //   <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
    //     <SidebarTrigger className="-ml-1" />
    //     <Separator
    //       orientation="vertical"
    //       className="mx-2 data-[orientation=vertical]:h-4"
    //     />
    //     <h1 className="text-base font-medium">ADMIN</h1>
    //     <Breadcrumb>
    //       <BreadcrumbList>
    //         <BreadcrumbItem className="hidden md:block">
    //           <BreadcrumbLink href="#">
    //             Building Your Application
    //           </BreadcrumbLink>
    //         </BreadcrumbItem>
    //         <BreadcrumbSeparator className="hidden md:block" />
    //         <BreadcrumbItem>
    //           <BreadcrumbPage>Data Fetching</BreadcrumbPage>
    //         </BreadcrumbItem>
    //       </BreadcrumbList>
    //     </Breadcrumb>

    //   </div>
    // </header>
    <header className="flex h-16 shrink-0 items-center gap-2 border-b">
      <div className="flex items-center gap-2 px-3">
        <SidebarTrigger />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <h1 className="text-base font-medium">ADMIN</h1>
      </div>
    </header>
  )
}
