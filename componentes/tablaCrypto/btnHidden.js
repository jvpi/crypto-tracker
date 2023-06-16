export default function () {
    let btnSuscribirse = document.getElementsByClassName('btn-suscribirse')
    let respuesta = JSON.parse(localStorage.getItem('indice'))
    aplicarEstilos(respuesta,btnSuscribirse)
}
function aplicarEstilos(respuesta,btnSuscribirse) {
    for (let index = 0; index < respuesta.length; index++) {
        btnSuscribirse[respuesta[index]].style.display = 'none'
    }
}