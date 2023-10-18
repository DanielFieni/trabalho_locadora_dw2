import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ClasseService } from '../../services/classe.service';
import { Classe } from '../../models/classe';

@Injectable({ providedIn: 'root' })
export class ClasseResolver implements Resolve<Classe> {

  constructor(private classeService: ClasseService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Classe> {
    if(route.params && route.params['id']) {
      return this.classeService.getById(route.params['id']);
    }
    return of({} as Classe) ;
  }
}
