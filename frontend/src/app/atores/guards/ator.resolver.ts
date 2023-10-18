import { Ator } from '../../models/ator';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AtoresService } from 'src/app/services/atores.service';

@Injectable({ providedIn: 'root' })
export class AtorResolver implements Resolve<Ator> {

  constructor(private atorService: AtoresService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Ator> {
    if(route.params && route.params['id']) {
      return this.atorService.getById(route.params['id']);
    }
    return of({_id: '', name: ''}) ;
  }
}
