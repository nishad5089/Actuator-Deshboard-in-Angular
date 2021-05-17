import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef,MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MAT_DIALOG_DATA } from '@angular/material';
import { environment } from '../../../../../environments/environment';
import { DialogModel } from '../../../../core/master-list.component';
import { User } from '../../models/user';
import * as _ from 'lodash';

@Component({
  selector: 'app-status-modal',
  templateUrl: './status-modal.component.html',
  styleUrls: ['./status-modal.component.css']
})
export class StatusModalComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  user = new User();
  constructor(
    public dialogRef: MatDialogRef<StatusModalComponent>,
    protected snackbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: DialogModel<User>) {
    environment.IS_MODAL_OPEN = true;
  }

  ngOnInit(): void {
    this.user = _.cloneDeep(this.data.dto);
  }
  checkValidity(): boolean {
    return (!!this.user.username && !!this.user.firstName && !!this.user.lastName && !!this.user.age);
  }
  validateAndSave() {
    if (this.user.username === undefined || this.user.username.trim().length === 0) {
      this.snackbar.open('Enter user name','Ex: Nishad',{
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      })._dismissAfter(3000);
      return;
    }
    if (this.user.firstName === undefined || this.user.firstName.trim().length === 0) {
      this.snackbar.open('Enter First Name','Ex: Abdur Rahim',{
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      })._dismissAfter(3000);
      return;
    }
    environment.IS_MODAL_OPEN = false;
    this.dialogRef.close(this.user);
  }
  closeModal(){
    environment.IS_MODAL_OPEN = false;
    this.dialogRef.close();
  }
}
