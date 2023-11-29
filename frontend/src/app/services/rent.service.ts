import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rent } from '../models/rent';

@Injectable({
  providedIn: 'root'
})
export class RentService {

  private readonly API = 'locadora/rent';

  constructor(private http_client: HttpClient) { }

  list(): Observable<Rent[]> {
    return this.http_client.get<Rent[]>(this.API);
  }

  delete(id: string) {
    return this.http_client.delete(`${this.API}/${id}`);
  }

  save(rent: Partial<Rent>) {
    if (rent._id) {
      return this.update(rent);
    }
    return this.create(rent);
  }

  findById(id: string) {
    return this.http_client.get<Rent>(`${this.API}/${id}`);
  }

  makePayment (id: string) {
    return this.http_client.patch(`${this.API}/${id}`, null);
  }

  private create(rent: Partial<Rent>) {
    return this.http_client.post(this.API, rent);
  }

  private update(rent: Partial<Rent>) {
    return this.http_client.put(`${this.API}/${rent._id}`, rent);
  }

}
