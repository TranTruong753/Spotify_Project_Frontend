import React from 'react';
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input, Select, UploadFile } from 'antd';
import { Album, Song, Video } from '@/types';
import type { FormInstance } from 'antd/es/form';
import UploadImg from "@/components/uploadImg"
import UploadCustom from "@/components/uploadCustom"

interface MyComponentProps {
  form: FormInstance;
  fileList: UploadFile[];
  setFileList: React.Dispatch<React.SetStateAction<UploadFile[]>>;
}



const FormUploadFIle: React.FC<MyComponentProps> = ({ form, fileList, setFileList }) => (

  <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    form={form}
    // style={{ maxWidth: 600 }}
    // initialValues={{ remember: true }}
    // onFinish={onFinish}
    // onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item<Video>
      label="Title"
      name="title"
      rules={[{ required: true, message: 'Please input title!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item<Video>
      label="Video"
      name="video_url"
      rules={[
        { required: true, message: 'Please upload an video!' },
      ]}
      // Thêm valuePropName nếu AvatarAlbum nhận giá trị qua prop khác
      // valuePropName="fileList" 
      // Thêm getValueFromEvent để Form biết cách lấy giá trị từ component
      getValueFromEvent={(e) => {
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileList;
      }}
    >
      <UploadCustom
        fileList={fileList}
        setFileList={(newFileList) => {
          setFileList(newFileList);
          // Cập nhật giá trị vào form
          form.setFieldsValue({ video_url: newFileList });
        }}
      />
    </Form.Item>

  </Form>
);

export default FormUploadFIle;