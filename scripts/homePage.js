import { baseURL } from "../scripts/baseUrl.js"

function abrirMenu() {
    let btnMenu = document.getElementsByClassName("img-top")[0]
    btnMenu.addEventListener('click', () => {
        let modal = document.getElementsByClassName("modal-top")[0]
        modal.classList.toggle("hidden")

    })
}
abrirMenu()

function retornarAoCadastro() {
    let btnRegister = Array.from(document.querySelectorAll(".btn-register"))
    btnRegister.forEach(elem => {
        elem.addEventListener('click', () => {
            window.location.assign("./pages/register/index.html")
        })
    })
}
retornarAoCadastro()

function retornarAoLogin() {
    let btnLogin = Array.from(document.querySelectorAll(".btn-login"))
    btnLogin.forEach(elem => {
        elem.addEventListener('click', () => {
            window.location.assign("./pages/login/index.html")
        })
    })
}
retornarAoLogin()

async function teste() {
    await fetch(`${baseURL}/companies`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(response => response.json())
        .then(response => renderizarEmpresa(response))
}

function renderizarEmpresa(empresa) {
    let sectorList = document.getElementsByClassName("sector-list")[0]
    empresa.forEach(elem => {
        let li = document.createElement("li")
        li.classList = "sector-item flex flex-col"

        let companyName = document.createElement("h3")
        companyName.innerText = elem.name

        let div = document.createElement("div")
        div.classList = "item-bottom flex flex-col"

        let openingHour = document.createElement("p")
        openingHour.innerText = elem.opening_hours

        let sector = document.createElement("h4")
        sector.innerText = elem.sectors.description

        div.append(openingHour, sector)
        li.append(companyName, div)
        sectorList.append(li)
    })
}

/*
<li class="sector-item flex flex-col">
    <h3>Empresa Name</h3>
    <div class="item-bottom flex flex-col">
        <p>10 horas</p>
        <h4>Setor</h4>
    </div>
</li>
*/
teste()