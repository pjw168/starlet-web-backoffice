import DraggerFormItem from '@components/form/DraggerFormItem';
import { FILE_EXTENSION } from '@constants/constants';
import { artistAPI } from '@services/api';
import { ArtistCreateModel } from '@services/models/artist';
import { handleError } from '@utils/apiUtils';
import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  Row,
  Space,
  Spin,
  UploadFile,
} from 'antd';
import { FormItemSchema, LabelValue } from 'interfaces/common';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { isSmallScreenAtom } from 'state';

export type FormField = {
  profileImage: UploadFile[];
  firstNameEn: string;
  lastNameEn: string;
  firstNameTh: string;
  lastNameTh: string;
  email: string;
  telephone: string;
};

export type FormFieldSchema = {
  profileImage: FormItemSchema;
  firstNameEn: FormItemSchema;
  lastNameEn: FormItemSchema;
  firstNameTh: FormItemSchema;
  lastNameTh: FormItemSchema;
  email: FormItemSchema;
  telephone: FormItemSchema;
};

const FormItem: FormFieldSchema = {
  profileImage: {
    formItemProps: {
      name: 'profileImage',
      label: 'Profile Image',
      rules: [{ required: true, message: 'Please upload profile image!' }],
    },
    colProps: {
      span: 24,
    },
    draggerFormProps: {
      required: true,
      listType: 'picture-card',
      maxFileMBSize: 1,
      maxCount: 1,
      accept: [FILE_EXTENSION.JPEG, FILE_EXTENSION.PNG],
    },
  },
  firstNameTh: {
    formItemProps: {
      name: 'firstNameTh',
      label: 'First name (TH)',
      rules: [{ required: true, message: 'FirstNameTh is required!' }],
    },
    inputProps: {
      placeholder: 'First name (TH)',
    },
    colProps: {
      span: 24,
      md: 12,
    },
  },
  lastNameTh: {
    formItemProps: {
      name: 'lastNameTh',
      label: 'Last name (TH)',
      rules: [{ required: true, message: 'LastNameTh is required!' }],
    },
    inputProps: {
      placeholder: 'Last name (TH)',
    },
    colProps: {
      span: 24,
      md: 12,
    },
  },
  firstNameEn: {
    formItemProps: {
      name: 'firstNameEn',
      label: 'First name (EN)',
      rules: [{ required: true, message: 'FirstNameEn is required!' }],
    },
    inputProps: {
      placeholder: 'First name (EN)',
    },
    colProps: {
      span: 24,
      md: 12,
    },
  },
  lastNameEn: {
    formItemProps: {
      name: 'lastNameEn',
      label: 'Last name (EN)',
      rules: [{ required: true, message: 'FirstNameEn is required!' }],
    },
    inputProps: {
      placeholder: 'Last name (EN)',
    },
    colProps: {
      span: 24,
      md: 12,
    },
  },
  telephone: {
    formItemProps: {
      name: 'telephone',
      label: 'Telephone',
      rules: [
        { len: 10, message: 'Telephone 10 digit' },
        {
          pattern: RegExp(/^[0-9]*$/g),
          message: 'is invalid format',
        },
      ],
    },
    inputProps: {
      placeholder: 'Telephone',
    },
    colProps: {
      span: 24,
    },
  },
  email: {
    formItemProps: {
      name: 'email',
      label: 'Email',
      rules: [
        { required: true, message: 'Email is required!' },
        { type: 'email' },
      ],
    },
    inputProps: {
      placeholder: 'Email',
    },
    colProps: {
      span: 24,
    },
  },
};

type Props = {
  open: boolean;
  onClose: () => void;
  onDone: (artistName: string, id: string) => void;
};
export default function DrawerAdd(props: Props) {
  const { open, onClose, onDone } = props;

  const [isSmallScreen] = useAtom(isSmallScreenAtom);

  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [, setArtistOptions] = useState<LabelValue[]>([]);

  const onFinish = async (values: FormField) => {
    const req: ArtistCreateModel.Request = {
      ...values,
      profileImage: values.profileImage[0].originFileObj,
    };

    try {
      setLoading(true);
      const resp = await artistAPI.create(req);
      onDone(`${values.firstNameTh} ${values.lastNameTh}`, resp.artistId);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  async function fetchArtistDropdown(name?: string) {
    try {
      const resp = await artistAPI.search({ name });
      const aristList =
        resp?.data.map(e => ({
          label: `${e.artist.firstNameTh} ${e.artist.lastNameTh}`,
          value: e.artist.userId,
        })) ?? [];

      setArtistOptions(aristList);
    } catch (error) {
      handleError(error);
    }
  }

  useEffect(() => {
    if (open) {
      fetchArtistDropdown();
      form.resetFields();
    }
  }, [form, open]);

  return (
    <Drawer
      title='New artist'
      width={isSmallScreen ? '100%' : 720}
      onClose={onClose}
      open={open}
      extra={
        <Space>
          <Button onClick={form.submit} type='primary' loading={loading}>
            Submit
          </Button>
        </Space>
      }
    >
      <Spin tip='Loading...' spinning={loading}>
        <Form
          scrollToFirstError
          layout='vertical'
          form={form}
          onFinish={onFinish}
        >
          <Row gutter={16}>
            <Col {...FormItem.profileImage.colProps}>
              <DraggerFormItem
                {...FormItem.profileImage.formItemProps}
                {...FormItem.profileImage.draggerFormProps}
              />
            </Col>

            <Col {...FormItem.firstNameTh.colProps}>
              <Form.Item {...FormItem.firstNameTh.formItemProps}>
                <Input {...FormItem.firstNameTh.inputProps} />
              </Form.Item>
            </Col>

            <Col {...FormItem.lastNameTh.colProps}>
              <Form.Item {...FormItem.lastNameTh.formItemProps}>
                <Input {...FormItem.lastNameTh.inputProps} />
              </Form.Item>
            </Col>

            <Col {...FormItem.firstNameEn.colProps}>
              <Form.Item {...FormItem.firstNameEn.formItemProps}>
                <Input {...FormItem.firstNameEn.inputProps} />
              </Form.Item>
            </Col>

            <Col {...FormItem.lastNameEn.colProps}>
              <Form.Item {...FormItem.lastNameEn.formItemProps}>
                <Input {...FormItem.lastNameEn.inputProps} />
              </Form.Item>
            </Col>

            <Col {...FormItem.email.colProps}>
              <Form.Item {...FormItem.email.formItemProps}>
                <Input {...FormItem.email.inputProps} />
              </Form.Item>
            </Col>

            <Col {...FormItem.telephone.colProps}>
              <Form.Item {...FormItem.telephone.formItemProps}>
                <Input {...FormItem.telephone.inputProps} />
              </Form.Item>
            </Col>

            <Form.Item>
              <Button hidden htmlType='submit' />
            </Form.Item>
          </Row>
        </Form>
      </Spin>
    </Drawer>
  );
}
