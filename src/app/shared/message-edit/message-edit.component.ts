import { Component, Inject } from '@angular/core';

import { MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrl: './message-edit.component.css'
})
export class MessageEditComponent {
  constructor(@Inject(MatSnackBarRef) public snackBarRef: MatSnackBarRef<any>) {}
}
