import {baseURL} from "../../scripts/baseUrl.js"
let userToken = localStorage.getItem("usuarioKenzieEmpresas")
console.log(userToken)
function deslogar() {
    let logoutBtn = document.querySelectorAll("#logout")
    logoutBtn.forEach(elem => {
        elem.addEventListener('click', () => {
            localStorage.removeItem("usuarioKenzieEmpresas")
            window.location.assign("../login/index.html")
        })
    })
} 
deslogar()

async function validacaoUser() {
    await fetch(`${baseURL}/auth/validate_user`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
        },
    })
    .then(response => {
        if (response.status !== 200) {
            window.location.assign("../../index.html")
        }
        return response.json()
    })

    let getAdmin = localStorage.getItem("adminKenzieEmpresas")
    if (getAdmin) {
        window.location.assign("../../index.html")
    }
}
validacaoUser()

async function capturarUsuario() {
    await fetch(`${baseURL}/users/profile`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json", 
            Authorization: `Bearer ${userToken}`, 
        },
    })
    .then(response => response.json())
    .then(response => renderizarUsuario(response))
}
async function renderizarUsuario(user) {
    let username = document.getElementById("username")
    username.innerText = user.username

    let userMail = document.getElementById("user-email")
    userMail.innerText = user.email

    let userLevel = document.getElementById("user-prof-level")
    userLevel.innerText = user.professional_level[0].toUpperCase() + user.professional_level.substring(1)

    let kindOfWork = document.getElementById("user-kind-of-work")
    kindOfWork.innerText = user.kind_of_work

    let boxNotHired = document.getElementsByClassName("not-hired")[0]
    let companyInfo = document.getElementsByClassName("company-info")[0]
    if (user.department_uuid !== null) {
        boxNotHired.classList.add("hidden")
        companyInfo.classList.remove("hidden")

        await fetch(`${baseURL}/users/departments/coworkers`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userToken}`,
            },
        })
        .then(response => response.json())
        .then(response => {
            renderizarCooperadores(response[0].users)
            renderizarInfoEmpresa(response[0].users)
        })
    }
}
function renderizarCooperadores(users) {
    let cooperatorsList = document.getElementsByClassName("company-funcs")[0]
    users.forEach(user => {
        let li = document.createElement("li")
        li.classList = "func flex flex-col"

        let userName = document.createElement("h4")
        userName.innerText = user.username

        let userLevel = document.createElement("p")
        userLevel.innerText = user.professional_level[0].toUpperCase() + user.professional_level.substring(1)

        li.append(userName, userLevel)
        cooperatorsList.append(li)
    })
}

async function renderizarInfoEmpresa(users) {
    let departmentUuid = users[0].department_uuid
    
    await fetch(`${baseURL}/users/departments`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
        },
    })
    .then(response => response.json())
    .then(response => {
        let departmentFound = response.departments.find(elem => {
            return elem.uuid == departmentUuid
        })
        let companyTitle = document.getElementById("company-info-title")
        companyTitle.innerText = `${response.name} - ${departmentFound.name}`
    })
}
capturarUsuario()

function editarMeuPerfil() {
    let modalEdit = document.getElementById("modal-edit")
    let newName = document.getElementById("new-username")
    let newEmail = document.getElementById("new-email")
    let newPassword = document.getElementById("new-password")

    let actualName = document.getElementById("username")
    let actualEmail = document.getElementById("user-email")

    let btnEdit = document.getElementById("btn-edit")
    btnEdit.addEventListener('click', () => {
        modalEdit.classList.remove("hidden")
        newName.value = actualName.innerText
        newEmail.value = actualEmail.innerText
    })

    let btnCloseEdit = document.getElementById("close-edit")
    btnCloseEdit.addEventListener('click', () => {
        modalEdit.classList.add("hidden")
    })

    let btnEditProfile = document.getElementById("edit-profile")
    btnEditProfile.addEventListener('click', async (e) => {
        e.preventDefault()

        let newInfo = {
            "username": newName.value,
            "email": newEmail.value,
            "password": newPassword.value,
        }
        
        await fetch(`${baseURL}/users`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userToken}`,
            },
            body: JSON.stringify(newInfo),
        })
        .then(response => response.json())
        .then(response => response)
        modalEdit.classList.add("hidden")
        window.location.assign("./index.html")
    })

}
editarMeuPerfil()