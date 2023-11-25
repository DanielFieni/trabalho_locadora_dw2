import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  showFiller = false;
  panelOpenState = false;

  constructor(
    private router: Router,
  ) {}

  pageActor() {
    this.router.navigate(['actors']);
  }

  pageClass() {
    this.router.navigate(['classes'])
  }

  pageMenu() {
    this.router.navigate(['']);
  }

  pageDirector() {
    this.router.navigate(["directors"]);
  }

  pageTitle() {
    this.router.navigate(['titles']);
  }

  pageItem() {
    this.router.navigate(['items']);
  }

  pageClient() {
    this.router.navigate(['clients']);
  }

  pageRent() {
    this.router.navigate(['rents']);
  }

  ngOnInit(): void {
  }

}
