import { Button, Col, Form, Input, Row, Select } from 'antd';
import { FormItemSchema } from 'interfaces/common';
import styled from 'styled-components';

export type FormField = {
  searchPrefix?: string; //  Handle dropdown
  searchValue?: string;
};

export type FormFieldSchema = {
  searchPrefix: FormItemSchema;
  searchValue: FormItemSchema;
};

const FormItem: FormFieldSchema = {
  searchPrefix: {
    formItemProps: {
      name: 'searchPrefix',
      noStyle: true,
    },
  },
  searchValue: {
    formItemProps: { name: 'searchValue', label: 'Artist' },
    inputProps: {
      placeholder: 'Artist',
    },
    colProps: {
      span: 24,
      md: { span: 24 },
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
    <Form.Item {...FormItem.searchPrefix?.formItemProps} initialValue='name'>
      <Select>
        <Select.Option value='name'>Name</Select.Option>
        <Select.Option value='id'>ID</Select.Option>
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
          <Col {...FormItem.searchValue?.colProps}>
            <Form.Item {...FormItem.searchValue?.formItemProps}>
              <Input
                addonBefore={prefixSelector}
                {...FormItem.searchValue?.inputProps}
              />
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
