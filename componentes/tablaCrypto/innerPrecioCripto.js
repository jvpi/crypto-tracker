export default function (respuestaCripto) {
    let elementPrice = document.getElementsByClassName('price')
    for (let index = 0; index < elementPrice.length; index++) {
        elementPrice[index].innerHTML = respuestaCripto.Data[index].DISPLAY.USD.PRICE
}
}