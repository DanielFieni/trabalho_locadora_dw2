import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Classe } from '../models/classe';

@Injectable({
  providedIn: 'root'
})
export class ClasseService {

  private readonly API = 'locadora/classe'

  constructor(private httpClient: HttpClient) {}

  list() {
    return this.httpClient.get(this.API);
  }

  delete(id: string) {
    return this.httpClient.delete(`${this.API}/${id}`);
  }

  save(classe: Partial<Classe>) {
    if(classe._id) {
      return this.update(classe);
    }
    return this.create(classe)
  }

  getById(id: string) {
    return this.httpClient.get<Classe>(`${this.API}/${id}`);
  }

  private update(classe: Partial<Classe>) {
    return this.httpClient.put<Classe>(`${this.API}/${classe._id}`, classe);
  }

  private create(classe: Partial<Classe>) {
    return this.httpClient.post<Classe>(this.API, classe);
  }

}
