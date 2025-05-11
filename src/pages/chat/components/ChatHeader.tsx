
import { User } from "@/types";
import { Avatar } from "antd";


const ChatHeader = ({ friend }: { friend: User }) => {

	return (
		<div className='p-4 border-b border-zinc-800'>
			<div className='flex items-center gap-3'>
				<Avatar			
					className={"bg-zinc-800! select-none"}
				>

					{friend.full_name.split(" ").reverse().join(" ").charAt(0)}
				</Avatar>
				<div>
					<h2 className='font-medium'>{friend.full_name}</h2>
		
				</div>
			</div>
		</div>
	);
};
export default ChatHeader;
