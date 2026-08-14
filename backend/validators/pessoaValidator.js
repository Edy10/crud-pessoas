function validarPessoas(nome, email, telefone) {
    if(!nome || !email || !telefone){
        return "Nome, E-mail e telefone são obrigatórios.";
    }

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!regexEmail.test(email)) {
        return "E-mail inválido.";
    }

    const  telefoneNumeros = telefone.replace(/\D/g, "");

    if (telefoneNumeros.length !== 10 && telefoneNumeros.length !== 11) {
        return "Telefone deve ter 10 ou 11 dígitos.";
    }

    return null;
}

module.exports = {
    validarPessoas
};