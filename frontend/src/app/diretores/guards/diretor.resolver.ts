import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Diretor } from '../../models/diretor';
import { DiretoresService } from '../../services/diretores.service';

@Injectable({ providedIn: 'root' })
export class DiretorResolver implements Resolve<Diretor> {

  constructor(private diretorService: DiretoresService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Diretor> {
    if(route.params && route.params['id']) {
      return this.diretorService.getById(route.params['id']);
    }
    return of({} as Diretor) ;
  }
}
