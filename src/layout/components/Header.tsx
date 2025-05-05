import { Link } from 'react-router'; // Sửa import
import { FaSpotify, FaHome } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { IoIosNotifications } from "react-icons/io";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AppDispatch, RootState } from '@/app/store';
import { useDispatch, useSelector } from 'react-redux';
import { getInitials } from '@/utils';
import { User } from '@/types';
import { Dropdown, MenuProps } from 'antd';

const Header = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { user, isAuthenticated } = useSelector((state: RootState) => state.auth)

    const items: MenuProps['items'] = [
        {
            label: (
                user?.full_name
            ),
            key: '0',
            disabled: true,
        },
        // {
        //     label: (
        //         <a href="https://www.aliyun.com" target="_blank" rel="noopener noreferrer">
        //             2nd menu item
        //         </a>
        //     ),
        //     key: '1',
        // },
        {
            type: 'divider',
        },
        {
            label: <Link to="/register">Logout</Link>,
            key: '3',
        },
    ];

    return (
        <div className='p-2 px-8 border border-zinc-900'>
            <div className='flex gap-4 items-center'>
                <div className='basis-64'>
                    <Link to="/" className='focus-visible:border-transparent'>
                        <FaSpotify className='text-4xl w-10 h-10' />
                    </Link>
                </div>

                <div className='flex items-center gap-2'>
                    <Link to="/" className="bg-zinc-900 text-white rounded-full w-10 h-10 flex items-center justify-center hover:text-green-400">
                        <FaHome className="text-2xl" />
                    </Link>

                    <div>
                        <div className='flex items-center h-12 w-sm border-2 rounded-3xl px-3 border-zinc-900 bg-zinc-900'>
                            <IoSearch className='text-2xl text-zinc-400' />
                            <Input className='border-0 shadow-none font-medium bg-transparent text-white placeholder:text-zinc-400'
                                placeholder="Tìm kiếm..." />
                        </div>
                    </div>
                </div>

                <div className='flex gap-2 items-center ml-auto'>
                    <RightHeader isLogIn={isAuthenticated} user={user} items={items} />
                </div>
            </div>
        </div>
    );
};

type RightHeaderProps = {
    isLogIn: boolean;
    user: User | null;
    items: MenuProps['items'];
};

const RightHeader = ({ isLogIn, user, items }: RightHeaderProps) => {
    return (
        <>
            {isLogIn ? (
                <div className='flex gap-4 items-center'>
                    <div className='flex gap-2 items-center'>
                        <div className="cursor-pointer hover:animate-wiggle">
                            <IoIosNotifications className="text-3xl" />
                        </div>

                        <Dropdown menu={{ items }} trigger={['click']}>
                            <div className='w-15 h-15 flex items-center justify-center bg-zinc-800 rounded-full cursor-pointer'>
                                <Avatar className='w-10 h-10 bg-zinc-900'>
                                    <AvatarImage className='object-cover' src="" />
                                    <AvatarFallback>{user && getInitials(user.full_name)}</AvatarFallback>
                                </Avatar>
                            </div>
                        </Dropdown>
                    </div>
                </div>
            ) : (
                <>
                    <Link to="/register" className='text-xl font-medium'>Đăng ký</Link>
                    <Button className='transition-all duration-300 ease-out rounded-3xl h-11 bg-black text-white text-xl hover:scale-110 hover:bg-black hover:cursor-pointer'>
                        <Link to="/login">Đăng nhập</Link>
                    </Button>
                </>
            )}
        </>
    );
};

export default Header;
