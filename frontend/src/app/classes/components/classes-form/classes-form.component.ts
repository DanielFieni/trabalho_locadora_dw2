import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormService } from 'src/app/services/form.service';
import { Class } from '../../../models/class';
import { ClassService } from '../../../services/class.service';

@Component({
  selector: 'app-classes-form',
  templateUrl: './classes-form.component.html',
  styleUrls: ['./classes-form.component.scss']
})
export class ClassesFormComponent implements OnInit {

  form = this.formBuilder.group({
    _id: [''],
    name: ['', Validators.required],
    valueClass: ['', Validators.required],
    returnDate: ['', Validators.required]
  });

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private classService: ClassService,
    private route: ActivatedRoute,
    private formService: FormService,
  ){
  }

  ngOnInit(): void {
    const classe: Class = this.route.snapshot.data['classe'];
    this.form.setValue({
      _id: classe._id,
      name: classe.name,
      valueClass: classe.valueClass,
      returnDate: classe.returnDate
    })
  }

  onSubmit() {
    this.classService.save(this.form.value).subscribe({
      next: result => this.formService.onSuccess("Classe"),
      error: error => this.formService.onError(error.error, "Classe")
    });
  }

  onCancel() {
    this.formService.cancel()
  }


  getErrorMessage(formField: string) {
    this.formService.getErrorMessage(formField, this.form);
  }


}
