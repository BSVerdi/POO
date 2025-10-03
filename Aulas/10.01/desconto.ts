interface Desconto {
    aplicar(total:number): number;
}

class Porcentagem implements Desconto {
    constructor(private pct: number) {}

    aplicar(total: number) {
        return this.pct / 100 * total;
    }
}

class Condicional implements Desconto {
    constructor(
        private valor: number,
        private minimo: number
    ) {}

    aplicar(total:number) {
        return total > this.minimo ? this.valor : 0;
    }
}

class Compra {
    descontos: Desconto[] = [];

    constructor(private total: number) {}

    totalComDescontos() {
        let discontos = 0;

        for (const d of this.descontos) {
            discontos += d.aplicar(this.total);
        }

        return this.total - discontos;
    }
}

const desconto10 = new Porcentagem(10);
const descontoAcima2000 = new Condicional(100, 2000);

const compra = new Compra(3000);

compra.descontos.push(desconto10);
compra.descontos.push(descontoAcima2000);

console.log(compra.totalComDescontos());