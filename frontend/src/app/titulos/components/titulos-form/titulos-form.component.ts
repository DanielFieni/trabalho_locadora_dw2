import { Titulo } from './../../../models/titulo';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Ator } from 'src/app/models/ator';
import { FormService } from 'src/app/services/form.service';
import { TituloService } from 'src/app/services/titulo.service';

@Component({
  selector: 'app-titulos-form',
  templateUrl: './titulos-form.component.html',
  styleUrls: ['./titulos-form.component.scss']
})
export class TitulosFormComponent implements OnInit {

  form = this.formBuilder.group({
    _Id: [''],
    name: ['', Validators.required],
    ator: this.formBuilder.array([]),
    diretor: [this.formBuilder.group({
      _id: [''],
      name: ['']
    })],
    ano: [''],
    sinopse: [''],
    categoria: [''],
    classe: [this.formBuilder.group({
      _id: [''],
      name: [''],
      valor: [''],
      prazoDevolucao: ['']
    })]
  })

  constructor(
    private formBuilder: FormBuilder,
    private tituloService: TituloService,
    private route: ActivatedRoute,
    private formService: FormService
  ) {
  }

  ngOnInit(): void {
    const titulo: Titulo = this.route.snapshot.data['titulo'];
    this.form.setValue({
      _Id: titulo._id,
      name: titulo.name,
      ator: this.retrieveAtor(titulo),
      diretor: titulo.diretor,
      ano: titulo.year,
      sinopse: titulo.sinopsys,
      categoria: titulo.category,
      classe: titulo.classe
    })
  }

  private retrieveAtor(titulo: Titulo) {
    const atores = [];
    if(titulo?.ator) {
      titulo.ator.forEach(ator => atores.push(this.createAtor(ator)))
    } else {
      atores.push(this.createAtor());
    }
    return atores
  }

  private createAtor(ator: Ator = {_id: '', name: ''}) {
    return this.formBuilder.group({
      id: [ator._id],
      name: [ator.name]
    })
  }

}
