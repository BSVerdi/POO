import { Emprestimo } from "./emprestimo";
import { Usuario } from "./usuario";
import { Exemplar } from "./exemplar";
import { add, addDays } from "date-fns";

export class Blibioteca {
    private emprestimos: Emprestimo[] = [];

    emprestar(usuario: Usuario, exemplar: Exemplar, dataInicio: Date): Emprestimo {
        if (exemplar.status !== 'Disponível') {
            throw new Error('Exemplar não está disponível para empréstimo.');
        }

        if (usuario.status === 'Bloqueado') {
            throw new Error('Usuário está impossibilitade de realizar empresstimos');
        }

        const emprestimosUsuario = this.emprestimos.filter(
            e => e.usuario.id === usuario.id && 
            e.estado === 'Ativo'
        );

        if (emprestimosUsuario.length >= 3) {
            throw new Error('Usuário já possui 3 empréstimos ativos.');
        }

        const emprestimo = new Emprestimo(usuario, exemplar, dataInicio);

        exemplar.status = 'Emprestado';
        this.emprestimos.push(emprestimo);

        return emprestimo;
    }

    devolver(usuario: Usuario, exemplar: Exemplar, dataDevolucao: Date): Emprestimo {
        const emprestimo = this.emprestimos.find(
            e => e.usuario.id === usuario.id &&
            e.exemplar.id === exemplar.id &&
            e.estado === 'Ativo'
        );

        if (!emprestimo) {
            throw new Error('Empréstimo não encontrado ou já concluído.');
        }

        if (emprestimo.diasAtraso(dataDevolucao)) {
            usuario.status = 'Bloqueado';
            usuario.dataFimBloqueio = addDays(dataDevolucao, emprestimo.diasAtraso(dataDevolucao));
        }

        emprestimo.concluir(dataDevolucao);
        exemplar.status = 'Disponível';

        return emprestimo;
    }

    estaBloqueado(usuario: Usuario, hoje: Date): boolean {
        if (usuario.status === 'Bloqueado' && usuario.dataFimBloqueio! > hoje) {
            return true;
        } else return false;
    }

    registrarDevolucaoDanificada(exemplar: Exemplar) {
        exemplar.status = 'Danificado';
    }
}