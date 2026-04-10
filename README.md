# Aerocode - Sistema de Gestão de Produção de Aeronaves - AV1 

Este projeto foi desenvolvido como parte da Atividade de Avaliação Individual 1 (AV1) da disciplina de Técnicas de Programação. O **Aerocode** é um sistema CLI (Command Line Interface) robusto, projetado para gerenciar todo o ciclo de vida da fabricação de aeronaves, desde o cadastro inicial até a entrega final ao cliente.

## 🚀 Funcionalidades Principais

*   **Controle de Acesso:** Sistema de autenticação com três níveis de permissão: `ADMINISTRADOR`, `ENGENHEIRO` e `OPERADOR`.
*   **Gestão de Aeronaves:** Cadastro completo de modelos comerciais e militares, com especificações de alcance e capacidade.
*   **Inventário de Peças:** Cadastro e vínculo de componentes nacionais e importados a aeronaves específicas.
*   **Fluxo de Produção:** Gerenciamento de etapas (fuselagem, montagem, pintura) com trava lógica (não permite avançar sem concluir a etapa anterior).
*   **Gestão de Mão de Obra:** Associação de funcionários responsáveis a cada etapa da produção.
*   **Controle de Qualidade:** Registro de testes elétricos, hidráulicos e aerodinâmicos.
*   **Relatórios Finais:** Geração automática de documentos de entrega (TXT) consolidando todas as peças, etapas, testes e dados do cliente.
*   **Persistência de Dados:** Todos os dados são salvos em arquivos `.txt` (ASCII), garantindo a persistência mesmo após o encerramento do sistema.

---

## 🏗️ Estrutura do Projeto

O projeto segue uma arquitetura modular em TypeScript:

*   `src/classes`: Modelos de domínio (Aeronave, Peca, Etapa, Funcionario, etc.).
*   `src/enums`: Padronização de tipos e status (TipoAeronave, StatusEtapa, etc.).
*   `src/repository`: Camada de persistência responsável pelo I/O de arquivos.
*   `src/services`: Lógica de negócios e orquestração do sistema.
*   `data/`: Banco de dados em arquivos de texto.
*   `relatorios/`: Documentos finais de entrega exportados.

---

## 📋 Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina:
*   [Node.js](https://nodejs.org/) (versão 16 ou superior)
*   [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

---

## 🔧 Instalação e Execução

1.  **Instalar dependências:**
    No diretório raiz do projeto, execute:
    ```bash
    npm install
    ```

2.  **Compilar e Rodar o Sistema:**
    Para iniciar o CLI diretamente via `ts-node`:
    ```bash
    npm run start
    ```

3.  **Compilação Manual (Opcional):**
    Para gerar o código JavaScript na pasta `dist`:
    ```bash
    npx tsc
    node dist/index.js
    ```

---

## 🔐 Acesso e Níveis de Permissão

O sistema utiliza controle de acesso baseado em papéis para garantir a segurança e a integridade do fluxo de produção.

| Papel | Descrição | Permissões | Login Exemplo |
| :--- | :--- | :--- | :--- |
| **Administrador** | Gestor total do sistema. | Acesso a todas as funções, incluindo a **Gestão de Funcionários** e controle técnico total. | `adm` / `adm` |
| **Engenheiro** | Responsável técnico pela aeronave. | Pode gerenciar aeronaves, peças, registrar testes de qualidade e gerar relatórios finais. | `eng` / `eng` |
| **Operador** | Responsável pela execução na linha de montagem. | Focado estritamente na **Produção e Etapas**, permitindo iniciar, finalizar e se vincular a tarefas. | `op` / `op` |

*Nota: Se a base de dados estiver vazia, utilize `admin` / `admin` para o primeiro acesso.*

---

## ⚖️ Regras de Negócio Importantes

1.  **Sequência de Etapas:** Uma aeronave só pode ter uma nova etapa iniciada se a anterior estiver com o status `CONCLUIDA`.
2.  **Vínculo de Peças:** Peças cadastradas no estoque geral podem ser vinculadas a aeronaves específicas para compor sua montagem.
3.  **Geração de Relatório:** O relatório final só deve ser gerado após a conclusão de todas as etapas e aprovação nos testes de qualidade.

---
**Professor:**  Gerson Penha
**Disciplina:** Técnicas de Programação
**Aluno:** Pedro Chaim
**Instituição:** FATEC
