import { BaseRepository } from "./BaseRepository";
import { Funcionario } from "../classes/Funcionario";

export class FuncionarioRepository extends BaseRepository<Funcionario> {
    constructor() {
        super('funcionarios');
    }

    public salvar(funcionario: Funcionario): void {
        this.saveToFile(`${funcionario.getId()}.json`, funcionario);
        console.log(`Funcionário ${funcionario.getNome()} persistido em arquivo JSON.`);
    }

    public listarTodos(): Funcionario[] {
        return this.readAllFiles();
    }
}
