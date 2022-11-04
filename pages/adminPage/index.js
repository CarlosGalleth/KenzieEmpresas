import { baseURL } from "/scripts/baseUrl.js";
import { acessarDepartamento } from "./funcionalidades.js"
import { editarDepartamento } from "./funcionalidades.js"
import { deletarDepartamento } from "./funcionalidades.js"
import { editarUsuario } from "./funcionalidades.js"
import { deletarUsuario } from "./funcionalidades.js"
export const adminToken = localStorage.getItem("adminKenzieEmpresas")

async function validacaoAdmin() {
    await fetch(`${baseURL}/auth/validate_user`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${adminToken}`,
        },
    })
    .then(response => {
        if (response.status !== 200) {
            window.location.assign("../../index.html")
        }
        return response.json()
    })
}
validacaoAdmin()

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

async function selecionarEmpresa() {
    let companyList = document.getElementById("departments")
    fetch(`${baseURL}/companies`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${adminToken}`,
        },
    })
    .then(response => response.json())
    .then(response => {
        response.forEach(company => {
            let opt = document.createElement("option")
            opt.innerText = company.name
            companyList.append(opt)
        })
    })

    companyList.addEventListener('change', async () => {
        let deparmentsList = document.getElementsByClassName("departments-list")[0]
        deparmentsList.innerHTML = ""

        await fetch(`${baseURL}/departments`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${adminToken}`,
            },
        })
        .then(response => response.json())
        .then(response => {
            let filtered = response.filter(elem => {
                return elem.companies.name == companyList.value
            })
            renderizarDepartamentos(filtered)
        })

    })
}
selecionarEmpresa()

async function percorrerDepartamentos() {

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
function renderizarDepartamentos(departamentos) {
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
            editarDepartamento(elem)
        })

        let imgTrash = document.createElement("img")
        imgTrash.src = "../../assets/trash_icon.png"
        imgTrash.addEventListener('click', () => {
            deletarDepartamento(elem)
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
async function renderizarUsuario(users) {
    let usersList = document.getElementsByClassName("users-list")[0]
    let founded = ""
    users.forEach(async elem => {
        if (!elem.is_admin) {
            let founded = []
            await fetch(`${baseURL}/departments`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${adminToken}`,
                },
            })
            .then(response => response.json())
            .then(response => {
                response.forEach(dep => {
                    if (elem.department_uuid == dep.uuid) {
                        founded = dep
                    }
                })
            })

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
            company.innerText = founded.name
            if (company.innerText == "undefined") {
                company.innerText = " "
            }
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
        }
    })
}
percorrerUsuarios()



