import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Class } from '../models/class';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  private readonly API = 'locadora/class'

  constructor(private httpClient: HttpClient) {}

  list(): Observable<Class[]> {
    return this.httpClient.get<Class[]>(this.API);
  }

  delete(id: string) {
    return this.httpClient.delete(`${this.API}/${id}`);
  }

  save(aClass: Partial<Class>) {
    if(aClass._id) {
      return this.update(aClass);
    }
    return this.create(aClass)
  }

  getById(id: string) {
    return this.httpClient.get<Class>(`${this.API}/${id}`);
  }

  private update(aClass: Partial<Class>) {
    return this.httpClient.put<Class>(`${this.API}/${aClass._id}`, aClass);
  }

  private create(aClass: Partial<Class>) {
    return this.httpClient.post<Class>(this.API, aClass);
  }

}
