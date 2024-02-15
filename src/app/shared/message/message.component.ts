import { Component, Inject } from '@angular/core';
import { MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent {
  message?: string;

  constructor(@Inject(MatSnackBarRef) public snackBarRef: MatSnackBarRef<any>) {}

  dismiss() {
    this.snackBarRef.dismiss();
  }
}