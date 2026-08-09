const express = require("express");
const cors = require("cors");

const  app = express();

app.use(express.json());
app.use(cors());

const pessoas = [];

app.get("/", (req, res) => {
    res.send("API funcionando")
});

app.get("/pessoas", (req, res) =>{
    res.json(pessoas);
});

app.post("/pessoas", (req, res) => {
   const novaPessoa = {
       id: Date.now(),
       nome: req.body.nome,
       email: req.body.email,
       telefone: req.body.telefone,
   };

   pessoas.push(novaPessoa);

   res.status(201).json(novaPessoa);
});

app.put("/pessoas/:id", (req, res) => {
   const id = Number(req.params.id);

   const pessoa = pessoas.find((pessoa) => pessoa.id === id);

   if (!pessoa) {
       return res.status(404).json({
           mensagem: "Pessoa não encontrada."
       })
   }

   pessoa.nome = req.body.nome;
   pessoa.email = req.body.email;
   pessoa.telefone = req.body.telefone;

   res.json(pessoa);
});

app.delete("/pessoas/:id", (req, res) => {
   const id = Number(req.params.id);

   const indice = pessoas.findIndex((pessoa) => pessoa.id === id);

   if (indice === -1) {
       return res.status(404).json({
           mensagem: "Pessoa näo encontrada"
       });
   }

   pessoas.splice(indice, 1);

   res.status(204).send();
});

app.listen(3000, () => {
    console.log("API CRUD rodando na porta 3000");
});