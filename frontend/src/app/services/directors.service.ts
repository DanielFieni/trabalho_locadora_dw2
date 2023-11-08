import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Director } from '../models/director';

@Injectable({
  providedIn: 'root'
})
export class DirectorService {

  private readonly API = 'locadora/director';

  constructor( private httpClient: HttpClient ) { }


  list(): Observable<Director[]> {
    return this.httpClient.get<Director[]>(this.API);
  }

  delete(id: string) {
    return this.httpClient.delete<Director>(`${this.API}/${id}`);
  }

  getById(id: string) {
    return this.httpClient.get<Director>(`${this.API}/${id}`);
  }

  save(director: Partial<Director>) {
    if(director._id) {
      return this.update(director);
    }
    return this.create(director);
  }

  private update(director: Partial<Director>) {
    return this.httpClient.put<Director>(`${this.API}/${director._id}`, director);
  }

  private create(director: Partial<Director>) {
    return this.httpClient.post<Director>(this.API, director);
  }

}
