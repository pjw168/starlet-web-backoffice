import IApplication from '@components/IApplication';
import AppLayout from '@components/layout/AppLayout';
import SearchTools, {
  FormField,
} from '@components/pages/supporters/SearchTools';
import { RecordType, Table } from '@components/pages/supporters/Table';
import { DEFAULT_PAGE_SIZE } from '@constants/constants';
import { PAGE_CODE } from '@constants/pageCode';
import { supporterAPI } from '@services/api';
import { ArtistSearchModel } from '@services/models/artist';
import { SupporterSearchModel } from '@services/models/supporter';
import { handleError } from '@utils/apiUtils';
import {
  CustomStaticPageProps,
  ITablePagination,
  TableOnChange,
} from 'interfaces/common';
import { GetStaticProps } from 'next';
import { useEffect, useState } from 'react';

export default function Supporters() {
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

  const fetchSearch = async (req: SupporterSearchModel.Request) => {
    setSearchReq(req);
    setTableLoading(true);

    try {
      const resp = await supporterAPI.search(req);
      const rows = resp.data?.map(item => {
        const row: RecordType = {
          key: item.supporter.id,
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
    <AppLayout title='Supporters'>
      <IApplication name='Supporters'>
        <SearchTools loading={tableLoading} onSubmit={onSearch} />
        <Table
          loading={tableLoading}
          dataSource={tableData}
          pagination={tablePagination}
          onChangeTable={onChangeTable}
          onDone={() => fetchSearch(searchReq)}
        />
      </IApplication>
    </AppLayout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const props: CustomStaticPageProps = {
    protected: true,
    code: PAGE_CODE.SUPPORTERS,
    roles: ['ADMIN'],
  };
  return {
    props: props,
  };
};
