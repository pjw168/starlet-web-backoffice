import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import DraggerFormItem from '@components/form/DraggerFormItem';
import IDebounceSelect from '@components/IDebounceSelect';
import { FILE_EXTENSION } from '@constants/constants';
import {
  artistAPI,
  projectAPI,
  projectFanbaseAPI,
  projectFanbaseMonthlyListenerAPI,
} from '@services/api';
import { ProjectCreateModel } from '@services/models/project';
import { handleError } from '@utils/apiUtils';
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
  Spin,
  UploadFile,
} from 'antd';
import dayjs from 'dayjs';
import { FormItemSchema, LabelValue } from 'interfaces/common';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { RiArrowDownCircleFill, RiArrowUpCircleFill } from 'react-icons/ri';
import { isSmallScreenAtom } from 'state';

export type FormField = {
  imageLarge: UploadFile[];
  imageSmall: UploadFile[];
  imagePortrait: UploadFile[];
  name: string;
  artistUserId: string;
  revenue: number;
  endDate: Date;
  maxNFT: number;
  minCap: number;
  maxCap: number;
  description: string;
  fanbase: {
    image: UploadFile[];
    description: string;
  };
  fanbaseMonthlyListeners: {
    id?: string;
    name: string;
    value: number;
    state: string;
  }[];
};

export type FormFieldSchema = {
  imageLarge: FormItemSchema;
  imageSmall: FormItemSchema;
  imagePortrait: FormItemSchema;
  name: FormItemSchema;
  artistUserId: FormItemSchema;
  revenue: FormItemSchema;
  endDate: FormItemSchema;
  maxNFT: FormItemSchema;
  minCap: FormItemSchema;
  maxCap: FormItemSchema;
  description: FormItemSchema;
  fanbase: {
    image: FormItemSchema;
    description: FormItemSchema;
  };
  fanbaseMonthlyListeners: FormItemSchema;
};

