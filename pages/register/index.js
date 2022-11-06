const baseURL = "http://localhost:6278"

function abrirMenu() {
    let modal = document.getElementsByClassName("modal-top")[0]
    let btnClose = document.getElementsByClassName("img-close")[0]
    let btnMenu = document.getElementsByClassName("img-top")[0]
    btnMenu.addEventListener('click', () => {
        btnMenu.classList.add("hidden")
        btnClose.classList.remove("hidden")
        modal.classList.remove("hidden")
    })

    btnClose.addEventListener('click', () => {
        btnMenu.classList.remove("hidden")
        btnClose.classList.add("hidden")
        modal.classList.add("hidden")
    })
}
abrirMenu()

function retornarAHome() {
    let btnHome = document.querySelectorAll(".btn-home")
    btnHome.forEach(elem => {
        elem.addEventListener('click', () => {
            let bar = document.getElementById("bar")
            bar.classList.add("progress-bar")
            setTimeout(() => {
                window.location.assign("../../index.html")
            }, 1500)
        })
    })
}
retornarAHome()

function retornarAoLogin() {
    let btnLogin = document.querySelectorAll(".btn-login")
    btnLogin.forEach(elem => {
        elem.addEventListener('click', () => {
            let bar = document.getElementById("bar")
            bar.classList.add("progress-bar")
            setTimeout(() => {
                window.location.assign("../login/index.html")
            }, 1500)
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

    if (username.value == "" || email.value == "" || password == "") {
        registerBtn.disabled = true
        registerBtn.classList.add("disabled-button")
    }

    arrInput.forEach(elem => {
        elem.addEventListener('input', () => {
            if (username.value == "" || email.value == "" || password == "") {
                registerBtn.disabled = true
                registerBtn.classList.add("disabled-button")
            }
            else {
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

        await fetch(`${baseURL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        })
            .then(response => response.json())
            .then(response => response)

        let toastfy = document.getElementsByClassName("toastfy")[0]
        toastfy.classList.remove("hidden")
        let bar = document.getElementById("bar")
        bar.classList.add("progress-bar")
        setTimeout(() => {
            window.location.assign("../login/index.html")
        }, 1500)
    })
}
registrarUsuario()






