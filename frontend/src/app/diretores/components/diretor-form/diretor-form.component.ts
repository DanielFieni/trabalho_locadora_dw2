import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Diretor } from '../../../models/diretor';
import { DiretoresService } from '../../../services/diretores.service';
import { Location } from '@angular/common';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-diretor-form',
  templateUrl: './diretor-form.component.html',
  styleUrls: ['./diretor-form.component.scss']
})
export class DiretorFormComponent implements OnInit {

  form = this.formBuilder.group({
    _id: [''],
    name: ['', Validators.required],
  })

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private diretorService: DiretoresService,
    private _snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute,
    private formService: FormService,
  ){
  }

  ngOnInit(): void {
    const diretor: Diretor = this.route.snapshot.data['diretor'];
    this.form.setValue({
      _id: diretor._id,
      name: diretor.name
    })
  }

  onSubmit() {
    this.diretorService.save(this.form.value).subscribe(
      result => this.formService.onSuccess("Diretor"),
      error => {
        this.formService.onError(error.error.message, "Diretor");
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
