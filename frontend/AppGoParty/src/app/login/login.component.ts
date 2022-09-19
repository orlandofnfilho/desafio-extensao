import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  email: String = '';
  senha: String = '';
  isLoadingResults = false;
  constructor(private router: Router, private snackBar: MatSnackBar, private api: LoginService, private formBuilder: FormBuilder) { }


  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      'email' : [null, [Validators.required, Validators.minLength(5), Validators.maxLength(60)]],
      'senha' : [null, [Validators.required, Validators.minLength(5), Validators.maxLength(60)]],
    });
  }

  login(form: NgForm) {
    this.isLoadingResults = true;
    this.api.login(form)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.router.navigate(['/dashboard']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
          this.snackBar.open('Falha na autenticação', 'Usuário ou senha incorretos.', {
            duration: 3000
          });
        });
  }
}
