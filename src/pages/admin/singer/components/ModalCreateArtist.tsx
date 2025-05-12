import { Artist } from "@/types";
import React, { useEffect, useState } from "react";
import { Modal, Form, UploadFile } from "antd";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";
import { createArtist, updateArtist } from "@/features/artists/artistsSlice";
import FormArtist from "@/pages/admin/singer/components/FormArtist";

interface ModalArtistProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  data?: Artist | null;
  setData: (data: Artist | null) => void;
  messageApi: any
}

const ModalCreateArtist: React.FC<ModalArtistProps> = ({
  isModalOpen,
  setIsModalOpen,
  data,
  setData,
  messageApi
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
  }, [data, form]);
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

      if (data === null) {
        await dispatch(createArtist(formData)).unwrap(); // unwrap để bắt lỗi dễ
        messageApi.success("Thêm ca sĩ thành công!")
      } else if (data) {
        await dispatch(updateArtist({ id: data.id, formData })).unwrap();
        messageApi.success("Cập nhật ca sĩ thành công!")
      }

      setIsModalOpen(false);
      form.resetFields();
      setFileList([]);
      setData(null);
    } catch (error) {
      console.error("Lỗi tạo artist:", error);
      messageApi.error("Lỗi!")
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
        title={data !== null ? "Update Artist" : "Create Artist"}
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
