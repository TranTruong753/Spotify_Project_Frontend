import { Artist } from "@/types";
import React, { useState } from "react";
import { Modal, Form, UploadFile } from "antd";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";
import { createArtist } from "@/features/albums/artistsSlice";
import FormArtist from "./FormArtist";

interface ModalArtistProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  data?: Artist | null;
}

const ModalCreateArtist: React.FC<ModalArtistProps> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const [form] = Form.useForm();

  const dispatch = useDispatch<AppDispatch>();

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      const file = fileList.length > 0 ? fileList[0].originFileObj : null;

      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("is_deleted", "false"); // hoặc từ values
      if (file) {
        formData.append("img_url", file);
      }

      await dispatch(createArtist(formData)).unwrap(); // unwrap để bắt lỗi dễ

      setIsModalOpen(false);
      form.resetFields();
      setFileList([]);
    } catch (error) {
      console.error("Lỗi tạo album:", error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <Modal
        title={"Create Artist"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <FormArtist
          form={form}
          fileList={fileList}
          setFileList={setFileList}
        ></FormArtist>
      </Modal>
    </div>
  );
};

export default ModalCreateArtist;
