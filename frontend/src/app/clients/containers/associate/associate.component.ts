import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Associate } from 'src/app/models/associate';
import { AssociateService } from 'src/app/services/associate.service';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

@Component({
  selector: 'app-associate',
  templateUrl: './associate.component.html',
  styleUrls: ['./associate.component.scss']
})
export class AssociateComponent implements OnInit {

  displayedColumns = ['name', 'address', 'phone', 'sex', 'dtBirth', 'cpf', 'active', 'actions'];
  associates!: MatTableDataSource<Associate>

  constructor(
    private associateService: AssociateService,
    private router: Router,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

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

  changeStatus(active: boolean, numIncription: string) {
    this.associateService.changeStatus(active, numIncription).subscribe({
      error: (error) => { this.onError("Erro ao alterar status do sócio")
    }});
  }

}
