import { DataSource } from '@angular/cdk/collections';
import { ListDatabase } from './database';
import { MatPaginator } from '@angular/material/paginator';
import { TableWrapperColumn } from './table-wrapper-column.model';
import { merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Data source to provide what data should be rendered. In this case
 * nothing is really changed and all of the power is given to the
 * database and queries which handles what this table will render
 */
export class ListDataSourceServerSidePag<T> extends DataSource<any> {
  _properties: string[];

  constructor(protected _listDatabase: ListDatabase<T>, protected _paginator: MatPaginator, protected _columns: TableWrapperColumn[]) {
    super();
    this._properties = this._columns.filter(column => column.isModelProperty).map(column => column.property);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<T[]> {
    const displayDataChanges = [
      this._listDatabase.dataChange,
      this._paginator.page
    ];

    return merge(...displayDataChanges).pipe(
      map(() => this._listDatabase.data)
    );
  }

  disconnect() {
  }
}
