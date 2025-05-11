import { useEffect, useMemo, useState } from "react";

import { Link } from "react-router";

import { Space, Table, Breadcrumb, Empty, Button, Popconfirm, Input } from 'antd';

import type { TableProps, PopconfirmProps } from 'antd';

import { FaEye } from "react-icons/fa";

import {Pen, Trash2} from "lucide-react"


import { useDispatch, useSelector } from 'react-redux'
import { fetchAlbums, deleteAlbum } from '@/features/albums/albumsSlice'
import { RootState, AppDispatch } from '@/app/store'
import { Album } from '@/types';
import DetailAlbum from "./components/DetailAlbum";
import ModalCreateAlbum from "./components/ModalCreateAlbum";

type DataType = Album & {
  key: string;
  description: string;
  img_url: string;
};

const items = [
  {
    title: <Link to={'/'}>Trang chủ</Link>,
  },
  {
    title: 'Albums',
  },
]

const confirm: PopconfirmProps['onConfirm'] = (e) => {
  console.log(e);

};

const cancel: PopconfirmProps['onCancel'] = (e) => {
  console.log(e);

};



const AlbumPageAdmin: React.FC = () => {

  // mở drawer
  const [open, setOpen] = useState<boolean>(false);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);


  const [data, setData] = useState<Album | null>(null);

  const dispatch = useDispatch<AppDispatch>()
  const { list, count, loading, error } = useSelector((state: RootState) => state.albums)

  useEffect(() => {
    if (!list.length) {
      dispatch(fetchAlbums());
    }
  }, [dispatch, list.length]);

  // if (loading) return <p>Loading...</p>
  // if (error) return <p>Error: {error}</p>

  console.log("list", list)

  const transformedData = useMemo(() => list.map((album) => ({
    ...album,
    key: album.id.toString(),
    description: album.description || 'Không có mô tả',
    img_url: album.img_url || '/default-image.jpg',
  })), [list]);

  const handleDetailAlbum = (data: Album) => {
    if(data){
      setData(data)
    }
    console.log("data", data)
    setOpen(true);
  }

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleOpenModalEdit = (data:Album) => {
    if(data){
      setData(data)
    }
    setIsModalOpen(true)
  }

  const handleDeleteAlbum = async(data:Album) => {
      if(data){
        await dispatch(deleteAlbum({id: data.id})).unwrap();
      }
  }

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Id',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => <a onClick={() => handleDetailAlbum(record)}>{text}</a>,
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          {/* Tùy chỉnh dropdown filter */}
          <Input
            autoFocus
            placeholder="Tìm kiếm theo tên album"
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => confirm()}
            style={{ marginBottom: 8, display: "block" }}
          />
          <Space>
            <Button
              type="link"
              size="small"
              onClick={() => clearFilters && clearFilters()}
            >
              Reset
            </Button>
            <Button
              type="primary"
              size="small"
              onClick={() => confirm()}
            >
              Tìm
            </Button>
          </Space>
        </div>
      ),

      onFilter: (value, record) =>
        (record.name as string).toLowerCase().includes((value as string).toLowerCase()),
      filterSearch: true,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
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
            onClick={()=>handleDetailAlbum(record)}
          >
            <FaEye className="text-lg" />
          </Button>

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
            description="Are you sure to delete this album?"
            onConfirm={()=>handleDeleteAlbum(record)}
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

  return (
    
    <div className="p-4 sm:py-6 bg-zinc-800">
      <h2 className="px-2 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Quản lý album
      </h2>

      <div className="px-5 pt-2 flex justify-between">
        <Breadcrumb items={items}></Breadcrumb>
        <Button onClick={handleOpenModal} type="primary">Thêm Album</Button>
      </div>

      <div className="p-7">
        <Table<DataType>
          columns={columns}
          dataSource={transformedData}
          loading={loading}
          pagination={{
            pageSize: 5,
            total: count
          }}
          locale={{ emptyText: <Empty description="Không có dữ liệu" /> }}
        // bordered

        />


        {/* <Avatar></Avatar> */}
      </div>

      <DetailAlbum
        open={open}
        setOpen={setOpen}
        data={data}
        setData={setData}
      ></DetailAlbum>

      <ModalCreateAlbum
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        data={data}
        setData={setData}
      ></ModalCreateAlbum>
    </div>
  );
};

export default AlbumPageAdmin;
