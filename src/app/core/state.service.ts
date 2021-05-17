import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { SystemCpu } from "../views/chartjs/models/system-cpu";
import { SystemHealth } from "../views/chartjs/models/system-health";

@Injectable({
  providedIn: "root",
})
export class StateService {
  private systemCpuSubject: BehaviorSubject<SystemCpu> = new BehaviorSubject(null);
  private systemHealthSubject: BehaviorSubject<SystemHealth> = new BehaviorSubject(null);
  private processUptimeSubject: BehaviorSubject<string> = new BehaviorSubject(null);
  // public systemCpu: Observable<SystemCpu>;

  public setCpuMesurement(systemCpu: SystemCpu) {
    this.systemCpuSubject.next(systemCpu);
  }
  public setSystemHealth(systemHealth: SystemHealth) {
    this.systemHealthSubject.next(systemHealth);
  }
  public setProcessUpTime(upTime: string) {
    this.processUptimeSubject.next(upTime);
  }
  public getCpuMesurement(): Observable<SystemCpu>{
    return this.systemCpuSubject.asObservable();
  }
  public getSystemHealth(): Observable<SystemHealth>{
    return this.systemHealthSubject.asObservable();
  }
  public getProcessUpTime(): Observable<string>{
    return this.processUptimeSubject.asObservable();
  }
}
