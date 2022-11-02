

function fecharModalView() {
    let closeView = document.getElementById("close-view")
    closeView.addEventListener('click', () => {
        let modalView = document.getElementsByClassName("modal-bg-view")[0]
        modalView.classList.add("hidden")
    })
}
fecharModalView()

function fecharModalDeleteUser() {
    let closeDelUser = document.getElementById("close-delete-user")
    closeDelUser.addEventListener('click', () => {
        let modalDelUser = document.getElementsByClassName("modal-bg-delete")[0]
        modalDelUser.classList.add("hidden")
    })
}
fecharModalDeleteUser()

function fecharModalEditUser() {
    let closeEditUser = document.getElementById("close-edit-user")
    closeEditUser.addEventListener('click', () => {
        let modalEditUser = document.getElementsByClassName("modal-bg-edit-user")[0]
        modalEditUser.classList.add("hidden")
    })
}
fecharModalEditUser()

function fecharModalCriar() {
    let closeCreate = document.getElementById("close-criar")
    closeCreate.addEventListener('click', () => {
        let modalCreate = document.getElementsByClassName("modal-bg-create")[0]
        modalCreate.classList.add("hidden")
    })
}
fecharModalCriar()

function fecharModalEditDepartment() {
    let closeEditDepartment = document.getElementById("close-edit-department")
    closeEditDepartment.addEventListener('click', () => {
        let modalEditDepartment = document.getElementsByClassName("modal-bg-edit-department")[0]
        modalEditDepartment.classList.add("hidden")
    })
}
fecharModalEditDepartment()

function fecharModalDeleteDepartment() {
    let closeDeleteDepartment = document.getElementById("close-delete-department")
    closeDeleteDepartment.addEventListener('click', () => {
        let modalDeleteDepartment = document.getElementsByClassName("modal-bg-delete-department")[0]
        modalDeleteDepartment.classList.add("hidden")
    })
}
fecharModalDeleteDepartment()