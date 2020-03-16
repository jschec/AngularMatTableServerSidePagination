import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'confirm-dialog',
  templateUrl: './confirm-dialog.component.html'
})
export class ConfirmDialogComponent {
  message: string = "Are you sure?";
  confirm_button_text: string = "Yes";
  cancel_button_text: string = "Cancel";

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<ConfirmDialogComponent>) {
    if (data) {
      this.message = data.message || this.message;
      if (data.button_text) {
        this.confirm_button_text = data.button_text.ok || this.confirm_button_text;
        this.cancel_button_text = data.button_text.cancel || this.cancel_button_text;
      }
    }
  }

  onConfirm(): void {
    // Confirm button on click returns true
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    // Cancel button on click returns false
    this.dialogRef.close(false);
  }
}
