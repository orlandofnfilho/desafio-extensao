import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GeneroService } from 'src/app/services/genero.service';
import { Genero } from 'src/app/generos/Genero';

@Component({
  selector: 'app-genero-detalhe',
  templateUrl: './genero-detalhe.component.html',
  styleUrls: ['./genero-detalhe.component.scss']
})
export class GeneroDetalheComponent implements OnInit {
  genero: Genero = {
    id: '', nome: ''
  };
  isLoadingResults = true;
  constructor(private router: Router, private route: ActivatedRoute, private api: GeneroService) { }


  ngOnInit() {
    this.getGenero(this.route.snapshot.params['id']);
  }

  getGenero(id: String) {
    this.api.getGenero(id)
      .subscribe(data => {
        this.genero = data;
        console.log(this.genero);
        this.isLoadingResults = false;
      });
  }

  deleteGenero(id: any) {
    this.isLoadingResults = true;
    this.api.deleteGenero(id)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.router.navigate(['/generos']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }
}
