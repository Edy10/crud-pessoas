function errorHandler(erro, req, res, next) {
    console.error("Erro:", erro);

    if (erro.code == 23505) {
        return res.status(409).json({
            mensagem: "E-mail já cadastrado."
        });
    }

    req.status(500).json({
       mensagem: "Erro interno do servidor."
    });
}

module.exports = errorHandler;