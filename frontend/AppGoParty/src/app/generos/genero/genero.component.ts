
import { Component, OnInit } from '@angular/core';
import { Genero } from 'src/app/generos/Genero';
import { GeneroService } from 'src/app/services/genero.service';

@Component({
  selector: 'app-genero',
  templateUrl: './genero.component.html',
  styleUrls: ['./genero.component.scss']
})
export class GeneroComponent implements OnInit {
  displayedColumns: string[] = [ 'nome', 'acao'];
  dataSource: Genero[] = [];

  constructor(private generoService: GeneroService) {}

  ngOnInit() {
    this.getAll();
  }

  public getAll() {
    this.generoService.getAll().subscribe((generos) => (this.dataSource = generos));
  }
}
