
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";


const UsersList = () => {


	return (
		<div className='border-r border-zinc-800'>
			<div className='flex flex-col h-full'>
				<ScrollArea className='h-[calc(100vh-280px)]'>
					<div className='space-y-2 p-4'>
						<div												
							className={`bg-zinc-950 flex items-center justify-center lg:justify-start gap-3 p-3 
										rounded-lg cursor-pointer transition-colors
                  `}
						>
							<div className='relative'>
								<Avatar className='size-8 md:size-12'>
									<AvatarImage src={'../../../../public/avatars/avatar1.jpg'} />
									<AvatarFallback>DC</AvatarFallback>
								</Avatar>
								{/* online indicator */}
							
							</div>

							<div className='flex-1 min-w-0 lg:block hidden'>
								<span className='font-medium truncate'>Quang La</span>
							</div>
						</div>
					</div>
				</ScrollArea>
			</div>
		</div>
	);
};

export default UsersList;
