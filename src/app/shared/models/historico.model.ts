import { Comprovante } from './comprovante.model';

export interface Historico{

    pessoa_id: number;
    nome: string;
    email: string;
    pagador: Comprovante[];
    recebedor: Comprovante[];
}