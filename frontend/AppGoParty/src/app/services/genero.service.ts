import { Injectable } from '@angular/core';
import { Genero } from '../generos/Genero';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { NgForm } from '@angular/forms';

const apiGenero = 'http://localhost:3000/generos';

const tokenBase64 = localStorage.getItem('token');
const token =  atob(tokenBase64? tokenBase64 : '')? JSON.parse(atob(tokenBase64? tokenBase64 : '')): '';
const httpOptions = { 
  headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
};
@Injectable({
  providedIn: 'root',
})
export class GeneroService {

  constructor(private http: HttpClient) {}

  public getAll(): Observable<Genero[]> {
    return this.http.get<Genero[]>(apiGenero, httpOptions);
  }

  getGenero(id: String): Observable<Genero> {
    const url = `${apiGenero}/${id}`;
    return this.http.get<Genero>(url, httpOptions).pipe(
      tap(_ => console.log(`leu o Genero id=${id}`)),
      catchError(this.handleError<Genero>(`getGenero id=${id}`))
    );
  }

  addGenero (Genero: NgForm): Observable<Genero> {
    return this.http.post<Genero>(apiGenero, Genero, httpOptions).pipe(
      tap((Genero: Genero) => console.log(`adicionou o Genero com w/ id=${Genero.id}`)),
      catchError(this.handleError<Genero>('addGenero'))
    );
  }

  updateGenero(id: String, Genero: NgForm): Observable<any> {
    const url = `${apiGenero}/${id}`;
    return this.http.put(url, Genero, httpOptions).pipe(
      tap(_ => console.log(`atualiza o genero com id=${id}`)),
      catchError(this.handleError<any>('updateGenero'))
    );
  }

  deleteGenero (id: String): Observable<Genero> {
    const url = `${apiGenero}/${id}`;

    return this.http.delete<Genero>(url, httpOptions).pipe(
      tap(_ => console.log(`remove o genero com id=${id}`)),
      catchError(this.handleError<Genero>('deleteGenero'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}