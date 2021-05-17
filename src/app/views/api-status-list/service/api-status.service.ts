import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { Observable } from "rxjs";
import { User } from "../models/user";
import { MasterService } from "../../../core/master.service";
import { service_name } from "../../../constant/service-name.properties";
import { users_paths } from "../../../constant/service-path.properties";
import { ResponseDataModel } from "../../../core/response-data.model";
import { PageableModel } from "../../../core/pageable.model";

@Injectable({
  providedIn: "root",
})
export class ApiStatusService extends MasterService<User>{
  END_POINT_AUTOCOMPLETE = 'autocomplete';

  protected constructor(public http: HttpClient) {
    super(http, service_name.SERVICE_USER, users_paths.USERS);
    // super(http, ':8505', '/guests');
  }

  autoComplete(dto: User): Observable<ResponseDataModel<PageableModel<User>>> {
    return this.http.post<ResponseDataModel<PageableModel<User>>>(
      this.getUrl() + this.END_POINT_AUTOCOMPLETE,
      dto
    );
  }

  isValid(dto: User[]): boolean {
    return false;
  }

  public getUserList(): Observable<User[]> {
    return this.http.get<User[]>("http://localhost:8081/api/users/list");
  }
}
