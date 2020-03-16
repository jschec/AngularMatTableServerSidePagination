import { Observable } from 'rxjs';
import { ListDataSourceServerSidePag } from './datasource-serverside-pag';
import { ListDatabase } from './database';
import { TableWrapperColumn } from './table-wrapper-column.model';
import { SortDirection } from '@angular/material/sort';

export interface ListServerSidePag<T> {
  data$: Observable<{totalCount: number, pageIndex: number, totalPages: number, items: T[], hasPreviousPage: boolean, hasNextPage: boolean}>;
  columns: TableWrapperColumn[];
  pageSize: number;
  pageSizeOptions: number[];
  resultsLength: number;
  dataSource: ListDataSourceServerSidePag<T> | null;
  database: ListDatabase<T>;
  defaultSortCol: string;
  defaultSortDir: SortDirection;
}
