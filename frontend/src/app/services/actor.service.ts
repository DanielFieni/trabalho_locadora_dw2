import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Actor } from '../models/actor';

@Injectable({
  providedIn: 'root'
})
export class ActorService {

  private readonly API = "locadora/actor";

  constructor(private httpClient: HttpClient) {}

  list(): Observable<Actor[]> {
    return this.httpClient.get<Actor[]>(this.API);
  }

  save(actor: Partial<Actor>) {

    if(actor._id) {
      return this.update(actor);
    }

    return this.create(actor);
  }

  getById(id: string) {
    return this.httpClient.get<Actor>(`${this.API}/${id}`);
  }

  delete(id: string) {
    return this.httpClient.delete <Actor>(`${this.API}/${id}`);
  }

  private create(actor: Partial<Actor>) {
    return this.httpClient.post<Actor>(this.API, actor);
  }

  private update(actor: Partial<Actor>) {
    return this.httpClient.put<Actor>(`${this.API}/${actor._id}`, actor);
  }

}
