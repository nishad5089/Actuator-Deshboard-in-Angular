import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SystemCpu } from "../models/system-cpu";
import { SystemHealth } from "../models/system-health";

@Injectable({
  providedIn: "root",
})
export class MonitorService {
  constructor(private _http: HttpClient) {}
  public getHttpTrace(): Observable<any> {
    return this._http.get("http://localhost:8081/actuator/httptrace");
  }
  public getSystemHealth(): Observable<SystemHealth> {
    return this._http.get<SystemHealth>("http://localhost:8081/actuator/health");
  }
  public getSystemCpu(): Observable<SystemCpu> {
    return this._http.get<SystemCpu>("http://localhost:8081/actuator/metrics/system.cpu.count");
  }
  public getProcessUptime(): Observable<any> {
    return this._http.get("http://localhost:8081/actuator/metrics/process.uptime");
  }
}
