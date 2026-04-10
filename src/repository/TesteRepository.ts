import { BaseRepository } from "./BaseRepository";
import { Teste } from "../classes/Teste";

export class TesteRepository extends BaseRepository<Teste[]> {
    constructor() {
        super('testes');
    }

    public salvarTodos(testes: Teste[], codigoAeronave: string): void {
        this.saveToFile(`${codigoAeronave}.json`, testes);
    }

    public listarPorAeronave(codigoAeronave: string): Teste[] {
        const dados = this.readFile(`${codigoAeronave}.json`);
        return dados || [];
    }
}
