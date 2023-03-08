import { PlusOutlined } from '@ant-design/icons';
import IApplication from '@components/IApplication';
import { TextGrayStyle6 } from '@components/IStyleComponent';
import AppLayout from '@components/layout/AppLayout';
import DrawerAdd from '@components/pages/projects/DrawerAdd';
import DrawerEdit from '@components/pages/projects/DrawerEdit';
import SearchTools, { FormField } from '@components/pages/projects/SearchTools';
import { RecordType, Table } from '@components/pages/projects/Table';
import { DEFAULT_PAGE_SIZE } from '@constants/constants';
import { PAGE_CODE } from '@constants/pageCode';
import { projectAPI } from '@services/api';
import { ProjectSearchModel } from '@services/models/project';
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

export default function Projects() {
  const [openDrawerAdd, setOpenDrawerAdd] = useState(false);
  const [editProjectId, setEditProjectId] = useState<string>();
  const [searchReq, setSearchReq] = useState<ProjectSearchModel.Request>({
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
      [values.projectSearchPrefix ?? '']: values.projectSearchValue,
      [values.artistSearchPrefix ?? '']: values.artistSearchValue,
    };
    delete values.projectSearchPrefix;
    delete values.artistSearchPrefix;
    delete values.projectSearchValue;
    delete values.artistSearchValue;

    fetchSearch({
      pageNumber: 1,
      ...values,
      ...dropdownSelect,
    });
  };

  const fetchSearch = async (req: ProjectSearchModel.Request) => {
    setSearchReq(req);
    setTableLoading(true);

    try {
      const resp = await projectAPI.search(req);
      const rows = resp.data?.map(item => {
        const row: RecordType = {
          key: item.project.id,
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
    <AppLayout title='Projects'>
      <IApplication
        name='Projects'
        extra={[
          <Button
            key='add-project'
            type='primary'
            size='large'
            icon={<PlusOutlined />}
            onClick={() => setOpenDrawerAdd(true)}
          >
            New Project
          </Button>,
        ]}
      >
        <DrawerAdd
          open={openDrawerAdd}
          onClose={() => setOpenDrawerAdd(false)}
          onDone={(projectName, projectId) => {
            notification['success']({
              key: new Date().toString(),
              message: 'Project was created',
              description: (
                <div>
                  <span>Project: {projectName}</span>
                  <br />
                  <TextGrayStyle6 size='12px'>ID: {projectId}</TextGrayStyle6>
                </div>
              ),
            });
            setOpenDrawerAdd(false);
            fetchSearch({ ...searchReq, pageNumber: 1 });
          }}
        />
        <DrawerEdit
          projectId={editProjectId}
          onClose={() => setEditProjectId(undefined)}
          onDone={(projectName, updatedAt) => {
            notification['success']({
              key: new Date().toString(),
              message: 'Edit project success',
              description: (
                <div>
                  <span>Project: {projectName}</span>
                  <br />
                  <TextGrayStyle6 size='12px'>
                    Updated at: {dateFormat(updatedAt, 'dateTime')}
                  </TextGrayStyle6>
                </div>
              ),
            });
            setEditProjectId(undefined);
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
          onEdit={setEditProjectId}
        />
      </IApplication>
    </AppLayout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const props: CustomStaticPageProps = {
    protected: true,
    code: PAGE_CODE.PROJECTS,
    roles: ['ADMIN'],
  };

  return {
    props: props,
  };
};
