// Index Background
document.addEventListener('DOMContentLoaded', function() {
    var video = document.getElementById('videoBackground');
    var img = document.getElementById('imgBackground');
    

    video.src = './assets/videos/backgroundV.mp4';
    img.src = './assets/img/imgBackground.jpg';
    
});


/* ISTO É UMA BUSCA DINAMICA USANDO JAVASCRIPT PARA UMA BARRA DE PESQUISA */ 

const userCardTemplate = document.querySelector("[data-result-template]")
const userCardContainer = document.querySelector("[data-user-cards-container")
const searchInput = document.querySelector("[data-search")

searchInput.addEventListener("input", e =>{
    const value = e.target.value.toLowerCase()
    /* console.log(users) - teste no console para visualizar os itens pesquisados*/ 
    users.forEach(user => {
        const isVisible = value === "" || user.name.toLowerCase().includes(value) || user.email.toLowerCase().includes(value)
        user.element.classList.toggle("hide", !isVisible)
    })
})

let results = []

fetch("https://jsonplaceholder.typicode.com/users")
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
})


