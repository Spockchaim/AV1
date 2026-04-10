import { Peca } from "../classes/Peca";
import { PecaRepository } from "../repository/PecaRepository";

export class PecaService {
    private repository: PecaRepository;
    private pecas: Peca[] = [];

    constructor() {
        this.repository = new PecaRepository();
        this.carregarDadosIniciais();
    }

    
    private carregarDadosIniciais(): void {
        const dadosSalvos = this.repository.listarTodos();
        dadosSalvos.forEach((dados: any) => {
            const peca = new Peca(
                dados.nome,
                dados.tipo as any,
                dados.fornecedor,
                dados.status as any
            );
            this.pecas.push(peca);
        });
    }

    
    public cadastrarPeca(peca: Peca): void {
        this.pecas.push(peca);
        this.repository.salvar(peca);
        console.log(`Peca ${peca.getNome()} cadastrada.`);
    }

    
    public listarTodas(): Peca[] {
        return this.pecas;
    }

    
    public buscarPorNome(nome: string): Peca | undefined {
        return this.pecas.find(p => p.getNome().toLowerCase() === nome.toLowerCase());
    }
}
