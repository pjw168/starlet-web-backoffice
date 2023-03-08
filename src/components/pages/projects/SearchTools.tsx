import { PROJECT_STATE } from '@constants/constants';
import { Button, Col, Form, Input, Row, Select, Tag } from 'antd';
import { FormItemSchema } from 'interfaces/common';
import styled from 'styled-components';

export type FormField = {
  projectSearchPrefix?: string; //  Handle dropdown
  projectSearchValue?: string;
  artistSearchPrefix?: string; //  Handle dropdown
  artistSearchValue?: string;
  state: string;
  endDateFrom: Date;
  endDateTo: Date;
  capFrom: number;
  capTo: number;
  nftFrom: number;
  nftTo: number;
  revenueFrom: number;
  revenueTo: number;
  createdAtFrom: Date;
  createdAtTo: Date;
  updatedAtFrom: Date;
  updatedAtTo: Date;
};

export type FormFieldSchema = {
  projectSearchPrefix: FormItemSchema;
  projectSearchValue: FormItemSchema;
  artistSearchPrefix: FormItemSchema;
  artistSearchValue: FormItemSchema;
  state: FormItemSchema;
  endDateFrom: FormItemSchema;
  endDateTo: FormItemSchema;
  capFrom: FormItemSchema;
  capTo: FormItemSchema;
  nftFrom: FormItemSchema;
  nftTo: FormItemSchema;
  revenueFrom: FormItemSchema;
  revenueTo: FormItemSchema;
  createdAtFrom: FormItemSchema;
  createdAtTo: FormItemSchema;
  updatedAtFrom: FormItemSchema;
  updatedAtTo: FormItemSchema;
};
const FormItem: FormFieldSchema = {
  projectSearchPrefix: {
    formItemProps: {
      name: 'projectSearchPrefix',
      noStyle: true,
    },
  },
  projectSearchValue: {
    formItemProps: { name: 'projectSearchValue', label: 'Project' },
    inputProps: {
      placeholder: 'Project',
    },
    colProps: {
      span: 24,
      md: { span: 12 },
      xl: { span: 8 },
    },
  },
  artistSearchPrefix: {
    formItemProps: {
      name: 'artistSearchPrefix',
      noStyle: true,
    },
  },
  artistSearchValue: {
    formItemProps: { name: 'artistSearchValue', label: 'Arits' },
    inputProps: {
      placeholder: 'Arits',
    },
    colProps: {
      span: 24,
      md: { span: 12 },
      xl: { span: 8 },
    },
  },
  state: {
    formItemProps: {
      name: 'state',
      label: 'State',
    },
    inputProps: {
      placeholder: 'State',
    },
    colProps: {
      span: 24,
      md: { span: 12 },
      xl: { span: 8 },
    },
  },
  endDateFrom: {
    formItemProps: {
      name: 'endDateFrom',
    },
    inputProps: {
      placeholder: 'From',
    },
    colProps: {
      span: 24,
      md: { span: 12 },
      xl: { span: 6 },
    },
  },
  endDateTo: {
    formItemProps: {
      name: 'endDateTo',
    },
    inputProps: {
      placeholder: 'To',
    },
  },
  capFrom: {
    formItemProps: {
      name: 'capFrom',
    },
    inputProps: {
      placeholder: 'From',
    },
    colProps: {
      span: 24,
      md: { span: 12 },
      xl: { span: 6 },
    },
  },
  capTo: {
    formItemProps: {
      name: 'capTo',
    },
    inputProps: {
      placeholder: 'To',
    },
  },
  nftFrom: {
    formItemProps: {
      name: 'nftFrom',
    },
    inputProps: {
      placeholder: 'From',
    },
    colProps: {
      span: 24,
      md: { span: 12 },
      xl: { span: 6 },
    },
  },
  nftTo: {
    formItemProps: {
      name: 'nftTo',
    },
    inputProps: {
      placeholder: 'To',
    },
  },
  revenueFrom: {
    formItemProps: {
      name: 'revenueFrom',
    },
    inputProps: {
      placeholder: 'From',
    },
    colProps: {
      span: 24,
      md: { span: 12 },
      xl: { span: 6 },
    },
  },
  revenueTo: {
    formItemProps: {
      name: 'revenueTo',
    },
    inputProps: {
      placeholder: 'To',
    },
  },
  createdAtFrom: {
    formItemProps: {
      name: 'createdAtFrom',
    },
    inputProps: {
      placeholder: 'From',
    },
    colProps: {
      span: 24,
      md: { span: 12 },
      xl: { span: 6 },
    },
  },
  createdAtTo: {
    formItemProps: {
      name: 'createdAtTo',
    },
    inputProps: {
      placeholder: 'To',
    },
  },
  updatedAtFrom: {
    formItemProps: {
      name: 'updatedAtFrom',
    },
    inputProps: {
      placeholder: 'From',
    },
    colProps: {
      span: 24,
      md: { span: 12 },
      xl: { span: 6 },
    },
  },
  updatedAtTo: {
    formItemProps: {
      name: 'updatedAtTo',
    },
    inputProps: {
      placeholder: 'To',
    },
  },
};

