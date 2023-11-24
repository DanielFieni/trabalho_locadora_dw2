import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dependent } from '../models/dependent';
import { Associate } from '../models/associate';

@Injectable({
  providedIn: 'root'
})
export class DependentService {

  private readonly API = 'locadora/dependent';

  constructor(private httpClient: HttpClient) { }

  list() : Observable<Dependent[]> {
    return this.httpClient.get<Dependent[]>(this.API);
  }

  delete(numInscription: string) {
    return this.httpClient.delete(`${this.API}/${numInscription}`);
  }

  save(dependent: Partial<Dependent>) {
    if(dependent.numInscription) {
      return this.update(dependent);
    }
    return this.create(dependent);
  }

  findByNumInscription(numInscription: string) {
    return this.httpClient.get<Dependent>(`${this.API}/${numInscription}`);
  }

  changeStatus(status: boolean, numInscription: string) {
    const options = { params: { status: status} };
    return this.httpClient.patch(`${this.API}/${numInscription}`, null, options);
  }

  private update(dependent: Partial<Dependent>) {
    return this.httpClient.put<Dependent>(`${this.API}/${dependent.numInscription}`, dependent);
  }

  private create(dependent: Partial<Dependent>) {
    return this.httpClient.post<Dependent>(this.API, dependent);
  }

}
