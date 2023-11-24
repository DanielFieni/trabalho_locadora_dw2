import { Component, OnInit } from '@angular/core';
import { AssociateComponent } from '../containers/associate/associate.component';
import { DependentComponent } from '../containers/dependent/dependent.component';

export interface ExampleTab {
  label: string;
  content: string;
}

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  associateComponent = AssociateComponent;
  dependentComponent = DependentComponent;

  ngOnInit(): void {
  }

}
