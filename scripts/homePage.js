const baseURL = "http://localhost:6278"

function abrirMenu() {
    let modal = document.getElementsByClassName("modal-top")[0]
    let btnClose = document.getElementsByClassName("img-close")[0]
    let btnMenu = document.getElementsByClassName("img-top")[0]
    btnMenu.addEventListener('click', () => {
        btnMenu.classList.add("hidden")
        btnMenu.classList.remove("img-top")
        btnClose.classList.remove("hidden")
        modal.classList.remove("hidden")
    })

    btnClose.addEventListener('click', () => {
        btnMenu.classList.remove("hidden")
        btnMenu.classList.add("img-top")
        btnClose.classList.add("hidden")
        modal.classList.add("hidden")
    })
}
abrirMenu()

function retornarAoCadastro() {
    let btnRegister = Array.from(document.querySelectorAll(".btn-register"))
    btnRegister.forEach(elem => {
        elem.addEventListener('click', () => {
            let bar = document.getElementById("bar")
            bar.classList.add("progress-bar")
            setTimeout(() => {
                window.location.assign("./pages/register/index.html")
            }, 1500)
        })
    })
}
retornarAoCadastro()

function retornarAoLogin() {
    let btnLogin = Array.from(document.querySelectorAll(".btn-login"))
    btnLogin.forEach(elem => {
        elem.addEventListener('click', () => {
            let bar = document.getElementById("bar")
            bar.classList.add("progress-bar")
            setTimeout(() => {
                window.location.assign("./pages/login/index.html")
            }, 1500)
        })
    })
}
retornarAoLogin()

async function listarEmpresas() {
    await fetch(`${baseURL}/companies`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(response => response.json())
        .then(response => renderizarEmpresa(response))
}
function renderizarEmpresa(empresas) {
    let sectorList = document.getElementsByClassName("sector-list")[0]
    empresas.forEach(elem => {
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
listarEmpresas()


async function listarSetores() {
    await fetch(`${baseURL}/sectors`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then(response => response.json())
    .then(response => renderizarSetores(response))
}
function renderizarSetores(setores) {
    let sectorList = document.getElementById("sector")
    setores.forEach(elem => {
        let opt = document.createElement("option")
        opt.innerText = elem.description
        sectorList.append(opt)
    })
    sectorList.addEventListener("change", () => {
        filtrarSetores(sectorList.value)
    })
}
async function filtrarSetores(setorSelecionado) {
    let sectorList = document.getElementsByClassName("sector-list")[0]
    sectorList.innerHTML = ""

    await fetch(`${baseURL}/companies`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(response => response.json())
        .then(response => {
            let arrFiltered = response.filter(elem => {
                return elem.sectors.description == setorSelecionado
            })
            renderizarEmpresa(arrFiltered)
        })
}
listarSetores()

function resetarLocalStorage() {
    let adm = localStorage.getItem("adminKenzieEmpresas")
    let user = localStorage.getItem("usuarioKenzieEmpresas")

    if (adm) {
        localStorage.removeItem("adminKenzieEmpresas")
    }
    if (user) {
        localStorage.removeItem("usuarioKenzieEmpresas")
    }
}
resetarLocalStorage()