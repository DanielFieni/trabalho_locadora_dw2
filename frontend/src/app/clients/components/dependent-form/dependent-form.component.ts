import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';
import { Associate } from 'src/app/models/associate';
import { Dependent } from 'src/app/models/dependent';
import { AssociateService } from 'src/app/services/associate.service';
import { DependentService } from 'src/app/services/dependent.service';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-dependent-form',
  templateUrl: './dependent-form.component.html',
  styleUrls: ['./dependent-form.component.scss'],
})
export class DependentFormComponent implements OnInit {

  form!: FormGroup;
  dependents: Dependent[] = [];
  associates: Associate[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private dependentService: DependentService,
    private route: ActivatedRoute,
    private formService: FormService,
    private associateService: AssociateService,
  ) { }

  ngOnInit(): void {
    const dependent = this.route.snapshot.data['dependent'];
    this.form = this.formBuilder.group({
      numInscription: new FormControl(''),
      name: new FormControl(''),
      dtBirth: new FormControl(''),
      sex: new FormControl(''),
      active: new FormControl(''),
      associate: new FormControl(''),
    });

    if(dependent) this.form.patchValue(dependent);
    this.fillAssociates();

  }

  fillAssociates() {
    this.associateService.getNotActive().subscribe({
      next: (associate: Associate[]) => {
        this.associates.push(...associate);
      },
      error: error => {
        this.formService.onError(error, "Erro ao carregar Associados");
      }
    })
  }

  getErrorMessage(formField: string) {
    return this.formService.getErrorMessage(formField, this.form);
  }

  onSubmit() {
    console.log(this.form.value);
    this.dependentService.save(this.form.value).subscribe({
      next: result => this.formService.onSuccess("Dependente"),
      error: error => this.formService.onError(error.error, "Dependente")
    })
  }

  onCancel() {
    this.formService.cancel()
  }

}
