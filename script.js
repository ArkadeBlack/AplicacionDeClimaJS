let api_key = 'cdfba0f24bb104bfd3e7aa9455b0ce7a'
let urlBase = 'https://api.openweathermap.org/data/2.5/weather'
let cambiarKelvin = 273.15

document.getElementById('botonBusqueda').addEventListener('click', () => { const ciudad = document.getElementById('ciudadEntrada').value
    if(ciudad){
        fetchDatosClima(ciudad)
    } else {
        alert('Por favor, ingresa una ciudad.');
    }
})

//FUNCION FETCH DATOS CLIMA.
function fetchDatosClima(ciudad){
    fetch(`${urlBase}?q=${ciudad}&appid=${api_key}&lang=es`)
        .then(data => data.json())
        .then(data => mostrarDatosClima(data))
}

//FUNCION CON MSJ DE ERROR.
// function fetchDatosClima(ciudad) {
//     fetch(`${urlBase}?q=${ciudad}&appid=${api_key}&lang=es`)
//         .then(data => {
//             if (!data.ok) {
//                 throw new Error('Error en la solicitud. Verifica el nombre de la ciudad.');
//             }
//             return data.json();
//         })
//         .then(data => mostrarDatosClima(data))
//         .catch(error => {
//             console.error(error);
//             alert('No se pudieron obtener los datos. Intenta nuevamente.');
//         });
// }

function mostrarDatosClima(data){
    const divDatosClima = document.getElementById('datosClima')
    divDatosClima.innerHTML=''

    const ciudadNombre = data.name
    const ciudadHumedad = data.main.humidity
    const ciudadSensacion = data.main.feels_like
    const paisNombre = data.sys.country
    const temperatura = data.main.temp
    const descripcion = data.weather[0].description
    const icon = data.weather[0].icon

    //Crear un elemento (div, h1, p, etc).
    const ciudadTitulo = document.createElement('h2')
    ciudadTitulo.textContent = `${ciudadNombre}, de: ${paisNombre}`

    const ciudadTemperatura = document.createElement('p')
    ciudadTemperatura.textContent = `La temperatura es: ${Math.floor(temperatura-cambiarKelvin)}°C`

    const icono = document.createElement('img')
    icono.src= `https://openweathermap.org/img/wn/${icon}@2x.png`

    const ciudadSTermica = document.createElement('p')
    ciudadSTermica.textContent = `La sensación térmica es: ${Math.floor(ciudadSensacion-cambiarKelvin)}°c`

    const ciudadInfoHumedad = document.createElement('p')
    ciudadInfoHumedad.textContent = `${ciudadHumedad}% de humedad`

    const ciudadDescripcion = document.createElement('p')
    ciudadDescripcion.textContent = `La descripción meteorológica es: ${descripcion}`


    divDatosClima.appendChild(ciudadTitulo)
    divDatosClima.appendChild(ciudadTemperatura)
    divDatosClima.appendChild(ciudadDescripcion)
    divDatosClima.appendChild(icono)
    divDatosClima.appendChild(ciudadInfoHumedad)
    divDatosClima.appendChild(ciudadSTermica)
}