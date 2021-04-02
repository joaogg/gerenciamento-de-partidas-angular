import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Matches } from '../models/matches';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'user_token'
    })
};

@Injectable({
    providedIn: 'root'
})

export class MatchesService {

    // Url da Api
    url = 'http://localhost:8080/';
    urlMatches = 'matches/';

    constructor(private httpClient: HttpClient) { }

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }

    // POST Partida
    createMatch(data) {
        httpOptions.headers = httpOptions.headers.set('Authorization', 'Bearer ');
        return this.httpClient.post(this.url + this.urlMatches, data, httpOptions);
    }

    // PUT Partida
    updateMatch(data) {
        httpOptions.headers = httpOptions.headers.set('Authorization', 'Bearer ');
        return this.httpClient.put(this.url + this.urlMatches + data.id, data, httpOptions);
    }

    // DELETE Partida
    deleteMatch(data) {
        httpOptions.headers = httpOptions.headers.set('Authorization', 'Bearer ');
        return this.httpClient.delete(this.url + this.urlMatches + data.id, data);
    }

    // GET Partida
    getMatches(): Observable<Matches[]> {
        return this.httpClient.get<Matches[]>(this.url + this.urlMatches).pipe()
    }

    // Manipulação de erros
    handleError(error: HttpErrorResponse) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Erro ocorreu no lado do client
            errorMessage = error.error.message;
        } else {
            // Erro ocorreu no lado do servidor
            errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
    };
}