import { Blibioteca } from "./Blibioteca";
import { Usuario } from "./usuario";
import { Exemplar } from "./exemplar";
import { Livro } from "./livro";
import { addDays } from "date-fns";
import assert from 'assert'

describe('Usuario Bloqueado', () => {
    const livro = new Livro(
        'Crime e Castigo',
        'Fiódor Dostoiévski',
        'Moderna',
        'Romance',
        new Date('1-12-1866')
    );

    let exemplar: Exemplar;
    let usuario: Usuario;
    let dataEmprestimo: Date;
    let blibioteca: Blibioteca;
    
    beforeEach(() => {
        exemplar = new Exemplar('exemplar1', livro);
        usuario = new Usuario('usuario1', 'Breno');
        dataEmprestimo = new Date();
        blibioteca = new Blibioteca();
    })

    it('devolve com 5 dias de atraso', () => {
        blibioteca.emprestar(usuario, exemplar, dataEmprestimo);

        const dataDevolucao = addDays(dataEmprestimo, 19); // data com 5 dias de atraso

        blibioteca.devolver(usuario, exemplar, dataDevolucao);

        assert.strictEqual(usuario.status, 'Bloqueado');
    })

    it ('Usuario bloqueado tenta emprestar antes do fim do bloqueio', () => {
        blibioteca.emprestar(usuario, exemplar, dataEmprestimo);

        const dataDevolucao = addDays(dataEmprestimo, 19);

        blibioteca.devolver(usuario, exemplar, dataDevolucao);

        assert.throws(
            () => blibioteca.emprestar(usuario, exemplar, dataDevolucao),
            /Usuário está impossibilitado de realizar emprestimos./,
            'erro esperado.'
        );
    })

    it ('Exemplar devolvido como danificado', () => {
        blibioteca.emprestar(usuario, exemplar, dataEmprestimo);

        const dataDevolucao = addDays(dataEmprestimo, 10);

        blibioteca.devolver(usuario, exemplar, dataDevolucao);
        blibioteca.registrarDevolucaoDanificada(exemplar);

        assert.strictEqual(exemplar.status, 'Danificado');
    })

    it ('Usuario que foi bloqueado tenta emprestar depois de prazo do bloqueio', () => {
        blibioteca.emprestar(usuario, exemplar, dataEmprestimo);

        const dataDevolucao = addDays(dataEmprestimo, 17);
        const dataNovoEmprestimo = addDays(dataDevolucao, 5);

        blibioteca.devolver(usuario, exemplar, dataDevolucao);

        assert.strictEqual(usuario.status, 'Bloqueado');

        blibioteca.emprestar(usuario, exemplar, dataNovoEmprestimo);

        assert.strictEqual(usuario.status, 'Normal');
    })

    it ('Usuário tentando emprestar exemplar reservado', () => {
        blibioteca.reservar(usuario, exemplar);

        assert.strictEqual(exemplar.status, 'Reservado');

        const usuario2 = new Usuario('usuario2', 'João');

        assert.throws(
            () => blibioteca.emprestar(usuario2, exemplar, dataEmprestimo),
            /Exemplar não está disponível para empréstimo./,
            'erro esperado'
        );
    })

    it ('Consulta a proxima de reserva de um exemplar', () => {
        blibioteca.emprestar(usuario, exemplar, dataEmprestimo);

        const dataDevolucao = addDays(dataEmprestimo, 7);
        const dataChecagem = addDays(dataDevolucao, 2);
        const usuario2 = new Usuario('usuario2', 'João');

        blibioteca.reservar(usuario2, exemplar);
        blibioteca.devolver(usuario, exemplar, dataDevolucao);

        assert.strictEqual(blibioteca.proximaReserva(exemplar, dataChecagem), usuario2);
    })

    it ('Usuário tenta emprestar exemplar com sua reserva expirada', () => {
        blibioteca.emprestar(usuario, exemplar, dataEmprestimo);

        const usuario2 = new Usuario('usuario2', 'João');
        const dataDevolucao = addDays(dataEmprestimo, 10);
        const dataEmprestimoReservado = addDays(dataDevolucao, 5);
    })
})