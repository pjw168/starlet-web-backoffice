import ROUTE from '@constants/route';
import { Button, Result } from 'antd';
import { useRouter } from 'next/router';

export default function Error403() {
  const router = useRouter();

  return (
    <Result
      status='403'
      title='403'
      subTitle='Sorry, you are not authorized to access this page.'
      extra={[
        <Button key='1' onClick={router.back}>
          Back
        </Button>,
        <Button key='2' type='primary' onClick={() => router.push(ROUTE.HOME)}>
          Back Home
        </Button>,
      ]}
    />
  );
}
