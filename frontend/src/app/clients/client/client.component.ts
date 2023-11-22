import { Component, OnInit } from '@angular/core';
import { AssociateComponent } from '../containers/associate/associate.component';

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

  socioComponent = AssociateComponent

  ngOnInit(): void {
  }

}
