import { Link } from "react-router";

import { Breadcrumb, Button, Empty, Input, Space, Table } from 'antd';
import type { TableProps } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { useEffect } from "react";
import { fetchAccount } from "@/features/accounts/authSlice";
import { User } from "@/types";



const items = [
  {
    title: <Link to={'/'}>Trang chủ</Link>,
  },
  {
    title: 'Người dùng',
  },
]






const UserPageAdmin: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { listAccount, loading } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    if (!listAccount.length) {
      dispatch(fetchAccount());
    }
  }, [dispatch, listAccount.length]);


  const columns: TableProps<User>["columns"] = [
    {
      title: 'Name',
      dataIndex: 'full_name',
      key: 'full_name',
      render: (text) => <p>{text}</p>,
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          {/* Tùy chỉnh dropdown filter */}
          <Input
            autoFocus
            placeholder="Tìm kiếm theo tên tên"
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
        (record.full_name as string).toLowerCase().includes((value as string).toLowerCase()),
      filterSearch: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          {/* Tùy chỉnh dropdown filter */}
          <Input
            autoFocus
            placeholder="Tìm kiếm theo email"
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
        (record.email as string).toLowerCase().includes((value as string).toLowerCase()),
      filterSearch: true,
    },
    {
      title: 'Sex',
      dataIndex: 'sex',
      key: 'sex',
       render: (text) => <p>{text ? text : "chưa cập nhật"}</p>,
    },
     {
      title: 'Birthday',
      dataIndex: 'birthday',
      key: 'birthday',
       render: (text) => <p>{text ? text : "chưa cập nhật"}</p>,
    },
     {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
       render: (role) => <p>{role.name}</p>,
    },



  ];

  return (
    <div className="p-4 sm:py-6">
      <h2 className="px-2 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Quản lý người dùng
      </h2>

      <div className="px-5 pt-2 flex justify-between">
        <Breadcrumb items={items}></Breadcrumb>
      </div>

      <div className="p-7">
        <Table<User> columns={columns} dataSource={listAccount} 
           loading={loading}
          pagination={{
            pageSize: 5,
            total: listAccount.length,
          }}
          locale={{ emptyText: <Empty description="Không có dữ liệu" /> }}
          />
      </div>
    </div>
  );
};

export default UserPageAdmin;
