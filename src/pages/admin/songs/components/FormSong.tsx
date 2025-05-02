import React from 'react';
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input, UploadFile } from 'antd';
import { Album, Song } from '@/types';
import type { FormInstance } from 'antd/es/form';
import UploadImg from "@/components/uploadImg"
import UploadCustom from "@/components/uploadCustom"
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

const formItemLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
  console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const FormSong: React.FC<MyComponentProps> = ({ form, fileList, setFileList }) => (

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
    <Form.Item<Song>
      label="Name"
      name="name"
      rules={[{ required: true, message: 'Please input Song name!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item<Song>
      label="Genre"
      name="genre"
      rules={[{ required: true, message: 'Please input Song Genre!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item<Song>
      label="Lyrics"
      name="lyrics"
    >
      <Input.TextArea />
    </Form.Item>

    {/* <Form.Item<Album>
      label="Img"
      name="img_url"
      rules={[
        { required: true, message: 'Please upload an album image!' },  // Thêm dòng này
        {
          validator: async (_, value) => {
            if (fileList.length === 0) {
              return Promise.reject(new Error('Please upload an album image!'));
            }
            return Promise.resolve();
          },
        },
      ]}
    >
      <AvatarAlbum fileList={fileList} setFileList={setFileList} />
    </Form.Item> */}

    <Form.Item
      label="Audio"
      name="audio_url"
      rules={[
        { required: true, message: 'Please upload an song audio!' },
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
          form.setFieldsValue({ audio_url: newFileList });
        }}
      />
    </Form.Item>

  </Form>
);

export default FormSong;