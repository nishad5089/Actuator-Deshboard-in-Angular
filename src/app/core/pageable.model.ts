export class PageableModel<T> {
  content: T[];
  pageable: any;
  last: boolean;
  totalPages: number;
  totalElements: number;
  sort: string;
  numberOfElements: number;
  first: boolean;
  size: number;
  number: number;
  empty: boolean;
}
