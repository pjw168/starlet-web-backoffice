import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import DraggerFormItem from '@components/form/DraggerFormItem';
import IDebounceSelect from '@components/IDebounceSelect';
import { FILE_EXTENSION, PROJECT_STATE } from '@constants/constants';
import {
  artistAPI,
  projectAPI,
  projectFanbaseAPI,
  projectFanbaseMonthlyListenerAPI,
} from '@services/api';
import {
  ProjectGetByIdModel,
  ProjectUpdateModel,
} from '@services/models/project';
import {
  getAxiosErrorStatus,
  handleError,
  isAxiosError,
} from '@utils/apiUtils';
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  InputNumber,
  message,
  Row,
  Select,
  Space,
  Spin,
  Switch,
  UploadFile,
} from 'antd';
import { RangePickerProps } from 'antd/es/date-picker';
import dayjs from 'dayjs';
import { FormItemSchema, LabelValue } from 'interfaces/common';
import { useAtom } from 'jotai';
import { useCallback, useEffect, useState } from 'react';
import { RiArrowDownCircleFill, RiArrowUpCircleFill } from 'react-icons/ri';
import { isSmallScreenAtom } from 'state';

export type FormField = {
  imageLarge: UploadFile[];
  imageSmall: UploadFile[];
  imagePortrait: UploadFile[];
  state: string;
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
  state: FormItemSchema;
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
  state: {
    formItemProps: {
      name: 'state',
      label: 'Publish',
      valuePropName: 'checked',
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
  // Fanbase
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
  projectId?: string;
  onClose: () => void;
  onDone: (projectName: string, updatedAt: string) => void;
};
export default function DrawerEdit(props: Props) {
  const { projectId, onClose, onDone } = props;

  const [isSmallScreen] = useAtom(isSmallScreenAtom);

  const [form] = Form.useForm();

  const [artistOptions, setArtistOptions] = useState<LabelValue[]>([]);
  const [projectResp, setProjectResp] =
    useState<ProjectGetByIdModel.Response>();

  const [loading, setLoading] = useState(false);
  const [deletingMonthlyListenerIdList, setDeletingMonthlyListenerIdList] =
    useState<string[]>([]);

  const onFinish = async (values: FormField) => {
    const req: ProjectUpdateModel.Request = {
      ...values,
      state: values.state ? PROJECT_STATE.PUBLISHED : PROJECT_STATE.UNPUBLISHED,
      endDate: values.endDate
        ? dayjs(values.endDate).second(0).millisecond(0).toISOString()
        : undefined,
      imageLarge: values.imageLarge[0].lastModified
        ? values.imageLarge[0].originFileObj
        : undefined,
      imageSmall: values.imageSmall[0].lastModified
        ? values.imageSmall[0].originFileObj
        : undefined,
      imagePortrait: values.imagePortrait[0].lastModified
        ? values.imagePortrait[0].originFileObj
        : undefined,
    };

    try {
      setLoading(true);
      const api1 = projectId ? projectAPI.update(projectId, req) : null;
      const api2 = projectId
        ? projectFanbaseAPI.updateByProjectId(projectId, {
            image: values.fanbase.image[0].originFileObj,
            description: values.fanbase.description,
          })
        : null;
      const api3 =
        deletingMonthlyListenerIdList.length > 0
          ? projectFanbaseMonthlyListenerAPI.deleteByIdList({
              idList: deletingMonthlyListenerIdList,
            })
          : null;
      const api4 =
        projectId && values.fanbaseMonthlyListeners?.length > 0
          ? projectFanbaseMonthlyListenerAPI.updateByProjectId(projectId, {
              list: values.fanbaseMonthlyListeners,
            })
          : null;

      const [resp1] = await Promise.all([api1, api2, api3, api4]);
      if (resp1) {
        onDone(values.name, resp1.updatedAt);
      }
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const disabledDate: RangePickerProps['disabledDate'] = current => {
    // Can not select days before today and today
    return current && current < dayjs().endOf('day');
  };

  const fetchArtistDropdown = async (name?: string) => {
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
  };

  const fetchProjectById = useCallback(async (projectId: string) => {
    try {
      return await projectAPI.getById(projectId);
    } catch (error) {
      handleError(error);
    }
  }, []);

  const fetchFanbaseByProjectId = useCallback(async (projectId: string) => {
    try {
      return await projectFanbaseAPI.getByProjectId(projectId);
    } catch (error) {
      if (isAxiosError(error)) {
        const status = getAxiosErrorStatus(error);
        if (status !== 404) {
          message.error(`${error}`);
        }
      } else {
        handleError(error);
      }
    }
  }, []);

  const fetchFanbaseMonthlyListenersByProjectId = useCallback(
    async (projectId: string) => {
      try {
        return await projectFanbaseMonthlyListenerAPI.getByProjectId(projectId);
      } catch (error) {
        if (isAxiosError(error)) {
          const status = getAxiosErrorStatus(error);
          if (status !== 404) {
            message.error(`${error}`);
          }
        } else {
          handleError(error);
        }
      }
    },
    [],
  );

  const fetchAllDataByProjectId = useCallback(
    async (projectId: string) => {
      try {
        setLoading(true);
        const [projectResp, fanbaseResp, fanbaseMonthlyListenerResp] =
          await Promise.all([
            fetchProjectById(projectId),
            fetchFanbaseByProjectId(projectId),
            fetchFanbaseMonthlyListenersByProjectId(projectId),
          ]);

        let infoValues = {};
        if (projectResp) {
          infoValues = {
            [FormItem.name.formItemProps.name]: projectResp.project.name,
            [FormItem.artistUserId.formItemProps
              .name]: `${projectResp.artistInfo.firstNameTh} ${projectResp.artistInfo.lastNameTh}`,
            [FormItem.revenue.formItemProps.name]: projectResp.project.revenue,
            [FormItem.endDate.formItemProps.name]: projectResp.project.endDate
              ? dayjs(projectResp.project.endDate)
              : undefined,
            [FormItem.maxNFT.formItemProps.name]: projectResp.project.maxNFT,
            [FormItem.minCap.formItemProps.name]: projectResp.project.minCap,
            [FormItem.maxCap.formItemProps.name]: projectResp.project.maxCap,
            [FormItem.description.formItemProps.name]:
              projectResp.project.description,
            [FormItem.state.formItemProps.name]:
              projectResp.project.state === PROJECT_STATE.PUBLISHED,
            [FormItem.imageLarge.formItemProps.name]: [
              {
                uid: '-1',
                name: projectResp.projectInfo.imageLargeOriginalFilename,
                status: 'done',
                url: projectResp.projectInfo.imageLargeUrl,
              },
            ],
            [FormItem.imageSmall.formItemProps.name]: [
              {
                uid: '-2',
                name: projectResp.projectInfo.imageSmallOriginalFilename,
                status: 'done',
                url: projectResp.projectInfo.imageSmallUrl,
              },
            ],
            [FormItem.imagePortrait.formItemProps.name]: [
              {
                uid: '-3',
                name: projectResp.projectInfo.imagePortraitOriginalFilename,
                status: 'done',
                url: projectResp.projectInfo.imagePortraitUrl,
              },
            ],
          };
        }

        let fabanseValues = {};
        if (fanbaseResp) {
          fabanseValues = {
            fanbase: {
              image: [
                {
                  uid: '-1',
                  name: fanbaseResp.info.imageOriginalFilename,
                  status: 'done',
                  url: fanbaseResp.info.imageUrl,
                },
              ],
              description: fanbaseResp.projectFanbase.description,
            },
          };
        }

        let fanbaseMonthlyListenerValues = {};
        if (fanbaseMonthlyListenerResp) {
          fanbaseMonthlyListenerValues = {
            fanbaseMonthlyListeners:
              fanbaseMonthlyListenerResp.projectFanbaseMonthlyListeners.map(
                e => ({
                  id: e.id,
                  name: e.name,
                  value: e.value,
                  state: e.state,
                }),
              ),
          };
        }

        form.setFieldsValue({
          ...infoValues,
          ...fabanseValues,
          ...fanbaseMonthlyListenerValues,
        });
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    },
    [
      fetchProjectById,
      fetchFanbaseByProjectId,
      fetchFanbaseMonthlyListenersByProjectId,
      form,
    ],
  );

  useEffect(() => {
    if (projectId) {
      form.resetFields();
      setProjectResp(undefined);
      setDeletingMonthlyListenerIdList([]);
      fetchAllDataByProjectId(projectId);
    }
  }, [fetchAllDataByProjectId, form, projectId]);

  return (
    <Drawer
      title={`Edit project: ${projectResp?.project?.name ?? ''}`}
      width={isSmallScreen ? '100%' : 720}
      placement='right'
      onClose={onClose}
      open={!!projectId}
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

            <Col {...FormItem.state.colProps}>
              <Form.Item {...FormItem.state.formItemProps}>
                <Switch />
              </Form.Item>
            </Col>

            <Col {...FormItem.name.colProps}>
              <Form.Item {...FormItem.name.formItemProps}>
                <Input {...FormItem.name.inputProps} />
              </Form.Item>
            </Col>

            <Col {...FormItem.artistUserId.colProps}>
              <Form.Item {...FormItem.artistUserId.formItemProps}>
                <IDebounceSelect
                  disabled
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
                  disabledDate={disabledDate}
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
                            const deletingId = form.getFieldValue(
                              'fanbaseMonthlyListeners',
                            )[name].id;

                            if (deletingId) {
                              setDeletingMonthlyListenerIdList(prev => [
                                ...prev,
                                deletingId,
                              ]);
                            }

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
