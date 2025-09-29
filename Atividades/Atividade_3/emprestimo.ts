import { Usuario } from "./usuario"
import { estadoExemplar } from "./exemplar";
import { Exemplar } from "./exemplar";
import { differenceInDays, addDays } from 'date-fns';

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
        if (this.estado === 'Ativo') {
            throw new Error('O emprestimo ainda está ativo');
        }
        
        const atraso = differenceInDays(this.dataDevolução!, this.dataFim);
        
        return atraso > 0 ? atraso : 0;
    }
}