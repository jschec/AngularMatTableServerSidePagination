import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IPatient } from '../../../models/patient.model';
import {DateAdapter, MAT_DATE_FORMATS} from '@angular/material/core';
import { APP_DATE_FORMATS } from '../../../core/utilities/format-datepicker';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import * as _moment from 'moment';

@Component({
  selector: 'data-table-create-update',
  templateUrl: './data-table-create-update.component.html',
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter},
    {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}
  ]
})
export class DataTableCreateUpdateComponent implements OnInit {
  form: FormGroup;
  mode: 'create' | 'update' = 'create';

  constructor(@Inject(MAT_DIALOG_DATA) public defaults: any,
              private dialogRef: MatDialogRef<DataTableCreateUpdateComponent>,
              private fb: FormBuilder
              ) {
  }

  ngOnInit() {
    if (this.defaults) {
      this.mode = 'update';
    } else {
      this.defaults = {} as IPatient;
    }
    this.form = this.fb.group({
      firstName: [this.defaults.firstName || null, [Validators.required, Validators.maxLength(50)] ],
      lastName: [this.defaults.lastName || null, [Validators.required, Validators.maxLength(50)] ],
      dateOfBirth: [this.defaults.dateOfBirth || null, [Validators.required]],
    });
  }

  save() {
    if (this.mode === 'create') {
      this.createRecord();
    } else if (this.mode === 'update') {
      this.updateRecord();
    }
  }

  createRecord() {
    const record = this.form.value;
    this.dialogRef.close(record);
  }
 
  updateRecord() {
    const record = this.form.value;
    record.id = this.defaults.id;
    this.dialogRef.close(record);
  }

  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }
}
