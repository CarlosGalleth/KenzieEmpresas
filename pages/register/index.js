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