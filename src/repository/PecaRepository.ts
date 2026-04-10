import { BaseRepository } from "./BaseRepository";
import { Peca } from "../classes/Peca";

export class PecaRepository extends BaseRepository<Peca> {
    constructor() {
        super('pecas');
    }

    public salvar(peca: Peca): void {
        const data = `${peca.getNome()};${peca.getTipo()};${peca.getFornecedor()};${peca.getStatus()}\n`;
        this.saveToFile(`${peca.getNome().replace(/\s+/g, '_')}.txt`, data);
        console.log(`Peça ${peca.getNome()} persistida em arquivo.`);
    }

    public listarTodos(): string[] {
        return this.readAllFiles();
    }
}
