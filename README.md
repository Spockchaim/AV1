# Aerocode - Sistema de Gestão de Produção de Aeronaves - AV1 

Este projeto foi desenvolvido como parte da Atividade de Avaliação Individual 1 (AV1) da disciplina de Técnicas de Programação na **FATEC SJC**. O **Aerocode** é um sistema CLI (Command Line Interface) robusto em TypeScript, projetado para gerenciar o ciclo de vida da fabricação de aeronaves.

## 🚀 Funcionalidades Principais

*   **Controle de Acesso:** Autenticação com níveis `ADMINISTRADOR`, `ENGENHEIRO` e `OPERADOR`.
*   **Gestão de Aeronaves:** Cadastro de modelos comerciais e militares.
*   **Inventário de Peças:** Controle de componentes nacionais e importados vinculados a aeronaves.
*   **Fluxo de Produção:** Gerenciamento de etapas com trava lógica (impede iniciar nova etapa sem concluir a anterior).
*   **Qualidade:** Registro de testes elétricos, hidráulicos e aerodinâmicos.
*   **Persistência JSON:** Armazenamento moderno em arquivos `.json` organizados por categorias.

---

## 🏗️ Arquitetura e Estrutura

O projeto utiliza padrões de projeto modernos (**Service/Repository**) e Programação Orientada a Objetos (POO):

*   `src/classes`: Modelos de domínio (Aeronave, Peca, Etapa, etc.) com documentação JSDoc.
*   `src/repository`: Camada de persistência genérica utilizando **Generics** e JSON.
*   `src/services`: Lógica de negócios e orquestração.
*   `data/`: Banco de dados local organizado em subdiretórios:
    *   `aeronaves/`: Dados básicos das aeronaves.
    *   `etapas/`: Histórico de produção por aeronave.
    *   `testes/`: Resultados de qualidade por aeronave.
    *   `aeronave_pecas/`: Componentes vinculados a cada projeto.
    *   `funcionarios/` e `pecas/`: Cadastros gerais do sistema.

---

## 🔧 Instalação e Execução

1.  **Instalar dependências:**
    ```bash
    npm install
    ```

2.  **Executar o Sistema:**
    ```bash
    npm run start
    ```

---

## 🔐 Credenciais de Acesso (Exemplos)

| Usuário | Senha | Nível |
| :--- | :--- | :--- |
| `adm` | `adm` | Administrador |
| `eng` | `eng` | Engenheiro |
| `op` | `op` | Operador |

---

## 🛠️ Decisões Técnicas (Diferenciais)

*   **Persistência Separada:** Para garantir performance e organização, os dados de produção (etapas/testes) são salvos em arquivos separados do cadastro básico da aeronave, simulando um banco de dados relacional.
*   **TypeScript Avançado:** Uso de **Generics** no `BaseRepository` para reaproveitamento de código de I/O.
*   **Documentação:** Classes documentadas com `@example` para facilitar a manutenção e entendimento do fluxo.

---
**Professor:** Gerson Penha  
**Disciplina:** Técnicas de Programação  
**Aluno:** Pedro Chaim  
**Instituição:** FATEC SJC
