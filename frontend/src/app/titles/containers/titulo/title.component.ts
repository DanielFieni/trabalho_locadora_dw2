import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Title } from 'src/app/models/title';
import { TitleService } from 'src/app/services/title.service';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { InformationDialogComponent } from 'src/app/shared/components/information-dialog/information-dialog.component';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnInit{

  displayedColumns = ['name', 'director', 'year', 'category', 'aClass', 'actions'];
  titles!: MatTableDataSource<Title>;

  constructor(
    private titleService: TitleService,
    private router: Router,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {

  }

  ngOnInit(): void {
    this.getTitleList();
  }

  getTitleList() {
    this.titleService.list().subscribe({
      next: res => {
        console.log(res)
        this.titles = new MatTableDataSource(res as Title[])
      },
      error: error => this.onError("Error ao carregar Titulos")
    })
  }

  onAdd() {
    this.router.navigate(['titles/new']);
  }

  onEdit(title: Title) {
    this.router.navigate(['titles/edit/', title._id]);
  }

  onDelete(title: Title) {

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: "Tem certeza que deseja remover o(a): " + title.name,
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if(result) {
        this.titleService.delete(title._id).subscribe(
          () => {
            this.getTitleList(),
            this._snackBar.open("Título deletado com Sucesso", "X", {
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
    this.titles.filter = filterValue.trim().toLowerCase();
  }

  // Filter By Year
  applyFilterByYear(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.titles.filter = filterValue.trim().toLowerCase();
  }


  dialogDescription(title: Title) {
    this.dialog.open(InformationDialogComponent, {
      data: title,
    })
  }

}
