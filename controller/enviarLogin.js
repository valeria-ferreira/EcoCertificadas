document.querySelector('.login-container form').addEventListener('submit', function(event) {
    // Impede o recarregamento do formulário
    event.preventDefault();

    // Pegar valor dados de login do forms
    let email_login = document.getElementById("email_login").value;
    let password_login = document.getElementById("password_login").value;

    // Verificar no arquivo JSON, se informações de Login existem
    fetch('/model/usersLogin.json')
        // Converter resposta do servidor
        .then(response => response.json())
        // Receber resposta
        .then(data => {
            // Verificar se informações inseridas e existentes são iguais
            const user = data.find(user => user.username === email_login && user.password === password_login);

            // Verificar se é login de ADM
            if (user) {
                // Adicionar resposta ao HTML
                const areaMensagem = document.querySelector('.login-container h6');
                const corpoMensagem = document.createElement('span');
                const mensagem = document.createTextNode("Login efetuado com sucesso! Você será direcionado em breve...");
                corpoMensagem.appendChild(mensagem);
                areaMensagem.insertAdjacentElement('afterend', corpoMensagem);
                document.querySelector('.login-container h6 + span').style.backgroundColor = '#40b940';
                
                // Redirecionar para tela de ADM
                // Adiciona um atraso de 2 segundos antes de redirecionar
                setTimeout(function() {
                    window.location.href = '/view/admin/empresas.html';
                }, 2000);
            } else {
                // Pegar informações do JSON
                let loginEmpresa = localStorage.getItem("loginEmpresa");
                loginEmpresa = loginEmpresa ? JSON.parse(loginEmpresa) : [];
                
                // Verificar se é login de user (empresa)
                let isValid = false;
                // Percorrer dados do JSON
                for (let i = 0; i < loginEmpresa.length; i++){
                    if (loginEmpresa[i].email === email_login && loginEmpresa[i].password == password_login){
                        isValid = true;
                        break;
                    }
                }

                if (isValid){
                    // Adicionar resposta ao HTML
                    const areaMensagem = document.querySelector('.login-container h6');
                    const corpoMensagem = document.createElement('span');
                    const mensagem = document.createTextNode("Login efetuado com sucesso! Você será direcionado em breve...");
                    corpoMensagem.appendChild(mensagem);
                    areaMensagem.insertAdjacentElement('afterend', corpoMensagem);
                    document.querySelector('.login-container h6 + span').style.backgroundColor = '#40b940';
                    
                    // Redirecionar para tela de usuário (empresa)
                    // Adiciona um atraso de 2 segundos antes de redirecionar
                    setTimeout(function() {
                        window.location.href = '/view/user/perfil.html';
                    }, 2000);
                }
                else{
                    const areaMensagem = document.querySelector('.login-container h6');
                    const corpoMensagem = document.createElement('span');
                    const mensagem = document.createTextNode("Usuário ou Senha incorretos. Verifique e tente novamente.");
                    corpoMensagem.appendChild(mensagem);
                    areaMensagem.insertAdjacentElement('afterend', corpoMensagem);
                    document.querySelector('.login-container h6 + span').style.backgroundColor = '#f75e53';
                }
            }
        })
        .catch(error => {
            console.error('Erro na requisição Fetch:', error);
            document.getElementById('result').innerHTML = 'Erro na requisição Fetch.';
        });
});