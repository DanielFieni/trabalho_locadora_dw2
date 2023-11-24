import { Component, OnInit } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Associate } from 'src/app/models/associate';
import { AssociateService } from 'src/app/services/associate.service';
import { SharedService } from 'src/app/services/shared.service';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

@Component({
  selector: 'app-associate',
  templateUrl: './associate.component.html',
  styleUrls: ['./associate.component.scss'],
})
export class AssociateComponent implements OnInit {

  displayedColumns = ['name', 'address', 'phone', 'sex', 'dtBirth', 'cpf', 'active', 'actions'];
  associates!: MatTableDataSource<Associate>

  constructor(
    private associateService: AssociateService,
    private router: Router,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private sharedService: SharedService
  ) {
    this.sharedService.refreshNeeded$.subscribe(() => {
      this.getAssociateList();
    })
   }

  ngOnInit(): void {
    this.getAssociateList();
  }

  getAssociateList() {
    this.associateService.list().subscribe({
      next: (res) => { this.associates = new MatTableDataSource(res as Associate[]); },
      error: (error) => { this.onError("Erro ao Carregar Sócios") }
    })
  }

  onAdd() {
    this.router.navigate(['clients/associates/new']);
  }

  onDelete(associate: Associate) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: "Tem certeza que deseja remover o(a): " + associate.name,
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.associateService.delete(associate.numInscription).subscribe(
          () => {
            this.getAssociateList();
            this._snackBar.open("Associado removido com sucesso!", "X", {
              duration: 4000,
              verticalPosition: "top",
              horizontalPosition: "center",
            });
          },
          (error) => {
            this.onError("Error ao remover Associado");
          }
        )
      }
    })
  }

  onError(message: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: message,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.associates.filter = filterValue.trim().toLowerCase();
  }

  onEdit(associate: Associate) {
    this.router.navigate(['clients/associates/edit/', associate.numInscription]);
  }

  changeStatus(associate: Associate) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: associate.active ? "Tem certeza que deseja ativar o(a): " + associate.name : "Tem certeza que deseja desativar o(a): " + associate.name
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.associateService.changeStatus(associate.active, associate.numInscription).subscribe({
          next: () => this.sharedService.refreshData(),
          error: (error) => {
            this.onError(error.error);
            this.sharedService.refreshData();
        }});
      } else {
        this.sharedService.refreshData();
      }
    })

  }

}
