import { HttpErrorResponse } from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import { StateService } from '../../core/state.service';
import { SystemCpu } from '../../views/chartjs/models/system-cpu';
import { SystemHealth } from '../../views/chartjs/models/system-health';
import { navItems } from '../../_nav';
import { CpuMonitorService } from '../service/cpu-monitor.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit {
  public sidebarMinimized = false;
  public navItems = navItems;
  public systemCpu: SystemCpu;
  public systemHealth: SystemHealth;
  public processUpTime: string;
  constructor(private stateService: StateService) {}
  ngOnInit(): void {
    this.getCpuUsage();
    this.getSystemHealth();
    this.getProcessUpTime()
  }
  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
  private getCpuUsage() {
    this.stateService.getCpuMesurement().subscribe(
      (response: SystemCpu) => {
        this.systemCpu = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  private getSystemHealth() {
    this.stateService.getSystemHealth().subscribe(
      (response: SystemHealth) => {
        this.systemHealth = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  private getProcessUpTime() {
    this.stateService.getProcessUpTime().subscribe(
      (response: string) => {
        this.processUpTime = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}
