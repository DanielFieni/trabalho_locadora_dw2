import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Diretor } from '../../../models/diretor';
import { DiretoresService } from '../../../services/diretores.service';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-diretores',
  templateUrl: './diretores.component.html',
  styleUrls: ['./diretores.component.scss']
})
export class DiretoresComponent implements OnInit{

  displayedColumns = ['_id', 'name', 'actions'];
  diretores!: MatTableDataSource<Diretor>;

  constructor(
    private diretorService: DiretoresService,
    public dialog: MatDialog,
    private router: Router,
    private _snackBar: MatSnackBar,
  ){
  }

  ngOnInit(): void {
    this.getDiretoresList();
  }
  getDiretoresList() {
    this.diretorService.list()
      .subscribe((res) => {
        this.diretores = new MatTableDataSource(res as Diretor[]);
      },
      (error) => {
        this.onError("Error ao carregar Diretores");
      }
    )
  }

  onError(msgError: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: msgError
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.diretores.filter = filterValue.trim().toLowerCase();
  }

  onAdd() {
    this.router.navigate(['diretores/new']);
  }

  onEdit(diretor: string) {
    console.log(diretor);
    this.router.navigate(['diretores/edit/', diretor])
  }

  onDelete(diretor: Diretor) {

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: "Tem certeza que deseja remover o(a): " + diretor.name,
    });

    dialogRef.afterClosed().subscribe(( result: boolean ) => {
      if(result) {
        this.diretorService.delete(diretor._id).subscribe(
          () => {
            this.getDiretoresList(),
            this._snackBar.open("Diretor(a) deletado com Sucesso", 'X', {
               duration: 4000,
               verticalPosition: 'top',
               horizontalPosition: 'center',
              });
          },
          error => this.onError("Erro ao tentar remover Diretor(a)")
        )
      }
    });


  }

}
