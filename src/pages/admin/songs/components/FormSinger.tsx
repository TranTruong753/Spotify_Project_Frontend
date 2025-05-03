import React, { useMemo } from 'react';
import { Form, Input, Select } from 'antd';
import { Artist, Song } from '@/types';
import type { FormInstance } from 'antd/es/form';

interface MyComponentProps {
  form: FormInstance;
  list: Artist[];
  dataSinger?: any | null;
}

const FormSong: React.FC<MyComponentProps> = ({ form, list, dataSinger }) => {

  const availableSingers = useMemo(() => {
    const selectedIds = dataSinger?.map((item: any) => item.artist.id) || [];
    return list.filter(artist => !selectedIds.includes(artist.id));
  }, [dataSinger, list]);

  return (
    <Form
      name="FormAddSinger"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      form={form}
      autoComplete="off"
    >
      <Form.Item<Song>
        label="ID"
        name="id"
      >
        <Input readOnly />
      </Form.Item>

      <Form.Item<Song>
        label="Name"
        name="name"
      >
        <Input readOnly />
      </Form.Item>

      <Form.Item
        label="Singer"
        name="singer"
        rules={[{ required: true, message: 'Please select Song singer!' }]}
      >
        <Select
          showSearch
          mode='multiple'
          placeholder="Please select singer"
          optionFilterProp="label"
           notFoundContent="No singers available"
          options={availableSingers.map((item) => ({
            value: item.id,
            label: `${item.name}`,
          }))}
        />
      </Form.Item>
    </Form>
  );
};

export default FormSong;
