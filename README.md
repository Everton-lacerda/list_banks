# Documentação do Projeto

## Descrição Geral
Este projeto foi desenvolvido como parte de uma solicitação de testes para gerenciar uma aplicação de bancos. 
Ele contém funcionalidades essenciais como cadastro, listagem, atualização, exclusão de bancos, controle de acesso com roles (perfis de usuários), e autenticação via OAuth2 utilizando o fluxo **Password Grant**. A aplicação foi construída com **Angular** com **Boostrap 
5** 

![dev admin](https://github.com/user-attachments/assets/8c9f63d1-9f91-4943-92db-c1d84bf8427c)

![dev admin _v](https://github.com/user-attachments/assets/368f0b9f-392f-408d-abb7-213585d898d9)


## Estrutura do Projeto

### 1. **Frontend:**
- **Framework:** Angular.
- **Estilo:** Bootstrap 5 .

### 2. **Autenticação e Autorização:**
- Implementado com OAuth2 (fluxo de Password Grant).
- Controle de acesso baseado em roles

### 3. **Features Implementadas:**
#### a) Autenticação
- Login com validação de credenciais.
- Armazenamento seguro de tokens de acesso e refresh token no `localStorage`.
- Renovação automática de token ao expirar.

#### b) Controle de Acesso (Roles)
- Validação de permissões em tempo de execução.
- Desabilitação de botões e inputs para usuários sem permissões específicas.

#### c) CRUD de Bancos
- **Listagem:** Mostra todos os bancos cadastrados com opção de busca, paginação e ordenação na tabela.
- **Cadastro:** Adiciona novos bancos com validação de formulário.
- **Atualização:** Permite a edição dos dados de bancos existentes.
- **Exclusão:** Remove bancos cadastrados.


## Configuração do Ambiente
### Pré-requisitos
- Node.js
- Angular CLI

### Configuração da API
Certifique-se de configurar a URL da API e as credenciais do cliente no arquivo `environment.ts`:
 

## Endpoints da API
A aplicação se comunica com os seguintes endpoints:

```bash
git clone https://github.com/Everton-lacerda/list_banks.git
cd seu-repositorio
npm install

**Desenvolvido por:** [Everton Marques]
**Contato:** [everton_ml@outlook.com]
