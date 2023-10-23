import { Observable, of } from 'rxjs';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Titulo } from 'src/app/models/titulo';
import { TituloService } from 'src/app/services/titulo.service';

@Injectable({ providedIn: 'root' })
export class tituloResolver implements Resolve<Titulo> {

  constructor(private tituloService: TituloService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Titulo> {
    if(route.params && route.params['id']) {
      return this.tituloService.getById(route.params['id']);
    }
    return of({} as Titulo);
  }

};
