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

  delete(numInscription: string) {
    return this.httpClient.delete(`${this.API}/${numInscription}`);
  }

  save(associate: Partial<Associate>) {
    if(associate.numInscription) {
      return this.update(associate);
    }
    return this.create(associate);
  }

  findByNumInscription(numDesription: string) {
    return this.httpClient.get<Associate>(`${this.API}/${numDesription}`);
  }

  changeStatus(status: boolean, numInscription: string) {
    const options = { params: { status: status} };
    return this.httpClient.patch(`${this.API}/${numInscription}`, null, options);
  }

  getNotActive(): Observable<Associate[]> {
    return this.httpClient.get<Associate[]>(`${this.API}/active`);
  }

  private update(associate: Partial<Associate>) {
    return this.httpClient.put(`${this.API}/${associate.numInscription}`, associate);
  }

  private create(associate: Partial<Associate>) {
    return this.httpClient.post(this.API, associate);
  }

}
