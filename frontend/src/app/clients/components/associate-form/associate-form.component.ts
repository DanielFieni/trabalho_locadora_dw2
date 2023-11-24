import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';
import { Associate } from 'src/app/models/associate';
import { AssociateService } from 'src/app/services/associate.service';
import { FormService } from 'src/app/services/form.service';

export const MY_DATE_FORMATS = {
  parse: {
      dateInput: 'DD/MM/YYYY',
  },
  display: {
      dateInput: 'DD/MM/YYYY',
      monthYearLabel: 'MMM YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-associate-form',
  templateUrl: './associate-form.component.html',
  styleUrls: ['./associate-form.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})
export class AssociateFormComponent implements OnInit {

  form!: FormGroup;
  associates: Associate[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private associateService: AssociateService,
    private route: ActivatedRoute,
    private formService: FormService,
    private adpter: DateAdapter<any>,
  ) {
    this.adpter.setLocale('pt-BR');
  }

  ngOnInit(): void {
    const associate: Associate = this.route.snapshot.data['associate'];
    this.form = this.formBuilder.group({
      numInscription: new FormControl(''),
      name: new FormControl(''),
      cpf: new FormControl(''),
      dtBirth: new FormControl(''),
      phone: new FormControl(''),
      address: new FormControl(''),
      sex: new FormControl(''),
      active: new FormControl(''),
    })

    if(associate) this.form.patchValue(associate);

  }

  getErrorMessage(formField: string) {
    this.formService.getErrorMessage(formField, this.form);
  }

  onSubmit() {
    let date = new Date(this.form.value.dtBirth);
    let dateString = date.toLocaleDateString('pt-BR');
    this.form.controls['dtBirth'].setValue(dateString);
    this.associateService.save(this.form.value).subscribe({
      next: result => this.formService.onSuccess("Associado"),
      error: error => this.formService.onError("Erro ao inserir Associado", "Associado")
    })
  }

  onCancel() {
    this.formService.cancel()
  }
}
