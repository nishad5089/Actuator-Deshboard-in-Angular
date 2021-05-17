import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ConfirmationComponent } from "./confirmation/confirmation.component";
import { DemoMaterialModule } from "../material.module";

@NgModule({
  declarations: [ConfirmationComponent],
  imports: [CommonModule, DemoMaterialModule],
})
export class SharedModule {}
