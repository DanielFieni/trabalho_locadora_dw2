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

  pageAtor() {
    this.router.navigate(['atores']);
  }

  pageClasse() {
    this.router.navigate(['classes'])
  }

  pageMenu() {
    this.router.navigate(['']);
  }

  pageDiretor() {
    this.router.navigate(["diretores"]);
  }

  pageTitulos() {
    this.router.navigate(['titulos']);
  }

  ngOnInit(): void {
  }

}
