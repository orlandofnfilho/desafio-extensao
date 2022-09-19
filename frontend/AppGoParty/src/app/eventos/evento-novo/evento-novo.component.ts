import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

import { EventoService } from 'src/app/services/evento.service';
import { GeneroService } from 'src/app/services/genero.service';
import { Genero } from 'src/app/generos/Genero';
import { Estabelecimento } from 'src/app/estabelecimentos/Estabelecimento';
import { EstabelecimentoService } from 'src/app/services/estabelecimento.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-evento-novo',
  templateUrl: './evento-novo.component.html',
  styleUrls: ['./evento-novo.component.scss']
})

export class EventoNovoComponent implements OnInit {
  eventoForm!: FormGroup;
  nome: String = '';
  atracao: String = '';
  data: String = '';
  generoId: String = '';
  estabelecimentoId: String = '';
  descricao: String = '';
  urlImagem: String = '';
  urlIngresso: String = '';
  genero = {} as Genero;
  generos: Genero[] = [];
  estabelecimento = {} as Estabelecimento;
  estabelecimentos: Estabelecimento[] = [];
  isLoadingResults = false;
  constructor(private router: Router, private api: EventoService, private formBuilder: FormBuilder, private generoService: GeneroService, private estabelecimentoService: EstabelecimentoService) { }

  ngOnInit() {
     this.getGeneros();
     this.getEstabelecimentos();
     this.eventoForm = this.formBuilder.group({
    'nome' : [null, [Validators.required, Validators.minLength(5), Validators.maxLength(60)]],
    'atracao' : [null, [Validators.required, Validators.minLength(5), Validators.maxLength(60)]],
    'data' : [null, [Validators.required, Validators.minLength(5), Validators.maxLength(60)]],
    //'data': [formatDate(data, 'dd/MM/yyyy', 'pt'), [Validators.required]],
    'generoId' : [null, [Validators.required]],
    'estabelecimentoId' : [null, [Validators.required]],
    'descricao' : [null, [Validators.required, Validators.minLength(5), Validators.maxLength(400)]],
    'urlImagem' : [null, [Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
    'urlIngresso' : [null, [Validators.required, Validators.minLength(5), Validators.maxLength(200)]]
  });
  }

  // Chama o serviço para obtém todos os generos
  getGeneros() {
      this.generoService.getAll().subscribe((generos: Genero[]) => {
      this.generos = generos;
    });
  } 

  getEstabelecimentos() {
    this.estabelecimentoService.getAll().subscribe((estabelecimentos: Estabelecimento[]) => {
    this.estabelecimentos = estabelecimentos;
  });
  } 

  addEvento(form: NgForm) {
    this.isLoadingResults = true;
    this.api.addEvento(form)
      .subscribe(res => {
          const id = res['id'];
          this.isLoadingResults = false;
          this.router.navigate(['/evento-detalhe', id]);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }
}
