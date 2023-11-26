import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private readonly API = 'locadora/clients';

  constructor( private httpClient: HttpClient ) { }

  list(): Observable<Client[]> {
    return this.httpClient.get<Client[]>(this.API);
  }

  getClientsAvailable(): Observable<Client[]> {
    return this.httpClient.get<Client[]>(`${this.API}/available`);
  }

}
