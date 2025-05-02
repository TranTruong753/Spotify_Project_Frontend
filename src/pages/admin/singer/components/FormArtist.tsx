import React from "react";
import type { FormProps } from "antd";
import { Form, Input, UploadFile } from "antd";
import { Artist } from "@/types";
import type { FormInstance } from "antd/es/form";
import UploadImg from "@/components/uploadImg";

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

const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
  console.log("Success:", values);
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const FormArtist: React.FC<MyComponentProps> = ({
  form,
  fileList,
  setFileList,
}) => (
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
    <Form.Item<Artist>
      label="Tên ca sĩ"
      name="name"
      rules={[{ required: true, message: "Please input Artist name!" }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Img"
      name="img_url"
      rules={[{ required: true, message: "Please upload an artist image!" }]}
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
      <UploadImg
        fileList={fileList}
        setFileList={(newFileList) => {
          setFileList(newFileList);
          // Cập nhật giá trị vào form
          form.setFieldsValue({ img_url: newFileList });
        }}
      />
    </Form.Item>
  </Form>
);

export default FormArtist;
