import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

import { EstabelecimentoService } from 'src/app/services/estabelecimento.service';

@Component({
  selector: 'app-estabelecimento-novo',
  templateUrl: './estabelecimento-novo.component.html',
  styleUrls: ['./estabelecimento-novo.component.scss']
})

export class EstabelecimentoNovoComponent implements OnInit {
  estabelecimentoForm!: FormGroup;
  nome: String = '';
  urlLoc: String = '';
  isLoadingResults = false;
  constructor(private router: Router, private api: EstabelecimentoService, private formBuilder: FormBuilder) { }

  ngOnInit() {
     this.estabelecimentoForm = this.formBuilder.group({
    'nome' : [null, [Validators.required, Validators.minLength(5), Validators.maxLength(60)]],
    'urlLoc' : [null, [Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
  });
  }

  addEstabelecimento(form: NgForm) {
    this.isLoadingResults = true;
    this.api.addEstabelecimento(form)
      .subscribe(res => {
          const id = res['id'];
          this.isLoadingResults = false;
          this.router.navigate(['/estabelecimento-detalhe', id]);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }
}
