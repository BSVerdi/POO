import { Blibioteca } from "./Blibioteca";
import { Usuario } from "./usuario";
import { Exemplar } from "./exemplar";
import { Livro } from "./livro";
import { addDays } from "date-fns";
import assert from 'assert'
import { Emprestimo } from "./emprestimo";

describe('devolverAtrasado', () =>{
    it('devolve com 5 dias de atraso', () =>{
        const livro = new Livro(
            'Crime e Castigo',
            'Fiódor Dostoiévski',
            'Moderna',
            'Romance',
            new Date('1-12-1866')
        );

        const exemplar = new Exemplar('exemplar1', livro);
        const usuario = new Usuario('usuario1', 'Breno',)
        const dataEmprestimo = new Date();

        const emprestimo = new Emprestimo(
            
        )
    })
})