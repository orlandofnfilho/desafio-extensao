import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

import { GeneroService } from 'src/app/services/genero.service';

@Component({
  selector: 'app-genero-novo',
  templateUrl: './genero-novo.component.html',
  styleUrls: ['./genero-novo.component.scss']
})

export class GeneroNovoComponent implements OnInit {
  generoForm!: FormGroup;
  nome: String = '';
  isLoadingResults = false;
  constructor(private router: Router, private api: GeneroService, private formBuilder: FormBuilder) { }

  ngOnInit() {
     this.generoForm = this.formBuilder.group({
    'nome' : [null, [Validators.required, Validators.minLength(5), Validators.maxLength(60)]],
  });
  }

  addGenero(form: NgForm) {
    this.isLoadingResults = true;
    this.api.addGenero(form)
      .subscribe(res => {
          const id = res['id'];
          this.isLoadingResults = false;
          this.router.navigate(['/genero-detalhe', id]);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }
}
