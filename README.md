# ☑️ Gerenciamento de Tarefas

<figure><img src="./docs/todo-list.avif" alt=""><figcaption></figcaption></figure>

## Figma

[https://www.figma.com/design/FjPz5QnCyx2PvEp8gGx8mA/Todo-List?node-id=0-1\\&t=DI4ZGDQLw33j20SK-1](https://www.figma.com/design/FjPz5QnCyx2PvEp8gGx8mA/Todo-List?node-id=0-1\\&t=DI4ZGDQLw33j20SK-1)

## Descrição do Projeto

Este projeto envolve a criação de uma aplicação completa de gerenciamento de tarefas utilizando ReactJS para o frontend e Express para o backend. O objetivo é permitir que os usuários criem, leiam, atualizem e deletem tarefas, além de exibir todas as tarefas.

## Objetivos

* **Criação de tarefas**: Permitir que os usuários criem novas tarefas.
* **Leitura de tarefas**: Mostrar uma lista de todas as tarefas.
* **Atualização de tarefas**: Permitir que os usuários atualizem tarefas existentes.
* **Deleção de tarefas**: Permitir que os usuários deletem tarefas.
* **Exibição de tarefas**: Mostrar todas as tarefas criadas.

## Requisitos

### Frontend

1. **ReactJS**: React para construir a interface do usuário.
2. **Componentes**:
   * Formulário para criação e atualização de tarefas.
   * Lista de tarefas.
   * Botão para deleção de tarefas.

### Backend

1. **ExpressJS**: Express para construir a API.
2. **Endpoints**:
   * `POST /tasks`: Criação de uma nova tarefa.
   * `GET /tasks`: Recuperar todas as tarefas.
   * `PUT /tasks/:id`: Atualizar uma tarefa existente.
   * `DELETE /tasks/:id`: Deletar uma tarefa.

### Banco de Dados

**MongoDB**: armazena os dados das tarefas.

## Scripts

### Backend

```json
"scripts": {
  "start": "node .",
  "dev": "nodemon .",
  "test": "jest"
}
```

### Frontend

```json
"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build",
  "test": "react-scripts test",
  "eject": "react-scripts eject"
}
```

## Configuração do Projeto

### Configuração do Backend

1. Navegue até a pasta do backend:
    ```sh
    cd backend
    ```
2. Instale as dependências:
    ```sh
    npm install
    ```
3. Copie o arquivo `.env.example` para `.env` e ajuste as configurações conforme necessário.

4. Inicie o servidor:
    ```sh
    npm start
    ```
   Ou para iniciar em modo de desenvolvimento com nodemon:
    ```sh
    npm run dev
    ```

### Configuração do Frontend

1. Navegue até a pasta do frontend:
    ```sh
    cd frontend
    ```
2. Instale as dependências:
    ```sh
    npm install
    ```
3. Inicie o servidor de desenvolvimento:
    ```sh
    npm start
    ```

## Fluxo de Desenvolvimento

1. Crie uma issue no repositório do GitHub e atribua a pessoa responsável.
2. Crie uma nova branch a partir da interface do GitHub.
3. Utilize o GitHub Codespace ou clone o projeto localmente para trabalhar na issue.
4. Realize commits frequentemente na branch criada para a issue.
5. Ao finalizar o desenvolvimento, abra um Pull Request da branch da issue para a branch `main` e solicite revisão de um colega.

### Dicas de Desenvolvimento

- Utilize um terminal para rodar o backend:
  ```sh
  cd backend
  npm run dev
  ```
- Utilize outro terminal para rodar o frontend:
  ```sh
  cd frontend
  npm start
  ```
- Mantenha um terminal separado na raiz do projeto para comandos diversos como git, etc.

## Testes

### Backend

- Os testes são realizados utilizando o Jest. Para rodar os testes, use:
  ```sh
  npm test
  ```

*Nota: O frontend ainda não possui testes configurados.*

## IDE Recomendada

- Recomendamos o uso do [VSCode](https://code.visualstudio.com/) como IDE para o desenvolvimento deste projeto.

## Conclusão

Este projeto fornece uma oportunidade prática para aplicar os conhecimentos de ReactJS, ExpressJS e MongoDB, desenvolvendo uma aplicação web completa. Siga os passos fornecidos para concluir o projeto com sucesso. Boa sorte!
