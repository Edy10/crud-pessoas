const  express = require("express");
const pool = require("../db");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const  resultado = await  pool.query(
            "SELECT * FROM pessoas ORDER  BY id"
        );

        res.json(resultado.rows);
    } catch (erro) {
        console.error("Erro ao busca pessoas:", erro);

        res.status(500).json({
            mensagem: "Erro ao buscar pessoa."
        })
    }
});

router.post("/", async (req, res) => {
   try {
       const {nome, email, telefone} = req.body;

       const  resultado = await pool.query(
           `INSERT INTO pessoas (nome, email, telefone)
            VALUES ($1, $2, $3)
            RETURNING *`,
           [nome, email, telefone]
       );

       res.status(201).json(resultado.rows[0]);

   } catch (erro){
       console.error("Erro ao cadastrar pessoa:", erro);

       res.status(500).json({
           mensagem: "Erro ao cadastrar pessoa."
       });
   }
});

router.put("/:id", async (req, res) =>{
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

       if(resultado.rows.length === 0){
           return req.status(400).json({
               mensagem: "Pessoa não encontrada."
           });
       }

       res.json(resultado.rows[0]);

   } catch (erro){
        console.error("Erro ao atualizar pessoa:", erro);

        res.status(500).json({
            mensagem: "Erro ao atualizar pessoa."
        })
   }
});

router.delete("/:id", async  (req, res) => {
   try {
       const  id = Number((req.params.id));

       const  resultado = await pool.query(
           `DELETE FROM pessoas
             WHERE id = $1
             RETURNING *`,
           [id]
       );

       if(resultado.rows.length === 0) {
           return res.status(404).json({
               mensagem: "Pessoa não encontrada."
           });
       }

       res.status(204).send();

   } catch (erro){
       console.error("Erro ao excluir pessoa:", erro);
       res.status(500).json({
          mensagem: "Erro ao excluir pessoa."
       });
   }
});

module.exports = router;