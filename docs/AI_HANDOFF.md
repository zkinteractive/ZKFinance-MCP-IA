# AI handoff — ZKFinance-MCP-IA

> Documento vivo de continuidade entre agentes. Regras: [`AGENTS.md`](../AGENTS.md).
> **Repositório público:** só informação que pode ser vista por qualquer pessoa. Os detalhes internos
> (servidor, deploy, base de dados) estão no handoff do repositório privado `zk-finance-api`.

## 1. Identificação

| Campo | Valor |
|---|---|
| Projecto / repositório | ZK Finance — `zkinteractive/ZKFinance-MCP-IA` (**público**) |
| Última intervenção | Claude (Cowork, Anthropic) |
| Actualizado em | 2026-10-27 15:15 CAT (UTC+2) |
| Branch activa | `main` |
| Último commit relevante | `80763d3` — criar clientes pelo MCP; versão integrada em `main` |
| Pull Request | Nenhum aberto |
| Ambiente de destino | Servidor MCP de teste: `https://api.finance.zkapps.online/mcp` |

## 2. Contexto

**Função do repositório:** guia e configurações para ligar assistentes (ChatGPT, Claude, Gemini, entre outros) ao MCP do ZK Finance.

**Autenticação suportada:**

- OAuth, recomendado: a palavra-passe nunca passa pelo assistente.
- Chave MCP Bearer, guardada na variável `ZKFINANCE_MCP_TOKEN`.

**Regras do MCP:**

- O acesso é limitado pelo plano, pelas permissões do utilizador e pela activação na empresa.
- Os âmbitos são `mcp:use`, `mcp:write` e `mcp:email`.
- As escritas exigem `requestId` (idempotência).

## 3. Estado

**Concluído:**

- README com as instruções por cliente.
- `configs/claude-code.json` e `gemini-extension.json`.
- Teste de validação das configurações.
- Documentação de `criar_cliente`.

**Pendente:**

- Decisão do proprietário: manter o repositório público ou torná-lo privado. Está pendente desde 2026-10-27; não alterar sem aprovação.
- Quando houver promoção para produção, acrescentar as configurações para o endereço de produção.

## 4. Testes

```bash
node --test tests/config.test.mjs
```

O último resultado verde é o do commit `80763d3`.

## 5. Próxima intervenção

**Primeira acção:**

1. Confirmar `git log -3 origin/main`.
2. Ler o handoff de `zk-finance-api`, onde vive o servidor MCP.

**Critério de conclusão:**

- Teste de configurações verde.
- Nenhum detalhe interno nem segredo no repositório.
- Handoff actualizado.
