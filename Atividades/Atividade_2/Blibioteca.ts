import { Emprestimo } from "./emprestimo";
import { Usuario } from "./usuario";
import { Exemplar } from "./exemplar";

export class Blibioteca {
    private emprestimos: Emprestimo[] = [];

    emprestar(usuario: Usuario, exemplar: Exemplar, dataInicio: Date): Emprestimo {
        if (exemplar.status !== 'Disponível') {
            throw new Error('Exemplar não está disponível para empréstimo.');
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

        emprestimo.concluir(dataDevolucao);
        exemplar.status = 'Disponível';

        return emprestimo;
    }
}