const FormItem: FormFieldSchema = {
  imageLarge: {
    formItemProps: {
      name: 'imageLarge',
      label: 'Large Image (650x636 pixel)',
      rules: [{ required: true, message: 'Please upload large image!' }],
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
  imageSmall: {
    formItemProps: {
      name: 'imageSmall',
      label: 'Small Image (340x727 pixel)',
      rules: [{ required: true, message: 'Please upload small image!' }],
    },
    colProps: {
      span: 12,
    },
    draggerFormProps: {
      required: true,
      listType: 'picture-card',
      maxFileMBSize: 1,
      maxCount: 1,
      accept: [FILE_EXTENSION.JPEG, FILE_EXTENSION.PNG],
    },
  },
  imagePortrait: {
    formItemProps: {
      name: 'imagePortrait',
      label: 'Portrait Image (304x418 pixel)',
      rules: [{ required: true, message: 'Please upload portrait image!' }],
    },
    colProps: {
      span: 12,
    },
    draggerFormProps: {
      required: true,
      listType: 'picture-card',
      maxFileMBSize: 1,
      maxCount: 1,
      accept: [FILE_EXTENSION.JPEG, FILE_EXTENSION.PNG],
    },
  },
  name: {
    formItemProps: {
      name: 'name',
      label: 'Name',
      rules: [{ required: true, message: 'Name is required!' }],
    },
    inputProps: {
      placeholder: 'Please enter project name',
    },
    colProps: {
      span: 24,
      md: { span: 24 },
    },
  },
  artistUserId: {
    formItemProps: {
      name: 'artistUserId',
      label: 'Artist',
      rules: [{ required: true, message: 'Artist is required!' }],
    },
    inputProps: {
      placeholder: 'Please select an artist',
    },
    colProps: {
      span: 24,
      md: { span: 12 },
    },
  },
  revenue: {
    formItemProps: {
      name: 'revenue',
      label: 'Revenue',
      rules: [{ required: true, message: 'Project revenue is required!' }],
    },
    inputProps: {
      placeholder: 'Please enter project revenue',
    },
    colProps: {
      span: 24,
      md: { span: 12 },
    },
  },
  endDate: {
    formItemProps: {
      name: 'endDate',
      label: 'End Date',
    },
    inputProps: {
      placeholder: 'Please enter project end date',
    },
    colProps: {
      span: 24,
      md: { span: 12 },
    },
  },
  maxNFT: {
    formItemProps: {
      name: 'maxNFT',
      label: 'Max NFT',
    },
    inputProps: {
      placeholder: 'Please enter project max NFT',
    },
    colProps: {
      span: 24,
      md: { span: 12 },
    },
  },
  minCap: {
    formItemProps: {
      name: 'minCap',
      label: 'Min Cap',
    },
    inputProps: {
      placeholder: 'Please enter project min Cap',
    },
    colProps: {
      span: 24,
      md: { span: 6 },
    },
  },
  maxCap: {
    formItemProps: {
      name: 'maxCap',
      label: 'Max Cap',
    },
    inputProps: {
      placeholder: 'Please enter project max Cap',
    },
    colProps: {
      span: 24,
      md: { span: 6 },
    },
  },
  description: {
    formItemProps: {
      name: 'description',
      label: 'Description',
    },
    inputProps: {
      placeholder: 'Please enter project description',
    },
    colProps: {
      span: 24,
      md: { span: 24 },
    },
  },
  fanbase: {
    image: {
      formItemProps: {
        name: ['fanbase', 'image'],
        label: 'Image (1080x660 pixel)',
        rules: [{ required: true, message: 'Please upload image!' }],
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
    description: {
      formItemProps: {
        name: ['fanbase', 'description'],
        label: 'Description',
      },
      inputProps: {
        placeholder: 'Please enter project description',
      },
      colProps: {
        span: 24,
        md: { span: 24 },
      },
    },
  },
  fanbaseMonthlyListeners: {
    formItemProps: {
      name: 'fanbaseMonthlyListeners',
    },
  },
};

type Props = {
  open: boolean;
  onClose: () => void;
  onDone: (projectName: string, projectId: string) => void;
};
export default function DrawerAdd(props: Props) {
  const { open, onClose, onDone } = props;

  const [isSmallScreen] = useAtom(isSmallScreenAtom);

  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [artistOptions, setArtistOptions] = useState<LabelValue[]>([]);

  const onFinish = async (values: FormField) => {
    const req: ProjectCreateModel.Request = {
      endDate: values.endDate
        ? dayjs(values.endDate).second(0).millisecond(0).toISOString()
        : undefined,
      imageLarge: values.imageLarge[0].originFileObj,
      imageSmall: values.imageSmall[0].originFileObj,
      imagePortrait: values.imagePortrait[0].originFileObj,
      name: values.name,
      artistUserId: values.artistUserId,
      revenue: values.revenue,
      description: values.description,
      maxCap: values.maxCap,
      minCap: values.minCap,
      maxNFT: values.maxNFT,
    };

    try {
      setLoading(true);
      const resp = await projectAPI.create(req);
      if (resp) {
        const resp2 = await projectFanbaseAPI.create({
          projectId: resp.id,
          image: values.fanbase.image[0].originFileObj,
          description: values.fanbase.description,
        });
        if (resp2) {
          await projectFanbaseMonthlyListenerAPI.updateByProjectId(resp.id, {
            list: values.fanbaseMonthlyListeners,
          });
        }

        onDone(values.name, resp.id);
      }
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
      title='New project'
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
            <Col {...FormItem.imageLarge.colProps}>
              <DraggerFormItem
                {...FormItem.imageLarge.formItemProps}
                {...FormItem.imageLarge.draggerFormProps}
              />
            </Col>

            <Col {...FormItem.imageSmall.colProps}>
              <DraggerFormItem
                {...FormItem.imageSmall.formItemProps}
                {...FormItem.imageSmall.draggerFormProps}
              />
            </Col>

            <Col {...FormItem.imagePortrait.colProps}>
              <DraggerFormItem
                {...FormItem.imagePortrait.formItemProps}
                {...FormItem.imagePortrait.draggerFormProps}
              />
            </Col>

            <Col {...FormItem.name.colProps}>
              <Form.Item {...FormItem.name.formItemProps}>
                <Input {...FormItem.name.inputProps} />
              </Form.Item>
            </Col>

            <Col {...FormItem.artistUserId.colProps}>
              <Form.Item {...FormItem.artistUserId.formItemProps}>
                <IDebounceSelect
                  // mode='multiple'
                  placeholder='Select an artist'
                  fetchOptions={fetchArtistDropdown}
                  options={artistOptions}
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>

            <Col {...FormItem.revenue.colProps}>
              <Form.Item {...FormItem.revenue.formItemProps}>
                <InputNumber
                  {...FormItem.revenue.inputProps}
                  style={{ width: '100%' }}
                  formatter={value => (value ? `${Math.trunc(+value)}` : ``)}
                  // parser={value => value!.replace('%', '')}
                />
              </Form.Item>
            </Col>

            <Col {...FormItem.endDate.colProps}>
              <Form.Item {...FormItem.endDate.formItemProps}>
                <DatePicker
                  {...FormItem.artistUserId.inputProps}
                  style={{ width: '100%' }}
                  format='DD/MM/YYYY'
                />
              </Form.Item>
            </Col>

            <Col {...FormItem.maxNFT.colProps}>
              <Form.Item {...FormItem.maxNFT.formItemProps}>
                <InputNumber
                  {...FormItem.maxNFT.inputProps}
                  style={{ width: '100%' }}
                  formatter={value => (value ? `${Math.trunc(+value)}` : ``)}
                />
              </Form.Item>
            </Col>

            <Col {...FormItem.minCap.colProps}>
              <Form.Item {...FormItem.minCap.formItemProps}>
                <InputNumber
                  {...FormItem.minCap.inputProps}
                  style={{ width: '100%' }}
                  formatter={value => (value ? `${Math.trunc(+value)}` : ``)}
                />
              </Form.Item>
            </Col>

            <Col {...FormItem.maxCap.colProps}>
              <Form.Item {...FormItem.maxCap.formItemProps}>
                <InputNumber
                  {...FormItem.maxCap.inputProps}
                  style={{ width: '100%' }}
                  formatter={value => (value ? `${Math.trunc(+value)}` : ``)}
                />
              </Form.Item>
            </Col>

            <Col {...FormItem.description.colProps}>
              <Form.Item {...FormItem.description.formItemProps}>
                <Input.TextArea {...FormItem.description.inputProps} rows={5} />
              </Form.Item>
            </Col>

            <h2>Fanbase</h2>
            <Col {...FormItem.fanbase.image.colProps}>
              <DraggerFormItem
                {...FormItem.fanbase.image.formItemProps}
                {...FormItem.fanbase.image.draggerFormProps}
              />
            </Col>
            <Col {...FormItem.fanbase.description.colProps}>
              <Form.Item {...FormItem.fanbase.description.formItemProps}>
                <Input.TextArea
                  {...FormItem.fanbase.description.inputProps}
                  rows={5}
                />
              </Form.Item>
            </Col>

            <h3>Monthly Listeners</h3>
            <Col span={24}>
              <Form.List
                name={FormItem.fanbaseMonthlyListeners.formItemProps.name}
              >
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space
                        key={key}
                        style={{ display: 'flex', marginBottom: 8 }}
                        align='baseline'
                      >
                        <Form.Item {...restField} hidden name={[name, 'id']}>
                          <Input />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, 'name']}
                          rules={[
                            { required: true, message: 'Missing location' },
                          ]}
                        >
                          <Input placeholder='Location' />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, 'value']}
                          rules={[{ required: true, message: 'Missing value' }]}
                          style={{
                            position: 'relative',
                            top: '-4px',
                          }}
                        >
                          <InputNumber
                            placeholder='Value'
                            formatter={value =>
                              value ? `${Math.trunc(+value)}` : ``
                            }
                          />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, 'state']}
                          rules={[{ required: true, message: 'Missing state' }]}
                        >
                          <Select
                            style={{ width: 120 }}
                            allowClear
                            placeholder='State'
                            options={[
                              {
                                value: 'INCREASE',
                                label: (
                                  <div
                                    style={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '4px',
                                    }}
                                  >
                                    Increase <RiArrowUpCircleFill />
                                  </div>
                                ),
                              },
                              {
                                value: 'DECREASE',
                                label: (
                                  <div
                                    style={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '4px',
                                    }}
                                  >
                                    Decrease <RiArrowDownCircleFill />
                                  </div>
                                ),
                              },
                              {
                                value: 'WAITING_FOR_UPDATE',
                                label: <span>Wait for update</span>,
                              },
                            ]}
                          />
                        </Form.Item>

                        <MinusCircleOutlined
                          onClick={() => {
                            remove(name);
                          }}
                        />
                      </Space>
                    ))}
                    <Form.Item>
                      <Button
                        type='dashed'
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        Add field
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
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
