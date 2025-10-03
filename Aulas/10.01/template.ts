abstract class Tarefa {
    rodar() {
        this.antes();
        this.executar();
        this.depois();
    }

    protected antes(): void {}
    protected depois(): void {}
    protected abstract executar(): void;
}

class TarefaA extends Tarefa {
    executar() {
        console.log('Executando Tarefa A');
    }
}

class Executor {
    constructor(private tarefas: Tarefa[]) {}

    executar() {
        for (const t of this.tarefas) {
            t.rodar();
        }
    }
}