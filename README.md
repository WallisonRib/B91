## Plataforma de Análise de Risco de Transações

### Prerequisites

Node.js Instalado

- npm
  ```sh
  npm install npm@latest -g
  ```

### Instalação

1. Clone the repo
   ```sh
   git clone
   ```
2. Instalar pacotes npm
   ```sh
   npm install
   ```
3. Configurar .env `
   ```js
   DATABASE_URL = '';
   POSTGRES_DB= ""
   POSTGRES_USER=""
   POSTGRES_PASSWORD=""
   ```
4. Rodar docker do PostgreSQL
  Na raiz do projeto, rode o comando:
   ```js
   docker-compose upd -d;
   ```
5. Rodar o projeto:
   ```sh
   npm run start:dev ou npm run start
   ```

### Acessando:

O sistema estará disponivel para acesso via SSH em "http://localhost:3000" e disponivel para acesso via OpenApi/Swagger em "http://localhost:3000/api"
