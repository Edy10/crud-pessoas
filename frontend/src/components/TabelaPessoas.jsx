function TabelaPessoas({pessoas, editar, excluir}){
    if(pessoas.length === 0){
        return null;
    }

    return (
        <table className="tabela">
            <thead>
            <tr>
                <th colSpan={4}>
                    <h2>Pessoas Cadastradas</h2>
                </th>
            </tr>
            <tr>
                <th> Ação </th>
                <th> Nome </th>
                <th> E-mail </th>
                <th> Telefone </th>
            </tr>
            </thead>
            <tbody>
            {pessoas.map((pessoa) => (
                <tr key={pessoa.id}>
                    <td>
                        <button className="botao botao-editar" type="button" onClick={() => editar(pessoa)}>
                            Editar
                        </button>

                        <button className="botao botao-excluir" type="button" onClick={() => excluir(pessoa.id)} >
                            Excluir
                        </button>
                    </td>

                    <td> {pessoa.nome} </td>
                    <td> {pessoa.email} </td>
                    <td> {pessoa.telefone }</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default TabelaPessoas;