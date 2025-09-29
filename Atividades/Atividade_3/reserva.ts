import { Exemplar } from "./exemplar";
import { Usuario } from "./usuario";

type statusReserva = 
    | 'Ativa'
    | 'Expirado'
    | 'Concluida'

export class Reserva {
    public dataExpiracao?: Date;
    public status: statusReserva = 'Ativa'

    constructor(
        public usuario: Usuario,
        public exemplar: Exemplar
    ) {}

    concluir() {
        this.status = 'Concluida';
    }
}