import * as readline from 'readline-sync';
import { AuthService } from './services/AuthService';
import { AeronaveService } from './services/AeronaveService';
import { PecaService } from './services/PecaService';
import { ProducaoService } from './services/ProducaoService';
import { FuncionarioService } from './services/FuncionarioService';
import { TesteService } from './services/TesteService';
import { RelatorioService } from './services/RelatorioService';
import { NivelPermissao } from './enums/NivelPermissao';
import { Aeronave } from './classes/Aeronave';
import { Peca } from './classes/Peca';
import { Funcionario } from './classes/Funcionario';
import { Teste } from './classes/Teste';
import { TipoAeronave } from './enums/TipoAeronave';
import { TipoPeca } from './enums/TipoPeca';
import { StatusPeca } from './enums/StatusPeca';
import { TipoTeste } from './enums/TipoTeste';
import { ResultadoTeste } from './enums/ResultadoTeste';

const aeronaveService = new AeronaveService();
const pecaService = new PecaService();
const producaoService = new ProducaoService(aeronaveService);
const funcionarioService = new FuncionarioService();
const testeService = new TesteService(aeronaveService);
const relatorioService = new RelatorioService(aeronaveService);


function main(): void {
    console.log("========================================");
    console.log("       SISTEMA AEROCODE - V1.0          ");
    console.log("========================================\n");

    console.log("LOGINS DE ACESSO (PARA TESTES):");
    console.log("- ADMIN:      adm / adm");
    console.log("- ENGENHEIRO: eng / eng");
    console.log("- OPERADOR:   op  / op\n");

    let logado = false;

    
    while (!logado) {
        console.log("--- LOGIN REQUERIDO ---");
        const usuario = readline.question("Usuario: ");
        const senha = readline.question("Senha: ", { hideEchoBack: true });

        logado = AuthService.login(usuario, senha);
    }

    
    exibirMenuPrincipal();
}


function menuTestes(): void {
    let voltar = false;
    while (!voltar) {
        console.log("\n--- CONTROLE DE QUALIDADE (TESTES) ---");
        console.log("1. Registrar Novo Teste");
        console.log("2. Listar Testes de uma Aeronave");
        console.log("0. Voltar");
        
        const opcao = readline.question("Escolha uma opcao: ");

        switch (opcao) {
            case "1":
                const codAeronave = readline.question("Codigo da Aeronave: ");
                const tipoIdx = readline.keyInSelect(['ELETRICO', 'HIDRAULICO', 'AERODINAMICO'], 'Tipo de Teste: ');
                if (tipoIdx === -1) break;
                const tipos = [TipoTeste.ELETRICO, TipoTeste.HIDRAULICO, TipoTeste.AERODINAMICO];
                
                const resIdx = readline.keyInSelect(['APROVADO', 'REPROVADO'], 'Resultado: ');
                if (resIdx === -1) break;
                const resultados = [ResultadoTeste.APROVADO, ResultadoTeste.REPROVADO];

                testeService.realizarTeste(codAeronave, tipos[tipoIdx], resultados[resIdx]);
                break;
            case "2":
                const codAeroList = readline.question("Codigo da Aeronave: ");
                const testes = testeService.listarTestesAeronave(codAeroList);
                if (testes.length === 0) {
                    console.log("\nNenhum teste registrado para esta aeronave.");
                } else {
                    console.log(`\n--- TESTES DA AERONAVE ${codAeroList} ---`);
                    testes.forEach(t => {
                        console.log(`- Tipo: ${t.getTipo()} | Resultado: ${t.getResultado()}`);
                    });
                }
                break;
            case "0":
                voltar = true;
                break;
            default:
                console.log("\nOpcao invalida.");
        }
    }
}


function menuGerenciarFuncionarios(): void {
    let loc = "Lat: -23.5455 Long: 46.4734"
    let voltar = false;
    while (!voltar) {
        console.log("\n--- GESTAO DE FUNCIONARIOS ---");
        console.log("1. Cadastrar Novo Funcionario");
        console.log("2. Listar Todos os Funcionarios");
        console.log("0. Voltar");
        
        const opcao = readline.question("Escolha uma opcao: ");

        switch (opcao) {
            case "1":
                const id = readline.question("ID unico: ");
                const nome = readline.question("Nome Completo: ");
                const telefone = readline.question("Telefone: ");
                const endereco = readline.question("Endereco: ");
                const usuario = readline.question("Nome de Usuario: ");
                const senha = readline.question("Senha: ", { hideEchoBack: true });
                const nivelIdx = readline.keyInSelect(['ADMINISTRADOR', 'ENGENHEIRO', 'OPERADOR'], 'Nivel de Permissao: ');
                
                if (nivelIdx === -1) break;
                const niveis = [NivelPermissao.ADMINISTRADOR, NivelPermissao.ENGENHEIRO, NivelPermissao.OPERADOR];
                const nivel = niveis[nivelIdx];

                const novoFunc = new Funcionario(id, nome, telefone, endereco, usuario, senha, nivel);
                funcionarioService.cadastrarFuncionario(novoFunc);
                break;
            case "2":
                const todos = funcionarioService.listarTodos();
                if (todos.length === 0) {
                    console.log("\nNenhum funcionario cadastrado (alem dos padroes).");
                } else {
                    console.log("\n--- LISTA DE FUNCIONARIOS ---");
                    todos.forEach(f => {
                        console.log(`- ID: ${f.getId()} | Nome: ${f.getNome()} | Nivel: ${f.getNivelPermissao()}`);
                    });
                }
                break;
            case "0":
                voltar = true;
                break;
            default:
                console.log("\nOpcao invalida.");
        }
    }
}


