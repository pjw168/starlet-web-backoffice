import { InboxOutlined } from '@ant-design/icons';
import { dummyRequest } from '@utils/apiUtils';
import { Form, message, Upload } from 'antd';
import { NamePath } from 'antd/es/form/interface';
import { RcFile, UploadListType } from 'antd/lib/upload/interface';
import _ from 'lodash';
import React, { useState } from 'react';
import styled, { css } from 'styled-components';

type Props = {
  name?: NamePath;
  label?: string;
  required?: boolean;
  maxCount?: number;
  maxFileMBSize?: number;
  multiple?: boolean;
  accept?: string[]; // example 'application/pdf', 'image/png'
  listType?: UploadListType;
};
export default function DraggerFormItem(props: Props) {
  const {
    name,
    label,
    accept,
    maxCount,
    maxFileMBSize,
    required = false,
    multiple = false,
    listType,
  } = props;

  const [count, setCount] = useState(0);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const normFile = (e: any) => {
    setCount(e.fileList?.length ?? 0);

    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  function getAccetpMimeType() {
    return accept?.join(',');
  }

  function getAcceptFileExtension() {
    const acceptExtensions = [];

    if (accept) {
      for (let i = 0; i < accept.length; i++) {
        const extension = accept[i].substring(accept[i].indexOf('/') + 1);
        const capital = extension.replace('/', '').toUpperCase();
        acceptExtensions.push(capital);
      }
    }

    return acceptExtensions.join(',');
  }

  function getMaxFileSize() {
    return `${maxFileMBSize ?? 'ไม่จำกัด'} MB`;
  }

  function beforeUpload(file: RcFile, _FileList: RcFile[]) {
    let isAcceptExt = false;
    let isAcceptSize = false;
    if (accept) {
      isAcceptExt = _.some(accept, mime => mime === file.type);
      if (!isAcceptExt) {
        message.error(`${file.name} is not a accepted list file`);
      }
    }

    if (maxFileMBSize) {
      isAcceptSize = file.size < maxFileMBSize * 1048576;
      if (!isAcceptSize) {
        message.error(`${file.name} file is too large`);
      }
    }

    return (isAcceptExt && isAcceptSize) || Upload.LIST_IGNORE;
  }

  return (
    <Form.Item
      name={name}
      label={label}
      valuePropName='fileList'
      getValueFromEvent={normFile}
      rules={[{ required: required, message: 'Please upload' }]}
      onReset={() => setCount(0)}
      shouldUpdate={(prevValues, curValues, info) => {
        if (name && info.source === 'external') {
          let cnt = 0;
          if (Array.isArray(name)) {
            const p = _.get(prevValues, name.join('.'));
            const c = _.get(curValues, name.join('.'));
            if (!_.isEqual(p, c)) {
              cnt = c === undefined || c.length === 0 ? 0 : c.length;
            }
          } else if (prevValues[name] !== curValues[name]) {
            cnt =
              curValues[name] === undefined || curValues[name].length === 0
                ? 0
                : curValues[name].length;
          }
          setCount(cnt);
        }
        return false;
      }}
    >
      <UploadDraggerStyle
        name='files'
        beforeUpload={beforeUpload}
        accept={getAccetpMimeType()}
        customRequest={dummyRequest}
        listType={listType}
        multiple={multiple}
        maxCount={maxCount}
        count={count}
      >
        <p className='ant-upload-drag-icon'>
          <InboxOutlined />
        </p>
        <p
          className='ant-upload-text'
          style={{ fontSize: 'var(--base-font-size)' }}
        >
          กด หรือ ลากไฟล์มาวางในกรอบนี้เพื่ออัพโหลด
        </p>
        <p
          className='ant-upload-hint'
          style={{ fontSize: 'calc(var(--base-font-size) - 2px)' }}
        >
          (สกุลไฟล์: {getAcceptFileExtension()} | ขนาดไฟล์สูงสุด:{' '}
          {getMaxFileSize()})
        </p>
      </UploadDraggerStyle>
    </Form.Item>
  );
}

const UploadDraggerStyle = styled(Upload.Dragger)<{ count: number }>`
  .ant-upload-drag {
    ${props =>
      props.count === props.maxCount
        ? css`
            display: none;
          `
        : css``}
  }

  span a {
    display: none;
  }
`;
