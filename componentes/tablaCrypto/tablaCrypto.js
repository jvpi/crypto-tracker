import memoizacion from "../../lib/memoizacion.js"
import getApi from "../../lib/getApi.js"
import btnSuscribirseHidden from "./btnHidden.js"
import innerPrecioCripto from "./innerPrecioCripto.js"
export default function () {
  let table = document.getElementById('table')
  //setInterval(validacionDeMemoizacion, 1000)
  //validacionDeMemoizacion()

  function validacionDeMemoizacion() {
    let arrayCrypto = respuestaApi()//[0].current_price
    let memo = memoizacion()
    let x = memo(arrayCrypto)
    /* let memo = memoizacion()
    let x = memo(value)
    if (x) return true
    renderPrecioActualizado()*/
    //console.log('no memo');
  }
  let btnSuscribirse = ''
  async function renderTablaCrypto() {
    let respuesta = await getApi().obtenerCrypto('https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD')

    respuesta.Data.forEach(crypto => {
      table.innerHTML += `
            <tr>
                <td>${crypto.CoinInfo.Name} </td>
                <td class='price'>${crypto.DISPLAY.USD.PRICE} </td>
                <td>${crypto.DISPLAY.USD.LOW24HOUR}</td>
                <td class='td-btn'> <button class="btn-suscribirse">suscribirse</button>  </td> 
              
            </tr>
        `
    });
    btnSuscribirse = Array.prototype.slice.call(document.getElementsByClassName('btn-suscribirse'))
    btnSuscribirseHidden()
  }
  renderTablaCrypto()
  
  async function respuestaApi() {
    let respuesta = await getApi().obtenerCrypto('https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD')
    innerPrecioCripto(respuesta)
    obtenerValorActualCrypto(respuesta)
  }
  setInterval(respuestaApi, 10000)

  let cryptoIndice = []
  table.addEventListener('click', function (e) {
    if (e.target.className == 'btn-suscribirse') {
      let indice = btnSuscribirse.indexOf(e.target)
      if (localStorage.getItem('indice') != null) {
        let respuesta = JSON.parse(localStorage.getItem('indice'))
        respuesta.push(indice)

        localStorage.setItem('indice', JSON.stringify(respuesta))
      } else {
        cryptoIndice.push(indice)
        localStorage.setItem('indice', JSON.stringify(cryptoIndice))
      }

      agregarMoneda(indice)
      e.target.remove()
    }

  })

  async function agregarMoneda(indice) {
    let respuesta = await getApi().obtenerCrypto('https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD')
    precio.agregarMoneda(respuesta.Data[indice])
  }
  function obtenerValorActualCrypto(respuestaCrypto) {
    if (localStorage.getItem('indice') != null) {
      let respuestaIndice = JSON.parse(localStorage.getItem('indice'))
      //let respuestaCrypto = await getApi().obtenerCrypto('https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD')
      renderValorActualCrypto(respuestaIndice, respuestaCrypto)
    }
  }
  function renderValorActualCrypto(respuestaIndice, respuestaCrypto) {
    vista.elemento().innerHTML = ''
    for (let index = 0; index < respuestaIndice.length; index++) {
      vista.elemento().innerHTML += respuestaCrypto.Data[respuestaIndice[index]].DISPLAY.USD.PRICE
    }
  }
  class Subject {
    constructor() {
      this.subcriptores = null
      this.price = []
    }
    agregarMoneda(precio) {
      this.price.push(precio)
      this.notificar(this.price)
    }
    suscriptor(elementoDom) {
      this.subcriptores = elementoDom()
    }
    notificar(array) {
      this.subcriptores.innerHTML = ''
      for (let i = 0; i < array.length; i++) {
        this.subcriptores.innerHTML += `${array[i].DISPLAY.USD.PRICE} `
      }

    }
  }

  class Vista {
    constructor() {
      precio.suscriptor(this.elemento)
    }
    elemento() {
      return document.getElementById('h2')
    }
  }
  const precio = new Subject()
  const vista = new Vista()


}
