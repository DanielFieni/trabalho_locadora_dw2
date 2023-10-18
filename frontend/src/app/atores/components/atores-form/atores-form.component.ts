import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Ator } from '../../../models/ator';
import { FormService } from 'src/app/services/form.service';
import { AtoresService } from 'src/app/services/atores.service';

@Component({
  selector: 'app-atores-form',
  templateUrl: './atores-form.component.html',
  styleUrls: ['./atores-form.component.scss'],
})
export class AtoresFormComponent implements OnInit {

  form = this.formBuilder.group({
    _id: [''],
    name: ['', Validators.required],
  });

  constructor(
      private formBuilder: NonNullableFormBuilder,
      private route: ActivatedRoute,
      private formService: FormService,
      private atorService: AtoresService,
      private location: Location
    ) {
  }

  ngOnInit(): void {
    const ator: Ator = this.route.snapshot.data['ator'];
    this.form.setValue({
      _id: ator._id,
      name: ator.name
    })
  }

  onSubmit() {
    this.atorService.save(this.form.value).subscribe(result => this.formService.onSuccess("Ator"),
      error => {
        this.formService.onError(error.error.message, "Ator");
    });
  }

  onCancel() {
    this.formService.cancel();
  }

  getErrorMessage(fieldName: string){
    this.formService.getErrorMessage(fieldName, this.form);
  }

}