function menuProducao(): void {
    let voltar = false;
    while (!voltar) {
        console.log("\n--- PRODUCAO E ETAPAS ---");
        console.log("1. Iniciar Nova Etapa de Producao");
        console.log("2. Finalizar Etapa Atual");
        console.log("3. Vincular Funcionario a Etapa");
        console.log("4. Listar Etapas de uma Aeronave");
        console.log("0. Voltar");
        
        const opcao = readline.question("Escolha uma opcao: ");

        switch (opcao) {
            case "1":
                const codAeronave = readline.question("Codigo da Aeronave: ");
                const nomeEtapa = readline.question("Nome da Etapa (ex: Montagem Fuselagem): ");
                const prazo = readline.question("Prazo estimado (ex: 15 dias): ");
                producaoService.iniciarNovaEtapa(codAeronave, nomeEtapa, prazo);
                break;
            case "2":
                const codAeroFin = readline.question("Codigo da Aeronave: ");
                producaoService.finalizarEtapaAtual(codAeroFin);
                break;
            case "3":
                const codAeroVin = readline.question("Codigo da Aeronave: ");
                const idFunc = readline.question("ID do Funcionario: ");
                const funcionario = funcionarioService.buscarPorId(idFunc) || AuthService.getUsuarioLogado();
                
                if (funcionario) {
                    producaoService.vincularResponsavel(codAeroVin, funcionario);
                }
                break;
            case "4":
                const codAeroList = readline.question("Codigo da Aeronave: ");
                const aeronave = aeronaveService.buscarPorCodigo(codAeroList);
                if (aeronave) {
                    console.log(`\nEtapas da Aeronave ${codAeroList}:`);
                    aeronave.getEtapas().forEach(e => {
                        const nomesFuncs = e.listarFuncionarios().map(f => f.getNome()).join(', ') || 'Nenhum';
                        console.log(`- ${e.getNome()} | Status: ${e.getStatus()} | Prazo: ${e.getPrazo()} | Resp: ${nomesFuncs}`);
                    });
                } else {
                    console.log("\nAeronave nao encontrada.");
                }
                break;
            case "0":
                voltar = true;
                break;
            default:
                console.log("\nOpcao invalida.");
        }
    }
}


function menuGerenciarPecas(): void {
    let voltar = false;
    while (!voltar) {
        console.log("\n--- GESTAO DE PECAS ---");
        console.log("1. Cadastrar Nova Peca");
        console.log("2. Listar Todas as Pecas");
        console.log("3. Vincular Peca a uma Aeronave");
        console.log("0. Voltar");
        
        const opcao = readline.question("Escolha uma opcao: ");

        switch (opcao) {
            case "1":
                const nome = readline.question("Nome da Peca: ");
                const tipoIdx = readline.keyInSelect(['NACIONAL', 'IMPORTADA'], 'Tipo: ');
                if (tipoIdx === -1) break;
                const tipo = tipoIdx === 0 ? TipoPeca.NACIONAL : TipoPeca.IMPORTADA;
                const fornecedor = readline.question("Fornecedor: ");
                const status = StatusPeca.EM_PRODUCAO;

                const novaPeca = new Peca(nome, tipo, fornecedor, status);
                pecaService.cadastrarPeca(novaPeca);
                break;
            case "2":
                const todas = pecaService.listarTodas();
                if (todas.length === 0) {
                    console.log("\nNenhuma peca cadastrada.");
                } else {
                    console.log("\n--- LISTA DE PECAS ---");
                    todas.forEach(p => {
                        console.log(`- ${p.getNome()} (${p.getTipo()}) | Fornecedor: ${p.getFornecedor()} | Status: ${p.getStatus()}`);
                    });
                }
                break;
            case "3":
                const codAeronave = readline.question("Codigo da Aeronave: ");
                const aeronave = aeronaveService.buscarPorCodigo(codAeronave);
                
                if (!aeronave) {
                    console.log("\nAeronave nao encontrada.");
                    break;
                }

                const nomePeca = readline.question("Nome da Peca para vincular: ");
                const peca = pecaService.buscarPorNome(nomePeca);

                if (peca) {
                    aeronaveService.adicionarPeca(codAeronave, peca);
                } else {
                    console.log("\nPeca nao encontrada no cadastro geral.");
                }
                break;
            case "0":
                voltar = true;
                break;
            default:
                console.log("\nOpcao invalida.");
        }
    }
}


