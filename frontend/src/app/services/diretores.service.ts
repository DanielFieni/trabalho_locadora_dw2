import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Diretor } from '../models/diretor';

@Injectable({
  providedIn: 'root'
})
export class DiretoresService {

  private readonly API = 'locadora/diretor';

  constructor( private httpClient: HttpClient ) { }


  list() {
    return this.httpClient.get(this.API);
  }

  delete(id: string) {
    console.log(id)
    return this.httpClient.delete<Diretor>(`${this.API}/${id}`);
  }

  getById(id: string) {
    return this.httpClient.get<Diretor>(`${this.API}/${id}`);
  }

  save(diretor: Partial<Diretor>) {
    if(diretor._id) {
      return this.update(diretor);
    }
    return this.create(diretor);
  }

  private update(diretor: Partial<Diretor>) {
    return this.httpClient.put<Diretor>(`${this.API}/${diretor._id}`, diretor);
  }

  private create(diretor: Partial<Diretor>) {
    return this.httpClient.post<Diretor>(this.API, diretor);
  }

}
