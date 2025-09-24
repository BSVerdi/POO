import { Blibioteca, Emprestimo, Exemplar, Livro, Usuario } from './blibioteca';
import { addDays, startOfDay } from 'date-fns';
import assert from 'assert';

describe('dataDevida', () => {
    it('corretamente define a data devida depois de 14 dias', () => {
        const livro = new Livro(
            'Crime e Castigo',
            'Fiódor Dostoiévski',
            'Moderna',
            'Romance',
            new Date('1-12-1866')
        );

        const exemplar = new Exemplar('exemplar1', livro, 'Disponível');
        const usuario = new Usuario('usuario1', 'Breno');
        const dataEmprestimo = new Date();

        const emprestimo = new Emprestimo(
            usuario,
            exemplar,
            dataEmprestimo
        );

        const dataDevolucaoEsperada = addDays(dataEmprestimo, 14);

        assert.strictEqual(
            startOfDay(emprestimo.dataDevida).getTime(),
            startOfDay(dataDevolucaoEsperada).getTime()
        );
    })
}
)

describe('emAtraso', () => {
    it('determina atraso corretamente quando emprestimo esta atrasado', () => {
        const livro = new Livro(
            'Crime e Castigo',
            'Fiódor Dostoiévski',
            'Moderna',
            'Romance',
            new Date('1-12-1866')
        );

        const exemplar = new Exemplar('exemplar1', livro, 'Disponível');
        const usuario = new Usuario('usuario1', 'Breno');
        const dataEmprestimo = new Date();

        const emprestimo = new Emprestimo(
            usuario,
            exemplar,
            dataEmprestimo
        );

        const depoisDeQuinzeDias = addDays(dataEmprestimo, 16);

        assert.ok(emprestimo.emAtraso(depoisDeQuinzeDias));
    })
})