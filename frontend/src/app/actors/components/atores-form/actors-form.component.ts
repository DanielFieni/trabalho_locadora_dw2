import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ActorService } from 'src/app/services/actor.service';
import { FormService } from 'src/app/services/form.service';
import { Actor } from '../../../models/actor';

@Component({
  selector: 'app-actors-form',
  templateUrl: './actors-form.component.html',
  styleUrls: ['./actors-form.component.scss'],
})
export class ActorsFormComponent implements OnInit {

  form = this.formBuilder.group({
    _id: [''],
    name: ['', Validators.required],
  });

  constructor(
      private formBuilder: NonNullableFormBuilder,
      private route: ActivatedRoute,
      private formService: FormService,
      private actorService: ActorService,
    ) {
  }

  ngOnInit(): void {
    const ator: Actor = this.route.snapshot.data['ator'];
    this.form.setValue({
      _id: ator._id,
      name: ator.name
    })
  }

  onSubmit() {
    this.actorService.save(this.form.value).subscribe({
      next: result => this.formService.onSuccess("Ator"),
      error: error => {this.formService.onError(error.error, "Ator")}
    })
  }

  onCancel() {
    this.formService.cancel();
  }

  getErrorMessage(fieldName: string){
    this.formService.getErrorMessage(fieldName, this.form);
  }

}
