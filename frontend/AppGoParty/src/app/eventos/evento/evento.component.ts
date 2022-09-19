
import { Component, OnInit } from '@angular/core';
import { Evento } from 'src/app/eventos/Evento';
import { EventoService } from 'src/app/services/evento.service';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.scss']
})
export class EventoComponent implements OnInit {
  displayedColumns: string[] = [ 'nome', 'atracao', 'acao'];
  dataSource: Evento[] = [];

  constructor(private eventoService: EventoService) {}

  ngOnInit() {
    this.getAll();
  }

  public getAll() {
    this.eventoService.getAll().subscribe((eventos) => (this.dataSource = eventos));
  }
}
