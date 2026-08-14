const pool = require("../db");
const { validarPessoas } = require("../validators/pessoaValidator");

async function listarPessoas(req, res, next) {
    try {
        const resultado = await pool.query(
            "SELECT * FROM pessoas ORDER BY id"
        );

        res.json(resultado.rows);

    }catch (erro) {
        next(erro);
    }
}

async function cadastrarPessoa(req, res, next) {
    try {
        const {nome, email, telefone} = req.body;

        const erroValidacao = validarPessoas(nome, email, telefone);

        if (erroValidacao) {
            return res.status(400).json({
                mensagem: erroValidacao
            });
        }

        const  resultado = await  pool.query(
            `INSERT INTO pessoas (nome, email, telefone)
             VALUES ($1, $2, $3)
             RETURNING *`,
            [nome, email, telefone]
        );

        res.status(201).json(resultado.rows[0]);

    } catch (erro){
        next(erro);
    }
}

async function atualizarPessoa(req, res, next) {
    try {
        const id = Number(req.params.id);

        if (Number.isNaN(id)){
            return res.status(400).json({
                mensagem: "ID inválido."
            })
        }

        const {nome, email, telefone} = req.body;

        const erroValidacao = validarPessoas(nome, email, telefone);

        if (erroValidacao) {
            return res.status(400).json({
                mensagem: erroValidacao
            });
        }

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
        next(erro);
    }
}

async function excluirPessoa(req, res, next){
    try {
        const id = Number(req.params.id);

        if (Number.isNaN(id)){
            return  res.status(400).json({
                mensagem: "ID inválido."
            });
        }

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
        next(erro);
    }
}

module.exports = {
    listarPessoas,
    cadastrarPessoa,
    atualizarPessoa,
    excluirPessoa
};