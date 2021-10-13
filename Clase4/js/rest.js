// Objetos: 
const RESTClient = function(endpoint) {

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

    function crearPeticion(url, metodo='GET', cuerpo=''){
        return async function(completado) {
            let rest
            if (metodo == 'GET') {
                res = await fetch(url)
            } else {
                res = await fetch(url, {method: metodo, body: cuerpo})
            }

            let data = await res.json()
            completado(data)
        }
    }

    return{
        get: crearPeticion(endpoint),
        post: (cuerpo, callback) => crearPeticion(endpoint, 'POST', cuerpo)(callback),
        put: (id, cuerpo, callback) => crearPeticion(endpoint + '/'+id, 'PUT', cuerpo)(callback),
        delete: (id, callback) => crearPeticion(endpoint + '/'+id, 'DELETE', cuerpo)(callback)
    }
}