function menuGerenciarAeronaves(): void {
    let voltar = false;
    while (!voltar) {
        console.log("\n--- GESTAO DE AERONAVES ---");
        console.log("1. Cadastrar Nova Aeronave");
        console.log("2. Listar Todas as Aeronaves");
        console.log("3. Buscar Aeronave por Codigo");
        console.log("0. Voltar");
        
        const opcao = readline.question("Escolha uma opcao: ");

        switch (opcao) {
            case "1":
                const codigo = readline.question("Codigo Unico: ");
                const modelo = readline.question("Modelo: ");
                const tipoIdx = readline.keyInSelect(['COMERCIAL', 'MILITAR'], 'Tipo: ');
                if (tipoIdx === -1) break;
                const tipo = tipoIdx === 0 ? TipoAeronave.COMERCIAL : TipoAeronave.MILITAR;
                const capacidade = readline.questionInt("Capacidade (passageiros): ");
                const alcance = readline.questionInt("Alcance (km): ");

                const novaAeronave = new Aeronave(codigo, modelo, tipo, capacidade, alcance);
                aeronaveService.cadastrarAeronave(novaAeronave);
                break;
            case "2":
                const todas = aeronaveService.listarTodas();
                if (todas.length === 0) {
                    console.log("\nNenhuma aeronave cadastrada.");
                } else {
                    todas.forEach(a => a.detalhar());
                }
                break;
            case "3":
                const codBusca = readline.question("Informe o codigo: ");
                const encontrada = aeronaveService.buscarPorCodigo(codBusca);
                if (encontrada) {
                    encontrada.detalhar();
                } else {
                    console.log("\nAeronave nao encontrada.");
                }
                break;
            case "0":
                voltar = true;
                break;
            default:
                console.log("\nOpcao invalida.");
        }
    }
}


function menuRelatorios(): void {
    console.log("\n--- GERACAO DE RELATORIOS ---");
    const codAero = readline.question("Codigo da Aeronave: ");
    const cliente = readline.question("Nome do Cliente: ");
    const data = readline.question("Data de Entrega (dd/mm/aaaa): ");

    relatorioService.gerarRelatorioAeronave(codAero, cliente, data);
}


function exibirMenuPrincipal(): void {
    let sair = false;

    while (!sair) {
        const usuario = AuthService.getUsuarioLogado();
        if (!usuario) break;

        console.log("\n========================================");
        console.log(` MENU PRINCIPAL - Ola, ${usuario.getNome()} (${usuario.getNivelPermissao()}) `);
        console.log("========================================");
        
        
        const eGestor = AuthService.temPermissao(NivelPermissao.ADMINISTRADOR) || 
                        AuthService.temPermissao(NivelPermissao.ENGENHEIRO);

        if (eGestor) {
            console.log("1. Gerenciar Aeronaves");
            console.log("2. Gerenciar Pecas");
        }
        
        console.log("3. Producao e Etapas");
        
        if (eGestor) {
            console.log("4. Controle de Qualidade (Testes)");
        }
        
        
        if (AuthService.temPermissao(NivelPermissao.ADMINISTRADOR)) {
            console.log("5. Gerenciar Funcionarios");
        }
        
        if (eGestor) {
            console.log("6. Gerar Relatorios");
        }
        
        console.log("0. Sair");
        console.log("----------------------------------------");

        const opcao = readline.question("Escolha uma opcao: ");

        switch (opcao) {
            case "1":
                if (eGestor) menuGerenciarAeronaves();
                else console.log("\nAcesso negado.");
                break;
            case "2":
                if (eGestor) menuGerenciarPecas();
                else console.log("\nAcesso negado.");
                break;
            case "3":
                menuProducao();
                break;
            case "4":
                if (eGestor) menuTestes();
                else console.log("\nAcesso negado.");
                break;
            case "5":
                if (AuthService.temPermissao(NivelPermissao.ADMINISTRADOR)) {
                    menuGerenciarFuncionarios();
                } else {
                    console.log("\nAcesso negado: Somente administradores.");
                }
                break;
            case "6":
                if (eGestor) menuRelatorios();
                else console.log("\nAcesso negado.");
                break;
            case "0":
                AuthService.logout();
                sair = true;
                break;
            default:
                console.log("\nOpcao invalida ou acesso negado. Tente novamente.");
        }
    }

    console.log("\nObrigado por utilizar o sistema Aerocode. Ate logo!");
}


main();
