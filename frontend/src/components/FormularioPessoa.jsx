function  FormularioPessoa({nome, setNome, email, setEmail, telefone, setTelefone, salvar, idEditando, cancelarEdicao}){
   return (
       <form className="formulario" onSubmit={salvar}>
           <div className="campo">
               <label htmlFor="nome">Nome: </label>
               <input
                   id="nome"
                   type="text"
                   value={nome}
                   onChange={(event)=>setNome(event.target.value)}
                   placeholder="Digite o nome"
               />
           </div>

           <div className="campo">
               <label htmlFor="email">E-mail: </label>
               <input
                   id="email"
                   type="email"
                   value={email}
                   onChange={(event) => setEmail(event.target.value)}
                   placeholder="Digite o e-mail"
               />
           </div>

           <div className="campo">
               <label htmlFor={telefone}>Telefone: </label>
               <input
                   id="telefone"
                   type="text"
                   value={telefone}
                   onChange={(event) => setTelefone(event.target.value)}
                   placeholder="Digite o telefone"
               />
           </div>

           <div className="btn-salvar">
               <button className="botao" type="submit">
                   {idEditando !== null ? "Atualizar" : "Cadastrar"}
               </button>
               {idEditando !== null && (
                   <button
                       className="botao botao-cancelar"
                       type="button"
                       onClick={cancelarEdicao}
                   >
                       Cancelar
                   </button>
               )}
           </div>
       </form>
   )
}

export default FormularioPessoa;