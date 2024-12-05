# To Do List - Teste Ilegra

Este é um projeto de uma aplicação de lista de tarefas (To Do List) desenvolvido como parte de um teste para a Ilegra. A aplicação permite ao usuário adicionar, editar e excluir tarefas, com persistência local no navegador .

## Tecnologias Utilizadas

- **React**: Utilizado para construção da interface do usuário de maneira declarativa e eficiente.
- **Zustand**: Escolhido para o gerenciamento de estado devido à sua simplicidade e desempenho. Zustand oferece uma maneira eficiente de gerenciar o estado sem a complexidade do Redux.

- **React Hook Form**: Utilizado para facilitar a manipulação e validação de formulários. Ele reduz a quantidade de código necessário e melhora a performance da aplicação, especialmente em formulários com muitos campos.

- **Zod**: Uma biblioteca de validação e parsing de dados que é usada em conjunto com o React Hook Form para garantir que os dados dos formulários sejam válidos antes de serem submetidos. A escolha do Zod oferece uma maneira simples e declarativa de validar os dados.

- **CSS Modules**: Utilizado para isolar o escopo de estilos de cada componente, evitando conflitos globais e garantindo um estilo modular e reutilizável.

- **Jest / Testing Library**: Para garantir a qualidade e estabilidade do código, os testes automatizados são feitos com Jest e React Testing Library. Essas ferramentas ajudam a garantir que a aplicação funcione corretamente e que as interações com os componentes sejam testadas de forma eficiente.

## Performance

Foi utilizado boas práticas do react e otimizações como:

- Debounce no campo de busca para evitar renderizações durante a digitação
- Lazy e Suspense para carregamento dinamico das rotas e para carregamento de modal de criação

## Como Rodar o Projeto

### Pré-requisitos

Certifique-se de ter o Node.js na versão **v20.17.0** ou superior instalado em sua máquina.

### Passos

1. Clone o projeto
2. Instale as dependências:

```bash
npm install
```

2. Inicie a aplicação em modo de desenvolvimento:

```bash
npm run dev
```

### Como rodar os testes

Rodar a cobertura de testes (gera um relatório de cobertura):

```bash
npm run coverage
```

Rodar os testes:

```bash
npm run test
```

## Autor:

Fernando Aquistapace

