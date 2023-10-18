import { Classe } from '../../../models/classe';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ClasseService } from '../../../services/classe.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class ClassesComponent implements OnInit {

  displayedColumns = ['_id', 'name', 'valor', 'prazoDevolucao', 'actions']
  classes!: MatTableDataSource<Classe>

  constructor(
    private classeService: ClasseService,
    private router: Router,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
    this.getClasseList();
  }

  getClasseList() {
    this.classeService.list().subscribe(
      (res) => {
        this.classes = new MatTableDataSource(res as Classe[])
      },
      (error) => {
        this.onError("Error ao carregar Classes");
      }
    )
  }

  onAdd() {
    this.router.navigate(['classes/new'])
  }

  onEdit(classe: Classe) {
    this.router.navigate(['classes/edit/', classe._id]);
  }

  onDelete(classe: Classe) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: "Tem certeza que deseja remover o(a): " + classe.name,
    });

    dialogRef.afterClosed().subscribe(( result: boolean ) => {
      if(result) {
        this.classeService.delete(classe._id).subscribe(
          () => {
            this.getClasseList(),
            this._snackBar.open("Classe deletada com Sucesso", 'X', {
               duration: 4000,
               verticalPosition: 'top',
               horizontalPosition: 'center',
              });
          },
          error => this.onError("Erro ao tentar remover Classe")
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
    this.classes.filter = filterValue.trim().toLowerCase();
  }

}
