const fs = require('fs');

const envPath = './.env';

if (!fs.existsSync(envPath)) {
  console.error('.env file not found');
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, 'utf-8');

const lines = envContent
  .split('\n')
  .map(line => line.trim())
  .filter(line => line && !line.startsWith('#'));

const configPairs = lines.map(line => {
  const [key, ...rest] = line.split('=');
  const value = rest.join('=').trim();
  // Escapa comillas dobles y $ para evitar problemas en consola
  const safeValue = value.replace(/"/g, '\\"').replace(/\$/g, '\\$');
  return `${key}="${safeValue}"`;
});

console.log('Ejecuta este comando en tu terminal para subir variables:');
console.log('firebase functions:config:set ' + configPairs.join(' '));
