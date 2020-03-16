import { Component, Input, OnInit, 
  ViewEncapsulation } from '@angular/core';
import { TableWrapperColumn } from './table-wrapper-column.model';

@Component({
  selector: 'mat-table-wrapper',
  templateUrl: './table-wrapper.component.html',
  styleUrls: ['./table-wrapper.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TableWrapperComponent implements OnInit {

  @Input() name: string;
  @Input() columns: TableWrapperColumn[];

  constructor(
  ) {
  }
  

  ngOnInit() {
  }

  toggleColumnVisibility(column, event) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    column.visible = !column.visible;
  }
}
