import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ApiStatusComponent } from "./components/api-status/api-status.component";
import { ApiStatusRoutingModule } from "./api-status-routing.module";
import { DemoMaterialModule } from "../../material.module";
import { SharedModule } from "../../shared/shared.module";
import { ConfirmationComponent } from "../../shared/confirmation/confirmation.component";
import { StatusModalComponent } from './components/status-modal/status-modal.component';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [ApiStatusComponent, StatusModalComponent],
  imports: [
    CommonModule,
    ApiStatusRoutingModule,
    FormsModule,
    DemoMaterialModule,
    ReactiveFormsModule,
    SharedModule,
    NgxSpinnerModule
  ],
  entryComponents: [ConfirmationComponent,StatusModalComponent],
  exports: [],
})
export class ApiStatusListModule {}
