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

function retornarAoCadastro() {
    let btnRegister = []
    let btnRegTop = Array.from(document.getElementsByClassName("btn-register"))
    let btnRegBot = document.getElementById("register-btn")
    btnRegTop.forEach(elem => {
        btnRegister.push(elem)
    })
    btnRegister.push(btnRegBot)
    btnRegister.forEach(elem => {
        elem.addEventListener('click', () => {
            let bar = document.getElementById("bar")
            bar.classList.add("progress-bar")
            setTimeout(() => {
                window.location.assign("../register/index.html")
            }, 1500)
        })
    })
}
retornarAoCadastro()

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

function logarUsuario() {
    let alert = document.getElementsByClassName("alert")[0]
    let loginBtn = document.getElementById("login-btn")
    let emailInput = document.getElementsByClassName("login-email")[0]
    let passwordInput = document.getElementsByClassName("login-password")[0]
    let arrInputs = [emailInput, passwordInput]

    if (emailInput.value == "" || passwordInput == "") {
        loginBtn.disabled = true
        loginBtn.classList.add("disabled-button")
    }

    arrInputs.forEach(elem => {
        elem.addEventListener('input', () => {
            alert.classList.add("hidden")
            if (emailInput.value == "" || passwordInput.value == "") {
                loginBtn.disabled = true
                loginBtn.classList.add("disabled-button")
            }
            else{
                loginBtn.disabled = false
                loginBtn.classList.remove("disabled-button")
            }
        })
    })

    loginBtn.addEventListener('click', async (e) => {
        e.preventDefault()
        let user = {
            "email": emailInput.value,
            "password": passwordInput.value,
        }

        await fetch(`${baseURL}/auth/login`, {
            method: "POST", 
            headers: {
              "Content-Type": "application/json", 
            },
            body: JSON.stringify(user), 
        })
        .then(response => {
            if (response.status !== 200) {
                let alert = document.getElementsByClassName("alert")[0]
                alert.classList.remove("hidden")
            }
            else{
                return response.json()
            }
        })
        .then(response => {
            verificarTipo(response.token)
        })
    })
}
async function verificarTipo(token) {
    await fetch(`${baseURL}/auth/validate_user`, {
        method: "GET", 
            headers: {
              "Content-Type": "application/json", 
              Authorization: `Bearer ${token}`, 
            },
    })
    .then(response => {
        if (response.status !== 200) {
            let alert = document.getElementsByClassName("alert")[0]
            alert.classList.remove("hidden")
        }
        else{
            return response.json()
        }
    })
    .then(response => {
        if (response.is_admin) {
            localStorage.setItem("adminKenzieEmpresas", token)
            let toastfy = document.getElementsByClassName("toastfy")[0]
            toastfy.classList.remove("hidden")
            let bar = document.getElementById("bar")
            bar.classList.add("progress-bar")
            setTimeout(() => {
                window.location.assign("../adminPage/index.html")
            }, 1500)
        }
        else{
            localStorage.setItem("usuarioKenzieEmpresas", token)
            let toastfy = document.getElementsByClassName("toastfy")[0]
            toastfy.classList.remove("hidden")
            let bar = document.getElementById("bar")
            bar.classList.add("progress-bar")
            setTimeout(() => {
                window.location.assign("../userPage/index.html")
            }, 1500)
        }
    })
}
logarUsuario()