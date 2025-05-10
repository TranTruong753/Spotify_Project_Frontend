import { User } from '@/types'
import { CircleUserRound } from 'lucide-react'
import React from 'react'
import { EditOutlined, EllipsisOutlined, SettingOutlined, UserAddOutlined } from '@ant-design/icons';
import { Avatar, Card, message } from 'antd';
import avatar from '/avatars/avatar.png'
import { makeFriends } from '@/services/FriendsServices';
import { Link } from 'react-router';


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


const CardUser = ({ user, messageApi, myUser }: { user: User, messageApi: any , myUser:User | null}) => {



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
          { myUser ? <a onClick={() => handleMakeFriend(user)}>  <UserAddOutlined key="user" /> Kết bạn</a>
          : <Link to={"/login"}>Đăng nhập để kết bạn</Link>  
        }
          
          </>
         
          // <EllipsisOutlined key="ellipsis" />,
        ]}
      >
        <img src={avatar} alt="" />
        <div className='flex items-center flex-col pt-2'>
          <p className='text-xl font-medium truncate text-zinc-300'>{user.full_name}</p>
          <p className='flex text-sm font-light truncate text-zinc-300'>{user.email} </p>
        </div>


      </Card>

    </>

  )
}

export default ForUser