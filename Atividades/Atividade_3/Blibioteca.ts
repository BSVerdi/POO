import { Emprestimo } from "./emprestimo";
import { Usuario } from "./usuario";
import { Exemplar } from "./exemplar";
import { isAfter, addDays } from "date-fns";
import { Reserva } from "./reserva";

export class Blibioteca {
    private emprestimos: Emprestimo[] = [];
    private reservas: Reserva[] = [];
    
    emprestar(usuario: Usuario, exemplar: Exemplar, dataInicio: Date): Emprestimo {
        if (exemplar.status !== 'Disponível') {
            throw new Error('Exemplar não está disponível para empréstimo.');
        }
            
        if (usuario.status === 'Bloqueado') {
            if (isAfter(usuario.dataFimBloqueio!, dataInicio)) {
                throw new Error('Usuário está impossibilitado de realizar emprestimos.');
            } else {
                usuario.status = 'Normal';
            }
        }

        if (usuario !== this.proximaReserva(exemplar, dataInicio)) {
            throw new Error('Há outro(s) usuário(s) na frente.');
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

        if (exemplar.status === 'Reservado') {
            this.reservas[0]!.dataExpiracao = addDays(dataDevolucao, 3);
        } else {
            exemplar.status = 'Disponível';
        }
        
        if (emprestimo.diasAtraso(dataDevolucao)) {
            usuario.status = 'Bloqueado';
            usuario.dataFimBloqueio = addDays(dataDevolucao, emprestimo.diasAtraso(dataDevolucao));
        }

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

    reservar(usuario: Usuario, exemplar: Exemplar) {
        if (usuario.status === 'Bloqueado') {
            throw new Error('Usuário está impossibilitado de realizar reservas');
        }
        
        const reserva = new Reserva(usuario, exemplar);
        this.reservas.push(reserva);
        exemplar.status = 'Reservado';
    }

    proximaReserva(exemplar: Exemplar, dataHoje: Date) {
        const reserva = this.reservas.filter(
            r => r.exemplar.id === exemplar.id &&
            r.status === 'Ativa' &&
            isAfter(r.dataExpiracao!, dataHoje)
        )

        if (!reserva) {
            throw new Error('Não há nenhuma reserva ativa')
        }

        return reserva[0]!.usuario;
    }
}