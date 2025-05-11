import { Link } from "react-router";
import { Space, Table, Breadcrumb, Empty, Button, Popconfirm, Modal, Tag, Avatar, Tooltip } from 'antd';
import type { TableProps, PopconfirmProps } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { deleteSongs, fetchSongs } from "@/features/songs/songSlice";
import { RootState, AppDispatch } from "@/app/store";
import { useEffect, useMemo, useState } from "react"; // Thêm useState
import {  Song, Video} from "@/types";
import {  parseGenre } from "@/utils";

import { FileVideo, Pen, Plus, Trash2 } from "lucide-react";
import AudioPlayer from "@/pages/admin/songs/components/AudioPlayer"
import ModalSong from "@/pages/admin/songs/components/ModalSong";

import {
  EditOutlined
} from '@ant-design/icons';
import ModalUploadVideo from "@/pages/admin/songs/components/ModalUploadVideo";
import ModalSinger from "@/pages/admin/songs/components/ModalSinger";



type DataType = Song & {
  key: string;
  albumName: string;
};


const items = [
  {
    title: <Link to={'/'}>Trang chủ</Link>,
  },
  {
    title: 'Nhạc',
  },
]



const cancel: PopconfirmProps['onCancel'] = (e) => {
  console.log(e);
};

const SongPageAdmin: React.FC = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isModalFormOpen, setIsModalFormOpen] = useState<boolean>(false);

  const [isModalVideoOpen, setIsModalVideoOpen] = useState<boolean>(false);

  const [isModalSingerOpen, setIsModalSingerOpen] = useState<boolean>(false);

  const [data, setData] = useState<Song | null>(null);

  const [singer, setSinger] = useState<Song | null>(null);

  const [video, setVideo] = useState<Video | null>(null);

  const [videoEdit, setVideoEdit] = useState<Video | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  // Thêm state để theo dõi ID bài hát đang phát
  const [currentlyPlayingSongId, setCurrentlyPlayingSongId] = useState<string | null>(null);

  const { list, count, loading } = useSelector((state: RootState) => state.songs)

  useEffect(() => {
    if (!list.length) {
      dispatch(fetchSongs());
    }
  }, [dispatch, list.length]);

  const transformedData = useMemo(() => list.map((songs) => ({
    ...songs,
    key: songs.id.toString(),
    albumName: songs.album?.name || "Null",
  })), [list]);

  console.log("list", list)

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    console.log("dong tab")
    setVideo(null)
    setIsModalOpen(false);
  };

  const showVideo = (data: Video) => {
    if (data) {
      setVideo(data)
    }
    showModal()
  }

  const handleAddSinger = (data:Song,singer:any) => {
    if(data){
      setData(data)
    }
    if(singer){
      setSinger(singer)
    }
    console.log("handleAddSinger")
    setIsModalSingerOpen(true)
  }

  const handleUploadVideo = (data: Song, video: Video) => {
    console.log("video",video)
    if (data) {
      setData(data)
    }
    if(video){
      setVideoEdit(video)
    }
    setIsModalVideoOpen(true)
  }

  const handleDeleteSong =  async (data:Song) => {
    if(data){

      await dispatch(deleteSongs({id:data.id}))
    }
  }

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'audio_url',
      key: 'audio_url',
      render: (record) => (
        <>
          <AudioPlayer
            nameSong={record.name}
            audio_url={record.audio_url}
            img_url={record.img_url}
            isGlobalPlaying={currentlyPlayingSongId === record.id.toString()}
            onPlay={() => setCurrentlyPlayingSongId(record.id.toString())}
          />
        </>),
    },
    {
      title: 'Video',
      dataIndex: 'video',
      key: 'video',
      render: (video,record) => (
       
        video?.title ?

          (<div className="flex">
            <Tag color="blue">
              <a className="text-blue-500! text-sm" onClick={() => showVideo(video)}>{video.title}</a>
      
            </Tag>
            <Tag color="orange-inverse"  icon={<a onClick={()=>handleUploadVideo(record,video)} className="text-inherit! text-sm"><EditOutlined /></a>}>
            
            </Tag>
          </div>)
          :
          <Tooltip
            placement="topRight"
            title={"Thêm video"}
          >
            <Button
            onClick={()=>handleUploadVideo(record,video)}
              shape="circle"
              color="green"
              variant="solid"
            >
              <FileVideo size={17} />
            </Button>
          </Tooltip>
      )
    },
    {
      title: 'song_singers',
      dataIndex: 'song_singers',
      key: 'song_singers',
      render: (singers,record) => (
        <>
          <Avatar.Group className="cursor-pointer">
            {singers?.map((singerObj: any, index: number) => (
              <div key={index}>
                <Popconfirm
                  title="Delete the singer"
                  description={`Are you sure to delete ${singerObj.artist.name}?`}

                  // onConfirm={}
                  okText="Yes"
                  cancelText="No"
                >
                  <Tooltip
                    placement="topRight"
                    title={singerObj.artist.name}
                  >

                    <Avatar src={singerObj.artist.img_url}></Avatar>
                  </Tooltip>
                </Popconfirm>
              </div>

            ))}

            <Tooltip
              placement="topRight"
              title={"Thêm nhạc sĩ"}
            >
              <Avatar onClick={()=>handleAddSinger(record,singers)} icon={<Plus></Plus>} ></Avatar>
            </Tooltip>
          </Avatar.Group>


        </>

      )
    },
    {
      title: 'Genre',
      dataIndex: 'genre',
      key: 'genre',
      width: '12%',
      render: (text: string) => (
        <Space size="small" wrap >
          {parseGenre(text).map((item) => (
            <Tag key={item} color="blue" >{item}</Tag>
          ))}
        </Space>
      )
    },
    {
      title: 'Album Name',
      dataIndex: 'albumName',
      key: 'albumName',
    },
    // {
    //   title: 'Created at',
    //   dataIndex: 'created_at',
    //   key: 'created_at',
    //   render: (text) => <p>{formatDate(text)}</p>
    // },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="small">

          <Button
            shape="circle"
            color="gold"
            variant="solid"
            onClick={()=>handleOpenModalEdit(record)}
          >
            <Pen size={18}></Pen>
          </Button>

          <Popconfirm
            title="Delete the album"
            description="Are you sure to delete this song?"
            onCancel={cancel}
            onConfirm={()=>handleDeleteSong(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              shape="circle"
              color="red"
              variant="solid"
            >
              <Trash2 size={18} />
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleOpenModal = () => {
    setIsModalFormOpen(true)
  }

  const handleOpenModalEdit = (data:Song) => {
    if(data) setData(data)
    setIsModalFormOpen(true)
  }

  return (
    <div className="p-4 sm:py-6">
      <h2 className="px-2 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Quản lý nhạc
      </h2>

      <div className="px-5 pt-2 flex justify-between">
        <Breadcrumb items={items}></Breadcrumb>
        <Button type="primary" onClick={() => handleOpenModal()}>Thêm nhạc</Button>
      </div>

      <div className="p-7">
        <Table<DataType> columns={columns} dataSource={transformedData}
          loading={loading}
          pagination={{
            pageSize: 4,
            total: count
          }}
          locale={{ emptyText: <Empty description="Không có dữ liệu" /> }}
        />
      </div>


      <Modal
        title={`Title: ${video ? video?.title : ""}`}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose={true}
        onClose={handleCancel}
        maskClosable={false}
      >
        <video controls style={{ width: '100%' }}>
          <source src={video?.video_url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Modal>

      <ModalSong
        isModalOpen={isModalFormOpen}
        setIsModalOpen={setIsModalFormOpen}
        data={data}
        setData={setData}
      ></ModalSong>

      <ModalUploadVideo
        isModalOpen={isModalVideoOpen}
        setIsModalOpen={setIsModalVideoOpen}
        data={data}
        setData={setData}
        dataVideo={videoEdit}
        setDataVideo={setVideoEdit}
      ></ModalUploadVideo>

      <ModalSinger
          isModalOpen={isModalSingerOpen}
          setIsModalOpen={setIsModalSingerOpen}
          data={data}
          setData={setData}
          dataSinger={singer}
          setDataSinger={setSinger}
      ></ModalSinger>

    </div>
  );
};

export default SongPageAdmin;