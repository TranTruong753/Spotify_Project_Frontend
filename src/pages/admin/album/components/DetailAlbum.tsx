import { useEffect, useMemo, useState } from "react";

import { Drawer, Space, Table, Breadcrumb, Empty } from 'antd';
import { Album, Song } from '@/types';

import { formatDate } from '@/utils'

import type { TableProps } from 'antd';
import Avatar from "./AvatarAlbum";

interface DetailAlbumProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    data: Album | null;
    setData: (data: Album | null) => void;
}

type DataType = Song & {
    key: string;
};

const DetailAlbum: React.FC<DetailAlbumProps> = ({ open, setOpen, data, setData }) => {
    const onClose = () => {
        setOpen(false);
        setData(null);
    };


    const transformedData = useMemo(() => data?.album_songs?.map((song) => ({
        ...song,
        key: song.id.toString(),
    })), [data]);

    // const transformedData = {
    //     ...data?.album_songs,
    //     key: data?.
    // }

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
            //   render: (text,record) => <a onClick={()=>handleDetailAlbum(record)}>{text}</a>,
        },
        {
            title: 'Genre',
            dataIndex: 'genre',
            key: 'genre',
        },
        {
            title: 'Created at',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (text) => <p>{formatDate(text)}</p>
        },
        // {
        //     title: 'Action',
        //     key: 'action',
        //     render: (_, record) => (
        //         <Space size="middle">
        //             <a>Invite {record.name}</a>
        //             <a>Delete</a>
        //         </Space>
        //     ),
        // },
    ];

    return (
        <>
            <Drawer title={data?.name} onClose={onClose} open={open} width={'50%'}>
                {/* <div>{JSON.stringify(data)}</div> */}

                <div>
                    <Table<DataType>
                        columns={columns}
                        dataSource={transformedData}
                        // pagination={{
                        //   pageSize: 5, 
                        //   total:count
                        // }}
                        locale={{ emptyText: <Empty description="Không có dữ liệu" /> }}
                    // bordered

                    />

                </div>

            </Drawer>
        </>
    );
};

export default DetailAlbum;
