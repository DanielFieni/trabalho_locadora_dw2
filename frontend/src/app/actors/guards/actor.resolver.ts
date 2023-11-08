import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ActorService } from 'src/app/services/actor.service';
import { Actor } from '../../models/actor';

@Injectable({ providedIn: 'root' })
export class AtorResolver implements Resolve<Actor> {

  constructor(private actorService: ActorService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Actor> {
    if(route.params && route.params['id']) {
      return this.actorService.getById(route.params['id']);
    }
    return of({} as Actor) ;
  }
}
