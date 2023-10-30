import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, UntypedFormArray } from '@angular/forms';
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
  }

  ngOnInit(): void {
    const titulo: Titulo = this.route.snapshot.data['titulo'];

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

    this.exists = titulo._id !== undefined && titulo._id !== null;

    if(titulo) this.form.patchValue(titulo);

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
    this.diretorService.list()
      .subscribe(
        (diretor: Diretor[]) => {
          this.diretores.push(...diretor)
        },
        error => {
          this.formService.onError(error, "Erro ao carregar Diretores");
        }
      );
  }

  private fillClasses() {
    this.classeService.list()
      .subscribe(
        (classe: Classe[]) => {
          this.classes.push(...classe)
        },
        error => {
          this.formService.onError(error, "Erro ao carregar Classes");
        }
      );
  }

  private fillAtores() {
    this.atorService.list().subscribe({
      next: (ator: Ator[]) => {
        this.atores.push(...ator);
      },
      error: error => {
        this.formService.onError(error, "Erro ao carregar Atores");
      }
    })
  }

  getErrorMessage(formField: string) {
    this.formService.getErrorMessage(formField, this.form);
  }

  onSubmit() {
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
