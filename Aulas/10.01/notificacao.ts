interface Notificador {
    send(messagem: string): void;
}

class NotificadorEmail {
    send(mensagem: string) {
        console.log('Enviando a mensagem por Email:', mensagem);
    }
}

class NotificadorSms {
    send(mensagem: string) {
        console.log('Enviando a mensagem por Sms:', mensagem);
    }
}

class Evento {
    constructor(
        private tipo: string,
        private notificadores: Notificador[]
    ) {}

    ocorreu() {
        const mensagem = `Ocorreu o evento "${this.tipo}" em ${new Date()}.`;

        this.notificadores.forEach(n => n.send(mensagem));
    }
}

const evento = new Evento(
    'Servidor iniciado',
    [new NotificadorEmail, new NotificadorSms]
);

evento.ocorreu();