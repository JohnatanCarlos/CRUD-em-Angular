import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { Observable } from 'rxjs';
import {Pessoa} from './../../shared/models/pessoa.model'

const API_URL = 'http://localhost:3000';

@Injectable({
    providedIn: 'root'
})
export class PessoasServices{
    constructor(private http: HttpClient){
        
    }

    listarTodasPessoas(): Observable<Pessoa[]>{
        return this.http.get<Pessoa[]>(API_URL + '/pessoas');
    }

    cadastrarPessoa(pessoa: Pessoa): Observable<Pessoa>{
        return this.http.post<Pessoa>(API_URL + '/pessoas', pessoa);
    }

    deletarPessoa(idPessoa: number): Observable<Pessoa>{
        return this.http.delete<Pessoa>(API_URL + `/pessoas/${idPessoa}`);
    }

    buscarPessoaPorId(idPessoa: number): Observable<Pessoa>{
        return this.http.get<Pessoa>(API_URL + `/pessoas/${idPessoa}`);
    }

    atualizarPessoa(idPessoa: number,  pessoa: Pessoa): Observable<Pessoa>{
        return this.http.patch<Pessoa>(API_URL + `/pessoas/${idPessoa}`, pessoa );
    }

}