import { useEffect, useMemo } from "react";

import { Link } from "react-router";

import { Space, Table, Breadcrumb, Empty } from 'antd';

import type { TableProps } from 'antd';

import { useDispatch, useSelector } from 'react-redux'
import { fetchAlbums } from '@/features/albums/albumsSlice'
import { RootState, AppDispatch } from '@/app/store'
import { Album } from '@/types';

type DataType = Album & {
  key: string;
  description: string;
  img_url: string;
};

const items = [
  {
    title: <Link to={'/admin/'}>Dashboard</Link>,
  },
  {
    title: 'Albums',
  },
]


const AlbumPageAdmin: React.FC = () => {

  const dispatch = useDispatch<AppDispatch>()
  const { list, count, loading, error } = useSelector((state: RootState) => state.albums)

  useEffect(() => {
    if (!list.length) {
      dispatch(fetchAlbums());
    }
  }, [dispatch, list.length]);

  // if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  console.log("list", list)

  const transformedData = useMemo(() => list.map((album) => ({
    ...album,
    key: album.id.toString(),
    description: album.description || 'Không có mô tả',
    img_url: album.img_url || '/default-image.jpg',
  })), [list]);


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
      render: (text) => <a>{text}</a>,
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
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  return (
    <div className="px-4">
      <h2 className="px-2 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Quản lý album
      </h2>

      <div className="px-5 pt-2">
        <Breadcrumb items={items}></Breadcrumb>
      </div>

      <div className="p-7">
        <Table<DataType> 
        columns={columns} 
        dataSource={transformedData} 
        loading={loading} 
        pagination={{
          pageSize: 5, 
          total:count
        }}
        locale={{ emptyText: <Empty description="Không có dữ liệu" /> }}
        // bordered

        />
      </div>
    </div>
  );
};

export default AlbumPageAdmin;
