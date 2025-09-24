type statusUsuario =
    | 'Normal'
    | 'Bloqueado'


export class Usuario {
    constructor (
        public readonly id: string,
        public nome: string,
        public dataFimBloqueio: Date | null = null,
        public status: statusUsuario = 'Normal'
    ) {}
}