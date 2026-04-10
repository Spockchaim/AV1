import { BaseRepository } from "./BaseRepository";
import { Aeronave } from "../classes/Aeronave";

export class AeronaveRepository extends BaseRepository<Aeronave> {
    constructor() {
        super('aeronaves');
    }

    public salvar(aeronave: Aeronave): void {
        const dadosSimples = {
            codigo: aeronave.getCodigo(),
            modelo: aeronave.getModelo(),
            tipo: aeronave.getTipo(),
            capacidade: aeronave.getCapacidade(),
            alcance: aeronave.getAlcance(),
            cliente: aeronave.getCliente(),
            dataEntrega: aeronave.getDataEntrega()
        };
        this.saveToFile(`${aeronave.getCodigo()}.json`, dadosSimples as any);
        console.log(`Dados da aeronave ${aeronave.getCodigo()} persistidos em arquivo JSON.`);
    }

    public listarTodos(): Aeronave[] {
        return this.readAllFiles();
    }
}
