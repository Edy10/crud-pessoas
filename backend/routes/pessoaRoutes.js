const  express = require("express")

const {
    listarPessoas,
    cadastrarPessoa,
    atualizarPessoa,
    excluirPessoa
} = require("../controllers/pessoaController");

const router = express.Router();

router.get("/", listarPessoas);
router.post("/", cadastrarPessoa);
router.put("/:id", atualizarPessoa);
router.delete("/:id", excluirPessoa);

module.exports = router;