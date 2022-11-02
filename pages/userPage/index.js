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
function renderizarUsuario(response) {
    console.log(response)
    let username = document.getElementById("username")
    username.innerText = response.username

    let userMail = document.getElementById("user-email")
    userMail.innerText = response.email

    let userLevel = document.getElementById("user-prof-level")
    userLevel.innerText = response.professional_level[0].toUpperCase() + response.professional_level.substring(1)

    let kindOfWork = document.getElementById("user-kind-of-work")
    kindOfWork.innerText = response.kind_of_work
}
capturarUsuario()

function editarMeuPerfil() {
    let modalEdit = document.getElementById("modal-edit")

    let btnEdit = document.getElementById("btn-edit")
    btnEdit.addEventListener('click', () => {
        modalEdit.classList.remove("hidden")
    })

    let btnCloseEdit = document.getElementById("close-edit")
    btnCloseEdit.addEventListener('click', () => {
        modalEdit.classList.add("hidden")
    })

    let btnEditProfile = document.getElementById("edit-profile")
    btnEditProfile.addEventListener('click', async (e) => {
        e.preventDefault()
        let newName = document.getElementById("new-username")
        let newEmail = document.getElementById("new-email")
        let newPassword = document.getElementById("new-password")

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