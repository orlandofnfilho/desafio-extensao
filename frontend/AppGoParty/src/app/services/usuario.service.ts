import { Injectable } from '@angular/core';
import { Usuario } from '../registrar/Usuario';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { NgForm } from '@angular/forms';

const tokenBase64 = localStorage.getItem('token');
const token =  atob(tokenBase64? tokenBase64 : '')? JSON.parse(atob(tokenBase64? tokenBase64 : '')): '';
const httpOptions = { 
  headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
};

const apiUsuario = 'http://localhost:3000/usuarios';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {

  constructor(private http: HttpClient) {}

  public getAll(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(apiUsuario, httpOptions);
  }

  getUsuario(id: String): Observable<Usuario> {
    const url = `${apiUsuario}/${id}`;
    return this.http.get<Usuario>(url, httpOptions).pipe(
      tap(_ => console.log(`leu o Usuario id=${id}`)),
      catchError(this.handleError<Usuario>(`getUsuario id=${id}`))
    );
  }

  addUsuario (Usuario: NgForm): Observable<Usuario> {
    return this.http.post<Usuario>(apiUsuario, Usuario, httpOptions).pipe(
      tap((Usuario: Usuario) => console.log(`adicionou o Usuario com w/ id=${Usuario.id}`)),
      catchError(this.handleError<Usuario>('addUsuario'))
    );
  }

  updateUsuario(id: String, Usuario: NgForm): Observable<any> {
    const url = `${apiUsuario}/${id}`;
    return this.http.put(url, Usuario, httpOptions).pipe(
      tap(_ => console.log(`atualiza o usuario com id=${id}`)),
      catchError(this.handleError<any>('updateUsuario'))
    );
  }

  deleteUsuario (id: String): Observable<Usuario> {
    const url = `${apiUsuario}/${id}`;

    return this.http.delete<Usuario>(url, httpOptions).pipe(
      tap(_ => console.log(`remove o usuario com id=${id}`)),
      catchError(this.handleError<Usuario>('deleteUsuario'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}