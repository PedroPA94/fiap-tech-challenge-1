# Bytebank — Tech Challenge Fase 1

**Bytebank** é uma aplicação de **gerenciamento financeiro** desenvolvida como parte da **Fase 1 do Tech Challenge da Pós-Tech em Front-end Engineering (FIAP)**.
O projeto representa o **front-end** de uma instituição financeira fictícia, permitindo que usuários consultem o saldo, visualizem extratos, realizem novas transações e editem ou excluam operações anteriores.

[Repositório no Github](https://github.com/PedroPA94/fiap-tech-challenge-1)

## Desafios do projeto

### Design System

O projeto exigiu o desenvolvimento de um Design System próprio, incluindo:

- Criação de design tokens;
- Desenvolvimento de componentes e interfaces;
- Documentação.

A documentação foi criada no [zeroheight](https://zeroheight.com/) e pode ser consultada aqui: [Documentação do Design System](https://zeroheight.com/0f7635f80).

O [Figma](https://www.figma.com/) foi utilizado para criar os tokens, componentes e protótipo de interface e pode ser consultado aqui: [Protótipo no Figma](https://www.figma.com/design/vNwKR449FI36uoPNDr8g6X/Projeto-Financeiro--c%C3%B3pia-?node-id=23035-1686&t=bj6GNWOSqeTg3Rol-1).

### Funcionalidades da aplicação

A aplicação implementa as seguintes funcionalidades:

- **Página Home:** saudação ao usuário, saldo da conta corrente e extrato, com opção de incluir uma nova transação;
- **Página de Transações:** listagem completa das transações, com possibilidade de adicionar, editar ou deletar registros.

## Tecnologias utilizadas

- **Next.js 15+**
- **React 19**
- **TypeScript**
- **Bootstrap 5.3**
- **SASS / CSS Modules**

## Estrutura do projeto

```
app/
 ├── api/                  # Mock APIs
 ├── components/           # Componentes da página inicial
 ├── lib/                  # Funções utilitárias e hooks personalizados
 ├── providers/            # Providers globais
 ├── transactions/         # Página e componentes relacionados às transações
 ├── layout.tsx            # Layout raiz
 ├── page.tsx              # Página inicial
 └── globals.scss          # Estilos globais
design-system/
 ├── components/           # Componentes do Design System
 ├── theme.css             # Variáveis globais de estilo do Design System
 └── theme.scss            # Sobrescrita de variáveis do Bootstrap
```

## Como executar o projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/PedroPA94/fiap-tech-challenge-1.git
cd fiap-tech-challenge-1
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Executar em modo de desenvolvimento

```bash
npm run dev
```

A aplicação será executada em:

```
http://localhost:3000
```

## Demonstração

https://github.com/user-attachments/assets/8b318fa0-a43f-47d4-8e48-c22e87b4acec

## Contribuições Futuras

As próximas etapas previstas para evolução do projeto incluem:

- **Login e autenticação de usuário**: tela de login e controle de sessão com cookies.

- **Validação de formulários**: regras de validação e mensagens de feedback visual.

- **Página 404 personalizada**.

- **Testes unitários**.
