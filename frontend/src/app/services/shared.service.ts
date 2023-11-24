import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private refreshNeeded = new Subject<void>();

  refreshNeeded$ = this.refreshNeeded.asObservable();

  refreshData() {
    console.log("Devia estar atualizando");
    this.refreshNeeded.next();
  }
}
