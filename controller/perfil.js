// Obter os dados do localStorage
let loginEmpresa = localStorage.getItem("loginEmpresa");
loginEmpresa = loginEmpresa ? JSON.parse(loginEmpresa) : [];

function info() {
    // Elemento em que serão exibido as informações
    let displayDiv = document.querySelector('[data-user-cards-container]');

    // Percorra os dados e exiba-os
    if (loginEmpresa.length <= 0) {
        window.location.href = '/view/login.html';
    }
    else {
        // Pegar url atual da pagina
        let url = window.location.search;

        // Pegar parametros da pagina
        let params = new URLSearchParams(url);

        // Pegar get id
        let id = parseInt(params.get('empresa'));

        // Aqui você pode criar um elemento para cada conjunto de dados e adicioná-lo à página
        let img = document.querySelector("[data-image]");
        let info = document.querySelector("[data-details]");
        let indice = document.querySelector("[data-index]");

        img.src = '/assets/img/photoExemple.png';
        indice.textContent = (id + 1);
        info.innerHTML = "<strong>Nome:</strong> " + loginEmpresa[id].name + "<br><strong>CNPJ:</strong> " + loginEmpresa[id].CNPJ + "<br><strong>Email:</strong> " + loginEmpresa[id].email;

        document.querySelector('#editarEmpresa').addEventListener('click', function () {

            // Passar informações do localStorage para o HTML
            document.querySelector("[info-id]").innerHTML = (id + 1);
            document.querySelector("[info-header]").innerHTML = (id + 1);
            document.querySelector("[info-name]").value = loginEmpresa[id].name;
            document.querySelector("[info-cnpj]").value = loginEmpresa[id].CNPJ;
            document.querySelector("[info-email]").value = loginEmpresa[id].email;
            document.querySelector("[info-password]").value = loginEmpresa[id].password;

            // Chamar edição das informações
            document.querySelector('#salvarEmpresa').addEventListener('click', function () {

                // Pegar valor dos dadas cadastrados no forms
                let nome_empresa = document.querySelector("[info-name]").value;
                let cnpj_empresa = document.querySelector("[info-cnpj]").value;
                let email_empresa = document.querySelector("[info-email]").value;
                let password_empresa = document.querySelector("[info-password]").value;

                // Atualizar dados do localStorage
                loginEmpresa[id] = {
                    "name": nome_empresa,
                    "CNPJ": cnpj_empresa,
                    "email": email_empresa,
                    "password": password_empresa
                };

                // Salvar alterações no localStorage
                localStorage.setItem('loginEmpresa', JSON.stringify(loginEmpresa));

                sucesso();
            });
        });

        document.querySelector('#deletaEmpresa').addEventListener('click', function () {
            document.querySelector("[delete-header]").innerHTML = (id + 1);

            document.querySelector('#deletarEmpresa').addEventListener('click', function () {
                // Remover item do localStorage
                loginEmpresa.splice(id, 1)

                // Salvar alterações no localStorage
                localStorage.setItem('loginEmpresa', JSON.stringify(loginEmpresa));

                deletado();
            });
        });
    }
}

info()

function sucesso() {
    // Adicionar resposta ao HTML
    document.querySelector('#statusInfo').innerHTML = "Empresa atualizada com sucesso!";
    document.querySelector('#statusInfo').style.backgroundColor = '#40b940';

    //Adiciona um atraso de 1 segundos antes de redirecionar
    setTimeout(function () {
        info();
        document.querySelector('#infoEmpresas button:nth-of-type(1)').click();
    }, 1000);

}

function deletado() {
    setTimeout(function () {
        info();
        document.querySelector('#apagarEmpresa button:nth-of-type(1)').click();

        // Redicionar para a tela de login ao apagar conta
        window.location.href = '/view/login.html';
    }, 1000);
}