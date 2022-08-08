// VARIABLES
/* const myData = data.events */
const url = 'http://amazing-events.herokuapp.com/api/events'

fetch(url).then(response => response.json()).then(datos => {
    let myData = datos.events
    crearEventos(myData, "card-container") //<--------------------LLAMADO DE FUNCIONES
    crearCategorias(myData, "containerCategoria") 
    crearBuscador("containerSearch")
    let checkMarcados = []
    let searchUser = ""
    let allCheck = document.querySelectorAll('input[type="checkbox"]') //---------- TRAEMOS TODOS LOS INPUT
    allCheck.forEach(check => check.addEventListener('change', () => {
        checkMarcados = Array.from(allCheck).filter(check => check.checked).map(e => e.value) // TRAER TODOS LOS CHECKED
        filtrarYmostrar()
    }))
    let form = document.forms[0]//-----------TRAE EL FORMULARIO COMPLETO
    form.addEventListener("submit", (e) => {
        e.preventDefault()//-----------------PREVENIR EL EVENTO
        searchUser = e.target[0].value.toLowerCase()//-------TRAER EL INPUT
        filtrarYmostrar()
    })
    function filterCategory(array) {
        if (checkMarcados.length > 0) {//----SI TIENE 1 MARCADO TRAE EL ARRAY MARCADO
            let categoryFilter = array.filter(evento => checkMarcados.includes(evento.category))
            return categoryFilter
        }
        return array//----------SINO TRAE TODO
    }
    function filterSearch(array, texto) {
        let filterForText = array.filter(evento => evento.name.toLowerCase().includes(texto))
        return filterForText
    }
    function filtrarYmostrar() {
        let cardsXnombre = filterSearch(myData, searchUser)//-----ARRAY DE EVENTS
        let cardsXcategory = filterCategory(cardsXnombre)
        crearEventos(cardsXcategory, "card-container")
    }
    filtrarYmostrar()
})

//--------------------------------------------------CREAMOS CARDS
function crearEventos(array, div) {
    let container = document.getElementById(div)
    container.innerHTML = ""
    if (array.length > 0) {
        array.forEach(evento => {
            let cards = document.createElement("div")
            cards.className = "card"
            cards.style.width = "18rem"
            cards.innerHTML = `<img src=${evento.image} class="card-img-top" style= "height:11rem" alt="imagen">
    <div class="card-body d-flex flex-column justify-content-between">
        <h5 class="card-title animation" style="font-family: ghotamUlt font-size:14px ">${evento.name}</h5>
        <p class="card-text">${evento.category}</p>
        <div class="d-flex justify-content-between" style="width:100%;">
            <p class="card-text">Price $${evento.price}</p>
            <a href="./details.html?id=${evento._id}" class="btn w-50" style="border-radius: 10px; background: #e0e0e0;box-shadow: 10px -10px 24px #bebebe, -10px 10px 24px #ffffff;"><strong>Detail...<strong></a>
        </div>
    </div>`
            container.appendChild(cards)
        })
    } else {
        container.innerHTML = `<h4 class="container text-center alert alert-danger text-white bg-dark">Event not found. Adjust your search parameters</h4>`
    }
}
//--------------------------------------------------CREAMOS CATEGORY
function crearCategorias(array, div) {
    let container = document.getElementById(div)
    let allCategory = []
    array.forEach(cat => {
        return allCategory.push(cat.category)
    })
    let myCategory = allCategory.filter((category, i) => { //--------------FILTRAR REPETIDAS
        return allCategory.indexOf(category) === i
    })
    myCategory.forEach(categoria => {
        let botonCategory = document.createElement("div")
        botonCategory.innerHTML = `<input type="checkbox" id="${categoria}" value='${categoria}'>
        <label class="btn btn-secondary text-white" for="${categoria}"> ${categoria} </label> `
        container.appendChild(botonCategory)
    })
}
//--------------------------------------------------CREAMOS SEARCH
function crearBuscador(div) {
    let container = document.getElementById(div)
    let search = document.createElement("form")
    search.className = 'container d-flex'
    search.role = "search"
    search.innerHTML = `<input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
    <button style="box-shadow: 2px 2px rgba(0, 0, 0, 0.219)" class="btn btn-dark border-white"
    type="submit"><img width="80" src="./img/logo_amazing_events.png" alt="imagen"></button>`
    container.appendChild(search)
}











