import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Actor } from 'src/app/models/actor';
import { Rent } from 'src/app/models/rent';
import { RentService } from 'src/app/services/rent.service';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  displayedColumns = ['client', 'item', 'amountCharged', 'rentalDate', 'category', 'actors'];
  rents!: MatTableDataSource<Rent>;
  filterControl: FormControl = new FormControl();
  @ViewChild('inputElement') inputElement!: ElementRef;

  constructor(
    private rentService: RentService,
    private router: Router,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getRentList();
  }

  getRentList() {
    this.rentService.list().subscribe({
      next: (res) => {
        this.rents = new MatTableDataSource(res as Rent[]);
      },
      error: (error) => { this.onError(error.error.error) }
    })
  }

  onError(message: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: message,
    });
  }

  // Show actor name in the table
  showActors(actors: Actor[]) {
    return actors.map((actor: Actor) => actor.name).join(', ');
  }

  testFilter() {
    const option = this.filterControl.value;
    const filterValue = this.inputElement.nativeElement.value;

    if (option === 'title') {
      this.rents.filterPredicate = (rent: Rent, filter: string) => {
        return rent.item.title.name.toLowerCase().includes(filter);
      }
    } else if (option === 'category') {
      this.rents.filterPredicate = (rent: Rent, filter: string) => {
        return rent.item.title.category.toLowerCase().includes(filter);
      }
    } else if (option === 'actor') {
      this.rents.filterPredicate = (rent: Rent, filter: string) => {
        return rent.item.title.actors
          .some(actor => actor.name.toLowerCase().includes(filter.toLowerCase()));
      };
    } else {
      this.rents.filterPredicate = (rent: Rent, filter: string) => {
        return rent.client.name.toLowerCase().includes(filter);
      }
    }

    this.rents.filter = filterValue.trim().toLowerCase();
  }

  // Function to handle input changes
  applyFilter(event: Event) {
    this.testFilter();
  }



}
