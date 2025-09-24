import { addDays } from 'date-fns';

type Genero =
    | 'Aventura'
    | 'Romance'
    | 'Terror'
    | 'Tecnico'


type EstadoExemplar =
    | 'Disponível'
    | 'Emprestado'
    | 'Danificado'


type EstadoEmprestimo = 
    | 'Ativo'
    | 'Concluído'


export class Livro {
    constructor(
        public titulo: string,
        public autor: string,
        public editora: string,
        public genero: Genero,
        public publicacao: Date
    ) {}
}


export class Exemplar {
    constructor(
        public id: string,
        public livro: Livro,
        public estado: EstadoExemplar = 'Disponível'
    ) {}
}


export class Usuario {
    constructor(
        public id: string,
        public nome: string
    ) {}
}


export class Emprestimo {
    public dataDevida: Date;
    public estado: EstadoEmprestimo;

    constructor(
        public usuario: Usuario,
        public exemplar: Exemplar,
        public dataEmprestimo: Date,
        public dataRetorno: Date | null = null,
    ) {
        if (this.exemplar.estado !== 'Disponível') {
            throw Error('Livro não disponível.');
        }

        this.dataDevida = addDays(this.dataEmprestimo, 14);
        this.estado = 'Ativo';
        this.exemplar.estado = 'Emprestado';
    }
    
    devolver(hoje: Date) {
        this.dataRetorno = hoje;
        this.exemplar.estado = 'Disponível';
        this.estado = 'Concluído';
    }

    emAtraso(hoje: Date): boolean {
        return hoje > this.dataDevida;
    }
}


export class Blibioteca {
    public emprestimos: Emprestimo[] = [];

    realizarEmprestimo(usuario: Usuario, exemplar: Exemplar) {
        const emprestimosAtivosDoUsuario = this.emprestimos.filter(
            e => e.estado === 'Ativo' && e.usuario === usuario
        )

        if (emprestimosAtivosDoUsuario.length >= 3) {
            throw new Error('Usuário excedeu o número de empréstimos');
        }

        const emprestimo = new Emprestimo(
            usuario,
            exemplar,
            new Date()
        );

        this.emprestimos.push(emprestimo);

        return emprestimo;
    }
}