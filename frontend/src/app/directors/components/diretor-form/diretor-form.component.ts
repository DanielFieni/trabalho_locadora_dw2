import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormService } from 'src/app/services/form.service';
import { Director } from '../../../models/director';
import { DirectorService } from '../../../services/directors.service';

@Component({
  selector: 'app-diretor-form',
  templateUrl: './diretor-form.component.html',
  styleUrls: ['./diretor-form.component.scss']
})
export class DirectorFormComponent implements OnInit {

  form = this.formBuilder.group({
    _id: [''],
    name: ['', Validators.required],
  })

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private directorService: DirectorService,
    private route: ActivatedRoute,
    private formService: FormService,
  ){
  }

  ngOnInit(): void {
    const diretor: Director = this.route.snapshot.data['director'];
    this.form.setValue({
      _id: diretor._id,
      name: diretor.name
    })
  }

  onSubmit() {
    this.directorService.save(this.form.value).subscribe({
      next: result => this.formService.onSuccess("Diretor"),
      error: error => this.formService.onError(error.error, "Diretor")
    })
  }

  onCancel() {
    this.formService.cancel()
  }

  getErrorMessage(formField: string) {
    this.formService.getErrorMessage(formField, this.form);
  }

}
