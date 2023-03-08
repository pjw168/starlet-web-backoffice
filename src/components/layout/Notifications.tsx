import { BellOutlined } from '@ant-design/icons';
import { delay } from '@utils/helperUtils';
import {
  Avatar,
  Badge,
  Button,
  List,
  Popover,
  Skeleton,
  Spin,
  Typography,
} from 'antd';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { RiMailCheckLine } from 'react-icons/ri';
import { isSmallScreenAtom, unreadNotificationsAtom } from 'state';
import styled from 'styled-components';

interface DataType {
  gender?: string;
  name: {
    title?: string;
    first?: string;
    last?: string;
  };
  email?: string;
  picture: {
    large?: string;
    medium?: string;
    thumbnail?: string;
  };
  nat?: string;
  loading: boolean;
}

const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;

export default function Notifications() {
  const [isSmallScreen] = useAtom(isSmallScreenAtom);
  const [unreadNotifications, setUnreadNotification] = useAtom(
    unreadNotificationsAtom,
  );

  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DataType[]>([]);
  const [list, setList] = useState<DataType[]>([]);

  useEffect(() => {
    //TODO implement
    const fetchNotifications = async () => {
      await delay(3000);
      setUnreadNotification(3);
    };

    if (unreadNotifications === null) {
      fetchNotifications();
      fetch(fakeDataUrl)
        .then(res => res.json())
        .then(res => {
          setInitLoading(false);
          setData(res.results);
          setList(res.results);
        });
    }
  }, [setUnreadNotification, unreadNotifications]);

  const onLoadMore = () => {
    setLoading(true);
    setList(
      data.concat(
        [...new Array(count)].map(() => ({
          loading: true,
          name: {},
          picture: {},
        })),
      ),
    );
    fetch(fakeDataUrl)
      .then(res => res.json())
      .then(res => {
        const newData = data.concat(res.results);
        setData(newData);
        setList(newData);
        setLoading(false);
        // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
        // In real scene, you can using public method of react-virtualized:
        // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
        window.dispatchEvent(new Event('resize'));
      });
  };

  const loadMore =
    !initLoading && !loading ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
        <Button onClick={onLoadMore}>loading more</Button>
      </div>
    ) : null;

  return (
    <Popover
      arrowPointAtCenter
      placement='bottomRight'
      content={
        <List
          className='demo-loadmore-list'
          loading={initLoading}
          itemLayout='horizontal'
          loadMore={loadMore}
          dataSource={list}
          renderItem={item => (
            <ListItemStyle
              actions={[
                // <a key='list-loadmore-more'>read</a>
                // eslint-disable-next-line react/jsx-key
                <Button
                  title='mark as read'
                  shape='circle'
                  icon={<RiMailCheckLine />}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    border: 'none',
                  }}
                />,
              ]}
            >
              <Skeleton avatar title={false} loading={item.loading} active>
                <List.Item.Meta
                  avatar={<Avatar src={item.picture.large} />}
                  title={<a href='https://ant.design'>{item.name?.last}</a>}
                  description={
                    <Typography.Paragraph
                      ellipsis={isSmallScreen ? { rows: 1 } : { rows: 2 }}
                      style={{ color: 'gray' }}
                    >
                      Ant Design, a design language for background applications,
                      is refined by Ant UED Team. Ant Design, a design language
                      for background applications, is refined by Ant UED Team.
                      Ant Design, a design language for background applications,
                      is refined by Ant UED Team. Ant Design, a design language
                      for background applications, is refined by Ant UED Team.
                      Ant Design, a design language for background applications,
                      is refined by Ant UED Team. Ant Design, a design language
                      for background applications, is refined by Ant UED Team.
                    </Typography.Paragraph>
                  }
                />
              </Skeleton>
            </ListItemStyle>
          )}
        />
      }
      title='Notifications'
      overlayInnerStyle={{
        width: isSmallScreen ? '300px' : '400px',
        maxHeight: '80vh',
        overflowY: 'auto',
      }}
    >
      <Badge
        count={unreadNotifications === null ? <Spin /> : unreadNotifications}
      >
        <BellOutlined style={{ fontSize: '20px' }} />
      </Badge>
    </Popover>
  );
}

const ListItemStyle = styled(List.Item)`
  :hover {
    background-color: #f4f5f7;
  }

  .ant-list-item-action {
    margin-inline-start: 0px !important;
  }
`;
