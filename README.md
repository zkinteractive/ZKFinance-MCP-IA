# ZKFinance-MCP-IA

Ligação remota MCP ao ZK Finance. O assistente interpreta o pedido; o Laravel executa as operações autorizadas e devolve o resultado. Não requer chaves OpenAI, Anthropic ou Google no ZK Finance.

**Ambiente actualmente disponibilizado: TESTE.** Servidor: `https://api.finance.zkapps.online/mcp`. Aplicação: https://finance.zkapps.online. Não usar este endereço para documentos de produção.

Este repositório contém configurações e instruções públicas do conector. O backend da aplicação e os dados dos clientes continuam nos repositórios/servidores privados. Um link GitHub permite instalar extensões em clientes que suportam esse mecanismo; não dá a uma IA autorização para instalar integrações em qualquer aplicação ou ignorar consentimentos.

## Preparação da conta

1. O administrador do pacote activa **Acesso à IA via MCP** no ZK Finance.
2. Em **Definições → Integrações e IA**, um administrador da empresa activa MCP.
3. Cada utilizador liga o seu assistente por OAuth ou cria a sua própria chave MCP limitada.
4. O backend verifica empresa, utilizador, função, pacote, subscrição e revogação em cada chamada. Desactivar MCP revoga todas as ligações e chaves da empresa. Voltar a activar não recupera credenciais revogadas.

As chaves MCP são distintas do acesso geral à API: não alteram a funcionalidade **Acesso à API** do pacote. Têm validade entre 1 e 90 dias e só são mostradas na criação. Para rotação, criar substituta, configurar no cliente e revogar a anterior.

## ChatGPT

Nas definições de Apps/Plugins, quando a conta disponibilizar criação de servidor MCP personalizado:

- Nome: `ZKFinance-MCP-IA`.
- URL: `https://api.finance.zkapps.online/mcp`.
- Autenticação: OAuth. Usar registo dinâmico (DCR) quando disponível; o servidor anuncia o endpoint de registo. Não seleccionar CIMD, que ainda não é suportado.
- Se usar cliente pré-registado, o administrador deve registar o callback exacto mostrado pelo ChatGPT e fornecer o Client ID; clientes públicos não usam secret.
- Iniciar a ligação, entrar no ZK Finance e autorizar a empresa e os âmbitos pretendidos.

Uma sessão existente no mesmo navegador evita repetir o login. O consentimento continua obrigatório. Se não existir sessão, o login regressa automaticamente ao pedido de autorização. Pedidos antigos expiram: iniciar uma ligação nova no ChatGPT.

O suporte depende do produto, plano e regras do workspace. A documentação de MCP personalizado distingue escrita, pesquisa e disponibilidade móvel. Não se promete que um conector personalizado funcione no ChatGPT mobile só por funcionar na web. Não colocar chaves MCP na conversa. Este repositório não é uma publicação aprovada no directório da OpenAI.

## Claude web, Desktop e mobile

Em Settings → Connectors → Add custom connector, introduzir o endereço MCP e ligar por OAuth. O servidor aceita registo dinâmico para o callback hospedado oficial do Claude. Alternativamente, usar Client ID pré-registado nas opções avançadas. As ligações remotas são realizadas pela infraestrutura Claude; não requerem manter o computador ligado. A documentação indica Free (um conector), Pro, Max, Team e Enterprise; organizações podem impor restrições.

## Gemini CLI — extensão instalável pelo GitHub

```sh
gemini extensions install https://github.com/zkinteractive/ZKFinance-MCP-IA
```

O instalador do Gemini CLI pede uma **chave MCP do ZK Finance** no campo sensível, guardado no keychain quando suportado. Criar a chave nas Definições da aplicação, com apenas as permissões necessárias. Não a enviar ao modelo. A extensão configura o servidor HTTP e mantém as confirmações do cliente. O nome técnico da extensão é `zkfinance-mcp-ia`, conforme a regra de nomes em minúsculas do Gemini CLI; o servidor chama-se `ZKFinance-MCP-IA`.

Isto aplica-se ao **Gemini CLI**, não constitui promessa de instalação em gemini.google.com ou na aplicação móvel Gemini. OAuth com cliente público pré-registado e callback loopback fixo é uma alternativa administrada.

## Claude Code

Mesclar `configs/claude-code.json` no `.mcp.json` do projecto sem apagar outros servidores. Disponibilizar `ZKFINANCE_MCP_TOKEN` no armazenamento seguro/ambiente do cliente; o ficheiro contém apenas a referência à variável. Rever e aceitar a ligação em `/mcp`. A configuração não concede aprovação automática às operações.

## Operações e ficheiros

Consultar `zk_capacidades` e `tools/list` após autenticar. O catálogo efectivo depende das permissões. Tipos implementados: factura, cotação, factura proforma, recibo, nota de crédito e nota de débito. Rascunhos só para os tipos que os suportam; recibos/notas dependem de pagamentos/facturas existentes.

PDF é uma representação de um registo guardado; a resposta inclui recurso autenticado embutido, sujeito à apresentação suportada pelo cliente. Anexar um PDF numa conversa não significa que o ZK Finance o recebeu. O assistente pode extrair dados e enviá-los estruturados; não existe upload de anexos nem exportação Excel anunciada nesta versão.

A escrita utiliza `requestId`: repetir a mesma operação com o mesmo identificador após falha de rede, nunca criar um novo para repetir cegamente. E-mail exige destinatário, documento e pedido explícito. O ambiente de teste simula envio: não declarar entrega real.

## Verificação e limitações

Configurações verificadas contra documentação oficial em 24-10-2026; testes de backend e HTTP são distintos de certificação em contas reais dos fornecedores. A conclusão ponta a ponta em cada cliente deve ser verificada após ligação. O repositório não instala software silenciosamente nem ultrapassa restrições de plano.

Fontes oficiais:
- https://developers.openai.com/plugins/build/auth
- https://help.openai.com/en/articles/12584461-connecting-custom-mcp-servers-in-chatgpt
- https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp
- https://claude.com/docs/connectors/building/authentication
- https://code.claude.com/docs/en/mcp
- https://geminicli.com/docs/tools/mcp-server/
- https://geminicli.com/docs/extensions/reference/

Teste das configurações, sem rede nem segredos: `node --test tests/*.test.mjs`.
