/*
    Atividade de POO UNIFESP
    Prof: Dr. Otavio
    Aluno: Breno Silveira Signorini Verdi
    RA: 176474
    Criar uma classe estudante com:
    - nome
    - notas
    - adicionarNota()
    - media()
*/

class student {
    nome: string;
    notas: number[];

    constructor(nome: string) {
        this.nome = nome;
        this.notas = [];
    }

    adicionarNota(nota: number) : void {
        this.notas.push(nota);
    }

    media() : void{
        if (this.notas.length === 0) {
            console.log(`A média de ${this.nome} é 0.`);
            return;
        }

        let soma = 0;

        for (const nota of this.notas) {
            soma += nota;
        }

        console.log(`A média de ${this.nome} é ${soma / this.notas.length}.`);
    }
}

let estudante_1 = new student("Breno");

estudante_1.adicionarNota(7)
estudante_1.adicionarNota(6)
estudante_1.adicionarNota(8)

estudante_1.media();


/*
    Em relação ao C, a estrutura das classes e dos objetos lembra bastante o struct a classe em si seria quase um
    typedef Struct.
*/