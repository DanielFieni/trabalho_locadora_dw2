import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import { Client } from 'src/app/models/client';
import { Item } from 'src/app/models/item';
import { Rent } from 'src/app/models/rent';
import { ClientService } from 'src/app/services/client.service';
import { FormService } from 'src/app/services/form.service';
import { ItemService } from 'src/app/services/item.service';
import { RentService } from 'src/app/services/rent.service';

@Component({
  selector: 'app-rent-form',
  templateUrl: './rent-form.component.html',
  styleUrls: ['./rent-form.component.scss'],
})
export class RentFormComponent implements OnInit {

  form!: FormGroup;
  clients: Client[] = [];
  items: Item[] = [];
  exists: boolean = false;
  rent: Rent = {} as Rent;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private rentService: RentService,
    private route: ActivatedRoute,
    private formService: FormService,
    private itemService: ItemService,
    private clientService: ClientService,
    private cdr: ChangeDetectorRef
  ) {
    this.rent = this.route.snapshot.data['rent'];
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      _id: new FormControl(''),
      rentalDate: new FormControl(''),
      expectedReturnDate: new FormControl(''),
      returnDate: new FormControl(''),
      amountCharged: new FormControl(''),
      fineCharged: new FormControl(''),
      client: new FormControl(''),
      item: new FormControl(''),
    });

    this.exists = this.rent._id !== undefined && this.rent._id !== null;
    if (this.exists) {
      this.form.patchValue(this.rent);
    } else {
      this.fillClients();
      this.fillItems();
    }

    console.log(this.form.value);
    this.cdr.detectChanges();

  }

  fillClients() {
    this.clientService.getClientsAvailable().subscribe({
      next: (client: Client[]) => {
        this.clients.push(...client);
        if(this.rent._id) {
          let value: Client = {} as Client;
          const add = this.clients.find(
            c => c.numInscription === this.rent.client.numInscription
          );
          if(add) value = add;
          this.form.controls['client'].setValue(value);
        }
      },
      error: error => {
        this.formService.onError(error, "Erro ao carregar Clientes");
      }
    });
  }

  fillItems() {
    this.itemService.getAllItemsAvailable().subscribe({
      next: (item: Item[]) => {
        this.items.push(...item);
        if(this.rent._id) {
          let value: Item = {} as Item;
          const add = this.items.find(
            item => item._id === this.rent.item._id
          );
          if(add) value = add;
          this.form.controls['item'].setValue(value);
        }
      },
      error: error => {
        this.formService.onError(error, "Erro ao carregar Itens");
      }
    });
  }

  getErrorMessage(formField: string) {
    return this.formService.getErrorMessage(formField, this.form);
  }

  private loadData(currentDate: Date) {
    let rentalDate = currentDate.toLocaleDateString('pt-BR');
    let amountCharged = this.form.value.item.title.aclass.valueClass;
    let expectedReturnDate = new Date(currentDate.setDate(currentDate.getDate() + this.form.value.item.title.aclass.returnDate)).toLocaleDateString('pt-BR');
    this.rent.rentalDate = rentalDate;
    this.rent.expectedReturnDate = expectedReturnDate;
    this.rent.amountCharged = amountCharged;
  }

  onNext(){
    this.loadData(new Date);
    this.form.patchValue(this.rent);
    this.exists = true;
  }

  onSubmit() {
    this.rentService.save(this.form.value).subscribe({
      next: result => this.formService.onSuccess("Locação"),
      error: error => this.formService.onError(error.error, "Locação")
    })
  }

  onCancel() {
    this.formService.cancel();
  }

  makeReturn() {
    let returnDate = new Date();
    let expectedReturnDate = new Date(this.rent.expectedReturnDate);
    let fineCharged = 0
    if(returnDate.getTime() > expectedReturnDate.getTime()) {
      fineCharged = this.form.value.amountCharged + this.form.value.item.title.aclass.valueClass;
    }
    this.form.controls['returnDate'].setValue(returnDate.toLocaleDateString('pt-BR'));
    this.form.controls['fineCharged'].setValue(fineCharged);
    this.onSubmit();
  }

}
