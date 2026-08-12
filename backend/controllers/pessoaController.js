const pool = require("../db");

async function listarPessoas(req, res) {
    try {
        const resultado = await pool.query(
            "SELECT * FROM pessoas ORDER BY id"
        );

        res.json(resultado.rows);

    }catch (erro) {
        console.error("Erro ao buscar pessoas:", erro);

        res.status(500).json({
            mensagem: "Erro ao buscar pessoas."
        });
    }
}

async function cadastrarPessoa(req, res) {
    try {
        const {nome, email, telefone} = req.body;

        const  resultado = await  pool.query(
            `INSERT INTO pessoas (nome, email, telefone)
             VALUES ($1, $2, $3)
             RETURNING *`,
            [nome, email, telefone]
        );

        res.status(201).json(resultado.rows[0]);

    } catch (erro){
        console.error("Erro ao cadastrar pessoa:", erro);

        res.status(500).json({
            mensagem: "Erro ao cadastra pessoa."
        });
    }
}

async function atualizarPessoa(req, res) {
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
            return res.status(404).json({
               mensagem: "Pessoa não encontrada"
            });
        }

        res.json(resultado.rows[0]);
    } catch (erro) {
        console.error("Erro ao atualizar pessoa", erro);

        res.status(500).json({
            mensagem: "Erro ao atualizar pessoa."
        })
    }
}

async function excluirPessoa(req, res){
    try {
        const id = Number(req.params.id);

        const  resultado = await pool.query(
            `DELETE FROM pessoas
             WHERE id = $1
             RETURNING *`,
            [id]
        );

        if(resultado.rows.length === 0){
            return res.status(404).json({
                mensagem: "Pessoa não encontrada"
            });
        }

        res.status(204).send();

    } catch (erro) {
        console.error("Erro ao excluir pessoa", erro);

        res.status(500).json({
            mensagem: "Erro ao excluir pessoa."
        });
    }
}

module.exports = {
    listarPessoas,
    cadastrarPessoa,
    atualizarPessoa,
    excluirPessoa
};