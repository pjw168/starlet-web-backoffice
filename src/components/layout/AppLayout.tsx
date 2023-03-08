import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PoweroffOutlined,
} from '@ant-design/icons';
import AppMenu from '@components/layout/AppMenu';
import Notifications from '@components/layout/Notifications';
import { useAuth } from '@contexts/AuthProvider';
import useMediaQuery from '@hooks/useMediaQuery';
import { Avatar, Col, Layout, Row, Space, Spin } from 'antd';
import { useAtom } from 'jotai';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { authDataAtom, isCollapsedAtom, isSmallScreenAtom } from 'state';
import styled from 'styled-components';
const { Content } = Layout;

type Props = {
  children: React.ReactNode;
  title?: string;
  hideAppTitle?: boolean;
  metaName?: string;
  metaContent?: string;
  linkRel?: string;
  linkHref?: string;
};
export default function AppLayout(props: Props) {
  const {
    children,
    title = `${process.env.NEXT_PUBLIC_APP_NAME}`,
    hideAppTitle,
    metaName = 'description',
    metaContent = 'Barricade - Securing the future!',
    linkRel = 'icon',
    linkHref = '/favicon.ico',
  } = props;

  const { logout } = useAuth();

  const [collapsed, setCollapsed] = useAtom(isCollapsedAtom);

  const isSmallScreenMediaQuery = useMediaQuery('(max-width: 768px)');
  const [, setIsSmallScreen] = useAtom(isSmallScreenAtom);

  const [loading, setLoading] = useState(false);

  const onLogout = () => {
    setLoading(true);
    logout();
  };

  useEffect(() => {
    setIsSmallScreen(isSmallScreenMediaQuery);
    if (isSmallScreenMediaQuery) {
      setCollapsed(true);
    }
  }, [isSmallScreenMediaQuery, setCollapsed, setIsSmallScreen]);

  return (
    <Layout className='layout'>
      <Head>
        <title>
          {hideAppTitle
            ? title
            : `${title} | ${process.env.NEXT_PUBLIC_APP_NAME}`}
        </title>
        <meta name={metaName} content={metaContent} />
        <link rel={linkRel} href={linkHref} />
      </Head>

      <AppMenu onClose={() => setCollapsed(true)} />

      <Layout className='site-layout'>
        <AppHeader>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
            },
          )}

          <Space size='large'>
            <AvatarLoginUser />
            <Notifications />
            <LogoutIcon loading={loading} onLogout={onLogout} />
          </Space>
        </AppHeader>
        <Content className='site-layout-background'>{children}</Content>
      </Layout>
    </Layout>
  );
}

const AppHeader = styled.div`
  padding: 0 24px;
  align-items: center;
  display: flex;
  justify-content: space-between;
  background: white;
  height: 64px;
`;

const AvatarLoginUser = () => {
  const [authData] = useAtom(authDataAtom);

  return (
    <Row gutter={10}>
      <Col style={{ textAlign: 'end' }}>
        <span
          style={{ fontWeight: 'bold' }}
        >{`${authData?.userInfo.firstName} ${authData?.userInfo.lastName}`}</span>
        <br />
        <span>{`${authData?.userInfo.username}`}</span>
      </Col>
      <Col>
        <Avatar
          style={{
            backgroundColor: 'orange',
            verticalAlign: 'middle',
          }}
          size='large'
          gap={4}
        >
          A
        </Avatar>
      </Col>
    </Row>
  );
};

type LogoutIconProps = {
  loading: boolean;
  onLogout: () => void;
};
const LogoutIcon = (props: LogoutIconProps) => {
  const { loading, onLogout } = props;

  return loading ? (
    <Spin />
  ) : (
    <PoweroffOutlined style={{ fontSize: '20px' }} onClick={onLogout} />
  );
};
