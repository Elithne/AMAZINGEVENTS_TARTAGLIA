const eventsAvailable = data.events.map(event => {
    let aux = {}
    aux.image = event.image,
    aux.name = event.name,
    aux.date = event.date,
    aux.description = event.description,
    aux.category = event.category,
    aux.place = event.place,
    aux.assistance= event.assistance,
    aux.price = event.price
    aux.id = event._id;
    
    return aux;
})

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const eventSelected = eventsAvailable.find(event => event.id === id)

let cardContainer = document.getElementById('details-card');
cardContainer.innerHTML = `
<div class="row">
    <div class="col-md-4">
        <img src="${eventSelected.image}" class="card-img m-md-4 py-2" alt="${eventSelected.name}">
    </div>
    <div class="col-md-8">
        <div class="card-body text-center">
            <h5 id="name" class="card-title pb-2">${eventSelected.name}</h5>
            <p id="date" class="card-text">Date: ${eventSelected.date}</p>
            <p id="description" class="card-text">Description: ${eventSelected.description}</p>
            <p id="category" class="card-text">Category: ${eventSelected.category}.</p>
            <p id="place" class="card-text">Place: ${eventSelected.place}</p>
            <p id="assistance" class="card-text">Assistance: ${eventSelected.assistance}</p>
            <p id="price" class="card-text">Price: $${eventSelected.price}</p>
        </div>
    </div>                                           
</div>`