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
        const arquivos = this.repository.listarTodos();
        arquivos.forEach(linha => {
            const campos = linha.split(';');
            if (campos.length >= 7) {
                const [id, nome, tel, end, user, pass, nivel] = campos.map(c => c.trim());
                const func = new Funcionario(id, nome, tel, end, user, pass, nivel as any);
                this.funcionarios.push(func);
            }
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
