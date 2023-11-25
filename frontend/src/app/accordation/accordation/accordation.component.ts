import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accordation',
  templateUrl: './accordation.component.html',
  styleUrls: ['./accordation.component.scss']
})
export class AccordationComponent implements OnInit {

  panelOpenState = false;

  constructor(
    private router: Router,
  ) {}

  ngOnInit(): void {
  }

  pageAtor() {
    this.router.navigate(['actors']);
  }

  pageClasse() {
    this.router.navigate(['classes'])
  }

  pageTitulos() {
    this.router.navigate(['titles']);
  }

  pageDiretor() {
    this.router.navigate(["directors"]);
  }

  pageClient() {
    this.router.navigate(['clients'])
  }

  pageRent() {
    this.router.navigate(['rents']);
  }

}
