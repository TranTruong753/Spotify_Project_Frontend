import { User } from '@/types'
import { UserAddOutlined } from '@ant-design/icons';
import { Avatar, Card, message } from 'antd';
import avatar from '/avatars/avatar.png'
import { makeFriends } from '@/services/FriendsServices';
import { Link } from 'react-router';
import { getInitials } from '@/utils';


interface Users {
  users: User[]
  myUser: User | null
  myFriend: User[]
}

const ForUser = ({ users, myUser, myFriend }: Users) => {

  const [messageApi, contextHolder] = message.useMessage();
  // const filteredUsers = users?.filter((user) => user.id !== myUser?.id)

  // loai bỏ người đã là bạn bè 
  const filteredUsers = users?.filter(
    (user) =>
      user.id !== myUser?.id && !myFriend.some((friend) => friend.id === user.id)
  );

  return (
    <>
      {contextHolder}
      <div className='flex flex-wrap pt-5 gap-4'>
        {filteredUsers?.map((user) => (
          <CardUser key={user.id} user={user} myUser={myUser} messageApi={messageApi} />
        ))}
      </div>
    </>
  )
}


const CardUser = ({ user, messageApi, myUser }: { user: User, messageApi: any, myUser: User | null }) => {



  const handleMakeFriend = async (user: User) => {
    console.log("user", user)
    try {
      const res = await makeFriends(user.id)

      messageApi.success("Gửi lời mời kết bạn thành công");
    } catch (error: any) {
      console.log("error", error);
      messageApi.error(error.message || "Đã xảy ra lỗi");


    }

  }
  return (
    <>

      <Card
        key={user.id}
        style={{ width: 250 }}
        variant={"borderless"}
        hoverable={true}
        actions={[

          <>
            {myUser ? <a  onClick={() => handleMakeFriend(user)}>  <UserAddOutlined key="user" /> Kết bạn</a>
              : <Link to={"/login"}>Đăng nhập để kết bạn</Link>
            }

          </>

          // <EllipsisOutlined key="ellipsis" />,
        ]}
      >
        {/* <img src={avatar} alt="" /> */}

        <div className='flex items-center flex-col'>
          <Avatar

            // className="bg-blue-500!"
            size={{ sm:150, md:150,lg:150,xl: 150, xxl: 200 }}
            className={"bg-zinc-800! select-none"}
          >

            <p className='text-5xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl'>{getInitials(user.full_name)}</p>
          </Avatar>
          <p className='pt-3 text-xl font-medium truncate text-zinc-300'>{user.full_name}</p>
          <p className='flex text-sm font-light truncate text-zinc-300'>{user.email} </p>
        </div>


      </Card>

    </>

  )
}

export default ForUser