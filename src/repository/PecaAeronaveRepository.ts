import { BaseRepository } from "./BaseRepository";
import { Peca } from "../classes/Peca";

export class PecaAeronaveRepository extends BaseRepository<Peca[]> {
    constructor() {
        super('aeronave_pecas');
    }

    public salvarTodas(pecas: Peca[], codigoAeronave: string): void {
        this.saveToFile(`${codigoAeronave}.json`, pecas);
    }

    public listarPorAeronave(codigoAeronave: string): Peca[] {
        const dados = this.readFile(`${codigoAeronave}.json`);
        return dados || [];
    }
}
