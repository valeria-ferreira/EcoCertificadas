// Index Background
document.addEventListener('DOMContentLoaded', function () {
    var video = document.getElementById('videoBackground');
    var img = document.getElementById('imgBackground');


    video.src = './assets/videos/backgroundV.mp4';
    img.src = './assets/img/imgBackground.jpg';

});

// Para que o nav-bar versão mobile funcione
document.addEventListener('DOMContentLoaded', function() {
    // Seleciona todos os elementos com a classe 'sidenav'
    var elems = document.querySelectorAll('.sidenav');
    // Inicializa a sidenav do Materialize
    var instances = M.Sidenav.init(elems, {});
  });
  
  

let results = []

// Obtenha os dados do localStorage
let loginEmpresa = localStorage.getItem("loginEmpresa");
loginEmpresa = loginEmpresa ? JSON.parse(loginEmpresa) : [];

/* ISTO É UMA BUSCA DINAMICA USANDO JAVASCRIPT PARA UMA BARRA DE PESQUISA */

function search_empresa() {
    // Definir input de pesquisa
    let input = document.getElementById('search-empresas').value
    // Deixar value em caixa baixa
    input = input.toLowerCase();
    // Definir aonde deve procurar a pesquisa
    let x = document.getElementsByClassName('template-results');
    // Percorrer locais de pesquisa
    for (i = 0; i < x.length; i++) {
        if (!x[i].innerHTML.toLowerCase().includes(input)) {
            x[i].style.display = "none";
        }
        else {
            x[i].style.display = "block";
        }
    }
}

/* const userCardTemplate = document.querySelector("[data-result-template]")
const userCardContainer = document.querySelector("[data-user-cards-container]")
const searchInput = document.querySelector("[data-search]")

searchInput.addEventListener("input", function (e) {
    const value = e.target.value.toLowerCase();

    loginEmpresa.forEach(data => {
        const isVisible = value === "" || data.name.toLowerCase().includes(value) || data.email.toLowerCase().includes(value);
        document.getElementById("cards-result").classList.toggle("hide", !isVisible);
    });
}); 

/* fetch("https://jsonplaceholder.typicode.com/users")
.then(res => res.json())
.then(data => {
    users = data.map(user => {
        const card = userCardTemplate.content.cloneNode(true).children[0]
        const header = card.querySelector("[data-header]")
        const body = card.querySelector("[data-body]")
        header.textContent = user.name
        body.textContent = user.email
        userCardContainer.append(card)
        return { name: user.name, email: user.email, element: card}
    })
}) */

// Se você quiser exibir os dados na página, encontre o elemento apropriado
var displayDiv = document.querySelector('[data-user-cards-container]');

// Percorra os dados e exiba-os
loginEmpresa.forEach(function (data) {
    // Aqui você pode criar um elemento para cada conjunto de dados e adicioná-lo à página
    var card = document.querySelector("[data-result-template]").content.cloneNode(true).children[0];
    var img = card.querySelector("[data-image]");
    var header = card.querySelector("[data-header]");
    var cnpj = card.querySelector("[data-cnpj]");
    var email = card.querySelector("[data-email]");
    var password = card.querySelector("[data-password]");

    img.src = '/assets/img/photoExemple.png';
    header.textContent = data.name;
    cnpj.innerHTML = "<strong>CNPJ:</strong> " + data.CNPJ;
    email.innerHTML = "<strong>Email:</strong> " + data.email;

    displayDiv.appendChild(card);
});



