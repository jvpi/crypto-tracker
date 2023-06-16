import obtenerCrypto from './lib/getApi.js'
import memoizacion from './lib/memoizacion.js'
import tablaCrypto from './componentes/tablaCrypto/tablaCrypto.js'

import { Grid } from "./node_modules/gridjs/dist/gridjs.js";
import "gridjs/dist/theme/mermaid.css";
import DataTable from 'datatables.net-dt';
 
//let table = new DataTable('#myTable');
//setInterval(obtenerCrypto,30000)
//obtenerCrypto().obtenerCrypto('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en')
tablaCrypto()
/*let input = document.getElementById('input'),
        btn = document.getElementById('btn')
        
btn.addEventListener('click', function () {
      //  w(input.value)
        //m(input.value)
})*/
let table = new DataTable('#myTable', {
        // options
    });