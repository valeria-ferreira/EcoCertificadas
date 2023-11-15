document.querySelector('.login-container form').addEventListener('submit', function(event) {
    // Impede o recarregamento do formulário
    event.preventDefault();

    // Pegar valor dados de login do forms
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

    // Pegar informações do JSON
    let loginEmpresa = localStorage.getItem("loginEmpresa");
    loginEmpresa = loginEmpresa ? JSON.parse(loginEmpresa) : [];
    
    // Adicionar dados ao JSON
    loginEmpresa.push(newEmpresa);

    // Salvar dados localmente
    localStorage.setItem("loginEmpresa", JSON.stringify(loginEmpresa));

    // Adicionar resposta ao HTML
    const areaMensagem = document.querySelector('.login-container h6');
    const corpoMensagem = document.createElement('span');
    const mensagem = document.createTextNode("Empresa cadastrada com sucesso! Você será direcionado em breve...");
    corpoMensagem.appendChild(mensagem);
    areaMensagem.insertAdjacentElement('afterend', corpoMensagem);
    document.querySelector('.login-container h6 + span').style.backgroundColor = '#40b940';
    
    // Redirecionar para tela de ADM
    // Adiciona um atraso de 2 segundos antes de redirecionar
    setTimeout(function() {
        window.location.href = '/view/login.html';
    }, 2000);
});