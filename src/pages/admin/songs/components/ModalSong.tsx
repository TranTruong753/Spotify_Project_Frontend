import { Album, Song } from "@/types";
import React, { useEffect, useState } from "react";
import { Modal, Form, UploadFile } from "antd";
import FormSong from "./FormSong";
import { useDispatch } from "react-redux";
import { createSong } from "@/features/songs/songSlice";
import { AppDispatch } from "@/app/store";

interface ModalSongProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  data?: Song | null;
  setData: (data: Song | null) => void;
}

const ModalSong: React.FC<ModalSongProps> = ({
  isModalOpen,
  setIsModalOpen,
  data,
  setData,
}) => {
  const [form] = Form.useForm();

  const dispatch = useDispatch<AppDispatch>();

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {

  }, [data]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      const file = fileList.length > 0 ? fileList[0].originFileObj : null;

      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("lyrics",values.lyrics || "");
      formData.append("genre",values.genre);
   


    //   formData.append("description", values.description || "");
      formData.append("is_deleted", "false"); // hoặc từ values
      if (file) {
        formData.append("audio_url", file);
      }

      if (data === null) {
        await dispatch(createSong(formData)).unwrap(); // unwrap để bắt lỗi dễ
      } 
    //   else if (data) {
    //     await dispatch(updateAlbum({ id: data.id, formData })).unwrap();
    //   }

      setIsModalOpen(false);
      form.resetFields();
      setFileList([]);
      setData(null);
    } catch (error) {
      console.error("Lỗi tạo album:", error);
    }
  };

  const handleCancel = () => {
    setFileList([]);
    form.resetFields();
    setData(null);
    setIsModalOpen(false);
  };
  return (
    <div>
      <Modal
        title={data !== null ? "Update Song" : "Create Song"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <FormSong
          form={form}
          fileList={fileList}
          setFileList={setFileList}
        ></FormSong>
      </Modal>
    </div>
  );
};

export default ModalSong;
