import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventoService } from 'src/app/services/evento.service';
import { Evento } from 'src/app/eventos/Evento';

@Component({
  selector: 'app-evento-detalhe',
  templateUrl: './evento-detalhe.component.html',
  styleUrls: ['./evento-detalhe.component.scss']
})
export class EventoDetalheComponent implements OnInit {
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

  deleteEvento(id: any) {
    this.isLoadingResults = true;
    this.api.deleteEvento(id)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.router.navigate(['/eventos']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }
}
