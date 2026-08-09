const express = require("express");
const cors = require("cors");
const pool = require("./db");

const  app = express();

app.use(express.json());
app.use(cors());

pool.query("SELECT NOW()").then((resultado) => {
    console.log("PostgreSQL conectado", resultado.rows[0]);
}).catch((erro) => {
    console.log("Erro ao conectar no PostgreSQL:", erro);
})

const pessoas = [];

app.get("/", (req, res) => {
    res.send("API funcionando")
});

app.get("/pessoas", async (req, res) =>{
    try{
        const resultado = await pool.query(
            "SELECT * FROM pessoas ORDER BY id"
        );

        res.json(resultado.rows);
    } catch (erro) {
        console.error("Erro ao buscar pessoas:", erro);

        res.status(500).json({
           mensagem: "Erro ao busca pessoas."
        });
    }
});

app.post("/pessoas", async (req, res) => {
    try{
        const {nome, email, telefone} = req.body;

        const resultado = await pool.query(
            `INSERT INTO pessoas (nome, email, telefone)
             VALUES ($1, $2, $3)
             RETURNING *`,
            [nome, email, telefone]
        );

        res.status(201).json(resultado.rows[0]);
    }catch (erro) {
        console.error("Erro ao cadastrar pessoa", erro);

        res.status(500).json({
            mensagem: "Erro ao cadastrar pessoa."
        });
    }
});

app.put("/pessoas/:id", async (req, res) => {
   try {
       const id = Number(req.params.id);
       const {nome, email, telefone} = req.body;

       const resultado = await pool.query(
           `UPDATE pessoas
           SET nome = $1,
               email = $2,
               telefone = $3
           WHERE id = $4
           RETURNING *`,
           [nome, email, telefone, id]
       );

       if (resultado.rows.length === 0) {
           return res.status(404).json({
               mensagem: "Pessoa não encontrada."
           });
       }

       res.json(resultado.rows[0]);

   } catch (erro) {
       console.error("Erro ao atualizar pessoa:", erro);

       res.status(500).json({
           mensagem: "Erro ao atualizar pessoa."
       });
   }
});

app.delete("/pessoas/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);

        const resultado = await pool.query(
            `DELETE FROM pessoas
             WHERE id = $1
             RETURNING *`,
             [id]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                mensagem : "Pessoa não encontrada."
            });
        }

        res.status(204).send();

    } catch (erro){
        console.error("Erro ao excluir a pessoa:", erro);

        res.status(500).json({
            mensagem: "Erro ao excluir a pessoa."
        })

    }


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