import { useEffect, useMemo, useState } from "react";

import { Link } from "react-router";

import { Space, Table, Breadcrumb, Empty, Button, Popconfirm, Input, message } from "antd";

import type { TableProps } from "antd";

import { useDispatch, useSelector } from "react-redux";
import { deleteArtist, fetchArtists } from "@/features/artists/artistsSlice";
import { RootState, AppDispatch } from "@/app/store";
import { Artist } from "@/types";
import ModalCreateArtist from "@/pages/admin/singer/components/ModalCreateArtist";
import { Pen, Trash2 } from "lucide-react";

type DataType = Artist & {
  key: string;
  img_url: string;
};

const items = [
  {
    title: <Link to={'/'}>Trang chủ</Link>,
  },
  {
    title: 'Ca Sĩ',
  },
]


const SingerPageAdmin: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { list, count, loading, error } = useSelector(
    (state: RootState) => state.artists
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [data, setData] = useState<Artist | null>(null);
  const [messageApi, contextHolder] = message.useMessage();
  
  useEffect(() => {
    if (!list.length) {
      dispatch(fetchArtists());
    }
  }, [dispatch, list.length]);

  // if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>;

  console.log("list", list);

  const transformedData = useMemo(
    () =>
      list.map((artist) => ({
        ...artist,
        key: artist.id.toString(),
        img_url: artist.img_url || "/default-image.jpg",
      })),
    [list]
  );
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Id",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Img",
      dataIndex: "img_url",
      key: "img_url",
      render: (_, record) => (
        <Space size="middle">
          <img
            src={record.img_url}
            alt="artist"
            style={{
              width: 60,
              height: 60,
              objectFit: "cover",
              borderRadius: 4,
            }}
          />
        </Space>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          {/* Tùy chỉnh dropdown filter */}
          <Input
            autoFocus
            placeholder="Tìm kiếm theo tên ca sĩ"
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
    }
    ,
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="small">
          <Button
            shape="circle"
            color="gold"
            variant="solid"
            onClick={() => handleOpenModalEdit(record)}
          >
            <Pen size={18}></Pen>
          </Button>

          <Popconfirm
            title="Delete the artist"
            description="Are you sure to delete this artist?"
            onConfirm={() => handleDeleteAlbum(record)}
            // onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button shape="circle" color="red" variant="solid">
              <Trash2 size={18} />
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleOpenModalEdit = (data: Artist) => {
    if (data) {
      setData(data);
    }
    setIsModalOpen(true);
  };
  const handleDeleteAlbum = async (data: Artist) => {
    if (data) {
      await dispatch(deleteArtist({ id: data.id })).unwrap();
    }
  };
  return (
    <div className="p-4 sm:py-6">
      {contextHolder}
      <h2 className="px-2 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Quản lý ca sĩ
      </h2>
      <div className="px-5 pt-2 flex justify-between">
        <Breadcrumb items={items}></Breadcrumb>
        <Button onClick={handleOpenModal} type="primary">Thêm nhạc</Button>
      </div>

      <div className="p-7">
        <Table<DataType>
          columns={columns}
          dataSource={transformedData}
          loading={loading}
          pagination={{
            pageSize: 5,
            total: count,
          }}
          locale={{ emptyText: <Empty description="Không có dữ liệu" /> }}
        // bordered
        />
      </div>
      <ModalCreateArtist
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        data={data}
        setData={setData}
        messageApi={messageApi}
      ></ModalCreateArtist>
    </div>
  );
};

export default SingerPageAdmin;
