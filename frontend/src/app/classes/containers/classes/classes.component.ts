import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { Class } from '../../../models/class';
import { ClassService } from '../../../services/class.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class ClassesComponent implements OnInit {

  displayedColumns = ['name', 'valueClass', 'returnDate', 'actions']
  classes!: MatTableDataSource<Class>

  constructor(
    private classeService: ClassService,
    private router: Router,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
    this.getClassList();
  }

  getClassList() {
    this.classeService.list().subscribe(
      (res) => {
        this.classes = new MatTableDataSource(res as Class[])
      },
      (error) => {
        this.onError("Error ao carregar Classes");
      }
    )
  }

  onAdd() {
    this.router.navigate(['classes/new']);
  }

  onEdit(classe: Class) {
    this.router.navigate(['classes/edit/', classe._id]);
  }

  onDelete(classe: Class) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: "Tem certeza que deseja remover o(a): " + classe.name,
    });

    dialogRef.afterClosed().subscribe(( result: boolean ) => {
      if(result) {
        this.classeService.delete(classe._id).subscribe(
          () => {
            this.getClassList(),
            this._snackBar.open("Classe deletada com Sucesso", 'X', {
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
