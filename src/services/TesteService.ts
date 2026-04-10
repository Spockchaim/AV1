import { AeronaveService } from "./AeronaveService";
import { Teste } from "../classes/Teste";
import { TipoTeste } from "../enums/TipoTeste";
import { ResultadoTeste } from "../enums/ResultadoTeste";
import { TesteRepository } from "../repository/TesteRepository";

export class TesteService {
    private repository: TesteRepository;

    constructor(private aeronaveService: AeronaveService) {
        this.repository = new TesteRepository();
    }

    
    public realizarTeste(codigoAeronave: string, tipo: TipoTeste, resultado: ResultadoTeste): void {
        const aeronave = this.aeronaveService.buscarPorCodigo(codigoAeronave);
        if (!aeronave) {
            console.log("\nErro: Aeronave não encontrada.");
            return;
        }

        const novoTeste = new Teste(tipo, resultado);
        aeronave.adicionarTeste(novoTeste);
        this.repository.salvar(novoTeste, codigoAeronave);
        
        console.log(`Teste ${tipo} registrado para a aeronave ${codigoAeronave} com resultado: ${resultado}`);
    }

    
    public listarTestesAeronave(codigoAeronave: string): Teste[] {
        const aeronave = this.aeronaveService.buscarPorCodigo(codigoAeronave);
        return aeronave ? aeronave.getTestes() : [];
    }
}
