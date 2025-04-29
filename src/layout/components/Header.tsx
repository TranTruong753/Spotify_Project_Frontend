import { ChevronLeft, ChevronRight, Bell, User } from 'lucide-react';
import { Link } from 'react-router';
import { FaSpotify, FaHome } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { IoIosNotifications } from "react-icons/io";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const Header = () => {
    return (
        <>
            <div className='p-2 px-8 border border-[hsl(220,13%,91%)]'>
                <div className='flex gap-4 items-center '>
                    <div className='basis-64'>
                        {/* icon Spotify*/}
                        <Link to="/" >
                            <FaSpotify className='text-4xl w-10 h-10' />
                        </Link>
                    </div>


                    <div className='flex items-center gap-2'>
                        <Link to="/" className="bg-black text-white rounded-full w-10 h-10 flex items-center justify-center hover:text-green-400">
                            <FaHome className="text-2xl" />
                        </Link>

                        <div >
                            {/* Search */}
                            <div className='flex items-center h-12 w-sm border-2 rounded-3xl px-3 border-[hsl(220,13%,91%)]'>
                                {/* icon */}
                                <span>
                                    <IoSearch className='text-2xl text-(--border)' />
                                </span>

                                <Input className='border-0 shadow-none font-medium '></Input>
                            </div>
                        </div>
                    </div>


                    <div className='flex gap-2 items-center ml-auto '>
                        <RightHeader isLogIn={true}></RightHeader>

                    </div>


                </div>
            </div>

        </>
    );
};

const RightHeader = ({ isLogIn = false }) => {
    return (
        <>{
            isLogIn ? (
                <div className='flex gap-4 items-center'>
                    <div className='flex gap-2 items-center'>
                        {/* Notifications  */}
                        <div className="cursor-pointer hover:animate-wiggle">
                            <IoIosNotifications className="text-3xl" />
                        </div>


                        <div className='w-15 h-15 flex items-center justify-center bg-gray-100 rounded-full cursor-pointer'>
                            <Avatar className='w-10 h-10 bg-gray-50'>
                                <AvatarImage className='object-cover' src="" />
                                <AvatarFallback>TQ</AvatarFallback>
                            </Avatar>
                        </div>
                    </div>
                </div>
            ) :
                (<>
                    <Link to="/register" className='text-xl font-medium'>Đăng ký</Link>
                    <Button className='transition-all duration-300 ease-out rounded-3xl h-11 bg-black text-white text-xl hover:scale-110 hover:bg-black hover:cursor-pointer '>
                        <Link to="/login">Đăng nhập</Link>
                    </Button>
                </>)

        }
        </>
    )
}

export default Header;
