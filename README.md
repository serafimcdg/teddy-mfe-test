## Dependencias necessarias
Para rodar o projeto, você precisa ter instalado:

- Node: V18 +
- pnpm: v8+

## Estrutura do projeto

- `apps/clients` - Microfrontend de clientes
- `apps/host` - Host principal
- `packages/design-system` - Design System compartilhado

## Instalação
1. Clonar o repositorio
2. Instale as dependências: pnpm install

## Scripts principais

- `pnpm dev` - Inicia o ambiente de desenvolvimento
- `pnpm --filter @teddy/design-system build` - Necessario para gerar os arquivos de build do design system
- `pnpm test` - testes unitarios
- `- docker-compose up --build` - Caso queira subir ambiente via Docker

## O que foi utilizado para o projeto 

- React - ^19.1.1
- Vite - ^7.1.5
- Tailwind CSS - ^4.1.13
- Jest -  ^30.1.3 
- Storybook - V8.6.14
- Docker
- TurboRepo - ^2.0.0



## Rodando os ambientes 
- Para rodar o ambiente, selecione o ambiente que deseja aponta em : teddy-mfe-test\apps\host\vite.config.ts

- Basta Alterar: CLIENTS para tal

* Em seguida abra o terminal e escolha qual a maneira desejada para subir o ambiente

* Via containers (Docker) basta rodar o seguinte comando:  
- docker-compose up --build
- Abra o localhost:8080 ( para o mfe clients)
- Abra localhost:8081 (para o host)
- Abra http://localhost:6006/ (para o StoryBook)

* Via gerenciador de pacote, serão dois comandos:
- pnpm --filter @teddy/design-system build
- pnpm dev

## Ambiente de desenvolvimento 
- pnpm dev
- Abra o http://localhost:5174/ ( para o mfe clients)
- Abra http://localhost:5173 (para o host)

- Para o StoryBook será necesario rodar: 
- pnpm --filter @teddy/design-system storybook
- Abra http://localhost:6006/ (para o StoryBook)


## Client
- pnpm --filter @teddy/clients dev
## Host
- pnpm --filter @teddy/host dev

## Docker 
- docker-compose up --build

# Storybook
- pnpm --filter @teddy/design-system storybook

---


