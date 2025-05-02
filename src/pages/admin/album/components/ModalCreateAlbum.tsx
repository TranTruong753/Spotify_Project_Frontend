import { Album } from "@/types";
import React, { useEffect, useState } from "react";
import { Modal, Form, UploadFile } from "antd";
import FormAlbum from "./FormAlbum";
import { useDispatch } from "react-redux";
import { createAlbum, updateAlbum } from "@/features/albums/albumsSlice";
import { AppDispatch } from "@/app/store";

interface ModalAlbumProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  data?: Album | null;
  setData: (data: Album | null) => void;
}

const ModalCreateAlbum: React.FC<ModalAlbumProps> = ({
  isModalOpen,
  setIsModalOpen,
  data,
  setData,
}) => {
  const [form] = Form.useForm();

  const dispatch = useDispatch<AppDispatch>();

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    if (data !== null) {
      console.log("data", data);
      // Gán giá trị vào form
      form.setFieldsValue({
        name: data?.name,
        description: data?.description,
        // thêm các field khác nếu có
      });

      // Nếu muốn hiển thị ảnh (nếu data có hình):
      if (data?.img_url) {
        const fileData: UploadFile[] = [
          {
            uid: "-1",
            name: "image.png",
            status: "done", // hoặc: "done" as UploadFileStatus
            url: data.img_url,
          },
        ];
        setFileList(fileData);
        form.setFieldsValue({ img_url: fileData });
      }
    }
  }, [data]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      const file = fileList.length > 0 ? fileList[0].originFileObj : null;

      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description || "");
      formData.append("is_deleted", "false"); // hoặc từ values
      if (file) {
        formData.append("img_url", file);
      }

      if (data === null) {
        await dispatch(createAlbum(formData)).unwrap(); // unwrap để bắt lỗi dễ
      } else if (data) {
        await dispatch(updateAlbum({ id: data.id, formData })).unwrap();
      }

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
        title={data !== null ? "Update Album" : "Create Album"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <FormAlbum
          form={form}
          fileList={fileList}
          setFileList={setFileList}
        ></FormAlbum>
      </Modal>
    </div>
  );
};

export default ModalCreateAlbum;
