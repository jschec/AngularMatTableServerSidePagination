import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChildTableComponent } from './data-table.component';
import { FormsModule } from '@angular/forms';
import { TableWrapperModule } from 'src/app/core/list/table-wrapper.module';
import { DataTableCreateUpdateModule } from './data-table-create-update/data-table-create-update.module';
import { PaginatorService } from 'src/app/services/paginator.service';
import { DataTableDataService } from "../../services/data-table.service";
import { SortService } from 'src/app/services/sort.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TableWrapperModule,
    DataTableCreateUpdateModule
  ],
  declarations: [ChildTableComponent],
  exports: [ChildTableComponent],
  providers: [
    PaginatorService,
    SortService,
    DataTableDataService
  ]
})
export class DataTableModule { }
