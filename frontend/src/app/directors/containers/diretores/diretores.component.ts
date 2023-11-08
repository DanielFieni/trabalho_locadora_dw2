import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { Director } from '../../../models/director';
import { DirectorService } from '../../../services/directors.service';

@Component({
  selector: 'app-diretores',
  templateUrl: './diretores.component.html',
  styleUrls: ['./diretores.component.scss']
})
export class DirectorsComponent implements OnInit{

  displayedColumns = ['name', 'actions'];
  directors!: MatTableDataSource<Director>;

  constructor(
    private directorService: DirectorService,
    public dialog: MatDialog,
    private router: Router,
    private _snackBar: MatSnackBar,
  ){
  }

  ngOnInit(): void {
    this.getDirectorsList();
  }

  getDirectorsList() {
    this.directorService.list().subscribe({
      next: (res) => this.directors = new MatTableDataSource(res as Director[]),
      error: error => this.onError("Error ao carregar Diretores")
    })
  }

  onError(msgError: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: msgError
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.directors.filter = filterValue.trim().toLowerCase();
  }

  onAdd() {
    this.router.navigate(['directors/new']);
  }

  onEdit(diretor: string) {
    this.router.navigate(['directors/edit/', diretor])
  }

  onDelete(diretor: Director) {

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: "Tem certeza que deseja remover o(a): " + diretor.name,
    });

    dialogRef.afterClosed().subscribe(( result: boolean ) => {
      if(result) {
        this.directorService.delete(diretor._id).subscribe(
          () => {
            this.getDirectorsList(),
            this._snackBar.open("Diretor(a) deletado com Sucesso", 'X', {
               duration: 4000,
               verticalPosition: 'top',
               horizontalPosition: 'center',
              });
          },
          error => this.onError(error.error)
        )
      }
    });


  }

}
