import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SystemCpu } from "../../views/chartjs/models/system-cpu";
import { SystemHealth } from "../../views/chartjs/models/system-health";


@Injectable({
  providedIn: "root",
})
export class CpuMonitorService {
  constructor(private _http: HttpClient) {}

  public getSystemHealth(): Observable<SystemHealth> {
    return this._http.get<SystemHealth>("http://localhost:8081/actuator/health");
  }
  public getSystemCpu(): Observable<SystemCpu> {
    return this._http.get<SystemCpu>("http://localhost:8081/actuator/metrics/system.cpu.count");
  }
  public getProcessUpTime(): Observable<any> {
    return this._http.get("http://localhost:8081/actuator/metrics/process.uptime");
  }
}
