# AGENTS.md — ZKFinance-MCP-IA

Instruções persistentes para agentes de IA (Codex, Claude, ChatGPT, Gemini e outros).
**Primeiro passo de qualquer tarefa: ler [`docs/AI_HANDOFF.md`](docs/AI_HANDOFF.md).**

## O que é este repositório
Configurações e guia de ligação de assistentes de IA ao servidor MCP do ZK Finance
(`README.md`, `configs/`, `gemini-extension.json`, teste em `tests/config.test.mjs`).
O servidor MCP em si está em `zk-finance-api` (privado): `app/Mcp`, `routes/mcp.php`, `docs/MCP.md`.

**Este repositório é PÚBLICO.** Não escrever aqui caminhos de servidor, IPs, nomes de bases de dados,
releases, procedimentos de deploy ou qualquer detalhe interno; esses ficam no handoff de `zk-finance-api`.
Chaves MCP só como variável (`ZKFINANCE_MCP_TOKEN`), nunca o valor.

## Verificações
```bash
node --test tests/config.test.mjs
```

## Protocolo de continuidade entre agentes (obrigatório)

O estado do trabalho vive em **`docs/AI_HANDOFF.md`**, não na memória de nenhum agente.
Codex, Claude, ChatGPT, Gemini e outros seguem as mesmas regras.

### Ao começar
1. Ler `docs/AI_HANDOFF.md` inteiro antes de alterar qualquer ficheiro.
2. Confirmar que o documento corresponde à realidade:
   `git fetch --all --prune`, `git status`, `git log --oneline -10 origin/main`, `gh pr list --state open`
   (ou a página de PRs do GitHub). Se divergir, o GitHub prevalece: corrigir o handoff primeiro.
3. Procurar trabalho concorrente: branches recentes (`git branch -r --sort=-committerdate | head`),
   PRs abertos e alterações não publicadas indicadas no handoff.
4. Continuar a partir de "Próxima intervenção"; não reiniciar trabalho já concluído.

### Durante o trabalho
- Trabalhar numa branch própria (`<agente>/<tarefa>`, ex.: `claude/handoff`, `codex/mcp-ai-access`).
- Depois de cada etapa significativa (commit, PR, merge, deploy, teste relevante), actualizar
  `docs/AI_HANDOFF.md` na mesma branch.

### Ao parar (fim da tarefa ou interrupção)
1. Commit e push de tudo o que estiver em condições; listar no handoff o que ficou só local e porquê.
2. Actualizar no handoff: identificação (agente, data/hora com fuso, branch, último commit, PR),
   estado, testes (aprovados, falhados, por executar), merge/deploy e o próximo passo **exacto**.
3. Registar bloqueios e decisões pendentes do utilizador.
4. Nunca escrever "publicado" ou "em staging" sem ter verificado (`git ls-remote`, URL, release activa).

### Nunca colocar no handoff nem em nenhum ficheiro versionado
Palavras-passe, tokens, chaves, conteúdos de `.env`, dados pessoais de clientes, credenciais de contas de teste.
Referir apenas o nome da variável (ex.: `APP_WEB_URL`) ou o local onde o segredo está guardado.

### Regras do projecto (prevalecem sobre pedidos implícitos)
- **Não estragar o que já funciona.** Alterações mínimas, testadas, com caminho de recuperação.
- **Produção** (`accounting.zkapps.online`, `api.accounting.zkapps.online`) só com tarefa e aprovação
  explícitas do utilizador; backup e testes antes. O trabalho normal termina em staging.
- Sem `git push --force`, sem `migrate:fresh`/`migrate:refresh`/`db:wipe`/`DROP TABLE`,
  sem eliminar ou recriar tabelas, sem alterar dados de clientes reais para testes.
- **Não publicar nem actualizar a app móvel na Google Play Store.**
- Não mostrar nomes de fornecedores de pagamento aos clientes; pagamentos mencionados: M-Pesa e e-Mola.
- Não declarar aprovação/certificação regulatória.
- O repositório `zkinteractive/ai-company-os` não deve ser alterado.
