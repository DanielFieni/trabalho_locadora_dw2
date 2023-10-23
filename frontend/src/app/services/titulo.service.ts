import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Titulo } from '../models/titulo';

@Injectable({
  providedIn: 'root'
})
export class TituloService {

  private readonly API = 'locadora/title'

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get(this.API);
  }

  delete(id: string) {
    return this.httpClient.delete<Titulo>(`${this.API}/${id}`);
  }

  getById(id: string) {
    return this.httpClient.get<Titulo>(`${this.API}/${id}`);
  }

  save(titulo: Partial<Titulo>) {
    if(titulo._id) {
      return this.update(titulo);
    }
    return this.create(titulo);
  }

  private update(titulo: Partial<Titulo>) {
    return this.httpClient.put<Titulo>(`${this.API}/${titulo._id}`, titulo);
  }

  private create(titulo: Partial<Titulo>) {
    return this.httpClient.post(this.API, titulo);
  }

}
