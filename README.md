# **Descrição do App - Lista de Tarefas com Login e Registro**

Este é um aplicativo web simples e funcional para gerenciar tarefas pessoais, desenvolvido com um sistema de autenticação para garantir que cada usuário tenha acesso apenas às suas próprias listas. O app foi construído com as seguintes funcionalidades:

## **Funcionalidades Principais**
- **Autenticação de Usuário:**
  - Registro de novos usuários com validação de dados.
  - Login seguro utilizando senhas criptografadas com bcrypt e tokens JWT.
  - Logout para encerrar sessões ativas.

- **Gerenciamento de Tarefas:**
  - Adicionar novas tarefas à lista.
  - Marcar tarefas como concluídas.
  - Excluir tarefas indesejadas.
  - Visualizar a lista de tarefas associada ao usuário autenticado.

## **Tecnologias Utilizadas**
- **Frontend:**
  - HTML, CSS e JavaScript para a interface do usuário.
  - Design responsivo para compatibilidade com diferentes tamanhos de tela.
  
- **Backend:**
  - Node.js com Express para lidar com as rotas e lógica do servidor.
  - SQLite como banco de dados local para armazenar usuários e tarefas.
  - JWT para autenticação segura.

- **Hospedagem:**
  - Frontend hospedado no Netlify.
  - Backend hospedado no Render.

## **Como Funciona**
1. Ao acessar o aplicativo, o usuário é direcionado à página de login.
2. Usuários novos podem se registrar preenchendo um nome de usuário e senha.
3. Após o login, o usuário é redirecionado à aplicação, onde pode:
   - Adicionar novas tarefas.
   - Visualizar tarefas pendentes ou concluídas.
   - Excluir ou atualizar o status das tarefas.
4. A funcionalidade de logout permite ao usuário sair da conta, retornando à página de login.

## **Como Rodar Localmente**
1. Clone o repositório do GitHub:
   ```
   git clone https://github.com/seu-usuario/seu-repositorio.git
   ```
2. Navegue até a pasta do projeto:
   ```
   cd seu-repositorio
   ```
3. Instale as dependências do backend:
   ```
   npm install
   ```
4. Inicie o servidor backend:
   ```
   node server.js
   ```
5. Abra o arquivo `index.html` do frontend em seu navegador para testar localmente.

## **Hospedagem**
- [Frontend no Netlify](https://seu-netlify-link.netlify.app)
- [Backend no Render](https://seu-render-link.onrender.com)

Sinta-se à vontade para contribuir com melhorias ou sugerir novas funcionalidades para este projeto! 😊

