import { Link } from "react-router";
import { Space, Table, Breadcrumb, Empty, Button, Popconfirm, Modal, Tag } from 'antd';
import type { TableProps, PopconfirmProps } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { fetchSongs } from "@/features/songs/songSlice";
import { RootState, AppDispatch } from "@/app/store";
import { useEffect, useMemo, useState } from "react"; // Thêm useState
import { Song } from "@/types";
import { formatDate } from "@/utils";
import { FaEye } from "react-icons/fa";
import { Pen, Trash2 } from "lucide-react";
import AudioPlayer from "./components/AudioPlayer"
import ModalSong from "./components/ModalSong";


type DataType = Song & {
  key: string;
  albumName: string;
};


type VideoType = {
  id: number
  duration: number
  title: string
  video_url: string
  created_at: string
}

const items = [
  {
    title: <Link to={'/admin/'}>Dashboard</Link>,
  },
  {
    title: 'Music',
  },
]

const confirm: PopconfirmProps['onConfirm'] = (e) => {
  console.log(e);
};

const cancel: PopconfirmProps['onCancel'] = (e) => {
  console.log(e);
};

const SongPageAdmin: React.FC = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isModalFormOpen, setIsModalFormOpen] = useState<boolean>(false);

  const [data, setData] = useState<Song | null>(null);

  const [video, setVideo] = useState<VideoType | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  // Thêm state để theo dõi ID bài hát đang phát
  const [currentlyPlayingSongId, setCurrentlyPlayingSongId] = useState<string | null>(null);

  const { list, count, loading, error } = useSelector((state: RootState) => state.songs)

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

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setVideo(null)
    setIsModalOpen(false);
  };

  const showVideo = (data: VideoType) => {
    if (data) {
      setVideo(data)
    }
    showModal()
  }

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'audio_url',
      key: 'audio_url',
      render: (value, record) => (
        <>
          <AudioPlayer
            nameSong={record.name}
            audio_url={value}
            isGlobalPlaying={currentlyPlayingSongId === record.id.toString()}
            onPlay={() => setCurrentlyPlayingSongId(record.id.toString())}
          />
        </>),
    },
    {
      title: 'Video',
      dataIndex: 'video',
      key: 'video',
      render: (video) => (
        video?.title ?
          
          (<Tag color="blue"><a onClick={() => showVideo(video)}>{video.title}</a></Tag>)
          :
          <Tag color="volcano">Không có video</Tag>
      )
    },
    {
      title: 'Genre',
      dataIndex: 'genre',
      key: 'genre',
    },
    {
      title: 'Album Name',
      dataIndex: 'albumName',
      key: 'albumName',
    },
    {
      title: 'Created at',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (text) => <p>{formatDate(text)}</p>
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          <Button
            shape="circle"
            color="blue"
            variant="solid"
          >
            <FaEye className="text-lg" />
          </Button>

          <Button
            shape="circle"
            color="gold"
            variant="solid"
          >
            <Pen size={18}></Pen>
          </Button>

          <Popconfirm
            title="Delete the album"
            description="Are you sure to delete this song?"
            onCancel={cancel}
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

  const handleOpenModal = () =>{
    setIsModalFormOpen(true)
  }

  return (
    <div className="px-4">
      <h2 className="px-2 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Quản lý nhạc
      </h2>

      <div className="px-5 pt-2 flex justify-between">
        <Breadcrumb items={items}></Breadcrumb>
        <Button onClick={()=>handleOpenModal()}>Thêm nhạc</Button>
      </div>

      <div className="p-7">
        <Table<DataType> columns={columns} dataSource={transformedData}
          loading={loading}
          pagination={{
            pageSize: 5,
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
    </div>
  );
};

export default SongPageAdmin;