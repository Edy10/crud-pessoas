const express = require("express");
const cors = require("cors");
const pessoasRoutes = require("./routes/pessoaRoutes");

const  app = express();

app.use(express.json());
app.use(cors());

app.use("/pessoas", pessoasRoutes);

app.listen(3000, () => {
    console.log("API CRUD rodando na porta 3000");
});