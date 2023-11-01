import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Ator } from 'src/app/models/ator';
import { Classe } from 'src/app/models/classe';
import { AtoresService } from 'src/app/services/atores.service';
import { ClasseService } from 'src/app/services/classe.service';
import { FormService } from 'src/app/services/form.service';
import { TituloService } from 'src/app/services/titulo.service';
import { Diretor } from './../../../models/diretor';
import { Titulo } from './../../../models/titulo';
import { DiretoresService } from './../../../services/diretores.service';

@Component({
  selector: 'app-titulos-form',
  templateUrl: './titulos-form.component.html',
  styleUrls: ['./titulos-form.component.scss']
})
export class TitulosFormComponent implements OnInit {

  form!: FormGroup;
  diretores: Diretor[] = [];
  classes: Classe[] = [];
  atores: Ator[] = [];
  titulo: Titulo = {} as Titulo;
  exists: boolean = false;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private tituloService: TituloService,
    private route: ActivatedRoute,
    private formService: FormService,
    private diretorService: DiretoresService,
    private classeService: ClasseService,
    private atorService: AtoresService,
  ) {
    this.titulo = this.route.snapshot.data['titulo']
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      _id: new FormControl(''),
      name: new FormControl(''),
      atores: new FormControl(''),
      year: new FormControl(''),
      synopsis: new FormControl(''),
      category: new FormControl(''),
      classe: new FormControl(''),
      diretor: new FormControl(''),
    })

    this.exists = this.titulo._id !== undefined && this.titulo._id !== null;

    if(this.titulo) this.form.patchValue(this.titulo);

    this.fillDiretores();
    this.fillClasses();
    this.fillAtores();

  }

  getAtoresTituloList() {
    return this.form.value.atores;
  }

  getClassesTituloList() {
    return this.form.value.classe;
  }

  private fillDiretores() {
    this.diretorService.list().subscribe({
      next: (diretor: Diretor[]) => {
        this.diretores.push(...diretor);
        let value: Diretor = {} as Diretor;
        this.diretores.forEach(diretor => {
          const add = this.titulo.diretor = diretor;
          if(add) value = add;
        })
        this.form.controls['diretor'].setValue(value);
      },
      error: error => {
        this.formService.onError(error, "Erro ao carregar Diretores");
      }
    });
  }

  private fillClasses() {
    this.classeService.list().subscribe({
      next: (classe: Classe[]) => {
        this.classes.push(...classe)
        let value: Classe = {} as Classe
        this.classes.forEach(classe => {
          const add = this.titulo.classe = classe;
          if(add) value = add;
        })
        this.form.controls['classe'].setValue(value);
      },
      error: error => {
        this.formService.onError(error, "Erro ao carregar Classes");
      }
    });
  }

  private fillAtores() {
    this.atorService.list().subscribe({
      next: (atores: Ator[]) => {
        const values: Ator[] = [];
        this.atores.push(...atores);
        this.titulo.atores.forEach( ator => {
          const add = this.atores.find(a2 => a2._id === ator._id);
          if(add) values.push(add);
        })
        this.form.controls['atores'].setValue(values);
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
    console.log(this.form.value)
    this.tituloService.save(this.form.value).subscribe(result => this.formService.onSuccess("Titulo"),
      error => {
        this.formService.onError(error.error.message, "Titulo");
      }
    )
  }

  onCancel() {
    this.formService.cancel()
  }

}
