
async function miFuncionNueva() {
    const url = await fetch('http://amazing-events.herokuapp.com/api/events')
    let myData = await url.json()
    const queryString = location.search//--------------TRAE EL ID ENTERO
    const params = new URLSearchParams(queryString);
    const id = params.get("id")
    const evento = myData.events.find(detail => detail._id === id)//-----------BUSCA EL EVENTO MEDIANTE EL ID Y DEVUELVE EL PRIMERO QUE ENCUENTRA
    //------------------------------------------------CREAMOS CARDS
    const card = document.getElementById("container")
    let divCards = document.createElement("div")
    divCards.className = "d-flex flex-wrap"
    divCards.innerHTML = `<img src=${evento.image}  class="card-img-top border border-light" style= "height:15rem; object-fit: cover" alt="imagen">
        <div class="card-body d-flex flex-column justify-content-between text-light">
            <h3 class="card-title text-center animation" style="font-family: ghotamUlt font-size:14px ">${evento.name} </h3>
            <h5 class="card-text">${evento.date} </h5>
            <p class="card-text">${evento.description} </p>
            <p class="card-text">${evento.category} </p>
            <p class="card-text">${evento.place} </p>
            <p class="card-text">${evento.capacity} </p>
            <p class="card-text">${evento.assistance ? evento.assistance : evento.estimate} </p>
            <h4 class="card-text text-end">Price $${evento.price} </h4>            
        </div>`
    card.appendChild(divCards)
}
miFuncionNueva()
