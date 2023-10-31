import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Item } from 'src/app/models/item';
import { ItemService } from 'src/app/services/item.service';

@Injectable({ providedIn: 'root' })
export class ItemResolver implements Resolve<Item> {

  constructor(private itemService: ItemService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Item> {
    if(route.params && route.params['id']) {
      return this.itemService.getById(route.params['id']);
    }
    return of({} as Item) ;
  }
}
