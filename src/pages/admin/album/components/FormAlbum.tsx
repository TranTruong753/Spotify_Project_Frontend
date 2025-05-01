import React from 'react';
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input, UploadFile } from 'antd';
import { Album } from '@/types';
import AvatarAlbum from './AvatarAlbum';
import type { FormInstance } from 'antd/es/form';

interface MyComponentProps {
  form: FormInstance;
  fileList: UploadFile[];
  setFileList: React.Dispatch<React.SetStateAction<UploadFile[]>>;
}



type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
  console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const FormAlbum: React.FC<MyComponentProps> = ({form,fileList,setFileList}) => (

  <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    form={form}
    // style={{ maxWidth: 600 }}
    // initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item<Album>
      label="Username"
      name="name"
      rules={[{ required: true, message: 'Please input Album name!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item<Album>
      label="Description"
      name="description"
      rules={[{ required: true, message: 'Please input Album description!' }]}
    >
      <Input.TextArea />
    </Form.Item>

    <Form.Item<Album>
    label="Img"
    name="img_url"
    // rules={[{ required: true, message: 'Please input Album img!' }]}
    >
        <AvatarAlbum
            fileList={fileList}
            setFileList={setFileList}
        ></AvatarAlbum>
    </Form.Item>
  </Form>
);

export default FormAlbum;