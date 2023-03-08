import { ConfigProvider } from 'antd';

type Props = {
  children?: React.ReactNode;
};
export default function ThemeProvider(props: Props) {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: `"Prompt", sans-serif`,
        },
      }}
    >
      {props.children}
    </ConfigProvider>
  );
}
