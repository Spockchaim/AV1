import { BaseRepository } from "./BaseRepository";
import { Peca } from "../classes/Peca";
import * as fs from 'fs';
import * as path from 'path';

export class PecaAeronaveRepository extends BaseRepository<Peca> {
    constructor() {
        super('aeronave_pecas');
    }

    public salvarTodas(pecas: Peca[], codigoAeronave: string): void {
        let data = '';
        pecas.forEach(peca => {
            data += `${codigoAeronave};${peca.getNome()};${peca.getTipo()};${peca.getFornecedor()};${peca.getStatus()}\n`;
        });
        this.saveToFile(`${codigoAeronave}.txt`, data);
    }

    public listarPorAeronave(codigoAeronave: string): string[] {
        const filePath = path.join(this.dataDir, `${codigoAeronave}.txt`);
        if (!fs.existsSync(filePath)) return [];
        return fs.readFileSync(filePath, 'utf8').split('\n').filter((line: string) => line.trim() !== '');
    }
}
