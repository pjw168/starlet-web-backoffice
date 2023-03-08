import { PlusOutlined } from '@ant-design/icons';
import IApplication from '@components/IApplication';
import { TextGrayStyle6 } from '@components/IStyleComponent';
import AppLayout from '@components/layout/AppLayout';
import DrawerAdd from '@components/pages/artists/DrawerAdd';
import DrawerEdit from '@components/pages/artists/DrawerEdit';
import SearchTools, { FormField } from '@components/pages/artists/SearchTools';
import { RecordType, Table } from '@components/pages/artists/Table';
import { DEFAULT_PAGE_SIZE } from '@constants/constants';
import { PAGE_CODE } from '@constants/pageCode';
import { artistAPI } from '@services/api';
import { ArtistSearchModel } from '@services/models/artist';
import { handleError } from '@utils/apiUtils';
import { dateFormat } from '@utils/dataUtils';
import { Button, notification } from 'antd';
import {
  CustomStaticPageProps,
  ITablePagination,
  TableOnChange,
} from 'interfaces/common';
import { GetStaticProps } from 'next';
import { useEffect, useState } from 'react';

export default function Artists() {
  const [openDrawerAdd, setOpenDrawerAdd] = useState(false);
  const [editArtistId, setEditArtistId] = useState<string>();
  const [searchReq, setSearchReq] = useState<ArtistSearchModel.Request>({
    pageNumber: 1,
    pageSize: DEFAULT_PAGE_SIZE,
  });

  const [tableLoading, setTableLoading] = useState(false);
  const [tableData, setTableData] = useState<RecordType[]>([]);
  const [tablePagination, setTablePagination] = useState<ITablePagination>({
    pageNumber: 1,
    pageSize: DEFAULT_PAGE_SIZE,
    total: 0,
    totalPages: 0,
  });
  const onSearch = async (values: FormField) => {
    //  Handle dropdown
    const dropdownSelect = {
      [values.searchPrefix ?? '']: values.searchValue,
    };
    delete values.searchPrefix;

    fetchSearch({
      pageNumber: 1,
      ...values,
      ...dropdownSelect,
    });
  };

  const fetchSearch = async (req: ArtistSearchModel.Request) => {
    setSearchReq(req);
    setTableLoading(true);

    try {
      const resp = await artistAPI.search(req);
      const rows = resp.data?.map(item => {
        const row: RecordType = {
          key: item.artist.id,
          item: item,
        };
        return row;
      });
      setTablePagination(resp.pagination);
      setTableData(rows);
    } catch (error) {
      handleError(error);
    } finally {
      setTableLoading(false);
    }
  };

  const onChangeTable = (value: TableOnChange) => {
    fetchSearch({ ...searchReq, ...value.pagination, ...value.sorter });
  };

  useEffect(() => {
    fetchSearch({
      pageNumber: 1,
      pageSize: DEFAULT_PAGE_SIZE,
    });
  }, []);

  return (
    <AppLayout title='Artists'>
      <IApplication
        name='Artists'
        extra={[
          <Button
            key='add-artist'
            type='primary'
            size='large'
            icon={<PlusOutlined />}
            onClick={() => setOpenDrawerAdd(true)}
          >
            New Artist
          </Button>,
        ]}
      >
        <DrawerAdd
          open={openDrawerAdd}
          onClose={() => setOpenDrawerAdd(false)}
          onDone={(artistName, artistId) => {
            notification['success']({
              key: new Date().toString(),
              message: 'Artist was created',
              description: (
                <div>
                  <span>Artist: {artistName}</span>
                  <br />
                  <TextGrayStyle6 size='12px'>ID: {artistId}</TextGrayStyle6>
                </div>
              ),
            });
            setOpenDrawerAdd(false);
            fetchSearch({ ...searchReq, pageNumber: 1 });
          }}
        />
        <DrawerEdit
          artistId={editArtistId}
          onClose={() => setEditArtistId(undefined)}
          onDone={(artistName, updatedAt) => {
            notification['success']({
              key: new Date().toString(),
              message: 'Edit artist success',
              description: (
                <div>
                  <span>Artist: {artistName}</span>
                  <br />
                  <TextGrayStyle6 size='12px'>
                    Updated at: {dateFormat(updatedAt, 'dateTime')}
                  </TextGrayStyle6>
                </div>
              ),
            });
            setEditArtistId(undefined);
            fetchSearch({ ...searchReq, pageNumber: 1 });
          }}
        />

        <SearchTools loading={tableLoading} onSubmit={onSearch} />
        <Table
          loading={tableLoading}
          dataSource={tableData}
          pagination={tablePagination}
          onChangeTable={onChangeTable}
          onDone={() => fetchSearch(searchReq)}
          onEdit={setEditArtistId}
        />
      </IApplication>
    </AppLayout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const props: CustomStaticPageProps = {
    protected: true,
    code: PAGE_CODE.ARTISTS,
    roles: ['ADMIN'],
  };
  return {
    props: props,
  };
};
