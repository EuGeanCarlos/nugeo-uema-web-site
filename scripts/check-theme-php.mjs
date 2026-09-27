import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PHP } from '../.playground/node_modules/@php-wasm/universal/index.js';
import { loadNodeRuntime } from '../.playground/node_modules/@php-wasm/node/index.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../wordpress/nugeo');
const files = (await readdir(root, { recursive: true })).filter((file) => file.endsWith('.php'));
for (const version of ['8.0', '8.3']) {
  const php = new PHP(await loadNodeRuntime(version, { emscriptenOptions: { processId: 1 } }));
  try {
    for (const file of files) {
      php.writeFile('/check.php', await readFile(path.join(root, file)));
      const result = await php.run({ code: '<?php token_get_all(file_get_contents("/check.php"), TOKEN_PARSE); echo "OK";' });
      if (result.exitCode || result.errors || result.text !== 'OK') throw new Error(`${version} ${file}: ${result.errors || result.text}`);
    }
    console.log(`PHP ${version}: ${files.length} arquivos sem erros de sintaxe.`);
  } finally { php.exit(); }
}
