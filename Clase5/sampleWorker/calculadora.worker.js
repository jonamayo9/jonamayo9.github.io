// Recibe el mensaje desde el flujo principal
self.addEventListener('message', e => {
    //console.log("mensaje recibido en worker: ",e)
    const {numero1, numero2} = e.data
    /* const numero1 = e.data.numero1
    const numero2 = e.data.numero2 */

    const suma = numero1 + numero2

    // Envio mensaje
    self.postMessage(suma)
})