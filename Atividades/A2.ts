type statusLivro =
    | 'Disponivel'
    | 'Emprestado'
    | 'Danificado'


class Usuario {
    constructor (
        public readonly id: string,
        public nome: string
    ) {}
}


class Livro {
    constructor (
        public titulo: string,
        public autor: string,
        public editora: string,
        public genero: string,
        public ano: Date
    ) {}
}


class Exemplar {
    status: statusLivro = 'Disponivel'
    blibioteca: Blibioteca | null = null

    constructor (
        public readonly id: string,
        public exemplar: Livro
    ) {}
}


class Emprestimo {
    estado: 'Ativo' | 'Concluido' | 'Rascunho' = 'Rascunho'
    inicio?: Date
    fim?: Date
    exemplar?: Exemplar

    constructor (
        public readonly id: string
        public readonly usuario: Usuario
    ) {}

    iniciar(exemplar: Exemplar, data_inicio: Date) {
        if (this.estado !== 'Rascunho') {
            throw Error('Emprestimo já realizado')
        }

        this.exemplar = exemplar
        this.inicio = data_inicio
        this.estado = 'Ativo'
    }

    concluir(data_fim: Date) {
        if (this.estado !== 'Ativo') {
            throw Error('Não há empréstimo')
        }

        this.fim = data_fim
        this.estado = 'Concluido'
    }

    diasAtrado(): number {
        let dias = Math.max(0, Math.ceil(this.fim.getTime() - this.inicio.getDate()) / 1000 * 60 * 60 * 24)

        if (dias <= 14) {
            return 0;
        } else {
            return 1;
        }
    }
}


class Blibioteca {
    constructor (
        public usuarios: Map<string, Usuario>,
        public exemplares: Map<string, Exemplar>,
        public emprestimos: Map<string, Emprestimo>
    ) {}

    emprestar (
        usuarioId: string,
        exemplar: Exemplar,
        agora: Date = new Date()
    ) {
        const usuario = this.usuarios.get(usuarioId)
        
        if (!usuario) {
            throw new Error('Usuário não encontrado')
        }

        const emprestimo = new Emprestimo(
            `${usuarioId}-${agora}`, usuario
        )

        emprestimo.iniciar(exemplar, agora)
        this.emprestimos.set(emprestimo.id, emprestimo)

        return emprestimo
    }

    concluirEmprestimo(
        usuarioId: string,
        agora: Date = new Date()
    ) {
        const emprestimo = Array.from(this.emprestimos.values()).find(
            (e) => e.usuario.id === usuarioId && e.estado === 'Ativo'
        )
    }
}