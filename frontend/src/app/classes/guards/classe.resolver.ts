import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Class } from '../../models/class';
import { ClassService } from '../../services/class.service';

@Injectable({ providedIn: 'root' })
export class ClasseResolver implements Resolve<Class> {

  constructor(private classService: ClassService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Class> {
    if(route.params && route.params['id']) {
      return this.classService.getById(route.params['id']);
    }
    return of({} as Class) ;
  }
}
