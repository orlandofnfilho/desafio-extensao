import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { EventoService } from 'src/app/services/evento.service';
import { Genero } from 'src/app/generos/Genero';
import { Estabelecimento } from 'src/app/estabelecimentos/Estabelecimento';
import { GeneroService } from 'src/app/services/genero.service';
import { EstabelecimentoService } from 'src/app/services/estabelecimento.service';

@Component({
  selector: 'app-evento-editar',
  templateUrl: './evento-editar.component.html',
  styleUrls: ['./evento-editar.component.scss']
})
export class EventoEditarComponent implements OnInit {
  id: String = '';
  eventoForm!: FormGroup;
  nome: String = '';
  atracao: String = '';
  data: String = '';
  generoId: String = '';
  estabelecimentoId: String = '';
  descricao: String = '';
  urlImagem: String = '';
  urlIngresso: String = '';
  generos: Genero[] = [];
  genero = {} as Genero;
  estabelecimento = {} as Estabelecimento;
  estabelecimentos: Estabelecimento[] = [];
  isLoadingResults = false;
  constructor(private router: Router, private route: ActivatedRoute, private api: EventoService, private formBuilder: FormBuilder, private generoService: GeneroService, private estabelecimentoService: EstabelecimentoService) { }

  ngOnInit() {
    this.getGeneros();
    this.getEstabelecimentos();
    this.getEvento(this.route.snapshot.params['id']);
    this.eventoForm = this.formBuilder.group({
    'nome' : [null, [Validators.required, Validators.minLength(5), Validators.maxLength(60)]],
    'atracao' : [null, [Validators.required, Validators.minLength(5), Validators.maxLength(60)]],
    'data' : [null, [Validators.required, Validators.minLength(5), Validators.maxLength(60)]],
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

 getEvento(id: String) {
  this.api.getEvento(id).subscribe(data => {
   this.id = data.id;
     this.eventoForm.setValue({
      nome: data.nome,
      atracao: data.atracao,
      data: data.data,
      generoId: data.generoId,
      estabelecimentoId: data.estabelecimentoId,
      descricao: data.descricao,
      urlImagem: data.urlImagem,
      urlIngresso: data.urlIngresso,
    });
  });
}

updateEvento(form: NgForm) {
  this.isLoadingResults = true;
  this.api.updateEvento(this.id, form)
    .subscribe(res => {
        this.isLoadingResults = false;
        this.router.navigate(['/evento-detalhe/' + this.id]);
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
}
}