// import { User } from "./base/user";

import { FILE_EXTENSION } from '@constants/constants';
import { PAGE_CODE } from '@constants/pageCode';
import { ColProps } from 'antd';
import { Rule } from 'antd/es/form';
import { TablePaginationConfig } from 'antd/lib/table/interface';
import { UploadListType } from 'antd/lib/upload/interface';
export interface CustomStaticPageProps {
  protected: boolean;
  code: PAGE_CODE;
  roles: string[];
}

export interface Limit {
  pageNumber: number;
  pageSize: number;
}

export interface Sort {
  sortBy: string;
  sortDirection: string;
}

export interface Pagination {
  pageNumber: number;
  pageSize: number;
  total?: number;
  totalPages?: number;
}

export interface ITablePagination extends TablePaginationConfig, Pagination {}

export interface BaseSearchQuery {
  status?: string;

  createdBy?: Date;
  createdAt?: string;
  updatedBy?: Date;
  updatedAt?: Date;

  createdAtFrom?: Date | string;
  createdAtTo?: Date | string;
  updatedAtFrom?: Date | string;
  updatedAtTo?: Date | string;

  pageNumber?: number;
  pageSize?: number;
  sortBy?: string;
  sortDirection?: string;
}

export interface AuthData {
  roles: string[];
  token: AuthDataToken;
  userInfo: AuthDataUserInfo;
}

export interface AuthDataUserInfo {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
}

export interface AuthDataToken {
  accessToken: string;
  refreshToken: string;
}

export interface TreeSelectData {
  value: string;
  label: string;
  children: TreeSelectData[];
}

export interface CascaderData {
  value: string;
  label: string;
  children: CascaderData[];
}
export interface LabelValue {
  label: ReactNode;
  value: ReactNode;
}

export interface FormItemSchema {
  formItemProps: {
    name: NamePath;
    label?: string;
    noStyle?: boolean;
    rules?: Rule[];
    valuePropName?: 'checked' | string;
  };
  inputProps?: {
    placeholder: string | undefined;
  };
  colProps?: ColProps;
  draggerFormProps?: {
    required: boolean;
    listType: UploadListType;
    maxFileMBSize: number;
    maxCount: number;
    accept: FILE_EXTENSION[];
  };
  // debounceSelect? : {}
}

export interface TableOnChange {
  pagination: {
    pageNumber?: number;
    pageSize?: number;
  };
  // filters:// TODO implement
  sorter?: {
    sortBy?: string;
    sortDirection?: 'ASC' | 'DESC';
  };
}
