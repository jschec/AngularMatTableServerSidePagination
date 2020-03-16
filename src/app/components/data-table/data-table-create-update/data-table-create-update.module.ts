import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableCreateUpdateComponent } from './data-table-create-update.component';
import { DialogMaterialModule } from '../../../core/dailogs/dialog-material.module';

@NgModule({
  imports: [
    CommonModule,
    DialogMaterialModule
  ],
  declarations: [DataTableCreateUpdateComponent],
  entryComponents: [DataTableCreateUpdateComponent],
  exports: [DataTableCreateUpdateComponent]
})
export class DataTableCreateUpdateModule { }