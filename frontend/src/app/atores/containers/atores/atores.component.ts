import { Ator } from '../../../models/ator';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { AtoresService } from 'src/app/services/atores.service';

@Component({
  selector: 'app-atores',
  templateUrl: './atores.component.html',
  styleUrls: ['./atores.component.scss'],
})
export class AtoresComponent implements OnInit{

  displayedColumns = ['name', 'actions'];
  atores!: MatTableDataSource<Ator>;

  constructor(
    private atoresService: AtoresService,
    public dialog: MatDialog,
    private router: Router,
    private _snackBar: MatSnackBar,
    ) {
  }

  ngOnInit(): void {
    this.getAtoresList();
  }

  getAtoresList() {
    this.atoresService.list()
      .subscribe((res) => {
      this.atores = new MatTableDataSource(res as Ator[]);
    },
    (error) => {
      this.onError("Error ao carregar Atores");
    });
  }

  onError(msgError: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: msgError
    });
  }

  onAdd() {
    this.router.navigate(['atores/new']);
  }

  onEdit(ator: Ator) {
    this.router.navigate(['atores/edit/', ator._id])
  }

  onDelete(ator: Ator) {

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: "Tem certeza que deseja remover o(a): " + ator.name,
    });

    dialogRef.afterClosed().subscribe(( result: boolean ) => {
      if(result) {
        this.atoresService.delete(ator._id).subscribe(
          () => {
            this.getAtoresList(),
            this._snackBar.open("Ator deletado com Sucesso", 'X', {
               duration: 4000,
               verticalPosition: 'top',
               horizontalPosition: 'center',
              });
          },
          error => this.onError("Erro ao tentar remover Ator")
        )
      }
    });


  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.atores.filter = filterValue.trim().toLowerCase();
  }

}
