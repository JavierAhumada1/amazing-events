let containerTabla;
let events;
let upcomingEvents;
let pastEvents;

const getData = async () => {
    try {
        const url = await fetch('http://amazing-events.herokuapp.com/api/events')
        let data = await url.json()
        events = data.events
        pastEvents = events.filter(element => new Date(element.date) < new Date(data.currentDate))
        upcomingEvents = events.filter(element => new Date(element.date) > new Date(data.currentDate))

        //<---------------------------------TABLA 1-------------------------------//
        let assistenceNew = tablaAssistance(events)
        let capacidadNew = tablaCapacidadMax(events)
        pintarPorcentaje(assistenceNew, capacidadNew)

        //<----------------------TABLA 2 Y TABLA 3-------------------------------//
        let categories = [...(new Set(events.map(element => element.category)))]//<-------------TRAE CATEGORIAS
        //---------------UPCOMING---------------//
        let upcomingStats = statsCalcule(upcomingEvents, categories)//<---------------------CALCULO LOS STATS
        let upcomingContainer = document.getElementById("tabla2")
        tablaCategory(upcomingStats, upcomingContainer)

        //---------------PAST-----------------//
        let pastStats = statsCalcule(pastEvents, categories)
        let pastContainer = document.getElementById("tabla3")
        tablaCategory(pastStats, pastContainer)
        
    } catch (err) {
        alert('Error')
    }
}
getData()
let tablaCategoria = (array, tbodyContainer) => {
    tbodyContainer.innerHTML = ""
    array.forEach(element => {
        if (element.renueves) {
            let tr = document.createElement('tr');
            tr.innerHTML = `<td>${element.category}</td>
                            <td>${element.renueves}</td>
                            <td>${element.attendance}</td>`
            tbodyContainer.appendChild(tr);
        }
    })
}
let statsCalcule = (array, categories) => {
    let allCategoryStats = []
    for (let category of categories) {
        let cantidad = 0
        let suma = 0;
        let attendance = 0;
        for (let element of array) {
            if (element.category === category) {
                suma += element.price * Number(element.assistance ? element.assistance : element.estimate)
                attendance += Number(element.assistance ? element.assistance : element.estimate) * 100 / Number(element.capacity)
                cantidad += 1
            }
        }
        let objectCategory = {
            category: category,
            renueves: suma,
            attendance: (Math.round(attendance) / cantidad)
        }
        allCategoryStats.push(objectCategory)
    }
    return allCategoryStats
}

function tablaCategory(array, categories) { //<-------------- FUNCION DE PINTAR EN LA TABLA
    array.forEach(element => {
        categories.innerHTML += `<tr>
                                <td>${element.category} </td>
                                <td>$ ${element.renueves} </td>
                                <td>${element.attendance.toFixed(2)} %</td>
                                </tr>`
    })
}

function tablaAssistance(array){//<-------------- FUNCION DE FILTRAR POR ASISTENCIAS
    let arrayNew = array.filter(element => element.assistance > 0).sort((a, b)=>{   
        return Number(a.assistance) / Number(a.capacity) - Number(b.assistance) / Number(b.capacity) //<----------PASAMOS A NUMERO Y TRAE TODOS LOS EVENTOS CON ASISTENCIA
    }) 
    return arrayNew
}

function tablaCapacidadMax(array){
    let newArray = array.sort((a, b)=>{
        return Number(b.capacity) - Number(a.capacity) //<---------PASAMOS A NUMERO Y ORDENAMOS LA CAPACIDAD DE MAYOR A MENOR
    })
    return newArray
}

function pintarPorcentaje(assist, capacity){ //<-------------- FUNCION DE PINTAR EN LA TABLA
    let tabla1 = document.getElementById("tabla1")
    let asistencia = assist
    let capacidad = capacity
    tabla1.innerHTML = `<tr>
                        <td>${asistencia[asistencia.length-1].name} </td>
                        <td>${asistencia[0].name} </td>
                        <td>${capacidad[0].name} </td>
                        </tr>`                       
}






















