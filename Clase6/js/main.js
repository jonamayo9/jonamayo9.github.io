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

// Workers
let busquedaWorker = false

if (window.Worker) {
    busquedaWorker = new Worker('workers/busqueda.worker.js')
}

// Funciones:

function render(lista = [{titulo: '', cantidad: 0, precio: 0}]){
    galeria.innerHTML=''
    lista.forEach(item => {
        galeria.innerHTML += template(item)
    })
}


// Eventos:
//al cargar la pagina
document.addEventListener('DOMContentLoaded', () =>{

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
    if (!busquedaWorker) {
        let vista = datos.filter(val => val.titulo.includes(e.target.value))
        render(vista)
    } else {
        // Uso el worker para filtrar los datos
        console.log('Busqueda Worker resitrado')

        busquedaWorker.postMessage({
            datos, 
            filtro: e.target.value
        })
        busquedaWorker.addEventListener('message', e => {
            console.log(e)
            render(e.data)
        })
    }

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

