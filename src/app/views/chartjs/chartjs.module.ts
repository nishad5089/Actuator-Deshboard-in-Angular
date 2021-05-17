import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { DemoMaterialModule } from '../../material.module';

import { ChartJSRoutingModule } from './chartjs-routing.module';
import { DeshboardComponent } from './components/deshboard/deshboard.component';
import { MonitorService } from './service/monitor-service.service';
import { DetailsModalComponent } from './components/details-modal/details-modal.component';
import { RequestComponent } from './components/details-modal/components/request/request.component';
import { ResponseComponent } from './components/details-modal/components/response/response.component';

@NgModule({
  imports: [
    ChartJSRoutingModule,
    DemoMaterialModule,
    ChartsModule,
    CommonModule
  ],
  entryComponents:[DetailsModalComponent],
  declarations: [ DeshboardComponent, DetailsModalComponent, RequestComponent, ResponseComponent ]
})
export class ChartJSModule { }
