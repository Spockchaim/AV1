import { AeronaveService } from "./AeronaveService";
import { Teste } from "../classes/Teste";
import { TipoTeste } from "../enums/TipoTeste";
import { ResultadoTeste } from "../enums/ResultadoTeste";
export class TesteService {

    constructor(private aeronaveService: AeronaveService) {}

    
    public realizarTeste(codigoAeronave: string, tipo: TipoTeste, resultado: ResultadoTeste): void {
        const novoTeste = new Teste(tipo, resultado);
        this.aeronaveService.registrarTeste(codigoAeronave, novoTeste);
    }

    
    public listarTestesAeronave(codigoAeronave: string): Teste[] {
        const aeronave = this.aeronaveService.buscarPorCodigo(codigoAeronave);
        return aeronave ? aeronave.getTestes() : [];
    }
}
