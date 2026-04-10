import { Aeronave } from "./Aeronave";
import * as fs from 'fs';
import * as path from 'path';

export class Relatorio {
    
    private compilarConteudo(aeronave: Aeronave): string {
        let conteudo = `========================================\n`;
        conteudo += `       RELATORIO FINAL DE ENTREGA       \n`;
        conteudo += `========================================\n\n`;
        conteudo += `CLIENTE: ${aeronave.getCliente()}\n`;
        conteudo += `DATA DE ENTREGA: ${aeronave.getDataEntrega()}\n\n`;
        conteudo += `--- DADOS DA AERONAVE ---\n`;
        conteudo += `Modelo: ${aeronave.getModelo()} | Codigo: ${aeronave.getCodigo()}\n`;
        conteudo += `Tipo: ${aeronave.getTipo()}\n`;
        conteudo += `Capacidade: ${aeronave.getCapacidade()} passageiros\n`;
        conteudo += `Alcance: ${aeronave.getAlcance()} km\n\n`;
        
        conteudo += `--- COMPONENTES (PECAS) ---\n`;
        if (aeronave.getPecas().length === 0) {
            conteudo += `Nenhuma peca registrada.\n`;
        } else {
            aeronave.getPecas().forEach(peca => {
                conteudo += `- ${peca.getNome()} (${peca.getTipo()}) | Fornecedor: ${peca.getFornecedor()}\n`;
            });
        }

        conteudo += `\n--- ETAPAS DE PRODUCAO ---\n`;
        if (aeronave.getEtapas().length === 0) {
            conteudo += `Nenhuma etapa registrada.\n`;
        } else {
            aeronave.getEtapas().forEach(etapa => {
                conteudo += `- ${etapa.getNome()} | Status: ${etapa.getStatus()}\n`;
            });
        }

        conteudo += `\n--- RESULTADOS DE TESTES ---\n`;
        if (aeronave.getTestes().length === 0) {
            conteudo += `Nenhum teste registrado.\n`;
        } else {
            aeronave.getTestes().forEach(teste => {
                conteudo += `- Teste ${teste.getTipo()}: ${teste.getResultado()}\n`;
            });
        }

        conteudo += `\n========================================\n`;
        conteudo += `Status: Aeronave pronta para operacao.\n`;
        conteudo += `========================================\n`;
        return conteudo;
    }

    
    public gerarRelatorio(aeronave: Aeronave): void {
        const conteudo = this.compilarConteudo(aeronave);
        console.log(conteudo);
        this.salvarEmArquivo(aeronave, conteudo);
    }

    
    public salvarEmArquivo(aeronave: Aeronave, conteudo: string): void {
        const dirRelatorios = path.join(__dirname, '../../relatorios');
        
        if (!fs.existsSync(dirRelatorios)) {
            fs.mkdirSync(dirRelatorios, { recursive: true });
        }

        const fileName = `relatorio_${aeronave.getCodigo()}.txt`;
        const filePath = path.join(dirRelatorios, fileName);

        fs.writeFileSync(filePath, conteudo, 'utf8');
        console.log(`\nRelatorio salvo com sucesso: ${filePath}`);
    }
}
