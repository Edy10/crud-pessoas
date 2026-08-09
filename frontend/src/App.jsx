import "./App.css";
import { useEffect, useState } from "react";
import FormularioPessoa from "./components/FormularioPessoa";
import TabelaPessoas from "./components/TabelaPessoas";

function App() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");
    const [pessoas, setPessoas] = useState([])
    const [idEditando, setIdEditando] = useState(null);
    const [busca, setBusca] = useState("");

    useEffect(() => {
        fetch("http://localhost:3000/pessoas")
            .then((resposta) => resposta.json())
            .then((dados) => {
                setPessoas(dados);
            });
    }, [])

    function salvar(event) {
        event.preventDefault();

        if(nome.trim() === "" || email.trim() === "" || telefone.trim() === ""){
            alert("Preencha nome, E-mail e telefone.");
            return;
        }

        const telefoneValido = telefone.replace(/\D/g, "");

        if(telefoneValido.length < 11 || telefoneValido.length > 11){
           alert("Digite um telefone válido com DDD.");
           return;
        }

        const emailJaExiste = pessoas.some((pessoa) => {
            return (
                pessoa.email.toLowerCase() === email.toLowerCase() && pessoa.id !== idEditando
            );
        });

        if(emailJaExiste) {
            alert("Este e-mail já está cadastrado.");
            return;
        }

        if(idEditando !== null){
            const pessoaAtualizada = {nome, email, telefone}

            fetch(`http://localhost:3000/pessoas/${idEditando}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(pessoaAtualizada),
            }).then((resposta) => resposta.json()).then((pessoaEditada) => {
                    const listaAtualizada = pessoas.map((pessoa) =>
                        pessoa.id === idEditando ? pessoaEditada : pessoa
                    );

                    setPessoas(listaAtualizada);
                    setIdEditando(null);

                    setNome("");
                    setEmail("");
                    setTelefone("");
                }).catch((erro) =>{
                    console.log("Erro ao atualizar pessoa:", erro);
                });
        }else{
            const novaPessoa = {nome, email, telefone};

            fetch("http://localhost:3000/pessoas", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(novaPessoa),
            })
                .then((resposta) => resposta.json())
                .then((pessoaCriada) => {
                    setPessoas([...pessoas, pessoaCriada]);

                    setNome("");
                    setEmail("");
                    setTelefone("");
                })
                .catch((erro) => {
                    console.log("Erro ao cadastrar pessoa:", erro);
                });
        }
    }

    function editar(pessoa){
        setNome(pessoa.nome);
        setEmail(pessoa.email);
        setTelefone(pessoa.telefone);
        setIdEditando(pessoa.id);
    }

    function excluir(id){
        const confirmou = window.confirm("Tem certeza de que deseja excluir esta pessoa?");

        if(!confirmou){
            return;
        }

        fetch(`http://localhost:3000/pessoas/${id}`, {
            method: "DELETE"
        }).then((resposta) => {
            if(!resposta.ok){
                throw new Error("Erro ao excluir pessoa.");
            }

            const novaLista = pessoas.filter((pessoa) => pessoa.id !== id);

            setPessoas(novaLista);

            if(idEditando === id){
                cancelarEdicao();
            }
        }).catch((erro) => {
            console.log("Erro ao excluir pessoa:", erro);
        });
    }

    function cancelarEdicao() {
        setNome("");
        setEmail("");
        setTelefone("");
        setIdEditando(null);
    }

    const pessoasFiltradas = pessoas.filter((pessoa)  => {
        const  textoBusca = busca.toLowerCase();

        return (
          pessoa.nome.toLowerCase().includes(textoBusca) ||
          pessoa.email.toLowerCase().includes(textoBusca) ||
          pessoa.telefone.includes(busca)
        );
    });

    return (
        <div className="container">
            <h1 className="titulo">Cadastro de Pessoas</h1>

            <FormularioPessoa
                nome={nome}
                setNome={setNome}
                email={email}
                setEmail={setEmail}
                telefone={telefone}
                setTelefone={setTelefone}
                salvar={salvar}
                idEditando={idEditando}
                cancelarEdicao={cancelarEdicao}
            />

            {pessoas.length > 0 && (
                <div className="busca-container">
                    <input
                        type="text"
                        value={busca}
                        onChange={(event) => setBusca(event.target.value)}
                        placeholder="Buscar por nome ou e-mail"
                    />
                </div>
            )}

            {pessoas.length > 0 && pessoasFiltradas.length == 0 ? (
                <p> Nenhuma pessoa encontrada </p>
            ) : (
                <TabelaPessoas
                    pessoas={pessoasFiltradas}
                    editar={editar}
                    excluir={excluir}
                />
            )}

        </div>
    );
}

export  default  App;