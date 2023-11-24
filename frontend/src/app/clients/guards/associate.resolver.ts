import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Associate } from 'src/app/models/associate';
import { AssociateService } from 'src/app/services/associate.service';

@Injectable({ providedIn: 'root' })
export class AssociateResolver implements Resolve<Associate> {

  constructor(private associateService: AssociateService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Associate> {
    if(route.params && route.params['numInscription']) {
      return this.associateService.findByNumInscription(route.params['numInscription']);
    }
    return of({} as Associate) ;
  }
}
