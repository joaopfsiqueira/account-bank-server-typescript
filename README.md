# Account-bank Project

Crição de conta bancária!

Frameworks, pacotes e linguagens utilizadas:

- [Typescript](https://www.typescriptlang.org/) - Linguagem de programação utilizada, JavaScript com tipagem estática opcional à linguagem.
- [NodeJs](https://nodejs.org/en/) - Software/Interpretador utilizado para rodar código TypesScript/JavaScript fora da Web.
- [Docker](https://docs.docker.com/compose/) - Utilizado para **[Dockerizar](https://medium.com/trainingcenter/dockerizando-sua-aplica%C3%A7%C3%A3o-e18969613f4b)** minha aplicação, onde subi minha api e meu banco de dados!
- [Typeorm](https://medium.com/trainingcenter/dockerizando-sua-aplica%C3%A7%C3%A3o-e18969613f4b) - Utilizado para gestão e controle do meu database!
- [PostgreSql](https://www.postgresql.org/) - Sistema do meu banco de dados.
- [Reflect Metadata](https://www.npmjs.com/package/reflect-metadata) - Quando habilitado, contanto que a biblioteca reflet-metadata tenha sido importada, informações adicionais de tipo de tempo de design serão expostas no tempo de execução. Precisa deixar `emitDecoretorMetaData` e `experimentalDecorator` ativos no tsconfig.json.
- [Jwt](https://github.com/auth0/node-jsonwebtoken) - Vai criar um token que expira para controlar login e acesso às rotas.
- [Cors](https://expressjs.com/en/resources/middleware/cors.html) - Controle de acesso da minha api, nesse caso, permiti acesso geral.
- [bcrypt](https://www.npmjs.com/package/bcrypt) - Bcrypt é um método de criptografia do tipo hash, utilizo para criptografar alguns dados antes de jogar no bd!
- [morgan](https://www.npmjs.com/package/morgan) - Gera logs detalhados.
- [express](https://expressjs.com/pt-br/4x/api.html) - Utizado para rodar nosso servidor.
- [Joi](https://www.npmjs.com/package/@hapi/joi) - Validar parâmetros recebidos pelo body.
- [dotenv](https://www.npmjs.com/package/dotenv) - Utilizado para armazenar variáveis de ambiente no projeto
- [es2021](https://www.ecma-international.org/publications-and-standards/standards/ecma-262/) - Dentro do _tsconfig.json_, em `target` e `lib: []`, estou utilizado o ES2021!

## 🚀 Começando

Consulte **[Instalação](#-instala%C3%A7%C3%A3o)** para saber como implantar o projeto.

### 📋 Pré-requisitos

De que coisas você precisa para rodar o server?

- _Docker Compose instalado na wsl ou através de docker-desktop._

- Ah! Estou utilizando a versão 18.12 do node! Sendo assim, recomendo utilizar a mesma para evitar bugs.

## Mudando Versão do Node (se necessário)

- Para isso, recomendo a utilização do NVM!

### Instalação Linux / WSL ->

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash
```

Retornando a versão

```
nvm -v
```

```
nvm install 18.12.1
```

Com isso, ele deve já estar utilizando a versão 18.12 do node!

```
node -v
```

### **[Instalação NVM Windows](https://github.com/coreybutler/nvm-windows)**

### 🔧 Instalação

1. Run `npm i` command
2. Crie um arquivo _.env_ no diretório inicial do projeto com o seguinte modelo:

```
DB_USER='postgres'
DB_HOST='db'
DB_NAME='account-bank'
DB_PASSWORD='password'
DB_PORT=5432
PORT=4000
SECRET_KEY='Sua Secret Key'
```

- Os arquivos ormconfig.json e data-source.ts (responsáveis pela configuração do banco de dados)
  Já estão com essas informações mencionadas acima, então, se preferir pode utilizar os mesmos dados para facilitar!

3. Certifique-se de que o serviço do docker esteja rodando! Para isso, abra o docker desktop caso esteja utilizando windows com wsl ou rode o comando service docker start.
4. Rode o comando que eu criei `make up`, esse comando vai realizar um docker compose up -d, já liberando o terminal para uso!
5. Pronto! Agora certifique-se de que os containers estão rodando com um `docker container ls -a`!

### 🔧 Utilização

- Importe no seu postman as collection que eu deixei no repositório junto das variáveis globais do postman! Ambos estão prontos para uso.

### 📚 Pastas (Server)

```
├── src - App, server e data-source
│   ├── @types - Aprimorando alguma interface já existente
│   ├── common - Funções globais, comuns.
│   ├── Domain
│        ├── account - Controller, service, schema e entity que envolve account.
│        ├── auth - Controller, service, schema e entity que envolve auth.
│        ├── transaction - Controller, service, schema e entity que envolve transaction
│        ├── user - Controller, service, schema e entity que envolve user.
│   ├── middleware - Todos os middleware do projeto.
│   ├── repository - crição de repository, conexão com as tabelas.
│   ├── routes - rotas do projeto

```
