/* eslint-disable @typescript-eslint/no-explicit-any */
import { DownOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import {
  TextGrayStyle6,
  TextGrayStyle7,
  TextGrayStyle8,
} from '@components/IStyleComponent';
import ITable, { ITableProps } from '@components/ITable';
import { PROJECT_STATE } from '@constants/constants';
import { projectAPI } from '@services/api';
import { ProjectSearchModel } from '@services/models/project';
import { handleError } from '@utils/apiUtils';
import { dateFormat, numberFormat } from '@utils/dataUtils';
import { Dropdown, Modal, Space, Switch } from 'antd';
import { ColumnsType } from 'antd/lib/table/interface';
import Image from 'next/image';
import React, { useState } from 'react';
import { useEffect } from 'react';

export interface RecordType {
  key: React.Key;
  item: ProjectSearchModel.Data;
}

type Props = {
  onDone: () => void;
  onEdit: (projectId: string) => void;
};
export function Table(props: ITableProps<RecordType> & Props) {
  const { onDone, onEdit } = props;

  const renderName = (_value: any, record: RecordType) => {
    return (
      <Space size='large'>
        <div>
          <Image
            src={record.item.projectInfo.imageSmallUrl}
            alt={record.item.projectInfo.imageSmallUrl}
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
            {record.item.project.name}
          </TextGrayStyle8>
          <br />
          <TextGrayStyle7>{`${record.item.artistInfo.firstNameTh} ${record.item.artistInfo.lastNameTh}`}</TextGrayStyle7>
          <br />
          <TextGrayStyle6 style={{ fontSize: '12px' }}>
            ID: {record.item.project.id}
          </TextGrayStyle6>
        </div>
      </Space>
    );
  };

  const renderNFT = (_value: any, record: RecordType) => {
    return (
      <span>
        {record.item.project.nft
          ? numberFormat(record.item.project.nft, 0)
          : '-'}
      </span>
    );
  };

  const renderMaxNFT = (_value: any, record: RecordType) => {
    return (
      <span>
        {record.item.project.maxNFT
          ? numberFormat(record.item.project.maxNFT, 0)
          : '-'}
      </span>
    );
  };

  const renderMinCap = (_value: any, record: RecordType) => {
    return (
      <span>
        {record.item.project.minCap
          ? numberFormat(record.item.project.minCap)
          : '-'}
      </span>
    );
  };

  const renderMaxCap = (_value: any, record: RecordType) => {
    return (
      <span>
        {record.item.project.maxCap
          ? numberFormat(record.item.project.maxCap)
          : '-'}
      </span>
    );
  };

  const renderRevenue = (_value: any, record: RecordType) => {
    return (
      <span>
        {record.item.project.revenue
          ? numberFormat(record.item.project.revenue)
          : '-'}
      </span>
    );
  };

  const renderEndDate = (_value: any, record: RecordType) => {
    return <span>{dateFormat(record.item.project.endDate, 'dateTime')}</span>;
  };

  const renderState = (_value: any, record: RecordType) => {
    return (
      <SwitchState
        id={record.item.project.id}
        initialState={record.item.project.state}
      />
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
        content: `Delete project "${record.item.project.name}"?`,
        okText: 'Delete',
        cancelText: 'Cancel',
        okButtonProps: { danger: true },
        onOk: async () => {
          try {
            await projectAPI.del(record.item.project.id);
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
        <a onClick={() => onEdit(record.item.project.id)}>Edit</a>
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
      width: 500,
      sorter: () => 0,
      render: renderName,
    },
    {
      title: 'NFT',
      key: 'nft',
      dataIndex: 'nft',
      align: 'right',
      width: 80,
      sorter: () => 0,
      render: renderNFT,
    },
    {
      title: 'Max Nft',
      key: 'maxNft',
      dataIndex: 'maxNft',
      align: 'right',
      width: 120,
      sorter: () => 0,
      render: renderMaxNFT,
    },
    {
      title: 'Min Cap',
      key: 'minCap',
      dataIndex: 'minCap',
      align: 'right',
      width: 120,
      sorter: () => 0,
      render: renderMinCap,
    },
    {
      title: 'Max Cap',
      key: 'maxCap',
      dataIndex: 'maxCap',
      align: 'right',
      width: 120,
      sorter: () => 0,
      render: renderMaxCap,
    },
    {
      title: 'Revenue',
      key: 'revenue',
      dataIndex: 'revenue',
      align: 'right',
      width: 120,
      sorter: () => 0,
      render: renderRevenue,
    },
    {
      title: 'End Date',
      key: 'endDate',
      dataIndex: 'endDate',
      width: 220,
      sorter: () => 0,
      render: renderEndDate,
    },
    {
      title: 'Published',
      key: 'state',
      dataIndex: 'state',
      render: renderState,
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

type SwitchStateProps = {
  id: string;
  initialState: string;
};
const SwitchState = (props: SwitchStateProps) => {
  const { id, initialState } = props;

  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const onChange = async (checked: boolean) => {
    try {
      setLoading(true);
      const req = {
        ids: [id],
      };
      const resp = checked
        ? await projectAPI.publish(req)
        : await projectAPI.unpublish(req);
      setState(resp.state);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setState(initialState);
  }, [initialState]);

  return (
    <Switch
      checked={state === PROJECT_STATE.PUBLISHED}
      onChange={onChange}
      loading={loading}
    />
  );
};
