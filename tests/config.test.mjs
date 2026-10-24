import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import assert from 'node:assert/strict';
const json = p => JSON.parse(readFileSync(new URL('../' + p, import.meta.url), 'utf8'));
test('Gemini extension keeps credentials outside model context and requires host approvals', () => {
  const c = json('gemini-extension.json');
  assert.match(c.name, /^[a-z0-9-]+$/);
  assert.equal(c.settings[0].sensitive, true);
  assert.equal(c.settings[0].envVar, 'ZKFINANCE_MCP_TOKEN');
  const server = c.mcpServers['ZKFinance-MCP-IA'];
  assert.equal(server.httpUrl, 'https://api.finance.zkapps.online/mcp');
  assert.equal(server.headers.Authorization, 'Bearer ${ZKFINANCE_MCP_TOKEN}');
  assert.equal(server.trust, undefined);
});
test('Claude config uses HTTP and a variable, never a literal credential', () => {
  const c = json('configs/claude-code.json').mcpServers['ZKFinance-MCP-IA'];
  assert.equal(c.type, 'http');
  assert.equal(c.url, 'https://api.finance.zkapps.online/mcp');
  assert.equal(c.headers.Authorization, 'Bearer ${ZKFINANCE_MCP_TOKEN}');
});
