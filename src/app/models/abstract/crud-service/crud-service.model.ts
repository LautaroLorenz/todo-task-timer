import { Observable, from, switchMap } from "rxjs";
import { Entity } from "../../entity/entity.model";


export abstract class CrudServiceAbstract<T> {
  private readonly apiUrl = 'https://jsonplaceholder.typicode.com/';
  private baseUrl: string;

  constructor(private readonly entity: Entity) {
    this.baseUrl = this.apiUrl.concat(this.entity.plural);
  }

  getOne(id: number): Observable<T> {
    const endpoint = this.baseUrl.concat('/').concat(id.toString());
    return from(fetch(endpoint)).pipe(
      switchMap(response => response.json()),
    );
  }

  getAll(): Observable<T[]> {
    const endpoint = this.baseUrl;
    return from(fetch(endpoint)).pipe(
      switchMap(response => response.json()),
    );
  }

  putOne(id: number, item: T): Observable<T> {
    const endpoint = this.baseUrl.concat('/').concat(id.toString());
    return from(fetch(endpoint, {
      method: 'PUT',
      body: JSON.stringify(item),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })).pipe(
      switchMap(response => response.json()),
    );
  }

  postOne(item: T): Observable<T> {
    const endpoint = this.baseUrl;
    return from(fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify(item),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })).pipe(
      switchMap(response => response.json()),
    );
  }
}