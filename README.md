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
- `pnpm build` - Gera o build de PROD
- `pnpm test` - testes unitarios

## O que foi utilizado para o projeto 

- React - ^19.1.1
- Vite - ^7.1.5
- Tailwind CSS - ^4.1.13
- Jest -  ^30.1.3 
- Storybook - V8.6.14
- Docker
- TurboRepo - ^2.0.0



## Rodando os ambientes 

## Ambiente de desenvolvimento 
- pnpm dev

## Design System :
- cd packages/design-system
- pnpm dev

## Client
- cd apps/clients
- pnpm dev

## Docker 
- docker-compose up --build

# Storybook
- cd packages/design-system
- pnpm storybook
---


