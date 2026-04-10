import { BaseRepository } from "./BaseRepository";
import { Etapa } from "../classes/Etapa";
import * as fs from 'fs';
import * as path from 'path';

export class EtapaRepository extends BaseRepository<Etapa> {
    constructor() {
        super('etapas');
    }

    
    public salvarTodas(etapas: Etapa[], codigoAeronave: string): void {
        let data = '';
        etapas.forEach(etapa => {
            const funcionariosIds = etapa.listarFuncionarios().map(f => f.getId()).join(',');
            data += `${codigoAeronave};${etapa.getNome()};${etapa.getPrazo()};${etapa.getStatus()};[${funcionariosIds}]\n`;
        });
        this.saveToFile(`${codigoAeronave}.txt`, data);
        console.log(`Etapas da aeronave ${codigoAeronave} persistidas.`);
    }

    public listarPorAeronave(codigoAeronave: string): string[] {
        
        const filePath = path.join(this.dataDir, `${codigoAeronave}.txt`);
        if (!fs.existsSync(filePath)) return [];
        return fs.readFileSync(filePath, 'utf8').split('\n').filter((line: string) => line.trim() !== '');
    }
}
