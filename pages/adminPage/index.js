import {baseURL} from "../../scripts/baseUrl.js";
import {acessarDepartamento} from "./funcionalidades.js"
//import {editarDepartamento} from "./funcionalidades.js"
//import {deletarDepartamento} from "./funcionalidades.js"
import {editarUsuario} from "./funcionalidades.js"
import {deletarUsuario} from "./funcionalidades.js"
let adminToken = ""

function deslogar() {
    let logoutBtn = document.querySelectorAll("#logout")
    logoutBtn.forEach(elem => {
        elem.addEventListener('click', () => {
            localStorage.removeItem("adminKenzieEmpresas")
            window.location.assign("../login/index.html")
        })
    })
}
deslogar()

async function percorrerDepartamentos() {
    adminToken = localStorage.getItem("adminKenzieEmpresas")

    await fetch(`${baseURL}/departments`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json", 
            Authorization: `Bearer ${adminToken}`, 
        },
    })
    .then(response => response.json())
    .then(response => renderizarDepartamentos(response))
}
function renderizarDepartamentos(departamentos){
    let deparmentsList = document.getElementsByClassName("departments-list")[0]
    departamentos.forEach(elem => {
        let li = document.createElement("li")
        li.classList = "department flex flex-col"

        let divInfo = document.createElement("div")
        divInfo.classList = "department-info flex flex-col"

        let departmentName = document.createElement("h4")
        departmentName.innerText = elem.name

        let departmentDescription = document.createElement("p")
        departmentDescription.innerText = elem.description

        let companyName = document.createElement("p")
        companyName = elem.companies.name
        divInfo.append(departmentName, departmentDescription, companyName)

        let divEdits = document.createElement("div")
        divEdits.classList = "icons-list flex justify-center"

        let imgEye = document.createElement("img")
        imgEye.src = "../../assets/eye_icon.png"
        imgEye.addEventListener('click', () => {
            acessarDepartamento(elem, adminToken)
        })

        let imgPencil = document.createElement("img")
        imgPencil.src = "../../assets/pencil_icon.png"
        imgPencil.addEventListener('click', () => {
            //editarDepartamento(elem, adminToken)
        })

        let imgTrash = document.createElement("img")
        imgTrash.src = "../../assets/trash_icon.png"
        imgTrash.addEventListener('click', () => {
            //apagarDepartamento(elem, adminToken)
        })

        divEdits.append(imgEye, imgPencil, imgTrash)
        li.append(divInfo, divEdits)
        deparmentsList.append(li)
    })
}
percorrerDepartamentos()


async function percorrerUsuarios() {
    await fetch(`${baseURL}/users`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json", 
            Authorization: `Bearer ${adminToken}`, 
        },
    })
    .then(response => response.json())
    .then(response => renderizarUsuario(response))
}
function renderizarUsuario(users) {
    let usersList = document.getElementsByClassName("users-list")[0]
    users.forEach(elem => {
        let li = document.createElement("li")
        li.classList = "user flex flex-col"

        let userInfo = document.createElement("div")
        userInfo.classList = "user-info flex flex-col"

        let username = document.createElement("h4")
        username.innerText = elem.username

        let profLevel = document.createElement("p")
        profLevel.innerText = elem.professional_level
        profLevel.innerText = elem.professional_level[0].toUpperCase() + elem.professional_level.substring(1)

        let company = document.createElement("p")
        company.innerText = elem.department_uuid
        userInfo.append(username, profLevel, company)

        let edits = document.createElement("div")
        edits.classList = "user-icons-list flex justify-center"

        let imgPencil = document.createElement("img")
        imgPencil.src = "../../assets/pencil_icon.png"
        imgPencil.addEventListener('click', () => {
            let modalEditUser = document.getElementsByClassName("modal-bg-edit-user")[0]
            modalEditUser.classList.remove("hidden")
            editarUsuario(elem, adminToken)
        })

        let imgTrash = document.createElement("img")
        imgTrash.src = "../../assets/trash_icon.png"
        imgTrash.addEventListener('click', () => {
            let modalDelete = document.getElementsByClassName("modal-bg-delete")[0]
            modalDelete.classList.remove("hidden")
            deletarUsuario(elem, adminToken)
        })

        edits.append(imgPencil, imgTrash)
        li.append(userInfo, edits)
        usersList.append(li)
    })
}
percorrerUsuarios()