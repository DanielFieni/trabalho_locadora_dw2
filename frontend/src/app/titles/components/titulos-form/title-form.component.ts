import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Actor } from 'src/app/models/actor';
import { Class } from 'src/app/models/class';
import { ActorService } from 'src/app/services/actor.service';
import { ClassService } from 'src/app/services/class.service';
import { FormService } from 'src/app/services/form.service';
import { TitleService } from 'src/app/services/title.service';
import { Director } from '../../../models/director';
import { Title } from '../../../models/title';
import { DirectorService } from '../../../services/directors.service';

@Component({
  selector: 'app-title-form',
  templateUrl: './title-form.component.html',
  styleUrls: ['./title-form.component.scss']
})
export class TitleFormComponent implements OnInit {

  form!: FormGroup;
  directors: Director[] = [];
  classes: Class[] = [];
  actors: Actor[] = [];
  title: Title = {} as Title;
  exists: boolean = false;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private titleService: TitleService,
    private route: ActivatedRoute,
    private formService: FormService,
    private directorService: DirectorService,
    private classService: ClassService,
    private actorService: ActorService,
  ) {
    this.title = this.route.snapshot.data['title'];
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      _id: new FormControl(''),
      name: new FormControl(''),
      actors: new FormControl(''),
      year: new FormControl(''),
      synopsis: new FormControl(''),
      category: new FormControl(''),
      aclass: new FormControl(''),
      director: new FormControl(''),
    })

    this.exists = this.title._id !== undefined && this.title._id !== null;

    if(this.title) this.form.patchValue(this.title);

    this.fillDirectors();
    this.fillClasses();
    this.fillActors();
  }

  getActorsTitleList() {
    return this.form.value.atores;
  }

  getClassesTitleList() {
    return this.form.value.classe;
  }

  private fillDirectors() {
    this.directorService.list().subscribe({
      next: (director: Director[]) => {
        this.directors.push(...director);
        let value: Director = {} as Director;
        const add = this.directors.find(d1 => d1._id === this.title.director._id)
        if(add) value = add;
        this.form.controls['director'].setValue(value);
      },
      error: error => {
        this.formService.onError(error, "Erro ao carregar Diretores");
      }
    });
  }

  private fillClasses() {
    this.classService.list().subscribe({
      next: (aclass: Class[]) => {
        this.classes.push(...aclass)
        let value: Class = {} as Class;
        const add = this.classes.find(c1 => c1._id === this.title.aclass._id);
        if(add) value = add
        this.form.controls['aclass'].setValue(value);
      },
      error: error => {
        this.formService.onError(error, "Erro ao carregar Classes");
      }
    });
  }

  private fillActors() {
    this.actorService.list().subscribe({
      next: (actors: Actor[]) => {
        const values: Actor[] = [];
        this.actors.push(...actors);
        this.title.actors.forEach( actor => {
          const add = this.actors.find(a2 => a2._id === actor._id);
          if(add) values.push(add);
        })
        this.form.controls['actors'].setValue(values);
      },
      error: error => {
        this.formService.onError(error, "Erro ao carregar Atores");
      }
    });
  }

  getErrorMessage(formField: string) {
    this.formService.getErrorMessage(formField, this.form);
  }

  onSubmit() {
    this.titleService.save(this.form.value).subscribe({
      next: result => this.formService.onSuccess("Titulo"),
      error: error => this.formService.onError(error.error, "Titulo")
    })
  }

  onCancel() {
    this.formService.cancel()
  }

}
