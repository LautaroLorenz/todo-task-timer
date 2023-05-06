import { Observable } from "rxjs";
import { Entity } from "../../entity/entity.model";
import { HttpClient } from '@angular/common/http';


export abstract class CrudServiceAbstract<T> {
  private readonly apiUrl = 'http://localhost:3000/';
  private baseUrl: string;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly entity: Entity,
  ) {
    this.baseUrl = this.apiUrl.concat(this.entity.plural);
  }

  getOne(id: number): Observable<T> {
    const endpoint = this.baseUrl.concat('/').concat(id.toString());
    return this.httpClient.get<T>(endpoint);
  }

  getAll(): Observable<T[]> {
    const endpoint = this.baseUrl;
    return this.httpClient.get<T[]>(endpoint);
  }

  putOne(id: number, item: T): Observable<T> {
    const endpoint = this.baseUrl.concat('/').concat(id.toString());
    return this.httpClient.put<T>(endpoint, item);
  }

  postOne(item: T): Observable<T> {
    const endpoint = this.baseUrl;
    return this.httpClient.post<T>(endpoint, item);
  }
}