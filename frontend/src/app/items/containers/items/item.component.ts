import { Router } from '@angular/router';
import { ItemService } from './../../../services/item.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Item } from 'src/app/models/item';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  displayedColumns = ['_id', 'numSerie', 'datePurchase', 'type', 'title', 'actions'];
  items!: MatTableDataSource<Item>;

  constructor(
    private itemService: ItemService,
    private router: Router,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ){}

  ngOnInit(): void {
    this.getItemList();
  }

  onAdd() {
    this.router.navigate(['items/new']);
  }

  onEdit(item: Item) {
    this.router.navigate(['items/edit/', item._id]);
  }

  onDelete(item: Item) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: "Tem certeza que deseja remover o(a): " + item.type,
    });

    dialogRef.afterClosed().subscribe((result: boolean)=> {
      if(result) {
        this.itemService.delete(item._id).subscribe({
          next: () => {
            this.getItemList(),
            this._snackBar.open("Item deletado com Sucesso", 'X', {
              duration: 4000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
             });
          },
          error: error => this.onError(error.error)
        });
      }
    });

  }

  getItemList() {
    this.itemService.list().subscribe({
      next: (res) => {
        this.items = new MatTableDataSource(res as Item[]);
      },
      error: error => {
        this.onError("Error ao carregar Items");
      }
    })
  }
  onError(msg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: msg
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.items.filter = filterValue.trim().toLowerCase();
  }

}
