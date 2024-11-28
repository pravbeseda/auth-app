const fs = require('fs');
const dotenv = require('dotenv');

// Загружаем .env файл
const env = dotenv.config().parsed;

// Формируем содержимое environment.ts
const environmentFileContent = `
export const environment = {
  production: false,
  API_URL: '${env.API_URL}',
};
`;

// Записываем в файл
fs.writeFileSync('./apps/client/src/app/environment.ts', environmentFileContent, {
    encoding: 'utf-8',
});
console.log('Environment file generated successfully!');
