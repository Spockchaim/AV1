import { AeronaveService } from "./AeronaveService";
import { Etapa } from "../classes/Etapa";
import { StatusEtapa } from "../enums/StatusEtapa";
import { Funcionario } from "../classes/Funcionario";

export class ProducaoService {
    constructor(private aeronaveService: AeronaveService) {}

    
    public iniciarNovaEtapa(codigoAeronave: string, nomeEtapa: string, prazo: string): void {
        const aeronave = this.aeronaveService.buscarPorCodigo(codigoAeronave);
        if (!aeronave) {
            console.log("\nErro: Aeronave não encontrada.");
            return;
        }

        const novaEtapa = new Etapa(nomeEtapa, prazo, StatusEtapa.PENDENTE);
        
        
        this.aeronaveService.adicionarEtapa(codigoAeronave, novaEtapa);
        novaEtapa.iniciar();
    }

    
    public finalizarEtapaAtual(codigoAeronave: string): void {
        const aeronave = this.aeronaveService.buscarPorCodigo(codigoAeronave);
        if (!aeronave) return;

        const etapas = aeronave.getEtapas();
        if (etapas.length === 0) {
            console.log("\nNenhuma etapa vinculada a esta aeronave.");
            return;
        }

        const etapaAtual = etapas[etapas.length - 1];
        etapaAtual.finalizar();
    }

    
    public vincularResponsavel(codigoAeronave: string, funcionario: Funcionario): void {
        const aeronave = this.aeronaveService.buscarPorCodigo(codigoAeronave);
        if (!aeronave) return;

        const etapas = aeronave.getEtapas();
        if (etapas.length === 0) {
            console.log("\nNenhuma etapa disponível para vínculo.");
            return;
        }

        const etapaAtual = etapas[etapas.length - 1];
        etapaAtual.associarFuncionario(funcionario);
        this.aeronaveService.atualizarEtapas(codigoAeronave);
    }
}
