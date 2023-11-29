import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private readonly API = '/locadora/item'

  constructor(
    private httpClient: HttpClient
  ) { }

    list(): Observable<Item[]> {
      return this.httpClient.get<Item[]>(this.API);
    }

    delete(id: string) {
      return this.httpClient.delete(`${this.API}/${id}`);
    }

    getById(id: string) {
      return this.httpClient.get<Item>(`${this.API}/${id}`)
    }

    save(item: Partial<Item>) {
      if(item._id) {
        return this.update(item);
      }
      return this.create(item);
    }

    getAllItemsAvailable() {
      return this.httpClient.get<Item[]>(`${this.API}/available`);
    }

    private update(item: Partial<Item>) {
      return this.httpClient.put<Item>(`${this.API}/${item._id}`, item);
    }

    private create(item: Partial<Item>) {
      return this.httpClient.post<Item>(this.API, item);
    }

}
