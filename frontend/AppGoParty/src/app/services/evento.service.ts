import { Injectable } from '@angular/core';
import { Evento } from '../eventos/Evento';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { NgForm } from '@angular/forms';

const tokenBase64 = localStorage.getItem('token');
const token =  atob(tokenBase64? tokenBase64 : '')? JSON.parse(atob(tokenBase64? tokenBase64 : '')): '';
const httpOptions = { 
  headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
};

const apiEvento = 'http://localhost:3000/eventos';
const apiCurtir = 'http://localhost:3000/usuarioeventos';

@Injectable({
  providedIn: 'root',
})
export class EventoService {

  constructor(private http: HttpClient) {}

  public getAll(): Observable<Evento[]> {
    return this.http.get<Evento[]>(apiEvento, httpOptions);
  }

  getEvento(id: String): Observable<Evento> {
    const url = `${apiEvento}/${id}`;
    return this.http.get<Evento>(url, httpOptions).pipe(
      tap(_ => console.log(`leu o Evento id=${id}`)),
      catchError(this.handleError<Evento>(`getEvento id=${id}`))
    );
  }

  addEvento (Evento: NgForm): Observable<Evento> {
    return this.http.post<Evento>(apiEvento, Evento, httpOptions).pipe(
      tap((Evento: Evento) => console.log(`adicionou o Evento com w/ id=${Evento.id}`)),
      catchError(this.handleError<Evento>('addEvento'))
    );
  }

  updateEvento(id: String, Evento: NgForm): Observable<any> {
    const url = `${apiEvento}/${id}`;
    return this.http.put(url, Evento, httpOptions).pipe(
      tap(_ => console.log(`atualiza o evento com id=${id}`)),
      catchError(this.handleError<any>('updateEvento'))
    );
  }

  curtir(Evento: any): Observable<any> {
    return this.http.post(apiCurtir, Evento, httpOptions).pipe(
      tap(_ => console.log(`atualiza o evento com id=${Evento.id}`)),
      catchError(this.handleError<any>('updateEvento'))
    );
  }

  deleteEvento (id: String): Observable<Evento> {
    const url = `${apiEvento}/${id}`;

    return this.http.delete<Evento>(url, httpOptions).pipe(
      tap(_ => console.log(`remove o evento com id=${id}`)),
      catchError(this.handleError<Evento>('deleteEvento'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}