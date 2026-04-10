import { BaseRepository } from "./BaseRepository";
import { Peca } from "../classes/Peca";

export class PecaRepository extends BaseRepository<Peca> {
    constructor() {
        super('pecas');
    }

    public salvar(peca: Peca): void {
        this.saveToFile(`${peca.getNome().replace(/\s+/g, '_')}.json`, peca);
        console.log(`Peça ${peca.getNome()} persistida em arquivo JSON.`);
    }

    public listarTodos(): Peca[] {
        return this.readAllFiles();
    }
}
