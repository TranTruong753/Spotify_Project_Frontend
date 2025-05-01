import React from "react";
import type { FormProps } from "antd";
import { Form, Input, UploadFile } from "antd";
import { Artist } from "@/types";
import type { FormInstance } from "antd/es/form";
import AvatarArtist from "./AvatarArtist";

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

    <Form.Item<Artist>
      label="Img"
      name="img_url"
      // rules={[{ required: true, message: 'Please input Album img!' }]}
    >
      <AvatarArtist
        fileList={fileList}
        setFileList={setFileList}
      ></AvatarArtist>
    </Form.Item>
  </Form>
);

export default FormArtist;
