import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Dependent } from 'src/app/models/dependent';
import { DependentService } from 'src/app/services/dependent.service';

@Injectable({ providedIn: 'root' })
export class DependentResolver implements Resolve<Dependent> {

  constructor(private dependentService: DependentService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Dependent> {
    if(route.params && route.params['numInscription']) {
      return this.dependentService.findByNumInscription(route.params['numInscription']);
    }
    return of({} as Dependent);
  }
}
