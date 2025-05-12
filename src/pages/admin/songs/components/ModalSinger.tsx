import {  Artist, Song } from "@/types";
import React, { useEffect } from "react";
import { Modal, Form } from "antd";
import { useDispatch } from "react-redux";
import { fetchSongs } from "@/features/songs/songSlice";
import { AppDispatch, RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { fetchArtists } from "@/features/artists/artistsSlice";
import FormSinger from "@/pages/admin/songs/components/FormSinger";
import { postSinger } from "@/services/SongServices";

interface ModalSongProps {
    isModalOpen: boolean;
    setIsModalOpen: (open: boolean) => void;
    data?: Song | null;
    setData: (data: Song | null) => void;
    dataSinger?: any | null;
    setDataSinger: (data: any | null) => void;
    messageApi: any;
}

const ModalSinger: React.FC<ModalSongProps> = ({
    isModalOpen,
    setIsModalOpen,
    data,
    setData,
    dataSinger,
    setDataSinger,
    messageApi
}) => {


    const [form] = Form.useForm();

    const dispatch = useDispatch<AppDispatch>();

    const { list } = useSelector((state: RootState) => state.artists)

    useEffect(() => {
        if (!list.length) {
            dispatch(fetchArtists());
        }
    }, [dispatch, list.length]);


    useEffect(() => {
        if (data !== null) {
            console.log("data", data);
            // Gán giá trị vào form
            form.setFieldsValue({
                id: data?.id,
                name: data?.name
                // thêm các field khác nếu có
            });
        

        }
    }, [data])

    const handleAddSingerForSong = async (data: Artist, values: Song) => {
        const formData = new FormData();
        formData.append("song", values.id.toString());
        formData.append("artist", data.toString())
        await postSinger(formData)
    }

    const handleOk = async () => {
        try {
            const values = await form.validateFields();


            console.log("values", values)
            console.log("values singer", values.singer)

            const singers = values.singer;

            singers.map(async (item: Artist) => {
                console.log("singe",typeof item)
                await handleAddSingerForSong(item, values)
            })

            await dispatch(fetchSongs()).unwrap()
            messageApi.success("Thêm ca sĩ thành công!")
        
            // setIsModalOpen(false);
            // form.resetFields();
            setData(null);
        } catch (error) {
            console.error("Lỗi tạo album:", error);
            messageApi.error("Lỗi!")
        }
    };

    const handleCancel = () => {
        form.resetFields();
        setData(null);
        setDataSinger(null)
        setIsModalOpen(false);
    };
    return (
        <div>
            <Modal
                title={"Add Singer"}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <FormSinger
                    form={form}
                    list={list}
                    dataSinger={dataSinger}
                ></FormSinger>
            </Modal>
        </div>
    );
};

export default ModalSinger;
