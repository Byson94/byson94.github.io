import { readFile } from 'fs/promises';
import { createInterface } from 'readline';

const wasmBuffer = await readFile('./pkg/psh_bg.wasm');
const { default: init, Psh } = await import('./pkg/psh.js');

await init(wasmBuffer);

const shell = new Psh();

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const prompt = () => {
  rl.question('psh> ', (input) => {
    const output = shell.execute(input.trim());
    if (output) console.log(output);
    if (output === "CLEAR") console.clear();
    prompt();
  });
};

console.log('PSH | type "help" for commands, ctrl+c to exit');
prompt();