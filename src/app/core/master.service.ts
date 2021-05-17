import {MasterModel} from './master.model';
import {CklServiceInterface} from './ckl-service-interface';
import {HttpClient} from '@angular/common/http';
import {environment, IS_LIVE} from '../../environments/environment';
import {ResponseDataModel} from './response-data.model';
import {Observable} from 'rxjs';
import {PageableModel} from './pageable.model';


export const END_POINT_SEARCH = 'get-list';
export const END_POINT_GET_ONE = 'get';
export const END_POINT_GET_SELECTED = 'get-selected';
export const END_POINT_CREATE = 'create';
export const END_POINT_CREATE_ALL = 'create-all';
export const END_POINT_UPDATE = 'update';
export const END_POINT_UPDATE_ALL = 'update-all';
export const END_POINT_DELETE = 'delete';
export const END_POINT_DELETE_ALL = 'delete-all';
export const END_POINT_AUTOCOMPLETE = 'autocomplete';

export abstract class MasterService<T extends MasterModel> implements CklServiceInterface<T> {

  protected constructor(public http: HttpClient,
                        public serviceName: string,
                        public path: string) {
  }

  static getServiceURLFromConfig(serviceName: string): string {
    let gateway_url = environment.GATEWAY_URL;
    if (IS_LIVE) {
      gateway_url += '/' + serviceName;
    }
    return gateway_url + '/' + serviceName;
  }

  abstract isValid(dto: T[]);

  getAll(dto: T): T[] {
    return [];
  }

  create(dto: T): Observable<ResponseDataModel<T>> {
    console.log('create '+ dto);

    this.isValid([dto]); // if not throw exception
    return this.http.post<ResponseDataModel<T>>(this.getUrl() + END_POINT_CREATE, dto);
  }

  createAll(dto: T[]): Observable<ResponseDataModel<T[]>> {
    this.isValid(dto); // if not throw exception
    return this.http.post<ResponseDataModel<T[]>>(this.getUrl() + END_POINT_CREATE_ALL, dto);
  }

  getUrl(): string {
    return MasterService.getServiceURLFromConfig(this.serviceName) + this.path + '/';
  }

  // tslint:disable-next-line:max-line-length
  public search(size: number = 50, page: number = 0, sort: string = 'createdOn,desc'): Observable<ResponseDataModel<PageableModel<T>>> {
    return this.http.get<ResponseDataModel<PageableModel<T>>>(
      this.getUrl() + END_POINT_SEARCH + `?size=${size}&page=${page}&sort=${sort}`);
  }

  public getOne(dto: T): Observable<ResponseDataModel<T>> {
    return this.http.post<ResponseDataModel<T>>(
      this.getUrl() + END_POINT_GET_ONE,
      dto);
  }

  public getSelected(ids: string[]): Observable<ResponseDataModel<T[]>> {
    return this.http.post<ResponseDataModel<T[]>>(
      this.getUrl() + END_POINT_GET_SELECTED,
     ids);
  }

  public update(dto: T): Observable<ResponseDataModel<T>> {
    return this.http.put<ResponseDataModel<T>>(
      this.getUrl() + END_POINT_UPDATE +'/'+ dto.id,
      dto);
  }

  public updateAll(dto: T[]): Observable<ResponseDataModel<T>> {
    return this.http.post<ResponseDataModel<T>>(
      this.getUrl() + END_POINT_UPDATE_ALL,
      dto);
  }

  public delete(dto: T): Observable<boolean> {
    return this.http.delete<boolean>(
      this.getUrl() + END_POINT_DELETE+'/'+ dto.id);
  }

  public deleteAll(ids: string[]): Observable<ResponseDataModel<T>> {
    return this.http.post<ResponseDataModel<T>>(
      this.getUrl() + END_POINT_DELETE_ALL,
      ids);
  }

  public employeeSettingsAutoComplete(dto: T): Observable<ResponseDataModel<T[]>> {
    return this.http.post<ResponseDataModel<T[]>>(
      this.getUrl() + END_POINT_AUTOCOMPLETE,
      dto);
  }

}
