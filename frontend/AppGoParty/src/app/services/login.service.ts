import { Injectable } from '@angular/core';
import { Login } from '../login/Login';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

const tokenBase64 = localStorage.getItem('token');
const token =  atob(tokenBase64? tokenBase64 : '')? JSON.parse(atob(tokenBase64? tokenBase64 : '')): '';
const httpOptions = { 
  headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
};

const apiLogin = 'http://localhost:3000/login';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  constructor(private router: Router, private http: HttpClient) {}

  public getAll(): Observable<Login[]> {
    return this.http.get<Login[]>(apiLogin);
  }

  login (Login: NgForm): Observable<Login> {
    return this.http.post<Login>(apiLogin, Login, httpOptions).pipe(
      tap((Login: Login) => {
      if(!Login.access_token) return;
      localStorage.setItem('token', btoa(JSON.stringify(Login.access_token)));
      localStorage.setItem('usuario', btoa(JSON.stringify(Login.email)));
      this.router.navigate(['dashboard']);})
    );
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['home']);
  }

  get logado(): boolean {
    return localStorage.getItem('token') ? true : false;
  }
  
    get obterTokenUsuario(): string {
    let token = localStorage.getItem('token');
    return token
      ? JSON.parse(atob(token))
      : null;
  }
}