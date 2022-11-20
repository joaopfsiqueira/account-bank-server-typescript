# Instala a imagem Node.js na minha imagem!
FROM node:18.12.1-alpine3.16

# define o diretório de trabalho para qualquer comando RUN, CMD, COPY
# os arquivos que colocamos no contêiner do Docker executando o servidor estarão em:
WORKDIR /usr/src/server

# Copia package.json, package-lock.json, tsconfig.json, .env para a raiz de WORKDIR
COPY ["package.json", "package-lock.json", "tsconfig.json", ".env", "./"]

# Copia tudo do diretório src para WORKDIR/src
COPY ./src ./src

# Instala todos os pacotes no container
RUN npm install

# Vai rodar o comando npm start, assim que nosso container criar a api já vai passar a rodar, sem necessitar de um npm start!
CMD npm run start