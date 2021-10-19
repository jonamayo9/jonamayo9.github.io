// Proceso 

const SUPERLISTA_CACHES = {
    inmutable: {
        nombre: 'SUPERLISTA_CACHE_INMUTABLE',
        archivos: [
            'https://fonts.googleapis.com/icon?family=Material+Icons',
            'https://code.getmdl.io/1.3.0/material.indigo-pink.min.css',
            'https://code.getmdl.io/1.3.0/material.min.js',
            'https://616620dc13aa1d00170a63f2.mockapi.io/items1',
            'https://fonts.gstatic.com/s/materialicons/v109/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2'
        ]
    },

    estatica: {
        nombre: 'SUPERLISTA_CACHE_ESTATICA',
        archivos: [
            '/',
            '/sw.js',
            '/index.html',
            '/ccs/estilos.css',
            '/js/rest.js',
            '/js/main.js',
            '/workers/busqueda.worker.js',
            '/img/icon192.png',
            '/manifest.json'
        ]
    },

    dinamica: {
        nombre: 'SUPERLISTA_CACHE_DINAMICA',
        archivos: []
    }
}



// Fetch: se ejecuta al interceptar una peticion saliente
// operador sefl: es una referencia al objeto -> SW
self.addEventListener('fetch', function(e) {
    //console.log(e.request.url)
    const respuesta = caches.match(e.request).then(res => {
        if(res) {
            return res
        } else {
            return fetch(e.request).then(online_res => {
                //AGREGAMOS el archivo a la cache dinamica
                caches.open(SUPERLISTA_CACHES.dinamica.nombre).then(cache => {
                    cache.put(e.request, online_res)
                })

                return online_res.clone()
                
            })
        }
    })

    e.respondWith(respuesta)
})

//Preparacion
//install: se ejecuta una vez al principio
self.addEventListener('install', e => {
    //COPIADO DE ARCHIVOS A LA CACHE
    const promesaCacheInm = caches.open(SUPERLISTA_CACHES.inmutable.nombre).then(
        cache => cache.addAll(SUPERLISTA_CACHES.inmutable.archivos)
    )

    const promesaCacheEst = caches.open(SUPERLISTA_CACHES.estatica.nombre).then(
        cache => cache.addAll(SUPERLISTA_CACHES.estatica.archivos)
    )

    e.waitUntil(Promise.all([promesaCacheInm, promesaCacheEst]))
})

//activate: se ejecuta al haber un cambio en este archivo
self.addEventListener('activate', e => {
    // ACTUALIZACION  DE LOS ARCHIVOS DE LA CACHE
    const listaBlanca = [
        SUPERLISTA_CACHES.dinamica.nombre,
        SUPERLISTA_CACHES.estatica.nombre,
        SUPERLISTA_CACHES.inmutable.nombre
    ]

    const limpieza = caches.keys().then(nombreCache => {
        return Promise.all(
            nombreCache.map(nombre => {
                if(listaBlanca.indexOf(nombre) === -1){
                    return caches.delete(nombre)
                }
            })
        )
    })

    e.waitUntil(limpieza)

})