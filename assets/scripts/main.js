let card = ""; 
let checkbox = ""; 
let data = {};
let events = [];
let categories = []; // Almacena las categorías únicas
let checkboxContainer = document.getElementById('checkboxContainer'); 
let cardsContainer = document.getElementById('cardsContainer');
let searchEvent = document.querySelector('input[name=search]');
let urlApi = 'https://mindhub-xj03.onrender.com/api/amazing';

async function getEventsData(){
    try{
        const response = await fetch(urlApi); //Returns a promise 
        data = await response.json(); //Returns data
        events = data.events;
        categories = getCategories(events);
        
    }catch(error){
        console.log(error);
    }
}

// Función para crear las tarjetas de eventos
function createCards(arrayEvents) {
    card = "";
    arrayEvents.forEach(event => {
        // Crea una tarjeta de evento con los datos
        card += `<div class="col-12 col-sm-6 col-lg-4 col-xl-3 my-1 d-flex align-items-stretch">
            <div class="card p-2 m-2 shadow-sm";">
                <img src="${event.image}" class="card-img-top" alt="${event.name}">
                <div class="card-body text-center">
                    <h5 class="card-title">${event.name}</h5>
                    <p class="card-text">${event.description}</p>
                    <div class="d-flex justify-content-md-between flex-column">
                        <p class="card-text p-2">Price: $${event.price}</p>                           
                        <div>
                            <a href="details.html?id=${event._id}" class="btn btn-danger">Details</a>
                        </div>                    
                    </div>                    
                </div>                   
            </div>
        </div>`;
    })    
    cardsContainer.innerHTML = card;
}

function getCategories(arrayEvents) {
    let categories = [];
    for (const event of arrayEvents) {
        let category = event.category;
        if (!categories.includes(event.category)) {
            categories.push(category);
        }
    }
    return categories;
}
// Función para crear los checkboxes de categorías
function createCategories(categories) {
    checkbox = ""; 
    // Filtra las categorías que están repetidas 
    categories.forEach(category => {  
            checkbox += `
                <label class="form-check-label p-3">
                    <input class="form-check-input" type="checkbox" name="${category}" value="">
                    <span class="form-option">${category}</span>
                </label>`;
    });
    checkboxContainer.innerHTML = checkbox;
}

// Función para filtrar eventos por búsqueda y categorías seleccionadas
function filterEvents(arrayEvents) {
    let search = searchEvent.value.toLowerCase();
    let checked = Array.from(document.querySelectorAll('input.form-check-input:checked')).map(checkbox => checkbox.name);

    let filtered = arrayEvents.filter(event => {
        let nameMatches = event.name.toLowerCase().includes(search.toLowerCase());
        let categoryMatches = checked.length === 0 || checked.includes(event.category);
        return nameMatches && categoryMatches;
    })

        const noResultsMessage = document.getElementById('noResultsMessage');
        if (filtered.length === 0) {
            noResultsMessage.classList.remove('d-none'); // Mostrar mensaje
        } else {
            noResultsMessage.classList.add('d-none'); // Ocultar mensaje
        }
    createCards(filtered); 
}

// Función para filtrar eventos por búsqueda
function filterBySearch(arrayEvents) {
    searchEvent.addEventListener('input', () => 
        filterEvents(arrayEvents)
    )
}

// Función para filtrar eventos por categorías seleccionadas
function filterByCategories(arrayEvents) {
    document.addEventListener('change', (e) => {
        if (e.target.classList.contains('form-check-input')) {
            filterEvents(arrayEvents);
        }
    })  
}

// Función para cargar el contenido
function loadEventsContent(eventsData) {
        console.log(eventsData);
        createCards(eventsData);
        createCategories(categories);
        filterBySearch(eventsData);
        filterByCategories(eventsData);
}