import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Historico } from './../../shared/models/historico.model';
import { Pagamento } from './../../shared/models/pagamento.model';

const API_URL = "http://localhost:3000" 

@Injectable({
    providedIn: 'root'
})
export class PagamentosServices{
    constructor(private httpClient: HttpClient){

    }

    realizarPagamento(pagamento: Pagamento): Observable<Pagamento>{
        return this.httpClient.post<Pagamento>(API_URL + '/pagamentos', pagamento);
    }

    consultarHistorico(idPessoa: number): Observable<Historico>{
        return this.httpClient.get<Historico>(API_URL  + `/pagamentos/detalhar/${idPessoa}`)
    }

}