import {
  DashboardOutlined,
  ProjectOutlined,
  SettingOutlined,
  StarOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { MENU_KEY } from '@constants/constants';
import { Drawer, Layout, Menu, message } from 'antd';
import { useAtom } from 'jotai';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { isCollapsedAtom, isSmallScreenAtom, selectedMenuKeyAtom } from 'state';
const { Sider } = Layout;

interface MenuItemInterface {
  key: MENU_KEY | string;
  icon: JSX.Element;
  label: string;
  path: string;
}

type Props = {
  onClose: () => void;
};
export default function AppSider(props: Props) {
  const { onClose } = props;

  const [collapsed] = useAtom(isCollapsedAtom);
  const [isSmallScreen] = useAtom(isSmallScreenAtom);
  const [selectedMenuKey, setSelectedMenuKey] = useAtom(selectedMenuKeyAtom);

  const [messageApi] = message.useMessage();

  const router = useRouter();

  const items: MenuItemInterface[] = [
    {
      key: MENU_KEY.DASHBOARD,
      icon: <DashboardOutlined />,
      label: 'Dashboard',
      path: '/dashboard',
    },
    {
      key: MENU_KEY.ARTISTS,
      icon: <StarOutlined />,
      label: 'Artists',
      path: '/artists',
    },
    {
      key: MENU_KEY.SUPPORTERS,
      icon: <UserOutlined />,
      label: 'Supporters',
      path: '/supporters',
    },
    {
      key: MENU_KEY.PROJECTS,
      icon: <ProjectOutlined />,
      label: 'Projects',
      path: '/projects',
    },
    {
      key: MENU_KEY.SETTINGS,
      icon: <SettingOutlined />,
      label: 'Settings (Super Admin)',
      path: '/settings',
    },
  ];

  const onClickMenu = (key: string) => {
    const menu = _.find(items, { key });
    if (menu) {
      if (isSmallScreen) onClose();
      setSelectedMenuKey([key]);
      router.push(menu.path);
    } else {
      messageApi.info('Comming Soon.');
    }
  };

  const MenuStyle = (
    <Menu
      mode='inline'
      theme={isSmallScreen ? 'light' : 'dark'}
      selectedKeys={selectedMenuKey}
      items={items}
      onClick={e => onClickMenu(e.key)}
    />
  );

  return isSmallScreen ? (
    <Drawer
      title='Menu'
      placement='left'
      height='100%'
      onClose={onClose}
      open={!collapsed}
      bodyStyle={{ padding: '0' }}
    >
      {MenuStyle}
    </Drawer>
  ) : (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className='logo' />
      {MenuStyle}
    </Sider>
  );
}
