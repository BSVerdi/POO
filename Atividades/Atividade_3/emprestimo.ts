import { Usuario } from "./usuario"
import { estadoExemplar } from "./exemplar";
import { Exemplar } from "./exemplar";
import { addDays } from 'date-fns';

export class Emprestimo {
    public dataFim: Date;
    public dataDevolução: Date | null = null;
    public estado: estadoExemplar = 'Ativo';

    constructor (
        public readonly usuario: Usuario,
        public exemplar: Exemplar,
        public dataInicio: Date
    ) {
        this.dataFim = new Date(dataInicio);
        this.dataFim = addDays(this.dataInicio, 14);
    }

    concluir(dataDevolução: Date) {
        this.dataDevolução = dataDevolução;
        this.estado = 'concluido';
    }

    diasAtraso(hoje: Date): number {
        let limite = this.dataFim;
        let dataBase = this.estado === 'Ativo' ? hoje : this.dataDevolução!;
        let atraso = Math.floor((dataBase.getTime() - limite.getTime()) / (1000 * 3600 * 24));
        
        return atraso > 0 ? atraso : 0;
    }
}