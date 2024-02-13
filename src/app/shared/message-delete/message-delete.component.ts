import { Component, Inject } from '@angular/core';

import { MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-message-delete',
  templateUrl: './message-delete.component.html',
  styleUrl: './message-delete.component.css'
})
export class MessageDeleteComponent {
  constructor(@Inject(MatSnackBarRef) public snackBarRef: MatSnackBarRef<any>) {}
}
