/* eslint-disable @typescript-eslint/no-explicit-any */
import { DownOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import {
  TextGrayStyle6,
  TextGrayStyle7,
  TextGrayStyle8,
} from '@components/IStyleComponent';
import ITable, { ITableProps } from '@components/ITable';
import { supporterAPI } from '@services/api';
import { SupporterSearchModel } from '@services/models/supporter';
import { handleError } from '@utils/apiUtils';
import { dateFormat } from '@utils/dataUtils';
import { Dropdown, Modal, Space } from 'antd';
import { ColumnsType } from 'antd/lib/table/interface';
import Image from 'next/image';
import React from 'react';

export interface RecordType {
  key: React.Key;
  item: SupporterSearchModel.Data;
}

type Props = {
  onDone: () => void;
  // onEdit: (supporterId: string) => void;
};
export function Table(props: ITableProps<RecordType> & Props) {
  const { onDone } = props;

  const renderName = (_value: any, record: RecordType) => {
    return (
      <Space size='large'>
        <div>
          <Image
            src={record.item.supporterInfo.profileImageURL ?? ''}
            alt={record.item.supporterInfo.profileImageURL ?? 'No Image'}
            width={80}
            height={80}
            style={{
              objectFit: 'cover',
              borderRadius: '8px',
            }}
          />
        </div>
        <div>
          <TextGrayStyle8 style={{ fontWeight: 'bold' }} size='16px'>
            {`${record.item.supporter.firstName} ${record.item.supporter.lastName}`}
          </TextGrayStyle8>
          <br />
          <TextGrayStyle7>{`${record.item.supporter.firstName} ${record.item.supporter.lastName}`}</TextGrayStyle7>
          <br />
          <TextGrayStyle6 style={{ fontSize: '12px' }}>
            ID: {record.item.supporter.id}
          </TextGrayStyle6>
        </div>
      </Space>
    );
  };

  const renderCreatedAt = (_value: any, record: RecordType) => {
    return (
      <span>{dateFormat(record.item.supporter.createdAt, 'dateTime')}</span>
    );
  };

  const renderAction = (_value: any, record: RecordType) => {
    const items = [
      { key: '1', label: 'Action 1' },
      { key: '2', label: 'Action 2' },
    ];

    const onConfirmDelete = () => {
      Modal.confirm({
        title: 'Confirm delete?',
        icon: <ExclamationCircleOutlined />,
        content: (
          <div>
            <span>{`Delete supporter "${record.item.supporter.firstName} ${record.item.supporter.lastName}"?`}</span>
          </div>
        ),
        okText: 'Delete',
        cancelText: 'Cancel',
        okButtonProps: { danger: true },
        onOk: async () => {
          try {
            await supporterAPI.del(record.item.supporter.id);
            onDone();
          } catch (error) {
            handleError(error);
          }
        },
      });
    };

    return (
      <Space size='middle'>
        <a onClick={onConfirmDelete}>Delete</a>
        {/* <a onClick={() => onEdit(record.item.supporter.id)}>Edit</a> */}
        <Dropdown menu={{ items }} disabled>
          <a>
            More <DownOutlined />
          </a>
        </Dropdown>
      </Space>
    );
  };

  const columns: ColumnsType<RecordType> = [
    {
      title: 'Name',
      key: 'name',
      dataIndex: 'name',
      width: 400,
      sorter: () => 0,
      render: renderName,
    },

    {
      title: 'Created At',
      key: 'createdAt',
      dataIndex: 'createdAt',
      render: renderCreatedAt,
    },
    {
      title: 'Action',
      key: 'action',
      dataIndex: 'action',
      width: 220,
      render: renderAction,
    },
  ];

  return <ITable {...props} columns={columns} />;
}
