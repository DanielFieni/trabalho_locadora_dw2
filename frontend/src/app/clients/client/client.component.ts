import { Component } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { AssociateComponent } from './associate/associate.component';

export interface ExampleTab {
  label: string;
  content: string;
}

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent {

  socioComponent = AssociateComponent

}
