import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styleUrl: './dialog-confirm.component.css'
})
export class DialogConfirmComponent {
  
  constructor(private dialogRef: MatDialogRef<DialogConfirmComponent>) {}
  
  reloadPage() {
    this.dialogRef.close();
    location.reload();
  }
}
