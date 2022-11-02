import { baseURL } from "../../scripts/baseUrl.js"

function retornarAHome() {
    let btnHome = document.querySelectorAll(".btn-home")
    btnHome.forEach(elem => {
        elem.addEventListener('click', () => {
            window.location.assign("../../index.html")
        })
    })
}
retornarAHome()
function retornarAoLogin() {
    let btnLogin = document.querySelectorAll(".btn-login")
    btnLogin.forEach(elem => {
        elem.addEventListener('click', () => {
            window.location.assign("../login/index.html")
        })
    })
}
retornarAoLogin()


function registrarUsuario() {
    let professionalLevel = document.getElementById("select")
    let selectedLevel = ""
    let username = document.getElementById("username")
    let email = document.getElementById("email")
    let password = document.getElementById("password")
    let registerBtn = document.getElementById("register-btn")
    let arrInput = [username, email, password]

    if(username.value == "" || email.value == "" || password == ""){
        registerBtn.disabled = true
        registerBtn.classList.add("disabled-button")
    }

    arrInput.forEach(elem => {
        elem.addEventListener('input', () => {
            if(username.value == "" || email.value == "" || password == ""){
                registerBtn.disabled = true
                registerBtn.classList.add("disabled-button")
            }
            else{
                registerBtn.disabled = false
                registerBtn.classList.remove("disabled-button")
            }
        })
    })
    
    professionalLevel.addEventListener('change', () => {
        selectedLevel = professionalLevel.value
    })

    registerBtn.addEventListener('click', async (e) => {
        e.preventDefault()
        let user = {
            "username": username.value,
            "password": password.value,
            "email": email.value,
            "professional_level": selectedLevel,
        }
    
        await fetch(`${baseURL}/auth/register`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user), 
        })
        .then(response => response.json())
        .then(response => response)

        window.location.assign("../login/index.html")
    })
}
registrarUsuario()






