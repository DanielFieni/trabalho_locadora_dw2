import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Director } from '../../models/director';
import { DirectorService } from '../../services/directors.service';

@Injectable({ providedIn: 'root' })
export class DirectorResolver implements Resolve<Director> {

  constructor(private directorService: DirectorService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Director> {
    if(route.params && route.params['id']) {
      return this.directorService.getById(route.params['id']);
    }
    return of({} as Director) ;
  }
}
