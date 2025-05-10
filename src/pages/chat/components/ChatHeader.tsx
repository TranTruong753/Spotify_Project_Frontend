import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/types";


const ChatHeader = ({friend}:{friend: User}) => {
	// const { selectedUser, onlineUsers } = useChatStore();

	// if (!selectedUser) return null;

	return (
		<div className='p-4 border-b border-zinc-800'>
			<div className='flex items-center gap-3'>
				<Avatar>
					<AvatarImage src={'/avatars/avatar.png'} />
				</Avatar>
				<div>
					<h2 className='font-medium'>{friend.full_name}</h2>
					{/* <p className='text-sm text-zinc-400'>
						{onlineUsers.has(selectedUser.clerkId) ? "Online" : "Offline"}
					</p> */}
				</div>
			</div>
		</div>
	);
};
export default ChatHeader;
