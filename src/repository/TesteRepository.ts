import { BaseRepository } from "./BaseRepository";
import { Teste } from "../classes/Teste";

export class TesteRepository extends BaseRepository<Teste> {
    constructor() {
        super('testes');
    }

    public salvar(teste: Teste, codigoAeronave: string): void {
        const data = `${codigoAeronave};${teste.getTipo()};${teste.getResultado()}\n`;
        this.appendToFile(`${codigoAeronave}.txt`, data);
        console.log(`Teste ${teste.getTipo()} da aeronave ${codigoAeronave} persistido.`);
    }

    public listarPorAeronave(codigoAeronave: string): string[] {
        const fs = require('fs');
        const path = require('path');
        const filePath = path.join(this.dataDir, `${codigoAeronave}.txt`);
        if (!fs.existsSync(filePath)) return [];
        return fs.readFileSync(filePath, 'utf8').split('\n').filter((line: string) => line.trim() !== '');
    }

    public listarTodos(): string[] {
        return this.readAllFiles();
    }
}
