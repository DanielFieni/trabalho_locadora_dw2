import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Associate } from '../models/associate';

@Injectable({
  providedIn: 'root'
})
export class AssociateService {

  private readonly API = 'locadora/associate';

  constructor(private httpClient: HttpClient) { }

  list(): Observable<Associate[]> {
    return this.httpClient.get<Associate[]>(this.API);
  }

  delete(id: string) {
    return this.httpClient.delete(`${this.API}/${id}`);
  }

  save(associate: Partial<Associate>) {
    if(associate.numInscription) {
      return this.update(associate);
    }
    return this.create(associate);
  }

  findByNumDescription(numDesription: String) {
    return this.httpClient.get(`${this.API}/${numDesription}`);
  }

  private update(associate: Partial<Associate>) {
    return this.httpClient.put(`${this.API}/${associate.numInscription}`, associate);
  }

  private create(associate: Partial<Associate>) {
    return this.httpClient.post(this.API, associate);
  }

}
