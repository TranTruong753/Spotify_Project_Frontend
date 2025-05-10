import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { useState } from "react";

interface MessageInput {
	handleSendMessage:  () => void 
	newMessage: string;
	setNewMessage: (data: string) => void;
}

const MessageInput = ({handleSendMessage,newMessage,setNewMessage}: MessageInput) => {
	


	return (
		<div className='p-4 mt-auto border-t border-zinc-800'>
			<div className='flex gap-2'>
				<Input
					placeholder='Type a message'
					value={newMessage}
					onChange={(e) => setNewMessage(e.target.value)}
					className='bg-zinc-800 border-none'
					onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
				/>

				<Button size={"icon"} disabled={!newMessage.trim()} onClick={()=>handleSendMessage()}>
					<Send className='size-4' />
				</Button>
			</div>
		</div>
	);
};
export default MessageInput;
