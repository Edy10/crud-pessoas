const express = require("express");
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");

const pessoasRoutes = require("./routes/pessoaRoutes");

const  app = express();

app.use(express.json());
app.use(cors());

app.use("/pessoas", pessoasRoutes);

app.use((req, res) => {
    res.status(404).json({
        mensagem: "Rota não encontrada."
    });
});

app.use(errorHandler);

app.listen(3000, () => {
    console.log("API CRUD rodando na porta 3000");
});