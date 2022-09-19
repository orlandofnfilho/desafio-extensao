import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { GeneroService } from 'src/app/services/genero.service';

@Component({
  selector: 'app-genero-editar',
  templateUrl: './genero-editar.component.html',
  styleUrls: ['./genero-editar.component.scss']
})
export class GeneroEditarComponent implements OnInit {
  id: String = '';
  generoForm!: FormGroup;
  nome: String = '';
  isLoadingResults = false;
  constructor(private router: Router, private route: ActivatedRoute, private api: GeneroService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getGenero(this.route.snapshot.params['id']);
    this.generoForm = this.formBuilder.group({
    'nome' : [null, [Validators.required, Validators.minLength(5), Validators.maxLength(60)]]
 });
 }

 getGenero(id: String) {
  this.api.getGenero(id).subscribe(data => {
   this.id = data.id;
     this.generoForm.setValue({
      nome: data.nome
    });
  });
}

updateGenero(form: NgForm) {
  this.isLoadingResults = true;
  this.api.updateGenero(this.id, form)
    .subscribe(res => {
        this.isLoadingResults = false;
        this.router.navigate(['/genero-detalhe/' + this.id]);
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
}
}