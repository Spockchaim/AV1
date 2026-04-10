import { Aeronave } from "../classes/Aeronave";
import { Peca } from "../classes/Peca";
import { Etapa } from "../classes/Etapa";
import { Teste } from "../classes/Teste";
import { AeronaveRepository } from "../repository/AeronaveRepository";
import { EtapaRepository } from "../repository/EtapaRepository";
import { TesteRepository } from "../repository/TesteRepository";
import { PecaAeronaveRepository } from "../repository/PecaAeronaveRepository";
import { FuncionarioRepository } from "../repository/FuncionarioRepository";
import { Funcionario } from "../classes/Funcionario";
import { StatusEtapa } from "../enums/StatusEtapa";
import { TipoAeronave } from "../enums/TipoAeronave";

import * as fs from 'fs';
import * as path from 'path';

export class AeronaveService {
    private repository: AeronaveRepository;
    private etapaRepo: EtapaRepository;
    private testeRepo: TesteRepository;
    private pecaAeronaveRepo: PecaAeronaveRepository;
    private funcRepo: FuncionarioRepository;
    private aeronaves: Aeronave[] = [];
    private funcionarios: Map<string, Funcionario> = new Map();

    constructor() {
        this.repository = new AeronaveRepository();
        this.etapaRepo = new EtapaRepository();
        this.testeRepo = new TesteRepository();
        this.pecaAeronaveRepo = new PecaAeronaveRepository();
        this.funcRepo = new FuncionarioRepository();
        this.carregarFuncionarios();
        this.carregarDadosIniciais();
    }

    private carregarFuncionarios(): void {
        const dados = this.funcRepo.listarTodos();
        dados.forEach((d: any) => {
            const f = new Funcionario(d.id, d.nome, d.telefone, d.endereco, d.usuario, d.senha, d.nivelPermissao);
            this.funcionarios.set(f.getId(), f);
        });
    }

    
    private carregarDadosIniciais(): void {
        const dadosSalvos = this.repository.listarTodos();
        dadosSalvos.forEach((dados: any) => {
            const aeronave = new Aeronave(
                dados.codigo,
                dados.modelo,
                dados.tipo as TipoAeronave,
                Number(dados.capacidade),
                Number(dados.alcance),
                dados.cliente,
                dados.dataEntrega
            );

            
            const etapas = this.etapaRepo.listarPorAeronave(aeronave.getCodigo());
            etapas.forEach((e: any) => {
                const etapa = new Etapa(e.nome, e.prazo, e.status as any);
                if (e.funcionarios && Array.isArray(e.funcionarios)) {
                    e.funcionarios.forEach((r: any) => {
                        const f = this.funcionarios.get(r.id);
                        if (f) etapa.associarFuncionario(f);
                    });
                }
                aeronave.adicionarEtapa(etapa);
            });

            
            const testes = this.testeRepo.listarPorAeronave(aeronave.getCodigo());
            testes.forEach((t: any) => {
                aeronave.adicionarTeste(new Teste(t.tipo, t.resultado));
            });

            
            const pecas = this.pecaAeronaveRepo.listarPorAeronave(aeronave.getCodigo());
            pecas.forEach((p: any) => {
                aeronave.adicionarPeca(new Peca(p.nome, p.tipo, p.fornecedor, p.status));
            });

            this.aeronaves.push(aeronave);
        });
    }

    
    public cadastrarAeronave(aeronave: Aeronave): void {
        const filePath = path.join(__dirname, '../../data/aeronaves', `${aeronave.getCodigo()}.json`);
        
        if (fs.existsSync(filePath)) {
            console.log(`Erro: Já existe uma aeronave com o código ${aeronave.getCodigo()} no sistema.`);
            return;
        }

        this.aeronaves.push(aeronave);
        this.repository.salvar(aeronave);
        console.log(`Aeronave ${aeronave.getModelo()} cadastrada com sucesso.`);
    }

    public atualizarAeronave(codigoAeronave: string): void {
        const aeronave = this.buscarPorCodigo(codigoAeronave);
        if (aeronave) {
            this.repository.salvar(aeronave);
        }
    }

    
    public adicionarPeca(codigoAeronave: string, peca: Peca): void {
        const aeronave = this.buscarPorCodigo(codigoAeronave);
        if (aeronave) {
            aeronave.adicionarPeca(peca);
            console.log(`Peça ${peca.getNome()} adicionada à aeronave ${codigoAeronave}.`);
            this.atualizarPecas(codigoAeronave);
        }
    }

    public atualizarPecas(codigoAeronave: string): void {
        const aeronave = this.buscarPorCodigo(codigoAeronave);
        if (aeronave) {
            this.pecaAeronaveRepo.salvarTodas(aeronave.getPecas(), codigoAeronave);
        }
    }

    
    public adicionarEtapa(codigoAeronave: string, etapa: Etapa): void {
        const aeronave = this.buscarPorCodigo(codigoAeronave);
        if (aeronave) {
            const etapasAtuais = aeronave.getEtapas();
            
            if (etapasAtuais.length > 0) {
                const ultimaEtapa = etapasAtuais[etapasAtuais.length - 1];
                if (ultimaEtapa.getStatus() !== StatusEtapa.CONCLUIDA) {
                    console.log(`Erro: A etapa anterior (${ultimaEtapa.getNome()}) ainda não foi concluída.`);
                    return;
                }
            }

            aeronave.adicionarEtapa(etapa);
            console.log(`Etapa ${etapa.getNome()} vinculada à produção da aeronave ${codigoAeronave}.`);
            this.atualizarEtapas(codigoAeronave);
        }
    }

    public atualizarEtapas(codigoAeronave: string): void {
        const aeronave = this.buscarPorCodigo(codigoAeronave);
        if (aeronave) {
            this.etapaRepo.salvarTodas(aeronave.getEtapas(), codigoAeronave);
        }
    }

    
    public registrarTeste(codigoAeronave: string, teste: Teste): void {
        const aeronave = this.buscarPorCodigo(codigoAeronave);
        if (aeronave) {
            aeronave.adicionarTeste(teste);
            this.testeRepo.salvarTodos(aeronave.getTestes(), codigoAeronave);
            console.log(`Teste ${teste.getTipo()} registrado para a aeronave ${codigoAeronave}.`);
        }
    }

    
    public buscarPorCodigo(codigo: string): Aeronave | undefined {
        return this.aeronaves.find(a => a.getCodigo() === codigo);
    }

    
    public listarTodas(): Aeronave[] {
        return this.aeronaves;
    }
}
