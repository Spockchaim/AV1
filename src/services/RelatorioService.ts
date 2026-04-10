import { AeronaveService } from "./AeronaveService";
import { Relatorio } from "../classes/Relatorio";

export class RelatorioService {
    private relatorio: Relatorio;

    constructor(private aeronaveService: AeronaveService) {
        this.relatorio = new Relatorio();
    }

    
    public gerarRelatorioAeronave(codigoAeronave: string, cliente: string, dataEntrega: string): void {
        const aeronave = this.aeronaveService.buscarPorCodigo(codigoAeronave);

        if (!aeronave) {
            console.log("\nErro: Aeronave nao encontrada.");
            return;
        }

        
        aeronave.setCliente(cliente);
        aeronave.setDataEntrega(dataEntrega);
        this.aeronaveService.atualizarAeronave(codigoAeronave);

        this.relatorio.gerarRelatorio(aeronave);
    }
}
