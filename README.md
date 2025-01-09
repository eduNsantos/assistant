Olá, Senhores e senhoras!

#### Sobre o proejto

Esse projeto roda utilizando **DOCKER**.

O WSL (Windows Subsystem for Linux) é uma funcionalidade do Windows que permite executar distribuições Linux diretamente no Windows, sem a necessidade de máquinas virtuais ou dual boot. Ele oferece integração entre os sistemas, permitindo rodar ferramentas e comandos Linux nativamente no ambiente Windows. É útil para desenvolvedores que precisam de um ambiente Linux para tarefas específicas, como desenvolvimento, testes ou execução de scripts.

#### Passos iniciais
Habilite o WSL2 [seguindo esse passo-a-passo](https://learn.microsoft.com/en-us/windows/wsl/install).

A instalação do WSL é necessária para rodar o docker no windows.
Existe o [Docker Desktop](https://www.docker.com/products/docker-desktop/), mas ele é **muito lento** em relação ao docker rodando diretamente no linux ou WSL

#### Rodando o projeto pela primeira vez
1. Copie o arquivo **.env.example** para **.env** e ajuste as variáveis

2. Instale as dependências do backend e frontend

```
docker compose run -it --rm backend npm install
```
```
docker compose run -it --rm frontend npm install
```

#### Rodar as migrations
1. Para conseguir rodar as migrations o typescript precisa ser compilado para JS
```
npx tsc
```
(Provisório (?)) O arquivo [backend/typeorm.config.ts](https://github.com/eduNsantos/assistant/blob/master/backend/typeorm.config.ts#L18-L21) tem a entity e migrations, para conseguir rodar as migrations precisa estar configurado para .js, depois altere novamente para .ts.
Então altere para .js, rode o comando acima (`npx tsc`), rode as migrations:
```
npx typeorm migration:run
```
Então volte para .ts e vida que segue 😊

#### Iniciando os projetos
O arquivo [docker-compose.yml](https://github.com/eduNsantos/assistant/blob/master/docker-compose.yml) contem todos os servicos necessários para rodar o projeto. Para rodar todos eles execute no terminal
```
docker compose up -d
```