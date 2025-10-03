abstract class Animal {
    respirar() {
        console.log('Respirando...');
    }
}

abstract class Mamifero extends Animal {
    mover() {
        console.log('Movendo...');
    }
}

class Cachorro extends Mamifero {
    respirar(): void {
        console.log('Especifico do cachorro');
    }

    latir() {
        console.log('Latindo...');
    }
}

const toto = new Cachorro();

toto.respirar();
toto.mover();
toto.latir();