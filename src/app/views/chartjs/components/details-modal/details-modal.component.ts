import { Component, Inject, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-details-modal",
  templateUrl: "./details-modal.component.html",
  styleUrls: ["./details-modal.component.css"],
})
export class DetailsModalComponent implements OnInit {
  public trace: any;
  constructor(
    public dialogRef: MatDialogRef<DetailsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    protected dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.trace = this.data;
  }

  closeModal() {
    this.dialogRef.close();
  }
}
