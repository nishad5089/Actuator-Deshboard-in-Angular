import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  templateUrl: './confirmation.component.html',
})

export class ConfirmationComponent {
  constructor(public dialogRef: MatDialogRef<ConfirmationComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {value: string, message: string}) {
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
