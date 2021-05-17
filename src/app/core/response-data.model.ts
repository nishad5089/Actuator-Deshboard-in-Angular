export class ResponseDataModel<T> {
  status: number;
  message: string;
  errors: any;
  meta: any;
  data: T;
  timestamp: Date;
}
