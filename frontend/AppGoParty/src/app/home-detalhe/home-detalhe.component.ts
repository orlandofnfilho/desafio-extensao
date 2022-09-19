import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventoService } from 'src/app/services/evento.service';
import { Evento } from 'src/app/eventos/Evento';

@Component({
  selector: 'app-home-detalhe',
  templateUrl: './home-detalhe.component.html',
  styleUrls: ['./home-detalhe.component.css']
})
export class HomeDetalheComponent implements OnInit {
  evento: Evento = {
    id: '', nome: '', atracao: '',
    descricao: '',
    data: '',
    urlImagem: '',
    urlIngresso: '',
    generoId: '',
    estabelecimentoId: '',
    genero: {
      nome: ''
    },
    estabelecimento: {
      nome: ''
    },
    curtidas: 0
  };
  isLoadingResults = true;
  constructor(private router: Router, private route: ActivatedRoute, private api: EventoService) { }


  ngOnInit() {
    this.getEvento(this.route.snapshot.params['id']);
  }

  getEvento(id: String) {
    this.api.getEvento(id)
      .subscribe(data => {
        this.evento = data;
        console.log(this.evento);
        this.isLoadingResults = false;
      });
  }


}
