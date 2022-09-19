import { Component, OnInit } from '@angular/core';
import { EventoService } from 'src/app/services/evento.service';
import { Evento } from 'src/app/eventos/Evento';
import { NgForm } from '@angular/forms';
import { ExcelService } from 'src/app/services/excel.service';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.sass']
})
export class RelatorioComponent implements OnInit {

  evento = {} as Evento;
  eventos: Evento[] = [];

  constructor(private eventoService: EventoService, private excelService:ExcelService) {}

  ngOnInit(): void {
    this.getEventos();
  }
    // Chama o serviço para obtém todos os eventos
    getEventos() {
      this.eventoService.getAll().subscribe((eventos: Evento[]) => {
      this.eventos = eventos;
      });
    } 

  // limpa o formulario
  cleanForm(form: NgForm) {
    form.resetForm();
  }

  exportCoursesAsXLSX():void {
    this.excelService.exportAsExcelFile(this.eventos, 'eventos');
  }
}
