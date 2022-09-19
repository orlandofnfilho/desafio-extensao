import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EstabelecimentoService } from 'src/app/services/estabelecimento.service';
import { Estabelecimento } from 'src/app/estabelecimentos/Estabelecimento';

@Component({
  selector: 'app-estabelecimento-detalhe',
  templateUrl: './estabelecimento-detalhe.component.html',
  styleUrls: ['./estabelecimento-detalhe.component.scss']
})
export class EstabelecimentoDetalheComponent implements OnInit {
  estabelecimento: Estabelecimento = {
    id: '', 
    nome: '',
    urlLoc: ''
  };
  isLoadingResults = true;
  constructor(private router: Router, private route: ActivatedRoute, private api: EstabelecimentoService) { }


  ngOnInit() {
    this.getEstabelecimento(this.route.snapshot.params['id']);
  }

  getEstabelecimento(id: String) {
    this.api.getEstabelecimento(id)
      .subscribe(data => {
        this.estabelecimento = data;
        console.log(this.estabelecimento);
        this.isLoadingResults = false;
      });
  }

  deleteEstabelecimento(id: any) {
    this.isLoadingResults = true;
    this.api.deleteEstabelecimento(id)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.router.navigate(['/estabelecimentos']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }
}
