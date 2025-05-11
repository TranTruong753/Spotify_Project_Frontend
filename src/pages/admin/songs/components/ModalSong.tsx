import { Song } from "@/types";
import React, { useEffect, useState } from "react";
import { Modal, Form, UploadFile } from "antd";
import FormSong from "@/pages/admin/songs/components/FormSong";
import { useDispatch } from "react-redux";
import { createSong, updateSong } from "@/features/songs/songSlice";
import { AppDispatch, RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { fetchAlbums } from "@/features/albums/albumsSlice";
import { parseGenre } from "@/utils";

interface ModalSongProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  data?: Song | null;
  setData: (data: Song | null) => void;
}

const ModalSong: React.FC<ModalSongProps> = ({
  isModalOpen,
  setIsModalOpen,
  data,
  setData,
}) => {


  const [form] = Form.useForm();

  const dispatch = useDispatch<AppDispatch>();

  const { list } = useSelector((state: RootState) => state.albums)

  useEffect(() => {
    if (!list.length) {
      dispatch(fetchAlbums());
    }
  }, [dispatch, list.length]);

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const [fileListImg, setFileListImg] = useState<UploadFile[]>([]);

  useEffect(() => {
     if (data !== null) {
          console.log("data", data);
          // Gán giá trị vào form
          form.setFieldsValue({
            name: data?.name,
            album: data?.album?.id || null, // ✅ Gán đúng ID
            lyrics: data?.lyrics,
            genre: data?.genre ? parseGenre(data.genre) : []
            // thêm các field khác nếu có
          });
    
          // Nếu muốn hiển thị ảnh (nếu data có hình):
          if (data?.img_url) {
            const fileData: UploadFile[] = [
              {
                uid: "-1",
                name: "img.jpn",
                status: "done", // hoặc: "done" as UploadFileStatus
                url: data?.img_url,
              },
            ];
            setFileListImg(fileData);
            form.setFieldsValue({ img_url: fileData });
          }

          if (data?.audio_url) {
            const fileData: UploadFile[] = [
              {
                uid: "-1",
                name: "audio.mp3",
                status: "done", // hoặc: "done" as UploadFileStatus
                url: data?.audio_url,
              },
            ];
            setFileList(fileData);
            form.setFieldsValue({ audio_url: fileData });
          }
        }
  }, [data]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      const file = fileList.length > 0 ? fileList[0].originFileObj : null;
      const img = fileListImg.length > 0 ? fileListImg[0].originFileObj : null;

      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("lyrics", values.lyrics || "");
      formData.append("genre", values.genre.join('-'));

      formData.append("album",values.album || null)


      //   formData.append("description", values.description || "");
      formData.append("is_deleted", "false"); // hoặc từ values
      if (file) {
        formData.append("audio_url", file);
      }

      if (img) {
        formData.append("img_url", img);
      }

      if (data === null) {
        await dispatch(createSong(formData)).unwrap(); // unwrap để bắt lỗi dễ
      }else if(data){
        await dispatch(updateSong({id:data.id, formData})).unwrap()
          console.log("formData",values)
      }
      //   else if (data) {
      //     await dispatch(updateAlbum({ id: data.id, formData })).unwrap();
      //   }
      // console.log("formData",values)
      // console.log("genre",values.genre.join("-"))

      setIsModalOpen(false);
      form.resetFields();
      setFileList([]);
      setFileListImg([]);
      setData(null);
    } catch (error) {
      console.error("Lỗi tạo album:", error);
    }
  };

  const handleCancel = () => {
    setFileList([]);
    setFileListImg([]);
    form.resetFields();
    setData(null);
    setIsModalOpen(false);
  };
  return (
    <div>
      <Modal
        title={data !== null ? "Update Song" : "Create Song"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <FormSong
          form={form}
          fileList={fileList}
          setFileList={setFileList}
          fileListImg={fileListImg}
          setFileListImg={setFileListImg}
          list={list}
        ></FormSong>
      </Modal>
    </div>
  );
};

export default ModalSong;
