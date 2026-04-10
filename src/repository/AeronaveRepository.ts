import { BaseRepository } from "./BaseRepository";
import { Aeronave } from "../classes/Aeronave";

export class AeronaveRepository extends BaseRepository<Aeronave> {
    constructor() {
        super('aeronaves');
    }

    public salvar(aeronave: Aeronave): void {
        const data = `${aeronave.getCodigo()};${aeronave.getModelo()};${aeronave.getTipo()};${aeronave.getCapacidade()};${aeronave.getAlcance()};${aeronave.getCliente()};${aeronave.getDataEntrega()}\n`;
        this.saveToFile(`${aeronave.getCodigo()}.txt`, data);
        console.log(`Aeronave ${aeronave.getCodigo()} persistida em arquivo.`);
    }

    public listarTodos(): string[] {
        return this.readAllFiles();
    }
}
