import { Funcionario } from "../classes/Funcionario";
import { NivelPermissao } from "../enums/NivelPermissao";
import { FuncionarioService } from "./FuncionarioService";

export class AuthService {
    private static usuarioLogado: Funcionario | null = null;
    private static funcionarioService: FuncionarioService = new FuncionarioService();

    public static login(usuario: string, senha: string): boolean {
        // Recarregar funcionários para garantir que o cadastro recente seja visto
        this.funcionarioService = new FuncionarioService();
        const funcionarios = this.funcionarioService.listarTodos();

        const funcionario = funcionarios.find(f => f.getUsuario() === usuario && f.getSenha() === senha);

        if (funcionario) {
            this.usuarioLogado = funcionario;
            console.log(`\nBem-vindo, ${funcionario.getNome()}!`);
            console.log(`Nível de acesso: ${funcionario.getNivelPermissao()}`);
            return true;
        }

        if (funcionarios.length === 0 && usuario === "admin" && senha === "admin") {
            const adminPadrao = new Funcionario("0", "Admin Inicial", "", "", "admin", "admin", NivelPermissao.ADMINISTRADOR);
            this.usuarioLogado = adminPadrao;
            console.log("\nBem-vindo (Modo Inicial), Admin!");
            return true;
        }

        console.log("\nErro: Usuário ou senha incorretos.");
        return false;
    }

    public static getUsuarioLogado(): Funcionario | null {
        return this.usuarioLogado;
    }

    public static logout(): void {
        this.usuarioLogado = null;
        console.log("Logout realizado com sucesso.");
    }

    public static temPermissao(nivelRequerido: NivelPermissao): boolean {
        if (!this.usuarioLogado) return false;
        if (this.usuarioLogado.getNivelPermissao() === NivelPermissao.ADMINISTRADOR) return true;
        return this.usuarioLogado.getNivelPermissao() === nivelRequerido;
    }
}
