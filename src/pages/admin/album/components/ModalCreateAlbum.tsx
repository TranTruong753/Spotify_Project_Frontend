import { Album } from '@/types';
import React, { useState } from 'react'
import { Modal, Form, UploadFile } from 'antd';
import FormAlbum from './FormAlbum';
import { useDispatch } from 'react-redux'
import { createAlbum } from '@/features/albums/albumsSlice'
import { AppDispatch } from '@/app/store'

interface ModalAlbumProps {
    isModalOpen: boolean;
    setIsModalOpen: (open: boolean) => void;
    data?: Album | null
}


const ModalCreateAlbum: React.FC<ModalAlbumProps> = ({ isModalOpen, setIsModalOpen }) => {

    const [form] = Form.useForm();

      const dispatch = useDispatch<AppDispatch>()


    const [fileList, setFileList] = useState<UploadFile[]>([]);


      
    const handleOk = async () => {
      try {
        const values = await form.validateFields();
    
        const file = fileList.length > 0 ? fileList[0].originFileObj : null;
    
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('description', values.description || '');
        formData.append('is_deleted', 'false'); // hoặc từ values
        if (file) {
          formData.append('img_url', file);
        }
    
        await dispatch(createAlbum(formData)).unwrap(); // unwrap để bắt lỗi dễ
    
        setIsModalOpen(false);
        form.resetFields();
        setFileList([]);
      } catch (error) {
        console.error('Lỗi tạo album:', error);
      }
    };
    

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <div>

            <Modal title={"Create Album"} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <FormAlbum form={form}
                    fileList={fileList}
                    setFileList={setFileList}
                
                ></FormAlbum>
            </Modal>

        </div>
    )
}

export default ModalCreateAlbum