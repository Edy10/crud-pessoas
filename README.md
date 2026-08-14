# CRUD de Pessoas

Projeto full stack de cadastro de pessoas desenvolvido com React, Node.js e PostgreSQL.

## Funcionalidades

* Cadastrar pessoas
* Listar pessoas
* Editar pessoas
* Excluir pessoas
* Buscar pessoas
* Validar e-mail e telefone

## Tecnologias

### Frontend

* React
* Vite
* JavaScript
* CSS

### Backend

* Node.js
* Express
* PostgreSQL

## Como rodar

### Backend

```bash
cd backend
npm install
npm run dev
```

Crie um arquivo `.env`:

```env
DB_USER=seu_usuario
DB_HOST=localhost
DB_NAME=crud_pessoas
DB_PORT=5432
```

Execute também o arquivo:

```text
database.sql
```

para criar a tabela do banco.

A API roda em:

```text
http://localhost:3000
```

### Frontend

Em outro terminal:

```bash
cd frontend
npm install
npm run dev
```

O frontend normalmente roda em:

```text
http://localhost:5173
```

## API

```text
GET    /pessoas
POST   /pessoas
PUT    /pessoas/:id
DELETE /pessoas/:id
```

## Estrutura do backend

```text
controllers/  → lógica
routes/       → rotas
validators/   → validações
middlewares/  → tratamento de erros
db.js         → conexão com PostgreSQL
```

## Autor

Edivaldo S. Paixão
