import { Song, Video } from "@/types";
import React, { useEffect, useState } from "react";
import { Modal, Form, UploadFile } from "antd";
import { useDispatch } from "react-redux";
import {  fetchSongs, updateSong } from "@/features/songs/songSlice";
import { postVideo, patchVideo } from "@/services/SongServices";
import { AppDispatch } from "@/app/store";

import FormUploadFIle from "@/pages/admin/songs/components/FormUploadFIle";

interface ModalUploadVideoProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  data?: Song | null;
  setData: (data: Song | null) => void;
  dataVideo?: Video | null;
  setDataVideo: (data: Video | null) => void;
}

const ModalUploadVideo: React.FC<ModalUploadVideoProps> = ({
  isModalOpen,
  setIsModalOpen,
  data,
  setData,
  dataVideo,
  setDataVideo
}) => {

  const [form] = Form.useForm();

  const dispatch = useDispatch<AppDispatch>();

  const [fileListVideo, setFileListVideo] = useState<UploadFile[]>([]);
  

  useEffect(()=>{
 if (dataVideo !== null) {
      console.log("dataVideo", dataVideo);
      // Gán giá trị vào form
      form.setFieldsValue({
        title: dataVideo?.title,
        // thêm các field khác nếu có
      });

      // Nếu muốn hiển thị ảnh (nếu data có hình):
      if (dataVideo?.video_url) {
        const fileData: UploadFile[] = [
          {
            uid: "-1",
            name: dataVideo.title,
            status: "done", // hoặc: "done" as UploadFileStatus
            url: dataVideo?.video_url,
          },
        ];
        setFileListVideo(fileData);
        form.setFieldsValue({ video_url: fileData });
      }
    }
  },[dataVideo])

  

  const handleUpdateVideoForSong = async (res:Video, data: Song) =>{
    const formData = new FormData();
    formData.append("video",res.id.toString());
    console.log("res",res)
    await dispatch(updateSong({id: data.id,formData})).unwrap();
  }



  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      const file = fileListVideo.length > 0 ? fileListVideo[0].originFileObj : null;

      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("is_deleted", "false"); // hoặc từ values
      
      if (file) {
        formData.append("video_url", file);
      }

      if(file){
            // khi thay đổi video
          const res = await postVideo(formData)
          if(res && data){
            handleUpdateVideoForSong(res,data)
          }
     }else if(data && dataVideo){
            // khi không thay đổi
            await patchVideo(dataVideo.id,formData)
            await dispatch(fetchSongs())

            
      }
      
     

      console.log("formData",values)
      console.log("file",file)
      console.log("file",fileListVideo[0].originFileObj)
      // console.log("genre",values.genre.join("-"))

      setIsModalOpen(false);
      form.resetFields();
      setData(null)
      setFileListVideo([]);
    } catch (error) {
      console.error("Lỗi tạo album:", error);
    }
  };

  const handleCancel = () => {
    setFileListVideo([]);
    form.resetFields();
    if(dataVideo !== null){
        setDataVideo(null)
    }
    if(data !==null){

        setData(null)
    }
    setIsModalOpen(false);
  };
  return (
    <div>
      <Modal
        title={dataVideo !== null ? "Update Video" : "Upload Video"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <FormUploadFIle
          form={form}
          fileList={fileListVideo}
          setFileList={setFileListVideo}
        ></FormUploadFIle>
      </Modal>
    </div>
  );
};

export default ModalUploadVideo;
