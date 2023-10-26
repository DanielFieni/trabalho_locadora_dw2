import { Diretor } from './../../../models/diretor';
import { DiretoresService } from './../../../services/diretores.service';
import { Titulo } from './../../../models/titulo';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NonNullableFormBuilder, UntypedFormArray, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Ator } from 'src/app/models/ator';
import { FormService } from 'src/app/services/form.service';
import { TituloService } from 'src/app/services/titulo.service';
import { Classe } from 'src/app/models/classe';
import { ClasseService } from 'src/app/services/classe.service';
import { AtoresRoutingModule } from 'src/app/atores/atores-routing.module';
import { AtoresService } from 'src/app/services/atores.service';

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
  diretorControl: FormControl = new FormControl();
  classeControl: FormControl = new FormControl();
  // atorControl: FormControl = new FormControl();

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
      _Id: titulo._id,
      name: titulo.name,
      ator: this.formBuilder.array(this.retrieveAtor(titulo)),
      year: [titulo.year],
      synopsis: [titulo.synopsis],
      category: [titulo.category],
      classe: [titulo.classe],
      diretor: [titulo.diretor]
    })

    console.log(this.form.value);

    this.fillDiretores();
    this.fillClasses();
    this.fillAtores();

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
    this.atorService.list()
      .subscribe(
        (ator: Ator[]) => {
          this.atores.push(...ator);
        },
        error => {
          this.formService.onError(error, "Erro ao carregar Atores");
        }
      );
  }

  private retrieveAtor(titulo: Titulo) {
    const atores = [];
    if(titulo?.atores) {
      titulo.atores.forEach(ator => atores.push(this.createAtor(ator)));
    } else {
      atores.push(this.createAtor());
    }
    return atores;
  }

  private createAtor(ator: Ator = {_id: '', name: ''}) {
    return this.formBuilder.group({
      id: [ator._id],
      name: [ator.name]
    })
  }

  getErrorMessage(formField: string) {
    this.formService.getErrorMessage(formField, this.form);
  }

  onSubmit() {
    console.log(this.form.value);
    this.tituloService.save(this.form.value).subscribe(result => this.formService.onSuccess("Titulo"),
      error => {
        this.formService.onError(error.error.message, "Titulo");
      }
    )
  }

  onCancel() {
    this.formService.cancel()
  }

  getAtorFormArray() {
    return (this.form.get('ator') as FormArray).controls;
  }

}
