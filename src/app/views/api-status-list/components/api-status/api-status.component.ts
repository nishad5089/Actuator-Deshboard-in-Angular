import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { DialogModel, MasterListComponent } from "../../../../core/master-list.component";
import { User } from "../../models/user";
import { MatDialog, MatSnackBar } from "@angular/material";
import { ApiStatusService } from "../../service/api-status.service";
import {
  ACTION_ADD_USER,
  ACTION_DELETE_USER,
  ACTION_EDIT_USER,
} from "../../../../constant/action-tag";
import { info_message } from "../../../../constant/messages";
import { StatusModalComponent } from "../status-modal/status-modal.component";
import { NgxSpinnerService } from "ngx-spinner";
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


@Component({
  selector: "app-api-status",
  templateUrl: "./api-status.component.html",
  styleUrls: ["./api-status.component.css"],
})
export class ApiStatusComponent extends MasterListComponent<User> implements OnInit
{

  resetVal: boolean;

  actionTagAddUser = ACTION_ADD_USER;
  actionTagEditUser = ACTION_EDIT_USER;
  actionTagDeleteUser = ACTION_DELETE_USER;

  users: User[];

  constructor(protected service: ApiStatusService,
    protected spinnerService: NgxSpinnerService,
    protected snackbar: MatSnackBar,
    protected deleteDialog: MatDialog
) {
    super(service, spinnerService, deleteDialog, snackbar);
    this.setFilter();
    this.settingsName = "User";
  }

  ngOnInit(): void {
    // this.service.getUserList().subscribe(
    //   (response: User[]) => {
    //     this.users = response;
    //     console.log(this.users);
    //   },
    //   (error: HttpErrorResponse) => {
    //     alert(error.message);
    //   }
    // );
    this.search();
    setTimeout(() => {}, 1000);
  }

  setTableDetails() {
    this.dto = new User();
    this.displayColumns = ['sl', 'username', 'firstName',  'lastName', 'age', 'actions'];
    this.addButtonTooltips = info_message.ADD_GUEST;
  }


  setFilter() {}

  setAddModal() {
    this.dialogAddComponent = StatusModalComponent;
    this.dialogAddModel = new DialogModel<User>();
    this.dialogAddModel.dto = new User();
    this.dialogAddModel.dialogTitle = 'Add New User';
  }

  setEditModal() {
    this.dialogEditComponent = StatusModalComponent;
    this.dialogEditModel = new DialogModel<User>();
    this.dialogEditModel.dialogTitle = 'Update User Information';
  }

  search() {
    this.resetVal = false;
    super.search();
  }
}
