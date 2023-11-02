import { AutofillMonitor } from '@angular/cdk/text-field';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Titulo } from 'src/app/models/titulo';
import { TituloService } from 'src/app/services/titulo.service';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { InformationDialogComponent } from 'src/app/shared/components/information-dialog/information-dialog.component';

@Component({
  selector: 'app-titulo',
  templateUrl: './titulo.component.html',
  styleUrls: ['./titulo.component.scss']
})
export class TituloComponent implements OnInit{

  displayedColumns = ['name', 'diretor', 'year', 'category', 'classe', 'actions'];
  titulos!: MatTableDataSource<Titulo>;

  constructor(
    private tituloService: TituloService,
    private router: Router,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {

  }

  ngOnInit(): void {
    this.getTituloList();
  }

  getTituloList() {
    this.tituloService.list().subscribe(
      (res) => {
        console.log(res)
        this.titulos = new MatTableDataSource(res as Titulo[]);
      },
      (error) => {
        this.onError("Error ao carregar Titulos");
      }
    )
  }

  onAdd() {
    this.router.navigate(['titulos/new']);
  }

  onEdit(titulo: Titulo) {
    this.router.navigate(['titulos/edit/', titulo._id]);
  }

  onDelete(titulo: Titulo) {

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: "Tem certeza que deseja remover o(a): " + titulo.name,
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if(result) {
        this.tituloService.delete(titulo._id).subscribe(
          () => {
            this.getTituloList(),
            this._snackBar.open("Título deletado com Sucesso", "X", {
              duration: 4000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
            });
          },
          error => this.onError("Erro ao tentar remover Título")
        )
      }
    });
  }

  onError(msgError: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: msgError
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.titulos.filter = filterValue.trim().toLowerCase();
  }

  dialogDescription(titulo: Titulo) {
    this.dialog.open(InformationDialogComponent, {
      data: titulo,
    })
  }

}
