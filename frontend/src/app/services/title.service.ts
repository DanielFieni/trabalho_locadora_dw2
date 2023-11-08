import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Title } from '../models/title';

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  private readonly API = 'locadora/title'

  constructor(private httpClient: HttpClient) { }

  list(): Observable<Title[]> {
    return this.httpClient.get<Title[]>(this.API);
  }

  delete(id: string) {
    return this.httpClient.delete<Title>(`${this.API}/${id}`);
  }

  getById(id: string) {
    return this.httpClient.get<Title>(`${this.API}/${id}`);
  }

  save(title: Partial<Title>) {
    if(title._id) {
      return this.update(title);
    }
    return this.create(title);
  }

  private update(title: Partial<Title>) {
    return this.httpClient.put<Title>(`${this.API}/${title._id}`, title);
  }

  private create(title: Partial<Title>) {
    return this.httpClient.post(this.API, title);
  }

}
