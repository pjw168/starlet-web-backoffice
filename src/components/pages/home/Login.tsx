import { LoginOutlined } from '@ant-design/icons';
import { Alert, Button, Form, Input } from 'antd';
import styled from 'styled-components';

export type FormType = {
  username: string;
  password: string;
};

export type LoginProps = {
  loading: boolean;
  showLoginFailed?: boolean;
  onFinish: (values: FormType) => void;
};
export default function Login(props: LoginProps) {
  const { loading, showLoginFailed, onFinish } = props;

  return (
    <Wrapper>
      <Infomation>
        <Icon />
        <Title>STARLET TOKEN</Title>
      </Infomation>
      <Subtitle>BACKOFFICE</Subtitle>

      {showLoginFailed && (
        <Alert
          showIcon
          message='Incorrect username or password.'
          type='error'
          style={{ marginBottom: '36px' }}
        />
      )}
      <Form
        name='basic'
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete='off'
        layout='vertical'
      >
        <Form.Item
          label='Username'
          name='username'
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Password'
          name='password'
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        {/* <Form.Item name='remember' valuePropName='checked'>
          <Checkbox>Remember me</Checkbox>
        </Form.Item> */}

        <Form.Item>
          <Button
            block
            size='large'
            type='primary'
            htmlType='submit'
            loading={loading}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  transition: box-shadow 0.3s;
  background: white;
  padding: 32px 24px;
  border-radius: 2rem;
  /* width: 420px; */
  border: 1px solid #bdc1c6;

  &:hover {
    box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
  }
`;

const Infomation = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
`;

const Icon = styled(LoginOutlined)`
  font-size: 30px;
`;

const Title = styled.div`
  font-size: 28px;
  color: var(--primary-color);
`;

const Subtitle = styled.p`
  color: var(--gray-color-7);
  text-align: center;
  margin-top: 8px;
  margin-bottom: 46px;
`;
