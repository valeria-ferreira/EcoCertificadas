document.querySelector('.modal-body form').addEventListener('submit', function(event) {
    // Impede o recarregamento do formulário
    event.preventDefault();

    // Pegar valor dos dadas cadastrados no forms
    let nome_empresa = document.getElementById("nome_empresa").value;
    let cnpj_empresa = document.getElementById("cnpj_empresa").value;
    let email_empresa = document.getElementById("email_empresa").value;
    let password_empresa = document.getElementById("password_empresa").value;

    // Criar JSON com as informações
    let newEmpresa = {
        "name": nome_empresa,
        "CNPJ": cnpj_empresa,
        "email": email_empresa,
        "password": password_empresa
    };
    
    // Adicionar dados ao JSON
    loginEmpresa.push(newEmpresa);

    // Salvar dados localmente
    localStorage.setItem("loginEmpresa", JSON.stringify(loginEmpresa));

    // Adicionar resposta ao HTML
    const areaMensagem = document.querySelector('.modal-body form');
    const corpoMensagem = document.createElement('h6');
    const mensagem = document.createTextNode("Empresa cadastrada com sucesso!");
    corpoMensagem.appendChild(mensagem);
    areaMensagem.insertAdjacentElement('beforebegin', corpoMensagem);
    document.querySelector('.modal-content h6').style.backgroundColor = '#40b940';
    
    // Adiciona um atraso de 1 segundos antes de redirecionar
    setTimeout(function() {
        info();
        document.querySelector('#adicionarEmpresas button:nth-of-type(1)').click();
    }, 1000);
});