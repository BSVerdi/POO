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
            /Usuário está impossibilitade de realizar empresstimos/,
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
})