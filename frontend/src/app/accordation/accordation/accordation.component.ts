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
    this.router.navigate(['atores']);
  }

  pageClasse() {
    this.router.navigate(['classes'])
  }

  pageMenu() {
    // this.router.navigate(['']);
    // window.location.reload();
  }

  pageDiretor() {
    this.router.navigate(["diretores"]);
  }

}
