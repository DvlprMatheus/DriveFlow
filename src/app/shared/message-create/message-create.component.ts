import { Component, Inject } from '@angular/core';

import { MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-message-create',
  templateUrl: './message-create.component.html',
  styleUrl: './message-create.component.css'
})
export class MessageCreateComponent {
  constructor(@Inject(MatSnackBarRef) public snackBarRef: MatSnackBarRef<any>) {}
}
