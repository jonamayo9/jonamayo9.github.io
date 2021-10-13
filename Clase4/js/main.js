let datos = [
    {titulo: 'Carne', cantidad: 14, precio: 2500},
    {titulo: 'Jabon', cantidad: 10, precio: 2000},
    {titulo: 'Mantel', cantidad: 1, precio: 200}
]

let datosPrevios = []

const rest = RESTClient('https://616620dc13aa1d00170a63f2.mockapi.io/items1')

const btnAgregar = document.querySelector('#btnAgregar')
const inpBusqueda = document.querySelector('#inpBusqueda')
const btnDeshacer = document.querySelector('#btnDeshacer')
const inpAgregar = document.querySelector('#inpAgregar')
const lnkLimpiarLista = document.querySelector('#lnkLimpiarLista')


const template = ({titulo, cantidad, precio}) => `<div 
class="item">
<div class="titulo">
  ${titulo}
</div>
<div class="controles">
    <span>${cantidad}</span>
    <span>${precio}</span>
</div>
<div class="borrar">
  <a href="#" class="borrar">Eliminar</a>
</div>
</div>`


// Funciones:

function render(lista = [{titulo: '', cantidad: 0, precio: 0}]){
    galeria.innerHTML=''
    lista.forEach(item => {
        galeria.innerHTML += template(item)
    })
}

// async function loadAPI(completado) {
//     const endpoint = 'https://616620dc13aa1d00170a63f2.mockapi.io/items1'

//     const res = await fetch(endpoint)
//     const json = await res.json()

//     datos = json

//     completado(datos)
// }

// Eventos:
//al cargar la pagina
document.addEventListener('DOMContentLoaded', () =>{

    // loadAPI(function() {
    //     render(datos)
    // })

    rest.get(function(json) {
        datos = json
        render(datos)
    })
    
})

// al hacer click en el boton agregar item
btnAgregar.addEventListener('click', () => {
    datosPrevios = datos.slice(0)
    datos.push({
        titulo: inpAgregar.value,
        cantidad: 1,
        precio: 390
    })

    rest.post(JSON.stringify({
        titulo: inpAgregar.value,
        cantidad: 1,
        precio: 390
    }), function(p){
        console.log(p)
    })

    render(datos)

    inpAgregar.value= ''
})

//al hacer click en el boton deshacer
btnDeshacer.addEventListener('click', () => {
    datos = datosPrevios

    render(datos)
})

//al hacer una busqueda
inpBusqueda.addEventListener('input', e => {
    // let vista = datos.filter((val) => {
    //     if(val.titulo.includes(e.target.value)){
    //         return true
    //     }else {
    //         return false
    //     }
    // })

    let vista = datos.filter(val => val.titulo.includes(e.target.value))
    
    render(vista)
})

// al hacer click en limpiar
lnkLimpiarLista.addEventListener('click', () => {
    datosPrevios = datos.slice(0)
    datos = []
    render(datos)
})

// al hacer click en guardar lista


//al hacer click en cargar lista

//al hacer click en un item con la clase borrar

// Objetos: 

//const rest = (function() {

    // ------------------- FORMA 1 -----------------

    // async function loadAPI(completado) {
    //     const endpoint = 'https://616620dc13aa1d00170a63f2.mockapi.io/items1'
    
    //     const res = await fetch(endpoint)
    //     const json = await res.json()
         
    //     completado(json)
    // }

    // return {
    //     getAll: loadAPI
    // } ---------------- FIR FORMA 1 -------------------------

//     const endpoint = 'https://616620dc13aa1d00170a63f2.mockapi.io/items1'

//     function crearPeticion(url, metodo='GET', cuerpo=''){
//         return async function(completado) {
//             let rest
//             if (metodo == 'GET') {
//                 res = await fetch(url)
//             } else {
//                 res = await fetch(url, {method: metodo, body: cuerpo})
//             }

//             let data = await res.json()
//             completado(data)
//         }
//     }

//     return{
//         get: crearPeticion(endpoint),
//         post: (cuerpo, callback) => crearPeticion(endpoint, 'POST', cuerpo)(callback),
//         put: (id, cuerpo, callback) => crearPeticion(endpoint + '/'+id, 'PUT', cuerpo)(callback),
//         delete: (id, callback) => crearPeticion(endpoint + '/'+id, 'DELETE', cuerpo)(callback)
//     }
// })()