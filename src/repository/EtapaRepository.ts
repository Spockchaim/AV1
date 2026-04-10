import { BaseRepository } from "./BaseRepository";
import { Etapa } from "../classes/Etapa";

export class EtapaRepository extends BaseRepository<Etapa[]> {
    constructor() {
        super('etapas');
    }

    public salvarTodas(etapas: Etapa[], codigoAeronave: string): void {
        this.saveToFile(`${codigoAeronave}.json`, etapas);
    }

    public listarPorAeronave(codigoAeronave: string): Etapa[] {
        const dados = this.readFile(`${codigoAeronave}.json`);
        return dados || [];
    }
}
