import { USER_ROLES_TYPE } from '@app/resources/user/types';

export declare interface IHttpResponse<TData = any> {
  status: number;
  message: string[] | string;
  data: TData;
}

export declare interface IQueryResponse<TData> {
  totalPages: number;
  totalRecords: number;
  totalRecordsPerPage: number;
  currentPage: number;
  data: TData[];
}

export declare type IQuery<T = any> = T & {
  limit: number;
  search_value: string | null;
  page: number;
  sort_by: keyof T;
  order_by: -1 | 1 | 'asc' | 'ascending' | 'desc' | 'descending';
  role: USER_ROLES_TYPE;
  status: string;
  startDate?: string;
  endDate?: string;
};
