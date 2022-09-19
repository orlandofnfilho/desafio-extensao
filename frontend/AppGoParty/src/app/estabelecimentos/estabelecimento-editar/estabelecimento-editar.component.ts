import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { EstabelecimentoService } from 'src/app/services/estabelecimento.service';

@Component({
  selector: 'app-estabelecimento-editar',
  templateUrl: './estabelecimento-editar.component.html',
  styleUrls: ['./estabelecimento-editar.component.scss']
})
export class EstabelecimentoEditarComponent implements OnInit {
  id: String = '';
  estabelecimentoForm!: FormGroup;
  nome: String = '';
  urlLoc: String = '';
  isLoadingResults = false;
  constructor(private router: Router, private route: ActivatedRoute, private api: EstabelecimentoService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getEstabelecimento(this.route.snapshot.params['id']);
    this.estabelecimentoForm = this.formBuilder.group({
    'nome' : [null, [Validators.required, Validators.minLength(5), Validators.maxLength(60)]],
    'urlLoc' : [null, [Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
 });
 }

 getEstabelecimento(id: String) {
  this.api.getEstabelecimento(id).subscribe(data => {
   this.id = data.id;
     this.estabelecimentoForm.setValue({
      nome: data.nome,
      urlLoc: data.urlLoc
    });
  });
}

updateEstabelecimento(form: NgForm) {
  this.isLoadingResults = true;
  this.api.updateEstabelecimento(this.id, form)
    .subscribe(res => {
        this.isLoadingResults = false;
        this.router.navigate(['/estabelecimento-detalhe/' + this.id]);
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
}
}