type Props = {
  loading: boolean;
  onSubmit: (values: FormField) => void;
};
export default function SearchTools(props: Props) {
  const { loading, onSubmit } = props;

  const [form] = Form.useForm();

  const resetForm = () => {
    form.resetFields();
    form.submit();
  };

  const prefixSelector = (
    <Form.Item
      {...FormItem.projectSearchPrefix?.formItemProps}
      initialValue='name'
    >
      <Select>
        <Select.Option value='name'>Name</Select.Option>
        <Select.Option value='id'>ID</Select.Option>
      </Select>
    </Form.Item>
  );

  const prefixSelector2 = (
    <Form.Item
      {...FormItem.artistSearchPrefix?.formItemProps}
      initialValue='artistName'
    >
      <Select>
        <Select.Option value='artistName'>Name</Select.Option>
        <Select.Option value='artistId'>ID</Select.Option>
      </Select>
    </Form.Item>
  );

  return (
    <section>
      <Title>Search Tools</Title>
      <Form
        form={form}
        name='Search Tools'
        layout='vertical'
        onFinish={onSubmit}
      >
        <Row gutter={16}>
          <Col {...FormItem.projectSearchValue?.colProps}>
            <Form.Item {...FormItem.projectSearchValue?.formItemProps}>
              <Input
                addonBefore={prefixSelector}
                {...FormItem.projectSearchValue?.inputProps}
              />
            </Form.Item>
          </Col>

          <Col {...FormItem.artistSearchValue?.colProps}>
            <Form.Item {...FormItem.artistSearchValue?.formItemProps}>
              <Input
                addonBefore={prefixSelector2}
                {...FormItem.artistSearchValue?.inputProps}
              />
            </Form.Item>
          </Col>

          <Col {...FormItem.state.colProps}>
            <Form.Item {...FormItem.state.formItemProps}>
              <Select {...FormItem.state.inputProps}>
                <Select.Option value={PROJECT_STATE.PUBLISHED}>
                  <Tag color='success'>PUBLISHED</Tag>
                </Select.Option>
                <Select.Option value={PROJECT_STATE.UNPUBLISHED}>
                  <Tag color='default'>UNPUBLISHED</Tag>
                </Select.Option>
              </Select>
            </Form.Item>
          </Col>

          <Col {...FormItem.endDateFrom.colProps}>
            <Form.Item label='End Date' style={{ marginBottom: 0 }}>
              <Form.Item
                {...FormItem.endDateFrom.formItemProps}
                style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
              >
                <Input {...FormItem.endDateFrom.inputProps} />
              </Form.Item>
              <Form.Item
                {...FormItem.endDateTo.formItemProps}
                style={{
                  display: 'inline-block',
                  width: 'calc(50% - 8px)',
                  margin: '0 8px',
                }}
              >
                <Input {...FormItem.endDateTo.inputProps} />
              </Form.Item>
            </Form.Item>
          </Col>

          <Col {...FormItem.capFrom.colProps}>
            <Form.Item label='Capital' style={{ marginBottom: 0 }}>
              <Form.Item
                {...FormItem.capFrom.formItemProps}
                style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
              >
                <Input {...FormItem.capFrom.inputProps} />
              </Form.Item>
              <Form.Item
                {...FormItem.capTo.formItemProps}
                style={{
                  display: 'inline-block',
                  width: 'calc(50% - 8px)',
                  margin: '0 8px',
                }}
              >
                <Input {...FormItem.capTo.inputProps} />
              </Form.Item>
            </Form.Item>
          </Col>

          <Col {...FormItem.nftFrom.colProps}>
            <Form.Item label='NFT' style={{ marginBottom: 0 }}>
              <Form.Item
                {...FormItem.nftFrom.formItemProps}
                style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
              >
                <Input {...FormItem.nftFrom.inputProps} />
              </Form.Item>
              <Form.Item
                {...FormItem.nftTo.formItemProps}
                style={{
                  display: 'inline-block',
                  width: 'calc(50% - 8px)',
                  margin: '0 8px',
                }}
              >
                <Input {...FormItem.nftTo.inputProps} />
              </Form.Item>
            </Form.Item>
          </Col>

          <Col {...FormItem.revenueFrom.colProps}>
            <Form.Item label='Revenue' style={{ marginBottom: 0 }}>
              <Form.Item
                {...FormItem.revenueFrom.formItemProps}
                style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
              >
                <Input {...FormItem.revenueFrom.inputProps} />
              </Form.Item>
              <Form.Item
                {...FormItem.revenueTo.formItemProps}
                style={{
                  display: 'inline-block',
                  width: 'calc(50% - 8px)',
                  margin: '0 8px',
                }}
              >
                <Input {...FormItem.revenueTo.inputProps} />
              </Form.Item>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Button disabled={loading} type='link' onClick={resetForm}>
            Reset
          </Button>
          <Col>
            <Form.Item>
              <Button loading={loading} type='primary' htmlType='submit'>
                Search
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </section>
  );
}

const Title = styled.h3`
  font-size: 16px;
  margin-bottom: 12px;
`;
