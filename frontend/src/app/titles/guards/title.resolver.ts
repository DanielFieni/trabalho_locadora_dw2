import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Title } from 'src/app/models/title';
import { TitleService } from 'src/app/services/title.service';

@Injectable({ providedIn: 'root' })
export class titleResolver implements Resolve<Title> {

  constructor(private titleService: TitleService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Title> {
    if(route.params && route.params['id']) {
      return this.titleService.getById(route.params['id']);
    }
    return of({} as Title);
  }

};
