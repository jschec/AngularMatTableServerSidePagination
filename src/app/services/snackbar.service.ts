import { Injectable } from '@angular/core';
import {
    MatSnackBar,
    MatSnackBarConfig,
    MatSnackBarHorizontalPosition,
    MatSnackBarVerticalPosition
} from '@angular/material/snack-bar';

@Injectable()
export class SnackbarService {
    private action: boolean = true;
    private setAutoHide: boolean = true;
    private autoHide: number = 3000;
    private horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    private verticalPosition: MatSnackBarVerticalPosition = 'bottom';

    constructor(public snackBar: MatSnackBar) {}

    setHideInterval(interval: number) {
        this.autoHide = interval;
    }

    setHorizontalPosition(position: MatSnackBarHorizontalPosition) {
        this.horizontalPosition = position;
    }

    setVerticalPosition(position: MatSnackBarVerticalPosition) {
        this.verticalPosition = position;
    }

    postMessage(message: string) {
        let config = new MatSnackBarConfig();
        config.verticalPosition = this.verticalPosition;
        config.horizontalPosition = this.horizontalPosition;
        config.duration = this.setAutoHide ? this.autoHide : 0;
        this.snackBar.open(message, this.action ? "close" : undefined, config);
      }
}
  