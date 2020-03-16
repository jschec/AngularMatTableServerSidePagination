import { Component, Input, OnDestroy, OnInit, ViewChild, 
  ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSort, SortDirection} from '@angular/material/sort';
import { TableWrapperColumn } from '../../core/list/table-wrapper-column.model';
import { ListDatabase } from '../../core/list/database';
import { DataTableCreateUpdateComponent } from './data-table-create-update/data-table-create-update.component';
import { filter, takeUntil, take, switchMap } from 'rxjs/operators';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { IPatient, patientRecord } from "../../models/patient.model";
import { DataTableDataService } from "../../services/data-table.service";
import { ConfirmDialogComponent } from "../../core/dailogs/confirm-dialog/confirm-dialog.component";
import { PaginatorService } from '../../services/paginator.service';
import { ListServerSidePag } from '../../core/list/serverside-pag.interface';
import { ListDataSourceServerSidePag } from '../../core/list/datasource-serverside-pag';
import { SnackbarService } from '../../services/snackbar.service';
import { SortService } from '../../services/sort.service';

@Component({
  selector: 'data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildTableComponent implements ListServerSidePag<IPatient>, OnInit, OnDestroy {

  isLoading = true;
  subject$: ReplaySubject<patientRecord> = new ReplaySubject<patientRecord>(1);
  data$: Observable<patientRecord>;

  private onDestroy$: Subject<void> = new Subject<void>();

  defaultSortCol: string = 'dateAdded';
  defaultSortDir: SortDirection = 'desc';  

  constructor(
    private dialog: MatDialog,
    private snackBar: SnackbarService,
    private cd: ChangeDetectorRef,
    public paginationService: PaginatorService,
    public sortService: SortService,
    private dataService: DataTableDataService
    ) { }
  
  @Input()
  columns: TableWrapperColumn[] = [
    {name: 'Id', property: 'id', visible: false, isModelProperty: true},
    {name: 'First Name', property: 'firstName', visible: true, isModelProperty: true},
    {name: 'Last Name', property: 'lastName', visible: true, isModelProperty: true},
    {name: 'Date of Birth', property: 'dateOfBirth', visible: true, isModelProperty: true},
    {name: 'Date Added', property: 'dateAdded', visible: true, isModelProperty: true},
    {name: 'Actions', property: 'actions', visible: true},
  ] as TableWrapperColumn[];
  pageSize: number | undefined = this.paginationService.pageSize;
  pageSizeOptions: number[] | undefined = this.paginationService.selectedItemsPerPage;

  resultsLength: number | undefined;
  dataSource: ListDataSourceServerSidePag<IPatient> | null;
  database: ListDatabase<IPatient>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  resetPaginatior() {
    this.paginationService.reset();
    this.paginator.firstPage();
  }

  initalizeSort() {
    this.sortService.defaultColumn = this.defaultSortCol;
    this.sortService.defaultDirection = this.defaultSortDir;
    this.sortService.change({active: '', direction: ''});
  }

  sortEvent(event) {
    this.sortService.change(event);
    this.resetPaginatior();
    this.dataService.getRecords(this.paginationService.dbPage, 
      this.paginationService.pageSize, this.sortService.activeColumn, this.sortService.activeDirection).pipe(
      take(1)
    ).subscribe((records: patientRecord) =>{
      this.subject$.next(records);
    });
  }

  onPageSwitch(event) {
    this.paginationService.change(event);
    this.dataService.getRecords(this.paginationService.dbPage, 
      this.paginationService.pageSize, this.sortService.activeColumn, this.sortService.activeDirection).pipe(
      take(1)
    ).subscribe((records: patientRecord) =>{
      this.subject$.next(records);
    });
  }

  ngOnInit() {
    this.initalizeSort();
    this.resetPaginatior();
    this.dataService.getRecords(this.paginationService.dbPage, 
      this.paginationService.pageSize, this.sortService.activeColumn, this.sortService.activeDirection).pipe(
      take(1)
    ).subscribe((records: patientRecord)=>{
      this.subject$.next(records);
    });
    this.data$ = this.subject$.asObservable();
    this.database = new ListDatabase<IPatient>();
    this.data$.pipe(
      takeUntil(this.onDestroy$),
      filter(Boolean)
    ).subscribe((fetched_data: patientRecord) => {
      this.database.dataChange.next(fetched_data.items);
      this.resultsLength = fetched_data.totalCount;
      this.isLoading = false;
      this.cd.detectChanges();
    });
    this.dataSource = new ListDataSourceServerSidePag<IPatient>(this.database, this.paginator, this.columns);
  }

  createRecord() {
    this.dialog.open(DataTableCreateUpdateComponent).afterClosed().pipe(
      take(1)
    ).subscribe((record: IPatient) => {
      if (record) {
        this.dataService.addRecord(record).pipe(
          take(1),
          switchMap( data => {
            return this.dataService.getRecords(this.paginationService.dbPage, 
              this.paginationService.pageSize, this.sortService.activeColumn, this.sortService.activeDirection);
          })
        )
        .subscribe(total_record_set =>{
          this.subject$.next(total_record_set);
          this.snackBar.postMessage("Patient Created");
        });
      }
    });
  }

  updateRecord(patient) {
    this.dialog.open(DataTableCreateUpdateComponent, {
      data: patient
    }).afterClosed().pipe(
      take(1)
    ).subscribe((record: IPatient) => {
      if (record) {
        this.dataService.updateRecord(patient.id, record).pipe(
          take(1),
          switchMap( data => {
            return this.dataService.getRecords(this.paginationService.dbPage, 
              this.paginationService.pageSize, this.sortService.activeColumn, this.sortService.activeDirection);
          }) 
        ).subscribe(total_record_set=>{
          this.subject$.next(total_record_set);
          this.snackBar.postMessage('Record Updated');
        });
      }
    });
  }

  deleteRecord(record: IPatient) {
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: 'Are you sure you want to delete?',
        button_text: {
          ok: 'Delete',
          cancel: 'Cancel'
        }
      }
    }).afterClosed().pipe(
      take(1)
    ).subscribe((resp: boolean) => {
      if (resp) {
        this.dataService.deleteRecord(record.id).pipe(
          take(1),
          switchMap( data => {
            return this.dataService.getRecords(this.paginationService.dbPage, 
              this.paginationService.pageSize, this.sortService.activeColumn, this.sortService.activeDirection);
          }) 
        ).subscribe(total_record_set=> {
          this.subject$.next(total_record_set);
          this.snackBar.postMessage('Record Deleted');
        });
      }
    });
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
  }
}
