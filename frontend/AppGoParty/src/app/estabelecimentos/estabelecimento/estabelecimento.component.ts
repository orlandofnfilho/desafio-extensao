
import { Component, OnInit } from '@angular/core';
import { Estabelecimento } from 'src/app/estabelecimentos/Estabelecimento';
import { EstabelecimentoService } from 'src/app/services/estabelecimento.service';

@Component({
  selector: 'app-estabelecimento',
  templateUrl: './estabelecimento.component.html',
  styleUrls: ['./estabelecimento.component.scss']
})
export class EstabelecimentoComponent implements OnInit {
  displayedColumns: string[] = [ 'nome', 'acao'];
  dataSource: Estabelecimento[] = [];

  constructor(private estabelecimentoService: EstabelecimentoService) {}

  ngOnInit() {
    this.getAll();
  }

  public getAll() {
    this.estabelecimentoService.getAll().subscribe((estabelecimentos) => (this.dataSource = estabelecimentos));
  }
}
