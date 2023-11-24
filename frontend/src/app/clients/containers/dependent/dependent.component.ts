import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Dependent } from 'src/app/models/dependent';
import { DependentService } from 'src/app/services/dependent.service';
import { SharedService } from 'src/app/services/shared.service';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

@Component({
  selector: 'app-dependent',
  templateUrl: './dependent.component.html',
  styleUrls: ['./dependent.component.scss']
})
export class DependentComponent implements OnInit {

  displayedColumns = ['name', 'sex', 'dtBirth', 'active', 'associate', 'actions'];
  dependents!: MatTableDataSource<Dependent>;

  constructor(
    private dependentService: DependentService,
    private router: Router,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private sharedService: SharedService
  ) {
    this.sharedService.refreshNeeded$.subscribe(() => {
      this.getDependentList();
    })
   }

  ngOnInit(): void {
    this.getDependentList();
  }

  getDependentList() {
    this.dependentService.list().subscribe({
      next: (res) => { this.dependents = new MatTableDataSource(res as Dependent[]); },
      error: (error) => { this.onError("Erro ao Carregar Dependentes") }
    })
  }

  onAdd() {
    this.router.navigate(['clients/dependents/new']);
  }

  onEdit(dependent: Dependent) {
    this.router.navigate(['clients/dependents/edit', dependent.numInscription]);
  }

  onDelete(dependent: Dependent) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: "Tem certeza que deseja remover o(a): " + dependent.name,
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
          this.dependentService.delete(dependent.numInscription).subscribe({
            next: () => {
              this.getDependentList();
              this._snackBar.open("Dependente removido com sucesso!", "X", {
                duration: 4000,
                verticalPosition: "top",
                horizontalPosition: "center",
              });
            },
            error: error => {
              this.onError("Error ao remover Dependente");
            }
          }
        )
      }
    })
  }

  onError(message: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: message,
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dependents.filter = filterValue.trim().toLowerCase();
  }

  changeStatus(dependent: Dependent) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: dependent.active ? "Tem certeza que deseja ativar o(a): " + dependent.name : "Tem certeza que deseja desativar o(a): " + dependent.name,
    })

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if(result) {
        this.dependentService.changeStatus(dependent.active, dependent.numInscription).subscribe({
          next: () => this.sharedService.refreshData(),
          error: error =>  {
            this.onError(error.error);
            this.sharedService.refreshData();
          }
        })
      } else {
        this.sharedService.refreshData();
      }
    })

  }

}
