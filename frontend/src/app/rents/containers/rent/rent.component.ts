import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Route, Router } from '@angular/router';
import { Rent } from 'src/app/models/rent';
import { RentService } from 'src/app/services/rent.service';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.scss']
})
export class RentComponent implements OnInit {

  displayedColumns = ['client', 'item', 'rentalDate', 'expectedReturnDate', 'returnDate', 'amountCharged', 'fineCharged', 'paid', 'finePay', 'actions'];
  rents!: MatTableDataSource<Rent>

  constructor(
    private rentService: RentService,
    private router: Router,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getRentList();
  }

  getRentList() {
    this.rentService.list().subscribe({
      next: (res) => { this.rents = new MatTableDataSource(res as Rent[]); console.log(res)},
      error: (error) => { this.onError(error.error.error) }
    })
  }

  checkRentAvailable(rent: Rent) {
    if (rent.paid) {
      return true;
    } else if (!rent.paid && rent.returnDate != null) {
      return false;
    }

    return true;
  }

  onAdd() {
    this.router.navigate(['rents/new']);
  }

  onDelete(rent: Rent) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: "Tem certeza que deseja remover a locação de : " + rent.client.name + " -> " + rent.item.numSerie
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.rentService.delete(rent._id).subscribe({
          next: () => {
            this.getRentList();
            this._snackBar.open("Aluguel removido com sucesso!", "X", {
              duration: 4000,
              horizontalPosition: "center",
              verticalPosition: "top",
            });
          },
          error: error => { this.onError(error.error) }
        })
      }
    });
  }

  onError(message: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: message,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.rents.filter = filterValue.trim().toLowerCase();
  }

  onEdit(rent: Rent) {
    this.router.navigate(['rents/edit/' + rent._id]);
  }

  makePayment(rent: Rent) {
    this.rentService.makePayment(rent._id).subscribe({
      next: () => {
        this.getRentList();
        this._snackBar.open("Pagamento realizado com sucesso!", "X", {
          duration: 4000,
          horizontalPosition: "center",
          verticalPosition: "top",
        });
      },
      error: error => { this.onError(error.error) }
    })
  }

}
