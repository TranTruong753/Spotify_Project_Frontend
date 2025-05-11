import React from 'react';
import { Form, Input, Select, UploadFile } from 'antd';
import { Album, Song } from '@/types';
import type { FormInstance } from 'antd/es/form';
import UploadImg from "@/components/uploadImg"
import UploadCustom from "@/components/uploadCustom"
interface MyComponentProps {
  form: FormInstance;
  fileList: UploadFile[];
  setFileList: React.Dispatch<React.SetStateAction<UploadFile[]>>;
  fileListImg: UploadFile[];
  setFileListImg: React.Dispatch<React.SetStateAction<UploadFile[]>>;
  list: Album[];
}


const FormSong: React.FC<MyComponentProps> = ({ form, fileList, setFileList, fileListImg, setFileListImg, list }) => (

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
      <Select
        showSearch
        mode='multiple'
        placeholder="Please select genre"
        optionFilterProp="label"

        options={[
          { value: 'nhac_tre', label: 'Nhạc Trẻ' },
          { value: 'nhac_trinh', label: 'Nhạc Trịnh' },
          { value: 'cai_luong', label: 'Cải Lương' },
          { value: 'nhac_vang', label: 'Nhạc Vàng' },
          { value: 'dan_ca', label: 'Dân Ca' },
          { value: 'bolero', label: 'Bolero' },
          { value: 'rap_viet', label: 'Rap Việt' },
          { value: 'nhac_thieu_nhi', label: 'Nhạc Thiếu Nhi' },
          { value: 'nhac_cach_mang', label: 'Nhạc Cách Mạng' },
        ]}
      />
    </Form.Item>

    <Form.Item<Song>
      label="Lyrics"
      name="lyrics"
    >
      <Input.TextArea />
    </Form.Item>

    <Form.Item
      label="Albums"
      name="album"
    >
      <Select
        showSearch
        placeholder="Please select album"
        optionFilterProp="label"

        options={list.map((item) => ({
          value: item.id,
          label: `${item.name}`,
        }))}
      />


    </Form.Item>

    <Form.Item
      label="Img"
      name="img_url"
      rules={[
        { required: true, message: 'Please upload an img!' },
      ]}
      getValueFromEvent={(e) => {
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileListImg;
      }}
    >
      <UploadImg fileList={fileListImg} setFileList={(newFileList) => {
          setFileListImg(newFileList);
          // Cập nhật giá trị vào form
          form.setFieldsValue({ img_url: newFileList });
        }} />
    </Form.Item>

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