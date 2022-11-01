 
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
            window.location.assign("../register/index.html")
        })
    })
}
retornarAoCadastro()

function retornarAHome() {
    let btnHome = document.querySelectorAll(".btn-home")
    btnHome.forEach(elem => {
        elem.addEventListener('click', () => {
            window.location.assign("../../index.html")
        })
    })
}
retornarAHome()