import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const RAIZ = resolve(import.meta.dirname, '..');

test('recursos.js y su hoja de estilos recursos.css existen y están enlazados', () => {
  const rutaJs = resolve(RAIZ, 'src/recursos.js');
  const rutaCss = resolve(RAIZ, 'src/styles/recursos.css');

  assert.equal(existsSync(rutaJs), true, 'Falta src/recursos.js');
  assert.equal(existsSync(rutaCss), true, 'Falta src/styles/recursos.css');

  const codigo = readFileSync(rutaJs, 'utf8');
  assert.match(codigo, /import '\.\/styles\/style\.css';/);
  assert.match(codigo, /import '\.\/styles\/recursos\.css';/);
  assert.match(codigo, /renderizarNavbar\(\)/);
  assert.match(codigo, /renderizarFooter\(\)/);
});

test('COMANDOS_GIT contiene los 15 comandos esenciales y filtrarComandos funciona', async () => {
  globalThis.document = { addEventListener: () => {} };
  const { COMANDOS_GIT, filtrarComandos } = await import('../src/recursos.js');

  assert.equal(COMANDOS_GIT.length, 15);
  for (const item of COMANDOS_GIT) {
    assert.ok(item.cmd.startsWith('git '), `Comando inválido: ${item.cmd}`);
    assert.ok(item.categoria.length > 0);
    assert.ok(item.desc.length > 0);
  }

  const soloRamas = filtrarComandos(COMANDOS_GIT, 'Ramas', '');
  assert.ok(soloRamas.length >= 3);
  assert.ok(soloRamas.every((c) => c.categoria === 'Ramas'));

  const porTexto = filtrarComandos(COMANDOS_GIT, 'Todos', 'revert');
  assert.equal(porTexto.length, 1);
  assert.equal(porTexto[0].cmd, 'git revert <hash>');
});