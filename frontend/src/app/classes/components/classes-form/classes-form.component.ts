import { FormBuilder, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Classe } from '../../../models/classe';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { ClasseService } from '../../../services/classe.service';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-classes-form',
  templateUrl: './classes-form.component.html',
  styleUrls: ['./classes-form.component.scss']
})
export class ClassesFormComponent implements OnInit {

  form = this.formBuilder.group({
    _id: [''],
    name: ['', Validators.required],
    valor: ['', Validators.required],
    prazoDevolucao: ['', Validators.required]
  });

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private classeService: ClasseService,
    private route: ActivatedRoute,
    private formService: FormService,
  ){
  }

  ngOnInit(): void {
    const classe: Classe = this.route.snapshot.data['classe'];
    this.form.setValue({
      _id: classe._id,
      name: classe.name,
      valor: classe.valor,
      prazoDevolucao: classe.prazoDevolucao
    })
  }

  onSubmit() {
    this.classeService.save(this.form.value).subscribe(result => this.formService.onSuccess("Classe"),
      error => {
        this.formService.onError(error.error.message, "Classe");
      }
    )
  }

  onCancel() {
    this.formService.cancel()
  }


  getErrorMessage(formField: string) {
    this.formService.getErrorMessage(formField, this.form);
  }


}
