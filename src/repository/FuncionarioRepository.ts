import { BaseRepository } from "./BaseRepository";
import { Funcionario } from "../classes/Funcionario";

export class FuncionarioRepository extends BaseRepository<Funcionario> {
    constructor() {
        super('funcionarios');
    }

    public salvar(funcionario: Funcionario): void {
        const data = `${funcionario.getId()};${funcionario.getNome()};${funcionario.getTelefone()};${funcionario.getEndereco()};${funcionario.getUsuario()};${funcionario.getSenha()};${funcionario.getNivelPermissao()}\n`;
        this.saveToFile(`${funcionario.getId()}.txt`, data);
        console.log(`Funcionário ${funcionario.getNome()} persistido em arquivo.`);
    }

    public listarTodos(): string[] {
        return this.readAllFiles();
    }
}
