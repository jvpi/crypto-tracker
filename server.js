
let importar = 'import'
let url = "'./asset/public/'"
let arrayurl = []
let array = []
let url1 = []
let listaArray = []
let arraySinComillas = []
let arrayConComillas = []

const express = require('express')
const app = express()
const port = 3000
const fs = require('fs')
const fileImg = fs.readdir("./public", function (error, listado) {
    if (error) {
        console.log(error);
    }
    listaArray.push(...listado)
    unir(listaArray)
})

function unir(listaArray) {
    for (let index = 0; index < listaArray.length; index++) {
        array.push(importar);
        arrayurl.push(url)
    }
    for (let index = 0; index < listaArray.length; index++) {
        arraySinComillas.push((arrayurl[index]).concat(`${listaArray[index]}`).replace(/['"]+/g, ''))

    }
    for (let index = 0; index < arraySinComillas.length; index++) {
        arrayConComillas.push(`"${arraySinComillas[index]}";` ) ;
        
    }
    for (let index = 0; index < arrayConComillas.length; index++) {
        url1.push(array[index].concat(arrayConComillas[index])) ;
        
    }
    console.log(url1.join(' ') );
    fs.writeFile('archivo.js',url1.join(' '),function (error) {
        if (error) {
            console.log(error);
        }
    })
}


/*const text = array.join(' ')*/
/*fs.writeFile('archivo.js',url1.join(' '),function (error) {
    if (error) {
        console.log(error);
    }
})*/
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {

})