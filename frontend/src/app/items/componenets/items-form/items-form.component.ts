import { Titulo } from './../../../models/titulo';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Item } from 'src/app/models/item';
import { FormService } from 'src/app/services/form.service';
import { ItemService } from 'src/app/services/item.service';
import { TituloService } from 'src/app/services/titulo.service';

@Component({
  selector: 'app-items-form',
  templateUrl: './items-form.component.html',
  styleUrls: ['./items-form.component.scss']
})
export class ItemsFormComponent implements OnInit {

  form!: FormGroup;
  titles: Titulo[] = [];
  exists: boolean = false;

  constructor(
    private formBuilder : FormBuilder,
    private itemService: ItemService,
    private route: ActivatedRoute,
    private formService: FormService,
    private titleService: TituloService,
  ){}

  ngOnInit(): void {
    const item: Item = this.route.snapshot.data['item'];
    this.form = this.formBuilder.group({
      _id: new FormControl(''),
      numSerie: new FormControl(''),
      datePurchase: new FormControl(''),
      type: new FormControl(''),
      title: new FormControl(''),
    })

    this.exists = item._id !== undefined && item._id !== null;
    if(item) this.form.patchValue(item);

    this.fillTitles();

  }

  getNameTitle(){
    return this.form.value.title.name;
  }

  private fillTitles() {
    this.titleService.list().subscribe({
      next: (title: Titulo[]) => {
        this.titles.push(...title);
      },
      error: error => {
        this.formService.onError(error, "Erro ao carregar Títulos");
      }
    })
  }

  getErrorMessage(formField: string) {
    this.formService.getErrorMessage(formField, this.form);
  }

  onSubmit() {
    this.itemService.save(this.form.value).subscribe({
      next: (result) => {
        this.formService.onSuccess("Item");
      },
      error: error => {
        this.formService.onError(error.error.message, "Item");
      }
    })
  }

  onCancel() {
    this.formService.cancel()
  }

}
