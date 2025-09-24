import { Livro } from "./livro";
import { Exemplar } from "./exemplar";
import { Blibioteca } from "./Blibioteca";
import { Usuario } from "./usuario";


function main() {
    const livro1 = new Livro('Dom Quixote', 'Miguel de Cervantes', 'Editora Top', 'Satira', 1605);
    const exemplar1 = new Exemplar('1', livro1);
    const exemplar2 = new Exemplar('2', livro1);
    const exemplar3 = new Exemplar('3', livro1);
    const exemplar4 = new Exemplar('4', livro1);
    const usuario = new Usuario('1', 'Breno');
    const blibioteca = new Blibioteca();

    // caso 1
    console.log('Caso: emprestar e devolver dentro do prazo.');

    const emprestimo1 = blibioteca.emprestar(usuario, exemplar1, new Date('2025-9-01'));

    blibioteca.devolver(usuario, exemplar1, new Date('2025-09-10'));

    console.log(`Dias de atraso: ${emprestimo1.diasAtraso(new Date('2025-09-10'))}`);

    // caso 2
    console.log('\nCaso: tentar emprestar livro ja emprestado')

    const emprestimo2 = blibioteca.emprestar(usuario, exemplar2, new Date('2025-9-17'));

    try {
        blibioteca.emprestar(usuario, exemplar2, new Date('2025-9-17'));
    } catch (erro: any) {
        console.log(`Erro esperado: ${erro.message}`);
    }

    // caso 3
    console.log('\nCaso: emprestar o quarto livro para o mesmo usuário');

    blibioteca.emprestar(usuario, exemplar1, new Date('2025-9-17'));
    blibioteca.emprestar(usuario, exemplar3, new Date('2025-9-17'));

    try {
        blibioteca.emprestar(usuario, exemplar4, new Date('2025-9-17'));
    } catch (erro: any) {
        console.log(`Erro esperado: ${erro.message}`);
    }

    // caso 4
    console.log('\nCaso: Devolver após 20 dias');

    blibioteca.devolver(usuario, exemplar2, new Date('2025-10-08'));

    console.log(`Dias de atraso: ${emprestimo2.diasAtraso(new Date('2025-10-08'))}`);
}

main()