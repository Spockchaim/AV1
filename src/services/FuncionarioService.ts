import { Funcionario } from "../classes/Funcionario";
import { FuncionarioRepository } from "../repository/FuncionarioRepository";

export class FuncionarioService {
    private repository: FuncionarioRepository;
    private funcionarios: Funcionario[] = [];

    constructor() {
        this.repository = new FuncionarioRepository();
        this.carregarDadosIniciais();
    }

    
    private carregarDadosIniciais(): void {
        const dadosSalvos = this.repository.listarTodos();
        dadosSalvos.forEach((dados: any) => {
            const func = new Funcionario(
                dados.id,
                dados.nome,
                dados.telefone,
                dados.endereco,
                dados.usuario,
                dados.senha,
                dados.nivelPermissao as any
            );
            this.funcionarios.push(func);
        });
    }

    
    public cadastrarFuncionario(funcionario: Funcionario): void {
        
        const existe = this.funcionarios.find(f => f.getId() === funcionario.getId());
        if (existe) {
            console.log(`Erro: Já existe um funcionário com o ID ${funcionario.getId()}.`);
            return;
        }

        this.funcionarios.push(funcionario);
        this.repository.salvar(funcionario);
        console.log(`Funcionário ${funcionario.getNome()} cadastrado com sucesso.`);
    }

    
    public listarTodos(): Funcionario[] {
        return this.funcionarios;
    }

    
    public buscarPorId(id: string): Funcionario | undefined {
        return this.funcionarios.find(f => f.getId() === id);
    }
}
