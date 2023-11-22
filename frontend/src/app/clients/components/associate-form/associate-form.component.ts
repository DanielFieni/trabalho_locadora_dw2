import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Associate } from 'src/app/models/associate';
import { AssociateService } from 'src/app/services/associate.service';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-associate-form',
  templateUrl: './associate-form.component.html',
  styleUrls: ['./associate-form.component.scss']
})
export class AssociateFormComponent implements OnInit {

  form!: FormGroup;
  associates: Associate[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private associateService: AssociateService,
    private route: ActivatedRoute,
    private formService: FormService,
  ) { }

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
    console.log(associate);

  }

  getErrorMessage(formField: string) {
    this.formService.getErrorMessage(formField, this.form);
  }

  onSubmit() {
    this.associateService.save(this.form.value).subscribe({
      next: result => this.formService.onSuccess("Associado"),
      error: error => this.formService.onError("Erro ao inserir Associado", "Associado")
    })
  }

  onCancel() {
    this.formService.cancel()
  }
}
