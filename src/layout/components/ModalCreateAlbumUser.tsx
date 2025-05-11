import React, { useState } from "react";
import { Modal, Form, UploadFile } from "antd";
import FormAlbumUser from "@/layout/components/FormAlbumUser";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { createAlbumUser } from "@/features/accounts/authSlice";

interface ModalAlbumProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;

}

const ModalCreateAlbumUser: React.FC<ModalAlbumProps> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const [form] = Form.useForm();

  const dispatch = useDispatch<AppDispatch>();
  
   const { user } = useSelector(
      (state: RootState) => state.auth
    );
  

  

  const [fileList, setFileList] = useState<UploadFile[]>([]);



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

      if(user) formData.append("account", user.id.toString())

    
       await dispatch(createAlbumUser(formData)).unwrap(); // unwrap để bắt lỗi dễ
      

      setIsModalOpen(false);
      form.resetFields();
      setFileList([]);
    
    } catch (error) {
      console.error("Lỗi tạo album:", error);
    }
  };

  const handleCancel = () => {
    setFileList([]);
    form.resetFields();
   
    setIsModalOpen(false);
  };
  return (
    <div>
      <Modal
        title={"Create My Album"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <FormAlbumUser
          form={form}
          fileList={fileList}
          setFileList={setFileList}
        ></FormAlbumUser>
      </Modal>
    </div>
  );
};

export default ModalCreateAlbumUser;
