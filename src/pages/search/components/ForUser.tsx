import { User } from '@/types'
import { CircleUserRound } from 'lucide-react'
import React from 'react'
import { EditOutlined, EllipsisOutlined, SettingOutlined, UserAddOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import avatar from '/avatars/avatar.png'


interface Users {
  users: User[]
}

const ForUser = ({ users }: Users) => {
  return (
    <div className='flex flex-wrap pt-5 gap-4 '>
      {/* <CardUser></CardUser>
      <CardUser></CardUser>
      <CardUser></CardUser>
      <CardUser></CardUser>
      <CardUser></CardUser>
      <CardUser></CardUser>
      <CardUser></CardUser> */}
      {users && users.map((user) => (
        <CardUser user={user}></CardUser>
      ))}
   

    </div>
  )
}


const CardUser = ({user}:{user:User}) => {

  const handleMakeFriend = (user:User) =>{
    console.log("user",user)
  }
  return (        
    <Card
    key={user.id}
      style={{ width: 250 }}
      variant={"borderless"}
      hoverable={true}
      actions={[

        <a onClick={()=>handleMakeFriend(user)}>  <UserAddOutlined key="user" /> Kết bạn</a>
        // <EllipsisOutlined key="ellipsis" />,
      ]}
    >
      <img src={avatar} alt="" />
      <div className='flex items-center flex-col pt-2'>
        <p className='text-xl font-medium truncate text-zinc-300'>{user.full_name}</p>
        <p className='flex text-sm font-light truncate text-zinc-300'>{user.email} </p>
      </div>

    </Card>

  )
}

export default ForUser