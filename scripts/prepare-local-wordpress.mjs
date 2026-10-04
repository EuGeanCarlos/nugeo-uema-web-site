/** Local Playground only. Preserve database contents and use Windows-compatible journal mode. */
import { DatabaseSync } from 'node:sqlite';
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const database = path.join(root, '.local-wordpress/wp-content/database/.ht.sqlite');
const config = path.join(root, '.local-wordpress/wp-config.php');
if (existsSync(database)) {
 const db = new DatabaseSync(database);
 try {
  const check = db.prepare('PRAGMA quick_check').get();
  if (check.quick_check !== 'ok') throw new Error('A verificação SQLite falhou. Banco preservado; inicialização cancelada.');
  const mode = db.prepare('PRAGMA journal_mode').get().journal_mode;
  if (mode !== 'delete') {
   const backupDir = path.join(root, '.playground/backups');
   mkdirSync(backupDir, {recursive:true});
   const backup = path.join(backupDir, `before-journal-${Date.now()}.sqlite`);
   db.exec(`VACUUM INTO '${backup.replaceAll("'", "''")}'`);
   const changed = db.prepare('PRAGMA journal_mode=DELETE').get().journal_mode;
   if (changed !== 'delete') throw new Error('O banco continua ocupado. Encerre a instância anterior; nenhum arquivo deve ser apagado.');
   console.log('SQLite: cópia consistente criada; journal local alterado de ' + mode + ' para DELETE.');
  }
 } finally { db.close(); }
}
if (existsSync(config)) {
 let source = readFileSync(config,'utf8');
 const journalDefinition = source.match(/define\s*\(\s*['"]SQLITE_JOURNAL_MODE['"]\s*,\s*['"]([^'"]+)['"]\s*\)\s*;/);
 if (!journalDefinition || journalDefinition[1] !== 'DELETE') {
  if (/define\s*\(\s*['"]SQLITE_JOURNAL_MODE['"]/.test(source)) throw new Error('Há uma configuração de journal personalizada no wp-config.php. Revise-a antes de iniciar.');
  if (!source.startsWith('<?php')) throw new Error('Cabeçalho inesperado no wp-config.php; arquivo preservado.');
  source = source.replace('<?php', "<?php\n// Local Playground on Windows: preserve SQLite rollback journal.\ndefine('SQLITE_JOURNAL_MODE', 'DELETE');");
  writeFileSync(config,source,'utf8');
 }
}
console.log('Preparação SQLite local concluída.');
