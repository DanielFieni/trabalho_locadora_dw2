import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ActorService } from 'src/app/services/actor.service';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { Actor } from '../../../models/actor';

@Component({
  selector: 'app-actors',
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.scss'],
})
export class ActorsComponent implements OnInit{

  displayedColumns = ['name', 'actions'];
  actors!: MatTableDataSource<Actor>;

  constructor(
    private actorService: ActorService,
    public dialog: MatDialog,
    private router: Router,
    private _snackBar: MatSnackBar,
    ) {
  }

  ngOnInit(): void {
    this.getActorsList();
  }

  getActorsList() {
    this.actorService.list()
      .subscribe((res) => {
      this.actors = new MatTableDataSource(res as Actor[]);
    },
    (error) => {
      this.onError("Error ao carregar Atores");
    });
  }

  onError(msgError: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: msgError
    });
  }

  onAdd() {
    this.router.navigate(['actors/new']);
  }

  onEdit(ator: Actor) {
    this.router.navigate(['actors/edit/', ator._id])
  }

  onDelete(ator: Actor) {

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: "Tem certeza que deseja remover o(a): " + ator.name,
    });

    dialogRef.afterClosed().subscribe(( result: boolean ) => {
      if(result) {
        this.actorService.delete(ator._id).subscribe(
          () => {
            this.getActorsList(),
            this._snackBar.open("Ator deletado com Sucesso", 'X', {
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.actors.filter = filterValue.trim().toLowerCase();
  }

}
