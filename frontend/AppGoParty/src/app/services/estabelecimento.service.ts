import { Injectable } from '@angular/core';
import { Estabelecimento } from '../estabelecimentos/Estabelecimento';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { NgForm } from '@angular/forms';

const tokenBase64 = localStorage.getItem('token');
const token =  atob(tokenBase64? tokenBase64 : '')? JSON.parse(atob(tokenBase64? tokenBase64 : '')): '';
const httpOptions = { 
  headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
};

const apiEstabelecimento = 'http://localhost:3000/estabelecimentos';

@Injectable({
  providedIn: 'root',
})
export class EstabelecimentoService {

  constructor(private http: HttpClient) {}

  public getAll(): Observable<Estabelecimento[]> {
    return this.http.get<Estabelecimento[]>(apiEstabelecimento, httpOptions);
  }

  getEstabelecimento(id: String): Observable<Estabelecimento> {
    const url = `${apiEstabelecimento}/${id}`;
    return this.http.get<Estabelecimento>(url, httpOptions).pipe(
      tap(_ => console.log(`leu o Estabelecimento id=${id}`)),
      catchError(this.handleError<Estabelecimento>(`getEstabelecimento id=${id}`))
    );
  }

  addEstabelecimento (Estabelecimento: NgForm): Observable<Estabelecimento> {
    return this.http.post<Estabelecimento>(apiEstabelecimento, Estabelecimento, httpOptions).pipe(
      tap((Estabelecimento: Estabelecimento) => console.log(`adicionou o Estabelecimento com w/ id=${Estabelecimento.id}`)),
      catchError(this.handleError<Estabelecimento>('addEstabelecimento'))
    );
  }

  updateEstabelecimento(id: String, Estabelecimento: NgForm): Observable<any> {
    const url = `${apiEstabelecimento}/${id}`;
    return this.http.put(url, Estabelecimento, httpOptions).pipe(
      tap(_ => console.log(`atualiza o estabelecimento com id=${id}`)),
      catchError(this.handleError<any>('updateEstabelecimento'))
    );
  }

  deleteEstabelecimento (id: String): Observable<Estabelecimento> {
    const url = `${apiEstabelecimento}/${id}`;

    return this.http.delete<Estabelecimento>(url, httpOptions).pipe(
      tap(_ => console.log(`remove o estabelecimento com id=${id}`)),
      catchError(this.handleError<Estabelecimento>('deleteEstabelecimento'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}