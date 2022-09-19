import { Component, OnInit } from '@angular/core';

import { Evento } from 'src/app/eventos/Evento';

import { EventoService } from 'src/app/services/evento.service';

import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public filtro!: String;
  eventos: Evento[] = [];
  eventosFiltro: Evento[] = [];

  constructor(private snackBar: MatSnackBar, private router: Router, private eventoService: EventoService) {}

  ngOnInit() {
    this.getAll();
  }

  public getAll() {
    this.eventoService.getAll().subscribe((eventos) => ((this.eventos = eventos) && (this.eventosFiltro = eventos)));
  }

  buscar() {
    if (this.filtro && this.filtro !== '') {
      this.eventosFiltro = this.eventos.filter(evento => {
        return evento.atracao.toLowerCase().includes(this.filtro.toLowerCase());
      });
    } else {
      this.eventosFiltro = this.eventos;
    }
  }

  curtir(usuarioId: String, eventoId: String) {
    const tokenBase64 = localStorage.getItem('token');
    if (tokenBase64){
      const token =  atob(tokenBase64? tokenBase64 : '')? JSON.parse(atob(tokenBase64? tokenBase64 : '')): '';
      let tokenDecode = JSON.parse(atob(token.split('.')[1]));
      const evento = { usuarioId: tokenDecode.sub, eventoId: eventoId };
      this.eventoService.curtir(evento)
        .subscribe(res => {
            this.getAll();
          }, (err) => {
            console.log(err);
          }
        );
    } else {
      this.snackBar.open('Não é possível curtir', 'Realize Login primeiro!', {
        duration: 3000
      });
    }
  }
}
