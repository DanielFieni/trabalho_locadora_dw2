import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Rent } from 'src/app/models/rent';
import { RentService } from 'src/app/services/rent.service';

@Injectable({ providedIn: 'root' })
export class RentResolver implements Resolve<Rent> {

  constructor(private rentService: RentService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Rent> {
    if(route.params && route.params['id']) {
      return this.rentService.findById(route.params['id']);
    }
    return of({} as Rent) ;
  }
}
