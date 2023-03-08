import { TextGrayStyle6 } from '@components/IStyleComponent';
import { Col, Row, Table, TablePaginationConfig, TableProps } from 'antd';
import { FilterValue, TableCurrentDataSource } from 'antd/lib/table/interface';
import { ITablePagination, TableOnChange } from 'interfaces/common';
import React from 'react';

export interface ITableProps<RecordType> extends TableProps<RecordType> {
  hideTotal?: boolean;
  pagination?: ITablePagination;
  extra?: React.ReactNode[];
  onChangeTable: (value: TableOnChange) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ITable<RecordType extends object = any>(
  props: ITableProps<RecordType>,
) {
  const { hideTotal, pagination, extra, onChangeTable } = props;

  const onChange = (
    pagination: TablePaginationConfig,
    _filters: Record<string, FilterValue | null>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sorter: any,
    _extra: TableCurrentDataSource<RecordType>,
  ) => {
    const value: TableOnChange = {
      pagination: {
        pageNumber: pagination.current,
        pageSize: pagination.pageSize,
      },
      sorter: {
        sortBy: sorter?.field,
        sortDirection: sorter.order ? sorter.order.slice(0, -3) : undefined,
      },
      // filters: filters, // TODO implement
      // extra: extra,
    };

    onChangeTable && onChangeTable(value);
  };

  return (
    <div>
      <Row justify='space-between' align='middle'>
        <Col>
          {!hideTotal && (
            <TextGrayStyle6>ทั้งหมด {pagination?.total}</TextGrayStyle6>
          )}
        </Col>
        <Col>{extra}</Col>
      </Row>
      <br />
      <Table {...props} pagination={pagination} onChange={onChange} />
    </div>
  );
}
