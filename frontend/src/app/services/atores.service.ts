import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ator } from '../models/ator';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AtoresService {

  private readonly API = "locadora/ator";

  constructor(private httpClient: HttpClient) {}

  list(): Observable<Ator[]> {
    return this.httpClient.get<Ator[]>(this.API);
  }

  save(ator: Partial<Ator>) {

    if(ator._id) {
      return this.update(ator);
    }

    return this.create(ator);
  }

  getById(id: string) {
    return this.httpClient.get<Ator>(`${this.API}/${id}`);
  }

  delete(id: string) {
    return this.httpClient.delete <Ator>(`${this.API}/${id}`);
  }

  private create(ator: Partial<Ator>) {
    return this.httpClient.post<Ator>(this.API, ator);
  }

  private update(ator: Partial<Ator>) {
    return this.httpClient.put<Ator>(`${this.API}/${ator._id}`, ator);
  }

}
