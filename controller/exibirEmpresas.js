// Obter os dados do localStorage
let loginEmpresa = localStorage.getItem("loginEmpresa");
loginEmpresa = loginEmpresa ? JSON.parse(loginEmpresa) : [];

function info() {
    // Elemento em que serão exibido as informações
    let displayDiv = document.querySelector('[data-user-cards-container]');
    displayDiv.innerHTML = "";
    displayDiv.innerHTML = `
                        <template data-result-template>
                            <div class="card" style="width: 20rem;">
                                <img src="" class="card-img-top" alt="Imagem Empresa" data-image>
                                <div class="card-body">
                                    <h5 class="card-title" data-header>
                                    </h5>
                                    <p class="card-text" data-details>
                                    </p>
                                    <a class="btn btn-primary" data-index>
                                        Acessar
                                    </a>
                                </div>
                            </div>
                        </template>
    `;

    let divError = document.querySelector('.row:nth-of-type(2)');

    // Percorra os dados e exiba-os
    if (loginEmpresa.length <= 0) {
        divError.style.display = 'block';
    }
    else {
        divError.style.display = 'none';
        loginEmpresa.forEach(function (data, index) {
            // Aqui você pode criar um elemento para cada conjunto de dados e adicioná-lo à página
            let card = document.querySelector("[data-result-template]").content.cloneNode(true).children[0];
            let img = card.querySelector("[data-image]");
            let header = card.querySelector("[data-header]");
            let info = card.querySelector("[data-details]");
            let indice = card.querySelector("[data-index]");

            img.src = '/assets/img/photoExemple.png';
            header.textContent = data.name;
            info.innerHTML = "<strong>CNPJ:</strong> " + data.CNPJ + "<br><strong>Email:</strong> " + data.email;
            // indice.href = '#' + index;
            indice.addEventListener('click', function () {

                // Obtenha a referência para o modal
                let infoEmpresas = new bootstrap.Modal(document.getElementById('infoEmpresas'));
                // Abra o modal
                infoEmpresas.show();

                // Passar informações do localStorage para o HTML
                document.querySelector("[info-id]").innerHTML = (index + 1);
                document.querySelector("[info-header]").innerHTML = (index + 1);
                document.querySelector("[info-name]").value = data.name;
                document.querySelector("[info-cnpj]").value = data.CNPJ;
                document.querySelector("[info-email]").value = data.email;
                document.querySelector("[info-password]").value = data.password;

                // Chamar edição das informações
                document.querySelector('#editarEmpresa').addEventListener('click', function () {

                    // Verificar se os inputs são alteráveis
                    if (document.querySelector('[info-name]').hasAttribute('readonly')) {
                        let campos = document.querySelectorAll('[info-name], [info-cnpj], [info-email], [info-password]');

                        // Liberar campos para edição
                        campos.forEach(function (campo) {
                            campo.removeAttribute('readonly');
                            document.querySelector('[info-name]').focus();
                        });
                    }
                    else {
                        // Pegar valor dos dadas cadastrados no forms
                        let nome_empresa = document.querySelector("[info-name]").value;
                        let cnpj_empresa = document.querySelector("[info-cnpj]").value;
                        let email_empresa = document.querySelector("[info-email]").value;
                        let password_empresa = document.querySelector("[info-password]").value;

                        // Atualizar dados do localStorage
                        loginEmpresa[index] = {
                            "name": nome_empresa,
                            "CNPJ": cnpj_empresa,
                            "email": email_empresa,
                            "password": password_empresa
                        };

                        // Salvar alterações no localStorage
                        localStorage.setItem('loginEmpresa', JSON.stringify(loginEmpresa));

                        sucesso();
                    }

                });
                document.querySelector("[delete-header]").innerHTML = (index + 1);
                document.querySelector('#deletarEmpresa').addEventListener('click', function () {
                    // Remover item do localStorage
                    loginEmpresa.splice(index, 1)
                    
                    // Salvar alterações no localStorage
                    localStorage.setItem('loginEmpresa', JSON.stringify(loginEmpresa));

                    deletado();
                });
            });

            displayDiv.appendChild(card);
        });
    }
}

info()

function sucesso(){
    // Adicionar resposta ao HTML
    document.querySelector('#statusInfo').innerHTML = "Empresa atualizada com sucesso!";
    document.querySelector('#statusInfo').style.backgroundColor = '#40b940';

    //Adiciona um atraso de 1 segundos antes de redirecionar
    setTimeout(function () {
        info();
        document.querySelector('#infoEmpresas button:nth-of-type(1)').click();
    }, 1000);

}

function deletado(){
    setTimeout(function () {
        info();
        document.querySelector('#apagarEmpresa button:nth-of-type(1)').click();
    }, 1000);
}