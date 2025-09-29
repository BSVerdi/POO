import { Livro } from "./livro"

type statusExemplar = 
    | 'Disponível'
    | 'Emprestado'
    | 'Danificado'
    | 'Reservado'

export type estadoExemplar = 
    | 'Ativo'
    | 'concluido'

    
export class Exemplar {
    public status: statusExemplar = 'Disponível';

    constructor(
        public readonly id: string,
        public livro: Livro
    ) {}
}