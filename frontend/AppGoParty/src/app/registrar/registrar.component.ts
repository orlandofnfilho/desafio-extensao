import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {
  registrarForm!: FormGroup;
  nome: String = '';
  email: String = '';
  senha: String = '';
  isLoadingResults = false;
  constructor(private router: Router, private api: UsuarioService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.registrarForm = this.formBuilder.group({
      'nome' : [null, [Validators.required, Validators.minLength(5), Validators.maxLength(60)]],
      'email' : [null, [Validators.required, Validators.minLength(5), Validators.maxLength(60)]],
      'senha' : [null, [Validators.required, Validators.minLength(5), Validators.maxLength(60)]],
    });
  }

  addUsuario(form: NgForm) {
    this.isLoadingResults = true;
    this.api.addUsuario(form)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.router.navigate(['/login']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }

}
