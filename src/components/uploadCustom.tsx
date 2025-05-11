import React, { useState } from 'react';
import { Upload, Modal } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import { Music } from 'lucide-react';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

interface AvatarAlbumProps {
  fileList: UploadFile[];
  setFileList: React.Dispatch<React.SetStateAction<UploadFile[]>>;
}

const UploadCustom: React.FC<AvatarAlbumProps> = ({ fileList, setFileList }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview && file.originFileObj) {
      file.preview = URL.createObjectURL(file.originFileObj);
    }

    setPreviewUrl(file.url || (file.preview as string));
    setPreviewTitle(file.name || '');
    setPreviewOpen(true);
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const beforeUpload = (file: FileType) => {
    const isMp3OrMp4 = file.type === 'audio/mpeg' || file.type === 'video/mp4';
    if (!isMp3OrMp4) {
      console.error('You can only upload MP3/MP4 files!');
      return Upload.LIST_IGNORE;
    }

    const newFile: UploadFile = {
      uid: file.uid,
      name: file.name,
      status: 'done',
      url: URL.createObjectURL(file),
    };

    setFileList([newFile]);
    return false;
  };

  const uploadButton = (
    <button type="button" className='cursor-pointer hover:scale-110 transition-all text-center flex flex-col items-center'>
      {/* <PlusOutlined /> */}
      <Music size={18}/>
      <div style={{ marginTop: 6 }}>Upload</div>
    </button>
  );

  return (
    <>
      <Upload
        listType="picture-card"
        fileList={fileList}
        beforeUpload={beforeUpload}
        onPreview={handlePreview}
        onChange={handleChange}
        accept=".mp3,.mp4"
        showUploadList={{ showRemoveIcon: true }}
      >
        {fileList.length >= 1 ? null : uploadButton}
      </Upload>

      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={() => setPreviewOpen(false)}
      >
        {previewUrl.endsWith('.mp4') ? (
          <video controls style={{ width: '100%' }}>
            <source src={previewUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <audio controls style={{ width: '100%' }}>
            <source src={previewUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        )}
      </Modal>
    </>
  );
};

export default UploadCustom;
